"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#D4AF37]/20 bg-[#0a0a0a]/95 backdrop-blur-md">
      <nav className="section-inner flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex gap-1 items-center text-2xl font-bold tracking-wide text-white"
        >
          <div>
            <Image src="/logo.png" alt="logo" width={20} height={20} />
          </div>
          chairfill
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#benefits"
            className="text-sm font-medium text-[#fafafa] hover:text-[#D4AF37]"
          >
            Benefits
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-[#fafafa] hover:text-[#D4AF37]"
          >
            Testimonials
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-[#fafafa] hover:text-[#D4AF37]"
          >
            How it works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-[#fafafa] hover:text-[#D4AF37]"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-[#fafafa] hover:text-[#D4AF37]"
          >
            FAQ
          </Link>
          <Link href="/waitlist" className="cta-primary rounded-full">
            Join waitlist
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[#D4AF37]/20 bg-[#0a0a0a] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="#how-it-works"
              className="py-2 text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="#testimonials"
              className="py-2 text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#benefits"
              className="py-2 text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Benefits
            </Link>
            <Link
              href="#pricing"
              className="py-2 text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="py-2 text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/waitlist"
              className="cta-primary mt-2 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Join waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
