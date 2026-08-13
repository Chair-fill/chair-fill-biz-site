"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type Slot = string; // ISO instant

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Next 14 calendar days starting today.
function upcomingDays(): { key: string; label: string; dow: string }[] {
  const out: { key: string; label: string; dow: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      key: ymd(d),
      label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      dow: d.toLocaleDateString(undefined, { weekday: "short" }),
    });
  }
  return out;
}

export default function BookPage() {
  const days = upcomingDays();
  const [date, setDate] = useState<string>(days[0].key);
  const [tz, setTz] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slot, setSlot] = useState<Slot | null>(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const loadSlots = useCallback(async (d: string) => {
    setLoadingSlots(true);
    setSlot(null);
    try {
      const res = await fetch(`/api/book/availability?date=${d}`, { cache: "no-store" });
      const data = (await res.json()) as { timeZone?: string; slots?: Slot[] };
      setTz(data.timeZone || "");
      setSlots(Array.isArray(data.slots) ? data.slots : []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    loadSlots(date);
  }, [date, loadSlots]);

  const fmtSlot = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz || undefined,
      }).format(new Date(iso));
    } catch {
      return new Date(iso).toLocaleTimeString();
    }
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/book/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          notes: form.notes.trim() || undefined,
          startISO: slot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "That time may have just been taken. Pick another.");
        setStatus("error");
        // refresh slots in case it was taken
        loadSlots(date);
        return;
      }
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <main className="section-inner px-4 pb-24 pt-16">
          <div className="mx-auto max-w-md rounded-2xl border border-[#D4AF37]/30 bg-[#141414] p-8 text-center shadow-lg">
            <p className="text-4xl mb-3">📅</p>
            <h1 className="text-2xl font-bold text-white [font-family:var(--font-satoshi)]">
              You&apos;re booked, {form.name.split(" ")[0] || "friend"}.
            </h1>
            <p className="mt-3 text-[#a3a3a3]">
              Check your email for the calendar invite. See you on the call.
            </p>
            <Link href="/" className="mt-6 inline-block text-sm font-medium text-[#D4AF37] hover:underline">
              Back to home
            </Link>
          </div>
        </main>
      </div>
    );
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
          <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl [font-family:var(--font-satoshi)]">
            Book a 30-minute setup call
          </h1>
          <p className="mt-3 text-center text-lg text-[#a3a3a3]">
            Pick a time that works. We&apos;ll get your chair filling — free, no commitment.
          </p>

          {/* Day picker */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => (
              <button
                key={d.key}
                onClick={() => setDate(d.key)}
                className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 transition-colors ${
                  date === d.key
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "border-white/10 bg-[#141414] text-white hover:border-[#D4AF37]/40"
                }`}
              >
                <span className="text-[11px] uppercase tracking-wider text-[#888880]">{d.dow}</span>
                <span className="text-sm font-semibold">{d.label}</span>
              </button>
            ))}
          </div>

          {/* Slots */}
          <div className="mt-6">
            {loadingSlots ? (
              <p className="text-center text-sm text-[#888880]">Loading times…</p>
            ) : slots.length === 0 ? (
              <p className="text-center text-sm text-[#888880]">
                No open times that day. Try another date.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                      slot === s
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                        : "border-white/10 bg-[#141414] text-white hover:border-[#D4AF37]/40"
                    }`}
                  >
                    {fmtSlot(s)}
                  </button>
                ))}
              </div>
            )}
            {tz && slots.length > 0 && (
              <p className="mt-2 text-center text-xs text-[#737373]">Times shown in {tz.split("/").pop()?.replace(/_/g, " ")}</p>
            )}
          </div>

          {/* Details form (once a slot is chosen) */}
          {slot && (
            <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-[#D4AF37]/30 bg-[#141414] p-6 shadow-lg sm:p-8">
              <p className="text-sm text-[#a3a3a3]">
                Booking <strong className="text-white">{fmtSlot(slot)}</strong> on{" "}
                <strong className="text-white">
                  {new Date(slot).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
                </strong>
              </p>
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
              />
              <textarea
                rows={3}
                placeholder="Anything you want us to know? (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
              />
              {status === "error" && <p className="text-sm text-amber-400">{error}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="cta-primary w-full disabled:opacity-70"
              >
                {status === "loading" ? "Booking…" : "Confirm my call"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
