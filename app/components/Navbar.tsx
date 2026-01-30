"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#e5e4e0]/60 bg-[#F8F7F5]/95 backdrop-blur-md">
      <nav className="section-inner flex items-center justify-between py-4">
        <Link
          href="#"
          className="text-2xl font-bold tracking-wide text-[#1a1a1a]"
        >
          chairfill
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#benefits"
            className="text-sm font-medium text-[#1a1a1a] hover:text-[#cd1c18]"
          >
            Benefits
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-[#1a1a1a] hover:text-[#cd1c18]"
          >
            Testimonials
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-[#1a1a1a] hover:text-[#cd1c18]"
          >
            How it works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-[#1a1a1a] hover:text-[#cd1c18]"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-[#1a1a1a] hover:text-[#cd1c18]"
          >
            FAQ
          </Link>
          <Link href="https://app.chairfill.co" className="cta-primary rounded-full" target="_blank" rel="noopener noreferrer">
            Join now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#1a1a1a] hover:bg-black/5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[#e5e4e0]/60 bg-[#F8F7F5] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link href="#how-it-works" className="py-2 text-sm font-medium text-[#1a1a1a]" onClick={() => setMobileOpen(false)}>How it works</Link>
            <Link href="#testimonials" className="py-2 text-sm font-medium text-[#1a1a1a]" onClick={() => setMobileOpen(false)}>Testimonials</Link>
            <Link href="#benefits" className="py-2 text-sm font-medium text-[#1a1a1a]" onClick={() => setMobileOpen(false)}>Benefits</Link>
            <Link href="#pricing" className="py-2 text-sm font-medium text-[#1a1a1a]" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="#faq" className="py-2 text-sm font-medium text-[#1a1a1a]" onClick={() => setMobileOpen(false)}>FAQ</Link>
            <Link href="https://app.chairfill.co" className="cta-primary mt-2 text-center" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Join now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
