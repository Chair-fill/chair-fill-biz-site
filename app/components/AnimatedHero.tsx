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

            {/* Phone Visual with realistic 3D frame */}
            <div className="relative z-10 [perspective:2000px]">
              {/* Outer Case / 3D Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40, rotateY: -6, rotateX: 2 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -20, 0],
                  rotateY: -6,
                  rotateX: 2,
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
                className="relative w-[300px] sm:w-[320px] aspect-[1/2] bg-[#050505] rounded-[55px] p-1.5 border-[4px] border-[#2A2A2A] shadow-[15px_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1),-1px_0_10px_rgba(212,175,55,0.02)] flex flex-col overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 3D Depth Layer (Side Thickness) - Cleaner, less blurred */}
                <div className="absolute -right-[2px] top-[5%] h-[90%] w-[6px] bg-gradient-to-b from-[#111] via-[#2A2A2A] to-[#111] rounded-r-[55px] -z-10 opacity-90" />

                {/* Internal Bezel */}
                <div className="absolute inset-0 rounded-[48px] border-[8px] border-black/90 pointer-events-none z-50 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]" />

                {/* Side Buttons (Refined for 3D) */}
                <div className="absolute -left-[6px] top-28 w-[3px] h-8 bg-[#2A2A2A] rounded-l-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.1)]" /> {/* Silent Switch */}
                <div className="absolute -left-[6px] top-40 w-[3px] h-14 bg-[#2A2A2A] rounded-l-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.1)]" /> {/* Vol Up */}
                <div className="absolute -left-[6px] top-56 w-[3px] h-14 bg-[#2A2A2A] rounded-l-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.1)]" /> {/* Vol Down */}
                <div className="absolute -right-[6px] top-44 w-[4px] h-20 bg-[#3A3A3A] rounded-r-sm shadow-[1px_2px_4px_rgba(0,0,0,0.8)] z-10" /> {/* Power Button */}

                {/* Screen Glow / Inner Atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,160,23,0.08)_0%,transparent_70%)] pointer-events-none" />

                {/* Moving Glass Reflection */}
                <motion.div 
                  animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent bg-[length:200%_100%]" 
                />

                {/* Screen Content */}
                <div className="relative flex-1 bg-[#1A1A1A] rounded-[42px] overflow-hidden flex flex-col p-3 pt-6">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[60] flex items-center justify-center border border-white/5 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] ml-auto mr-4 shadow-inner" />
                  </div>

                  {/* Chat Header - Fixed Spacing */}
                  <div className="flex items-center gap-3 mb-6 px-1.5 shrink-0 mt-10">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6914] flex items-center justify-center font-bold text-sm text-black shrink-0 shadow-[0_4px_10px_rgba(212,175,55,0.3)]">
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
                      Done ✅ You're booked. See you Saturday at 2.
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
                  <div className="mt-auto px-1 pb-4 shrink-0">
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
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-[10px] lg:text-xs font-medium text-[#D4AF37] uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              Now accepting barbers. Launching soon.
            </div>

            <h1 className="hero-headline font-bold leading-[1.0] tracking-tight text-white [font-family:var(--font-syne)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 w-full">
              Your old clients
              <br />
              aren't gone.
              <span className="block text-[#D4AF37]">They just need a text.</span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-[#888880] mb-10 [font-family:var(--font-satoshi)] font-light">
              Your booking software is a waiting room. ChairFill is a revenue recovery machine. 
              There are clients in your phone right now who haven't booked in months — ChairFill goes and gets them back, automatically.
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
