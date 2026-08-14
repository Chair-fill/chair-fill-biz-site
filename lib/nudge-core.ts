import { getStore } from "@netlify/blobs";
import { Resend } from "resend";

// Shared abandoned-capture drip. Sends ONE gentle nudge to leads that gave an
// email but went cold, then marks them (nudgedAt) so they're never nudged again.
// Used by both the scheduled function and the manual admin runner.

const HOURS = 60 * 60 * 1000;
const MIN_AGE_MS = 24 * HOURS; // give them a day before nudging
const MAX_AGE_MS = 14 * 24 * HOURS; // don't nudge stale (>14d) leads
const FROM = "ChairFill™️ <noreply@chairfill.co>";

function normPhone(p: unknown): string {
  return String(p ?? "").replace(/\D+/g, "");
}
function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c),
  );
}

interface Lead {
  key: string;
  storeName: string;
  email: string;
  firstName?: string;
  createdAt: string;
  nudgedAt?: string;
  phoneDigits?: string;
  kind: "waitlist" | "leadmagnet";
  raw: Record<string, unknown>;
}

function subjectFor(kind: Lead["kind"]): string {
  return kind === "waitlist"
    ? "Your free ChairFill spot is still open"
    : "Want ChairFill to send those texts for you?";
}

function htmlFor(kind: Lead["kind"], name: string): string {
  const hi = name ? `${esc(name)}, ` : "";
  if (kind === "waitlist") {
    return `
      <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;color:#111">
        <h2 style="margin:0 0 12px">${hi}your ChairFill spot is still open 💈</h2>
        <p>You put your name in for ChairFill but didn't claim your spot yet.
        No rush — founding spots are still open and <strong>free for life</strong>.</p>
        <p>It takes about 90 seconds. We set the whole thing up for you and start
        winning back your quiet clients over iMessage, in your voice.</p>
        <p><a href="https://chairfill.co/founding-member" style="display:inline-block;background:#D4AF37;color:#000;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:10px">Claim my free spot →</a></p>
        <p style="color:#666;font-size:13px;margin-top:16px">— ChairFill</p>
      </div>`;
  }
  return `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;color:#111">
      <h2 style="margin:0 0 12px">${hi}did those reactivation texts help?</h2>
      <p>You grabbed the 5 win-back scripts — hope they're filling some chairs.</p>
      <p>If you'd rather not send them one by one, ChairFill does it for you:
      finds every quiet client and texts them automatically, in your voice.
      Founding spots are <strong>free for life</strong>.</p>
      <p><a href="https://chairfill.co/founding-member" style="display:inline-block;background:#D4AF37;color:#000;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:10px">Claim my free spot →</a></p>
      <p style="color:#666;font-size:13px;margin-top:16px">— ChairFill</p>
    </div>`;
}

async function loadStore(name: string, kind: Lead["kind"]): Promise<Lead[]> {
  const store = getStore({ name, consistency: "strong" });
  const { blobs } = await store.list();
  const out: Lead[] = [];
  for (const { key } of blobs) {
    const v = (await store.get(key, { type: "json" })) as Record<string, unknown> | null;
    if (!v || typeof v !== "object" || !v.createdAt) continue;
    const email = String(v.email ?? "").trim().toLowerCase();
    if (!email) continue;
    out.push({
      key,
      storeName: name,
      email,
      firstName: (v.firstName as string) || (v.preferredName as string) || undefined,
      createdAt: String(v.createdAt),
      nudgedAt: v.nudgedAt ? String(v.nudgedAt) : undefined,
      phoneDigits: v.phoneDigits ? String(v.phoneDigits) : normPhone(v.cell ?? v.phone),
      kind,
      raw: v,
    });
  }
  return out;
}

export interface NudgeResult {
  scanned: number;
  eligible: number;
  sent: number;
  dryRun: boolean;
  errors: number;
  emails: string[];
}

export async function runNudge(opts: { dryRun?: boolean; limit?: number } = {}): Promise<NudgeResult> {
  const dryRun = !!opts.dryRun;
  const limit = Math.max(1, Math.min(200, opts.limit ?? 50));
  const now = Date.now();

  // Target the stores that actually capture an email (the drip is email-only).
  // The founding-member form captures phone, not email, so it can't be nudged
  // here — waitlist + lead-magnet are the email-bearing abandoned funnels.
  const [waitlist, leadmagnet, intake] = await Promise.all([
    loadStore("chairfill-waitlist", "waitlist"),
    loadStore("chairfill-leadmagnet", "leadmagnet"),
    loadStore("chairfill-intake", "leadmagnet"), // only used to build the completed set
  ]);

  // Onboarded set: anyone who completed intake (by email or phone) is done — skip.
  const completedEmails = new Set(intake.map((l) => l.email));
  const completedPhones = new Set(intake.map((l) => l.phoneDigits).filter(Boolean));

  const candidates = [...waitlist, ...leadmagnet];
  let scanned = 0;
  let eligible = 0;
  let sent = 0;
  let errors = 0;
  const emails: string[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  const resend = resendKey ? new Resend(resendKey) : null;

  for (const lead of candidates) {
    scanned++;
    if (lead.nudgedAt) continue;
    const age = now - new Date(lead.createdAt).getTime();
    if (!(age >= MIN_AGE_MS && age <= MAX_AGE_MS)) continue;
    if (completedEmails.has(lead.email)) continue;
    if (lead.phoneDigits && completedPhones.has(lead.phoneDigits)) continue;

    eligible++;
    if (emails.length < 25) emails.push(lead.email);
    if (sent >= limit) continue;
    if (dryRun) continue;
    // No email key → can't send. Do NOT mark (never burn a lead without a send).
    if (!resend) continue;

    try {
      await resend.emails.send({
        from: FROM,
        to: [lead.email],
        subject: subjectFor(lead.kind),
        html: htmlFor(lead.kind, lead.firstName || ""),
      });
      // Mark nudged so this lead is never nudged again (idempotent across runs).
      const store = getStore({ name: lead.storeName, consistency: "strong" });
      await store.setJSON(lead.key, { ...lead.raw, nudgedAt: new Date().toISOString() });
      sent++;
    } catch (err) {
      errors++;
      console.error(`nudge send failed for ${lead.email}:`, err);
    }
  }

  return { scanned, eligible, sent, dryRun, errors, emails };
}
