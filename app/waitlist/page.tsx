"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: "waitlist-page",
        }),
      });
      await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Back button only */}
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
          <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl [font-family:var(--font-satoshi)]">
            Join the waitlist
          </h1>
          <p className="mt-3 text-center text-lg text-[#a3a3a3]">
            Be the first to know when ChairFill launches. We will only use your email to notify you.
          </p>

          {status === "success" ? (
            <div className="mt-10 rounded-2xl border border-[#D4AF37]/30 bg-[#141414] p-8 text-center shadow-lg">
              <p className="text-xl font-semibold text-[#D4AF37]">You are on the list.</p>
              <p className="mt-2 text-[#a3a3a3]">
                We will notify you when we launch. No spam, ever.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block text-sm font-medium text-[#D4AF37] hover:underline"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5 rounded-2xl border border-[#D4AF37]/30 bg-[#141414] p-8 shadow-lg sm:p-10"
            >
              <div>
                <label htmlFor="waitlist-name" className="block text-sm font-medium text-white">
                  Full name <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  disabled={status === "loading"}
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
                />
              </div>
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-white">
                  Email <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={status === "loading"}
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-amber-400">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-[#E8C547] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                {status === "loading" ? "Joining…" : "Join waitlist"}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-[#737373]">
            <Link href="/" className="font-medium text-[#a3a3a3] hover:text-[#D4AF37]">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
