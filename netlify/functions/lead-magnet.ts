import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// Durable capture for the reactivation-calculator lead magnet. Same Netlify
// Blobs pattern as join-waitlist. Stores the email + the barber's calculator
// inputs (useful context for follow-up). The script pack is revealed inline on
// the page; this endpoint only needs to capture the lead.
const STORE = "chairfill-leadmagnet";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as {
      email?: string;
      calc?: Record<string, unknown>;
    };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "A valid email is required" }), { status: 400, headers: corsHeaders });
    }

    const store = getStore({ name: STORE, consistency: "strong" });
    const key = email.replace(/[^a-z0-9@._-]/gi, "_");
    const entry = {
      email,
      calc: body.calc ?? null,
      createdAt: new Date().toISOString(),
      source: "reactivation-calculator",
    };
    await store.setJSON(key, entry);

    return new Response(JSON.stringify({ ok: true }), { status: 201, headers: corsHeaders });
  } catch (err) {
    console.error("lead-magnet error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500, headers: corsHeaders });
  }
};
