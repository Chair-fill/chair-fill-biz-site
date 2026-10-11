"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useSpotsLeft } from "./SpotsLeft";

const HERO_PHOTO = "/assets/obi--sRVfY0f2d8-unsplash.jpg";

// Read from the barber's phone: his texts are outgoing (blue, right),
// the client's replies are incoming (gray, left).
const THREAD = [
  { from: "barber", text: "Dre! Been a minute. I got a 2pm open Saturday if you tryna slide through." },
  { from: "client", text: "Bro yes, I been needing a cut. Lock me in 🤝" },
  { from: "barber", text: "Done. You're booked Saturday at 2." },
] as const;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function AnimatedHero() {
  const spotsLeft = useSpotsLeft();
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-14 lg:pt-20 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_55%_at_78%_20%,rgba(212,175,55,0.10),transparent_70%)]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="balance font-black tracking-[-0.035em] leading-[0.98] text-[var(--text)] text-[clamp(2.6rem,5.4vw,4.25rem)]">
          <span className="block">Your old clients aren&apos;t gone.</span>
          <span className="block text-[var(--gold)]">They just need a text.</span>
        </h1>

        <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5 lg:pt-2">
            <p className="pretty max-w-[38ch] text-lg leading-relaxed text-[var(--text-2)] sm:text-xl">
              ChairFill texts the clients who stopped booking, in your voice,
              and books them back.{" "}
              <span className="text-[var(--gold)] tnum">
                {spotsLeft} of 5 free founding spots left.
              </span>
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/founding-member" className="cta-primary group gap-2">
                Claim your free spot
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </Link>
              <Link href="#text-demo" className="cta-secondary">
                Text yourself the demo
              </Link>
            </div>
          </div>

          <figure className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[var(--ink-3)] sm:aspect-[5/4] lg:aspect-[6/5]">
              <Image
                src={HERO_PHOTO}
                alt="A barber in a white sweater and gold chain lines up a client's curly top fade"
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-[50%_28%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(11,10,8,0.55)_68%,rgba(11,10,8,0.9)_100%)]"
              />

              <div
                className="absolute inset-x-4 bottom-4 ml-auto flex max-w-[330px] flex-col gap-2 sm:inset-x-6 sm:bottom-6"
                aria-label="Example text thread sent by ChairFill"
              >
                {THREAD.map((m, i) => (
                  <motion.div
                    key={m.text}
                    initial={reduce ? false : { opacity: 0, transform: "translateY(10px) scale(0.96)" }}
                    animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                    transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.5 + i * 0.85 }}
                    className={
                      m.from === "barber"
                        ? "self-end max-w-[88%] origin-bottom-right rounded-[20px] rounded-br-[6px] bg-[#1D86EA] px-3.5 py-2.5 text-[14px] leading-snug text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]"
                        : "self-start max-w-[88%] origin-bottom-left rounded-[20px] rounded-bl-[6px] bg-[#3A3A3C]/95 px-3.5 py-2.5 text-[14px] leading-snug text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]"
                    }
                  >
                    {m.text}
                  </motion.div>
                ))}
                <motion.span
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + THREAD.length * 0.85 }}
                  className="self-end pr-1 text-[11px] font-medium text-white/70"
                >
                  Delivered
                </motion.span>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
