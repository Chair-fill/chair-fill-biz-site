"use client";

import { useState } from "react";

export default function EmailCapture({ variant = "hero" }: { variant?: "hero" | "footer" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    // Simulate API call – replace with your backend or service (e.g. Resend, ConvertKit)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  const isHero = variant === "hero";
  const isFooter = variant === "footer";

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
              : "w-full rounded-xl border-2 border-[#e5e4e0] bg-white px-5 py-4 text-[#1a1a1a] placeholder:text-[#4a4a4a] focus:border-[#cd1c18] focus:outline-none focus:ring-2 focus:ring-[#cd1c18]/20 disabled:opacity-70"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="cta-primary shrink-0 whitespace-nowrap disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : status === "success" ? "You’re on the list!" : "Join now"}
        </button>
      </div>
      {status === "success" && (
        <p className={`mt-2 text-sm font-medium ${variant === "inline" ? "text-white" : "text-[#cd1c18]"}`}>
          Thanks! We’ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
