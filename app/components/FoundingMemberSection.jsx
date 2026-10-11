"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const TOTAL_SPOTS = 5;

const INCLUDED = [
  "Free for life. No card required.",
  "We handle your full setup and onboarding.",
  "iMessage outreach calibrated to sound like you.",
  "A direct line to the founding team. Your feedback shapes the product.",
  "Founding Member status on your profile, forever.",
];

export default function FoundingMemberSection() {
  const [spotsTaken, setSpotsTaken] = useState(0);

  useEffect(() => {
    // Real count of active founding barbers, no hardcoded floor.
    fetch("/api/spots-taken")
      .then((res) => res.json())
      .then((data) => {
        if (data.spotsTaken !== undefined) {
          setSpotsTaken(Math.min(TOTAL_SPOTS, Math.max(0, data.spotsTaken)));
        }
      })
      .catch((err) => console.error("Error fetching spots:", err));
  }, []);

  const spotsLeft = TOTAL_SPOTS - spotsTaken;

  return (
    <section className="py-24 sm:py-32">
      <div className="section-inner">
        <div className="relative overflow-hidden rounded-[32px] border border-[var(--gold)]/25 bg-[var(--ink-2)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_0%_0%,rgba(212,175,55,0.12),transparent_60%)]"
          />
          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div className="flex flex-col">
              <p className="font-medium text-[var(--gold)]">ChairFill founding members</p>
              <h2 className="tnum mt-4 text-5xl font-black leading-[0.98] tracking-[-0.035em] sm:text-6xl">
                {spotsLeft} free {spotsLeft === 1 ? "spot" : "spots"} left.
              </h2>
              <p className="pretty mt-5 max-w-[42ch] text-lg leading-relaxed text-[var(--text-2)]">
                Free for life. We set everything up for you. If it doesn&apos;t
                bring clients back, walk away. Nothing owed.
              </p>
              <div className="mt-10 lg:mt-auto lg:pt-10">
                <Link href="/founding-member" className="cta-primary group gap-2">
                  Claim your free spot
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  />
                </Link>
                <p className="mt-4 text-sm text-[var(--text-3)]">
                  When the 5 spots are gone, this offer is gone.
                </p>
              </div>
            </div>

            <div className="lg:border-l lg:border-[var(--line)] lg:pl-16">
              <h3 className="text-lg font-semibold">What founding members get</h3>
              <ul className="mt-6 space-y-5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-relaxed">
                    <Check aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-[var(--gold)]" strokeWidth={2.5} />
                    <span className="text-[var(--text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
