"use client";

import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

// ─── Barber testimonials ─────────────────────────────────────────────────────
const testimonials = [
  {
    text: "I got like 6 clients I haven't seen in months. If this thing could just bring them back without me having to do anything, that's money I wasn't even thinking about.",
    initials: "DW",
    name: "Darnell W.",
    role: "Independent barber in Atlanta",
  },
  {
    text: "I was skeptical about it not sounding robotic. But when they showed me the messages, I was like, &quot;bro, I would&apos;ve sent that exact text.&quot; That&apos;s what sold me.",
    initials: "MT",
    name: "Marcus T.",
    role: "Booth renter in Houston",
  },
  {
    text: "Empty slots are literally just lost money. If I can automate chasing people down with a $50/month tool, that's the easiest ROI I've ever seen.",
    initials: "JR",
    name: "Jordan R.",
    role: "Shop owner in Tampa",
  },
];

// ─── Single animated column. Direct port of TestimonialsColumn. ──────────────
function TestimonialsColumn({
  className,
  testimonials: items,
  duration = 10,
}: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-[#0a0a0a]"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {items.map(({ text, name, role, initials }, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-[#D4AF37]/20 shadow-lg shadow-black/30 max-w-xs w-full bg-[#141414]"
                >
                  <div className="flex gap-1 text-[#D4AF37] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-[#d4d4d4] italic mb-6">
                    &quot;{text}&quot;
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#8B6914]/20 border border-[#D4AF37]/30 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                      {initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium tracking-tight leading-5 text-white text-sm">
                        {name}
                      </span>
                      <span className="leading-5 text-[#a3a3a3] tracking-tight text-xs">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
}

// ─── Full section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-24 overflow-hidden">
      <div className="section-inner">
        {/* Header. Matches site section header style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12"
        >
          <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-sm font-medium text-[#D4AF37] mb-4">
            From barbers on the waitlist
          </span>
          <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)]">
            Real talk, straight from the chair.
          </h2>
        </motion.div>

        {/* Columns. Fade mask matches source demo exactly */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={testimonials} duration={15} />
          <TestimonialsColumn
            testimonials={testimonials}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={testimonials}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
