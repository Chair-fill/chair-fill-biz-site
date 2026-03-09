"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  showLinks?: boolean;
}

export default function Navbar({ showLinks = true }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] h-[72px] border-b border-[#C9A84C]/18 bg-[#080808]/92 backdrop-blur-[20px] px-[48px] flex items-center justify-between">
      <nav className="w-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-new.png"
            alt="ChairFill Logo"
            width={140}
            height={44}
            className="h-11 w-auto"
            priority
          />
        </Link>

        {showLinks && (
          <>
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
              <Link
                href="/waitlist"
                className="cta-primary rounded-full px-6 py-2.5 text-sm"
              >
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
          </>
        )}
      </nav>

      {showLinks && mobileOpen && (
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
              className="cta-primary mt-2 text-center py-1 text-sm"
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
