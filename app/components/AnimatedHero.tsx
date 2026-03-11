"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUp, Camera, Mic, LayoutGrid, ArrowRight } from "lucide-react";

const IMG_HERO_ILLUSTRATION =
  "/assets/8f845499-d9e9-44f4-9672-25682e2938c4_removalai_preview.png";

export default function AnimatedHero() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 min-h-[90vh] flex items-center"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(212,160,23,0.07)_0%,transparent_70%)]" />

      <div className="section-inner relative w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Phone Visual */}
          <div className="relative order-2 flex justify-center lg:order-1 items-center">
            <div className="absolute w-[300px] h-[300px] bg-[#D4AF37]/15 rounded-full blur-[40px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                delay: 0.2,
              }}
              className="relative z-10 w-[300px] sm:w-[340px] min-h-[620px] bg-[#1A1A1A] rounded-[48px] p-3.5 border border-[#2A2A2A] shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col"
            >
              {/* Phone Top / Notch */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto mb-4 shrink-0" />

              {/* Chat Header */}
              <div className="flex items-center gap-3 mb-6 px-1.5 shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6914] flex items-center justify-center font-bold text-sm text-black shrink-0 shadow-lg">
                  CF
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white [font-family:var(--font-syne)] leading-none mb-0.5">
                    Marcus (your AI)
                  </div>
                  <div className="text-[10px] text-[#888880] font-medium tracking-wide">
                    Texting 12 clients now
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 flex flex-col gap-3 p-1.5 overflow-hidden">
                <div className="self-start max-w-[85%] bg-[#1D86EA] text-white p-3 rounded-[20px] rounded-bl-[4px] text-[13px] leading-relaxed shadow-sm">
                  Yo Marcus, long time! Had a slot open Saturday at 2pm. You
                  tryna slide through?
                </div>
                <div className="text-[10px] text-[#888880] text-center my-0.5 select-none font-medium">
                  Delivered · 11:42 AM
                </div>

                <div className="self-end max-w-[85%] bg-[#3A3A3C] text-white p-3 rounded-[20px] rounded-br-[4px] text-[13px] leading-relaxed shadow-sm">
                  Bro yes I been needing a cut 🤝 Lock me in
                </div>
                <div className="text-[10px] text-[#888880] text-center my-0.5 select-none font-medium">
                  11:44 AM
                </div>

                <div className="self-start max-w-[85%] bg-[#1D86EA] text-white p-3 rounded-[20px] rounded-bl-[4px] text-[13px] leading-relaxed shadow-sm">
                  Done ✅ You&apos;re booked. See you Saturday at 2.
                </div>
                <div className="text-[10px] text-[#888880] text-center mt-1 select-none font-medium">
                  Delivered · 11:44 AM
                </div>

                <div className="flex gap-1 items-center bg-[#3A3A3C] p-3 rounded-[20px] rounded-br-[4px] w-fit self-end mt-1 shadow-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#888880] animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[#888880] animate-pulse [animation-delay:0.2s]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[#888880] animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>

              {/* iMessage Input Bar */}
              <div className="mt-auto px-1 pb-2 shrink-0">
                <div className="flex items-center gap-2 text-[#888880]">
                  <Camera className="w-5 h-5 shrink-0 hover:text-white transition-colors cursor-pointer" />
                  <LayoutGrid className="w-5 h-5 shrink-0 hover:text-white transition-colors cursor-pointer" />
                  <div className="flex-1 h-9 bg-[#1c1c1e] border border-white/5 rounded-full px-4 flex items-center justify-between">
                    <span className="text-[13px] text-[#888880]">iMessage</span>
                    <div className="h-6 w-6 rounded-full bg-[#1D86EA] flex items-center justify-center shrink-0">
                      <ArrowUp className="w-4 h-4 text-white stroke-[3px]" />
                    </div>
                  </div>
                  <Mic className="w-5 h-5 shrink-0 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-[10px] lg:text-xs font-medium text-[#D4AF37] uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              Now accepting barbers. Launching soon.
            </div>

            <h1 className="hero-headline font-bold leading-[1.0] tracking-tight text-white [font-family:var(--font-syne)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 w-full">
              Stop letting
              <br />
              quiet clients
              <span className="block text-[#D4AF37]">kill your income.</span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-[#888880] mb-10 [font-family:var(--font-satoshi)] font-light">
              They haven&apos;t left. They just went quiet.{" "}
              <strong className="text-white font-medium">
                ChairFill reactivates them on iMessage
              </strong>{" "}
              automatically while you stay behind the chair.
              <br />
              <br />
              No apps for them to download. No ads to run. Just more bookings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/waitlist"
                className="cta-primary inline-flex justify-center group"
              >
                Join the waitlist
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="cta-secondary inline-flex justify-center"
              >
                See how it works
              </Link>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#888880]">
              <div className="flex -space-x-2">
                <div className="h-9 w-9 rounded-full border-2 border-[#141414] bg-gradient-to-br from-[#D4AF37] to-[#8B6914] flex items-center justify-center font-bold text-black shadow-lg">
                  JD
                </div>
                <div className="h-9 w-9 rounded-full border-2 border-[#141414] bg-[#444] flex items-center justify-center font-bold text-white shadow-lg">
                  MT
                </div>
                <div className="h-9 w-9 rounded-full border-2 border-[#141414] bg-[#555] flex items-center justify-center font-bold text-white shadow-lg">
                  RK
                </div>
              </div>
              <span className="uppercase tracking-widest font-medium">
                150+ barbers on the waitlist. Be first in line.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
