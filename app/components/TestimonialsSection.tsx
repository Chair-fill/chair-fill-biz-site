"use client";

/**
 * TestimonialsSection — adapted from testimonials-columns-1.tsx
 *
 * Source uses: motion/react (NOT framer-motion), no shadcn
 * Adapted to: ChairFill dark/gold theme, existing CSS tokens, barber-specific copy
 * Import path for devs: app/components/TestimonialsSection.tsx
 */

import React from "react";
import { motion } from "motion/react";

// ─── Barber testimonials ─────────────────────────────────────────────────────
const testimonials = [
  {
    text: "No-shows dropped by half. ChairFill texts my clients when I get a cancellation and fills the slot in minutes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    name: "Marcus Johnson",
    role: "Owner, Fade & Co",
  },
  {
    text: "I was skeptical about automation but the messages sound exactly like me. Clients reply naturally — they have no idea it's AI.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    name: "DeShawn Williams",
    role: "Barber, Solo Suite",
  },
  {
    text: "Used to spend 30 minutes every morning texting reminders. Now I just cut hair. ChairFill handles everything else.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    name: "Carlos Rivera",
    role: "Owner, The Lineup Barbershop",
  },
  {
    text: "Filled 4 last-minute openings the first week. That's money I would have lost sitting in an empty chair.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&q=80",
    name: "James Carter",
    role: "Barber, Kings Cut",
  },
  {
    text: "My clients actually save the contact and reply. Blue bubbles make all the difference — feels like a real text from the shop.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    name: "Tyrone Brooks",
    role: "Owner, Fresh Edge Studio",
  },
  {
    text: "Setup took 10 minutes. I connected my client list and it just started working. Best tool I've added to my shop.",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=100&q=80",
    name: "Andre Mitchell",
    role: "Barber, Clean Cuts",
  },
  {
    text: "I have 3 chairs in my shop. ChairFill keeps all of them full on slow days. Worth every dollar.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=100&q=80",
    name: "Raymond Hughes",
    role: "Owner, Sharp & Clean",
  },
  {
    text: "The messages are casual and real. Never sounds like a blast text. My regulars think I'm personally reaching out.",
    image: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=100&q=80",
    name: "Kevin Thomas",
    role: "Barber, The Chair Room",
  },
  {
    text: "Revenue is up 20% since I started. The slow-day fills alone pay for the subscription three times over.",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
    name: "Isaiah Patel",
    role: "Owner, Precision Cuts",
  },
];

const firstColumn  = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn  = testimonials.slice(6, 9);

// ─── Single animated column — direct port of TestimonialsColumn ──────────────
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
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6 bg-[#0a0a0a]"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {items.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-[#D4AF37]/20 shadow-lg shadow-black/30 max-w-xs w-full bg-[#141414]"
              >
                <p className="text-sm leading-relaxed text-[#d4d4d4]">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border border-[#D4AF37]/30"
                  />
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
        ))]}
      </motion.div>
    </div>
  );
}

// ─── Full section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-24 overflow-hidden">
      <div className="section-inner">

        {/* Header — matches site section header style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12"
        >
          <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-sm font-medium text-[#D4AF37] mb-4">
            What barbers say
          </span>
          <h2 className="text-center text-4xl font-normal tracking-tight text-white sm:text-5xl [font-family:var(--font-bebas)]">
            Real barbers. Real results.
          </h2>
          <p className="text-center mt-3 text-lg text-[#a3a3a3]">
            From solo suites to multi-chair shops — barbers filling chairs they used to leave empty.
          </p>
        </motion.div>

        {/* Columns — fade mask matches source demo exactly */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>

      </div>
    </section>
  );
}
