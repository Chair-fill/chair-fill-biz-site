"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const IMG_HERO_ILLUSTRATION =
  "/assets/8f845499-d9e9-44f4-9672-25682e2938c4_removalai_preview.png";

const TITLES = [
  "every chair.",
  "slow days.",
  "no-shows.",
  "lost revenue.",
  "empty slots.",
];

export default function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber((prev) => (prev === TITLES.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearTimeout(id);
  }, [titleNumber]);

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 min-h-[90vh] flex items-center"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.10),transparent)]" />

      <div className="section-inner relative w-full">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          {/* Left: barber illustration */}
          <div className="relative order-2 flex min-h-[260px] justify-center lg:order-1 lg:min-h-[540px] lg:flex-1 lg:justify-start">
            <div className="relative h-[260px] w-full max-w-sm sm:h-[300px] lg:h-[540px] lg:max-w-md scale-x-[-1]">
              <Image
                src={IMG_HERO_ILLUSTRATION}
                alt="Barber illustration"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 400px, 448px"
                unoptimized
              />
            </div>
          </div>

          {/* Right: headline + CTA */}
          <div className="order-1 flex flex-1 flex-col items-center text-center lg:order-2 lg:items-start lg:text-left pt-6">
            {/* Eyebrow tag */}
            <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-sm font-medium text-[#D4AF37] mb-5">
              Built for barbers
            </span>

            {/* Main headline with rotating word */}
            <h1 className="font-bold leading-[1.05] tracking-tight text-white [font-family:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 w-full">
              AI that fills
              {/* Rotating word row */}
              <span className="relative mt-1 flex h-[1.15em] w-full items-center justify-center overflow-hidden lg:justify-start">
                {TITLES.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute text-[#D4AF37] whitespace-nowrap"
                    initial={{ opacity: 0, y: 80 }}
                    animate={
                      titleNumber === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: titleNumber > index ? -80 : 80 }
                    }
                    transition={{ type: "spring", stiffness: 50, damping: 14 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-[#a3a3a3] sm:text-xl mb-8">
              AI that texts your clients on iMessage — reminders, rebooks, and
              fill-ins for last-minute openings. Built for barbers. Coming soon.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/waitlist"
                className="cta-primary inline-flex justify-center"
              >
                Join the waitlist
              </Link>
              <Link
                href="#how-it-works"
                className="cta-secondary inline-flex justify-center"
              >
                See how it works
              </Link>
            </div>

            <p className="mt-4 text-sm text-[#a3a3a3]">
              Be the first to know when we launch. No spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
