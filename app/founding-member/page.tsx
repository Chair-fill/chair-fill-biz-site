"use client";

import { useState } from "react";
import Link from "next/link";

const TOTAL_SPOTS = 5;
const SPOTS_REMAINING_DEFAULT = 3; // Hardcoded for now; swap to /api/spots-taken later

type Status = "idle" | "loading" | "success" | "error";

export default function FoundingMemberPage() {
  const [firstName, setFirstName] = useState("");
  const [shop, setShop] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !shop.trim() || !phone.trim()) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/founding-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          shop: shop.trim(),
          phone: phone.trim(),
          note: note.trim() || undefined,
          source: "founding-member-page",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Try again in a sec.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="section-inner pt-6 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:text-[#D4AF37]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
        <main className="section-inner px-4 pb-20 pt-4 sm:pb-24">
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#141414] p-10 text-center shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-3xl font-bold text-black">
                ✓
              </div>
              <h1 className="text-3xl font-bold text-white">
                You&apos;re <span className="text-[#D4AF37]">in</span>.
              </h1>
              <p className="mt-3 text-[#a3a3a3]">
                Check your phone in the next 60 seconds, {firstName} — I&apos;m sending the 5-min
                setup form so I can launch your campaign in 48 hours.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#737373] [font-family:var(--font-geist-mono)]">
                — McArthur / ChairFill
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="section-inner pt-6 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:text-[#D4AF37]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      <main className="section-inner px-4 pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">
              Founding Member · {SPOTS_REMAINING_DEFAULT} of {TOTAL_SPOTS}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Claim your <span className="text-[#D4AF37]">chair</span>.
            </h1>
            <p className="mt-3 text-lg text-[#a3a3a3]">
              Free for the first 5 Tampa shops. I&apos;ll text you tonight to set up your account.
            </p>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/40 bg-[#141414] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#3ddc84] shadow-[0_0_8px_#3ddc84]" />
              {SPOTS_REMAINING_DEFAULT} of {TOTAL_SPOTS} spots remaining
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-[#D4AF37]/30 bg-[#141414] p-8 shadow-lg sm:p-10"
            autoComplete="on"
          >
            <div>
              <label htmlFor="fm-first-name" className="block text-sm font-medium text-white">
                What do they call you? <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                id="fm-first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Tony"
                required
                disabled={status === "loading"}
                autoComplete="given-name"
                className="mt-2 w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
              />
            </div>

            <div>
              <label htmlFor="fm-shop" className="block text-sm font-medium text-white">
                What&apos;s your shop? <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                id="fm-shop"
                type="text"
                value={shop}
                onChange={(e) => setShop(e.target.value)}
                placeholder="King's Cuts"
                required
                disabled={status === "loading"}
                autoComplete="organization"
                className="mt-2 w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
              />
            </div>

            <div>
              <label htmlFor="fm-phone" className="block text-sm font-medium text-white">
                Best cell to text you on <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                id="fm-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(813) 555-0100"
                inputMode="tel"
                required
                disabled={status === "loading"}
                autoComplete="tel"
                className="mt-2 w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
              />
              <p className="mt-1.5 text-xs text-[#a3a3a3]">
                This becomes the iMessage line ChairFill texts your clients from.
              </p>
            </div>

            <div>
              <label htmlFor="fm-note" className="block text-sm font-medium text-white">
                Anything I should know?{" "}
                <span className="text-[#737373] font-normal">(optional)</span>
              </label>
              <textarea
                id="fm-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. I run a booth at SuperCuts in Brandon, mostly weekends."
                disabled={status === "loading"}
                rows={3}
                className="mt-2 w-full resize-y rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-amber-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-[#E8C547] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              {status === "loading" ? "Locking in…" : "Lock In My Spot"}
            </button>
            <p className="text-center text-xs uppercase tracking-[0.08em] text-[#737373] [font-family:var(--font-geist-mono)]">
              You&apos;ll get a text within the hour
            </p>
          </form>

          <div className="mt-8 overflow-hidden rounded-r-2xl border border-white/10 border-l-[3px] border-l-[#D4AF37] bg-[#141414] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">
              Revenue-First Guarantee
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              5 clients back, or you don&apos;t pay.
            </p>
            <p className="mt-2 text-sm text-[#a3a3a3] leading-relaxed">
              If ChairFill doesn&apos;t reactivate at least 5 of your dormant clients in 30 days,
              you don&apos;t pay. Ever. Your client base is a goldmine — I just help you dig.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
