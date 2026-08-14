"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { REACTIVATION_SCRIPTS } from "@/lib/reactivation-scripts";

const WEEKS_PER_MONTH = 4.33;
const RECOVERY_RATE = 0.3; // realistic share of dormant clients you win back

function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function Field({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[13px] font-medium text-foreground/70">{label}</label>
        <span className="font-mono text-[14px] font-bold text-primary">
          {prefix}
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#D4AF37]"
      />
    </div>
  );
}

export default function ReactivationCalculator() {
  const [clients, setClients] = useState(150);
  const [ticket, setTicket] = useState(40);
  const [dormantPct, setDormantPct] = useState(40);
  const [freqWeeks, setFreqWeeks] = useState(3);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "unlocked" | "error">("idle");

  const { dormantCount, lostMonthly, recoverableMonthly, recoverableYearly } = useMemo(() => {
    const dormantCount = Math.round(clients * (dormantPct / 100));
    const visitsPerMonth = WEEKS_PER_MONTH / Math.max(1, freqWeeks);
    const lostMonthly = dormantCount * ticket * visitsPerMonth;
    const recoverableMonthly = lostMonthly * RECOVERY_RATE;
    return {
      dormantCount,
      lostMonthly,
      recoverableMonthly,
      recoverableYearly: recoverableMonthly * 12,
    };
  }, [clients, ticket, dormantPct, freqWeeks]);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          calc: { clients, ticket, dormantPct, freqWeeks, recoverableYearly: Math.round(recoverableYearly) },
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("unlocked");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="section-inner pt-6 pb-2">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:text-[#D4AF37]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      <main className="section-inner px-4 pb-24 pt-4">
        <div className="mx-auto max-w-2xl">
          <p className="text-center font-mono text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
            Free barber tool
          </p>
          <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl [font-family:var(--font-satoshi)]">
            How much are your dormant clients costing you?
          </h1>
          <p className="mt-3 text-center text-lg text-[#a3a3a3]">
            Move the sliders. See the money sitting in your phone right now.
          </p>

          {/* Calculator */}
          <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-[#141414] p-6 sm:p-8">
            <Field label="Total clients in your phone" value={clients} min={20} max={800} step={10} onChange={setClients} />
            <Field label="Average price per cut" value={ticket} min={15} max={150} step={5} prefix="$" onChange={setTicket} />
            <Field label="% who've gone quiet (60+ days)" value={dormantPct} min={5} max={80} step={5} suffix="%" onChange={setDormantPct} />
            <Field label="How often a regular comes in" value={freqWeeks} min={1} max={8} step={1} suffix=" wks" onChange={setFreqWeeks} />
          </div>

          {/* Result */}
          <div className="mt-6 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 text-center sm:p-8">
            <p className="text-[13px] uppercase tracking-widest text-[#888880]">
              {dormantCount} quiet clients = revenue sitting idle
            </p>
            <p className="mt-2 text-[44px] font-black leading-none text-[#D4AF37] sm:text-[56px] [font-family:var(--font-satoshi)]">
              {money(lostMonthly)}<span className="text-[20px] text-[#a3a3a3]">/mo</span>
            </p>
            <p className="mt-3 text-[15px] text-white">
              Win back just {Math.round(RECOVERY_RATE * 100)}% and that&apos;s{" "}
              <strong className="text-[#D4AF37]">{money(recoverableMonthly)}/mo</strong> —{" "}
              <strong className="text-[#D4AF37]">{money(recoverableYearly)}/yr</strong> back in your chair.
            </p>
          </div>

          {/* Gate → inline unlock */}
          {status !== "unlocked" ? (
            <form onSubmit={unlock} className="mt-6 rounded-2xl border border-white/10 bg-[#141414] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white [font-family:var(--font-satoshi)]">
                Get the 5 texts that win them back
              </h2>
              <p className="mt-1 text-[14px] text-[#a3a3a3]">
                Copy-paste reactivation scripts barbers actually use. Free — enter your email to unlock.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
                />
                <button type="submit" disabled={status === "loading"} className="cta-primary shrink-0 whitespace-nowrap disabled:opacity-70">
                  {status === "loading" ? "Unlocking…" : "Unlock the scripts"}
                </button>
              </div>
              {status === "error" && <p className="mt-2 text-sm text-red-400">Something went wrong. Try again.</p>}
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#141414] p-6 sm:p-8">
                <p className="text-[13px] font-semibold text-[#D4AF37]">Unlocked 🔓 — your 5 reactivation texts</p>
                <p className="mt-1 text-[13px] text-[#a3a3a3]">
                  Swap in [Name] and [Barber]. Send a few a day, not all at once.
                </p>
                <div className="mt-5 space-y-4">
                  {REACTIVATION_SCRIPTS.map((s, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[14px] font-bold text-white">
                          {i + 1}. {s.title}
                        </p>
                        <p className="text-[11px] text-[#737373]">{s.when}</p>
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-[#e5e5e5]">&ldquo;{s.text}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 text-center sm:p-8">
                <p className="text-[15px] text-white">
                  Don&apos;t want to send these one by one? ChairFill sends them for you, in your voice, automatically.
                </p>
                <Link href="/founding-member" className="cta-primary mt-4 inline-block">
                  Claim your free spot
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
