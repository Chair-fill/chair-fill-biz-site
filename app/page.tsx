import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import AnimateIn from "./components/AnimateIn";
import FAQ from "./components/FAQ";

// ── Three new components ───────────────────────────────────────────────────────
import AnimatedHero from "./components/AnimatedHero"; // replaces static hero
import TestimonialsSection from "./components/TestimonialsSection"; // replaces single testimonial card
import PricingSection from "./components/PricingSection"; // replaces static pricing

const IMG_CHAIR =
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80";
const IMG_BARBER =
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80";
const IMG_BARBER_2 =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80";
const IMG_BARBER_1 = "/assets/nate-johnston-tgPrIYnW3g4-unsplash.jpg";
const IMG_HAIRCUT = "/assets/obi--sRVfY0f2d8-unsplash.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* ── HERO — animated rotating words (replaces static hero) ── */}
      <AnimatedHero />

      {/* ── WAITLIST SOCIAL PROOF BAR ── */}
      <section className="border-y border-[#D4AF37]/20 bg-[#141414] py-8">
        <div className="section-inner">
          <p className="text-center text-sm font-medium text-[#a3a3a3]">
            Join barbers on the waitlist. Be first in line when we launch.
          </p>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="benefits" className="py-20 sm:py-24">
        <div className="section-inner">
          <AnimateIn>
            <h2 className="text-center text-4xl font-normal tracking-tight text-white sm:text-5xl [font-family:var(--font-bebas)]">
              Why barbers choose ChairFill
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-[#a3a3a3]">
              Built for the chair. AI outreach on iMessage—where your clients
              actually read and reply.
            </p>
          </AnimateIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "iMessage = real replies",
                desc: "98% open rate. Your clients read and respond.",
                icon: "💬",
              },
              {
                title: "AI that sounds like you",
                desc: "Personalized messages, rebooks, fill-ins. No robotic scripts.",
                icon: "🤖",
              },
              {
                title: "Fill your chair",
                desc: "Fewer no-shows. Last-minute openings get filled.",
                icon: "💰",
              },
              {
                title: "Set it and forget it",
                desc: "Reminders and rebooking on autopilot.",
                icon: "⚡",
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="card-modern p-8">
                <span className="text-3xl" role="img" aria-hidden>
                  {icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#a3a3a3]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="py-20 sm:py-24">
        <div className="section-inner">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-center">
            <AnimateIn direction="left">
              <h2 className="text-3xl font-normal tracking-tight text-white sm:text-4xl [font-family:var(--font-bebas)]">
                Empty chair = lost money. Manual texts don&apos;t scale.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#a3a3a3]">
                No-shows and last-minute cancellations leave your chair empty.
                You&apos;re busy cutting—you don&apos;t have time to chase every
                client by text.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Hours spent texting reminders and rebooking",
                  "Clients forget or ghost—empty chairs",
                  "No way to fill last-minute openings",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-white">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-black">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>

            <AnimateIn
              direction="right"
              delay={150}
              className="relative flex min-h-[280px] justify-center sm:min-h-[360px] md:min-h-[420px] lg:min-h-[520px] lg:justify-end"
            >
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[520px]">
                <div className="absolute left-1/2 top-0 z-0 h-[32%] w-[32%] -translate-x-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-lg">
                  <Image
                    src={IMG_BARBER}
                    alt="Barber at work"
                    fill
                    className="object-cover"
                    sizes="170px"
                  />
                </div>
                <div className="absolute right-0 top-1/2 z-10 h-[42%] w-[42%] -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-xl">
                  <Image
                    src={IMG_CHAIR}
                    alt="Barber chair"
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 z-10 h-[38%] w-[38%] -translate-x-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-xl">
                  <Image
                    src={IMG_BARBER_2}
                    alt="Barber"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <div className="absolute left-0 top-1/2 z-0 h-[30%] w-[30%] -translate-y-1/2 overflow-hidden rounded-xl border-2 border-white shadow-lg">
                  <Image
                    src={IMG_BARBER_1}
                    alt="Client"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 z-20 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-2xl ring-2 ring-[#D4AF37]/25">
                  <Image
                    src={IMG_HAIRCUT}
                    alt="Haircut"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#141414] py-20 sm:py-24">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
            {[
              { num: "3x", label: "Higher conversion vs email" },
              { num: "98%", label: "iMessage open rate" },
              { num: "$2M+", label: "Revenue recovered" },
            ].map(({ num, label }, i) => (
              <AnimateIn key={num} delay={i * 100}>
                <div className="text-center">
                  <div className="text-5xl font-bold tabular-nums text-[#D4AF37] sm:text-6xl [font-family:var(--font-bebas)]">
                    {num}
                  </div>
                  <div className="mt-3 text-sm font-medium text-[#a3a3a3]">
                    {label}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-[#D4AF37] py-16 sm:py-20">
        <div className="section-inner">
          <AnimateIn>
            <h2 className="text-center text-4xl font-normal tracking-tight text-white sm:text-5xl [font-family:var(--font-bebas)]">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-white/90">
              Connect your client list. Our AI does the rest—reminders, rebooks,
              and fill-ins via iMessage.
            </p>
          </AnimateIn>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Add your clients",
                desc: "Connect your client list or booking system. We sync with your schedule and openings.",
              },
              {
                step: "2",
                title: "AI texts on iMessage",
                desc: "Our AI sends reminders, rebooks no-shows, and fills last-minute slots—human-sounding messages that get replies.",
              },
              {
                step: "3",
                title: "Fill your chair",
                desc: "Fewer empty chairs. More appointments. We handle outreach; you stay behind the chair.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="rounded-2xl border border-black/20 bg-black/20 p-8 backdrop-blur-sm transition-all hover:bg-black/30"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-[#B8962E] [font-family:var(--font-bebas)]">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/90">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — animated scrolling columns (replaces single quote card) ── */}
      <TestimonialsSection />

      {/* ── PRICING — monthly/annual toggle with confetti (replaces static grid) ── */}
      <PricingSection />

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-24">
        <div className="section-inner">
          <AnimateIn>
            <h2 className="text-center text-4xl font-normal tracking-tight text-white sm:text-5xl [font-family:var(--font-bebas)]">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-[#a3a3a3]">
              Everything you need to know about ChairFill.
            </p>
          </AnimateIn>
          <AnimateIn delay={100} className="mt-12">
            <FAQ />
          </AnimateIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="cta" className="bg-[#D4AF37] py-20 sm:py-24">
        <div className="section-inner text-center">
          <AnimateIn>
            <h2 className="text-4xl font-normal tracking-tight text-white sm:text-5xl [font-family:var(--font-bebas)]">
              Ready to fill every chair?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/95">
              Join the waitlist. We will notify you at launch—and you will be
              first in line.
            </p>
            <div className="mt-8">
              <Link
                href="/waitlist"
                className="cta-secondary inline-flex justify-center border-black bg-black text-[#D4AF37] hover:bg-black/90 hover:text-[#E8C547]"
              >
                Join the waitlist
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#D4AF37]/20 bg-[#0a0a0a] py-12">
        <div className="section-inner">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="#"
              className="text-xl font-bold tracking-wide text-white"
            >
              chairfill
            </Link>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-white/80">
              <Link
                href="/waitlist"
                className="transition-colors hover:text-white"
              >
                Join waitlist
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-white/50">
            © {new Date().getFullYear()} ChairFill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
