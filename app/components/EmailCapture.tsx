"use client";

import { useState } from "react";

export default function EmailCapture({ variant = "hero" }: { variant?: "hero" | "footer" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "marketing-site" }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const isHero = variant === "hero";
  const isFooter = variant === "footer";
  const joinLabel = status === "loading" ? "Joining…" : status === "success" ? "You're on the list!" : "Join waitlist";

  return (
    <form onSubmit={handleSubmit} className={isHero ? "w-full max-w-md" : ""}>
      <div
        className={
          isHero
            ? "flex flex-col gap-3 sm:flex-row sm:items-center"
            : isFooter
              ? "flex flex-col gap-2 sm:flex-row"
              : "flex flex-col gap-2"
        }
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className={
            variant === "inline"
              ? "w-full rounded-xl border-2 border-white bg-white/15 px-5 py-4 text-white placeholder:text-white/80 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-70"
              : "w-full rounded-xl border-2 border-[#D4AF37]/30 bg-[#141414] px-5 py-4 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="cta-primary shrink-0 whitespace-nowrap disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : status === "success" ? "You’re on the list!" : "Join waitlist"}
        </button>
      </div>
      {status === "success" && (
        <p className={`mt-2 text-sm font-medium ${variant === "inline" ? "text-white" : "text-[#D4AF37]"}`}>
          You're on the list. We'll notify you when we launch.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
