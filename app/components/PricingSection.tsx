"use client";

/**
 * PricingSection — adapted from pricing.tsx prompt
 *
 * Source uses: framer-motion, shadcn Switch/Label, canvas-confetti, @number-flow/react
 * Adapted to:
 *   - motion/react (already in project via AnimatedHero)
 *   - No shadcn — custom toggle built with Tailwind + motion
 *   - canvas-confetti (new dep — install with: npm install canvas-confetti)
 *   - No @number-flow/react — plain animated number with motion key trick
 *   - ChairFill gold/dark tokens throughout
 * Import path for devs: app/components/PricingSection.tsx
 */

import { useState, useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";

// ─── ChairFill plan data ──────────────────────────────────────────────────────
const plans = [
  {
    name: "The Independent",
    price: 147,
    yearlyPrice: 117,
    period: "per month",
    features: [
      "AI outreach via iMessage",
      "Reminders, rebooks & fill-ins",
      "Single chair / one barber",
      "Dashboard & analytics",
      "Email support",
    ],
    description:
      "Essential automation for the solo barber building their own book.",
    buttonText: "Join waitlist for discount",
    href: "/waitlist",
    isPopular: false,
    comingSoon: false,
  },
  {
    name: "The Professional",
    price: 247,
    yearlyPrice: 197,
    period: "per month",
    features: [
      "Everything in Independent",
      "Higher message volume",
      "Priority rebooks & fill-ins",
      "Advanced analytics",
      "Priority support",
    ],
    description: "Best value for the high-volume barber or booth renter.",
    buttonText: "Join waitlist for discount",
    href: "/waitlist",
    isPopular: true,
    comingSoon: false,
  },
  {
    name: "The Shop Owner",
    price: null,
    yearlyPrice: null,
    period: "Contact us",
    features: [
      "Everything in Professional",
      "Multi-chair & multi-barber",
      "Team management",
      "Shop-wide analytics",
      "Dedicated onboarding",
    ],
    description: "Management for the whole team and multi-chair analytics.",
    buttonText: "Join waitlist",
    href: "/waitlist",
    isPopular: false,
    comingSoon: true,
  },
];

// ─── Animated price — key swap triggers motion re-enter ───────────────────────
function AnimatedPrice({
  value,
  isMonthly,
}: {
  value: number | null;
  isMonthly: boolean;
}) {
  if (value === null) {
    return (
      <span className="text-4xl font-bold text-white [font-family:var(--font-satoshi)]">
        Custom
      </span>
    );
  }
  return (
    <motion.span
      key={`${value}-${isMonthly}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="text-5xl font-bold tabular-nums text-white [font-family:var(--font-satoshi)]"
    >
      ${value}
    </motion.span>
  );
}

// ─── Full section ─────────────────────────────────────────────────────────────
export default function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);

  function handleToggle() {
    const goingAnnual = isMonthly; // we're about to flip to annual
    setIsMonthly(!isMonthly);

    // Confetti only when switching TO annual — celebrate the saving
    if (goingAnnual && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#D4AF37", "#E8C547", "#B8962E", "#fafafa"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  }

  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="section-inner">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)]">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-[#a3a3a3]">
            Plans for every barber — solo to shop owner. Join the waitlist for
            early access and launch pricing.
          </p>
        </div>

        {/* Monthly / Annual toggle — custom, no shadcn Switch */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span
            className={`text-sm font-medium transition-colors duration-200 ${isMonthly ? "text-white" : "text-[#a3a3a3]"}`}
          >
            Monthly
          </span>

          <button
            ref={switchRef}
            onClick={handleToggle}
            aria-label="Toggle annual billing"
            className={`relative h-7 w-12 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
              !isMonthly
                ? "border-[#D4AF37] bg-[#D4AF37]"
                : "border-[#D4AF37]/40 bg-[#141414]"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`absolute top-1 h-5 w-5 rounded-full ${
                !isMonthly ? "bg-black left-6" : "bg-[#D4AF37] left-1"
              }`}
            />
          </button>

          <span
            className={`text-sm font-medium transition-colors duration-200 ${!isMonthly ? "text-white" : "text-[#a3a3a3]"}`}
          >
            Annual{" "}
            <span className="text-[#D4AF37] font-semibold">(Save 20%)</span>
          </span>
        </div>

        {/* Cards — animation matches source pricing.tsx motion */}
        <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                plan.isPopular ? { y: -8, opacity: 1 } : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: index * 0.1 + 0.4,
              }}
              className={`relative flex flex-col rounded-3xl p-8 sm:p-10 transition-all ${
                plan.isPopular
                  ? "border-2 border-[#D4AF37] bg-[#141414] shadow-xl shadow-[#D4AF37]/10"
                  : "card-modern"
              }`}
            >
              {/* Most popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4AF37] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Coming soon badge */}
              {plan.comingSoon && (
                <span className="mb-4 inline-block w-fit rounded-full border border-[#a3a3a3]/30 bg-[#a3a3a3]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">
                  Coming Soon
                </span>
              )}

              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-[#a3a3a3]">{plan.description}</p>

              {/* Animated price */}
              <div className="mt-6 flex items-baseline gap-1">
                <AnimatedPrice
                  value={isMonthly ? plan.price : plan.yearlyPrice}
                  isMonthly={isMonthly}
                />
                {plan.price !== null && (
                  <span className="text-[#a3a3a3]">/ {plan.period}</span>
                )}
              </div>
              {plan.price !== null && (
                <p className="mt-1 text-xs text-[#a3a3a3]">
                  {isMonthly ? "billed monthly" : "billed annually"}
                </p>
              )}

              {/* Features */}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <Check className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                    <span className="text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Link
                href={plan.href}
                className={`mt-8 inline-block w-full rounded-full py-4 text-center text-sm font-semibold transition-all duration-200 ${
                  plan.isPopular
                    ? "cta-primary"
                    : "border-2 border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
