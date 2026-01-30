import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import AnimateIn from "./components/AnimateIn";
import FAQ from "./components/FAQ";

const SIGNUP_URL = "https://app.chairfill.co";

const IMG_HERO_ILLUSTRATION = "/assets/8f845499-d9e9-44f4-9672-25682e2938c4_removalai_preview.png";
const IMG_CHAIR = "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80";
const IMG_BARBER = "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80";
const IMG_TESTIMONIAL = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";
const IMG_BARBER_2 = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80";
const IMG_BARBER_1 = "/assets/nate-johnston-tgPrIYnW3g4-unsplash.jpg";
const IMG_HAIRCUT = "/assets/obi--sRVfY0f2d8-unsplash.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <Navbar />

      {/* Hero — images on left, content on right (flex) */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(205,28,24,0.08),transparent)]" />
        <div className="section-inner relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          {/* Left: barber illustration */}
          <div className="relative order-2 flex min-h-[280px] justify-center lg:order-1 lg:min-h-[560px] lg:flex-1 lg:justify-start">
            <div className="relative h-[280px] w-full max-w-sm sm:h-[320px] lg:h-[560px] lg:max-w-md scale-x-[-1]">
              <Image src={IMG_HERO_ILLUSTRATION} alt="Barber illustration" fill className="object-contain object-center" sizes="(max-width: 1024px) 400px, 448px" unoptimized />
            </div>
          </div>
          {/* Right: headline + form */}
          <div className="order-1 flex flex-1 flex-col items-center text-center lg:order-2 lg:items-start lg:text-left pt-8">
            <span className="inline-block rounded-full border border-[#cd1c18]/20 bg-[#cd1c18]/05 px-4 py-1.5 text-sm font-medium text-[#cd1c18]">
              Built for barbers
            </span>
            <h1 className="mt-4 font-bold leading-[1.1] tracking-tight text-[#1a1a1a] [font-family:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Fill every chair.
            <span className="block text-[#cd1c18]">Recover lost revenue.</span>
          </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#4a4a4a] sm:text-xl">
            Our AI chatbot reaches your clients on iMessage—reminders, rebooks, and fill-ins for last-minute openings. Your chair stays full; you stay behind the chair.
          </p>
            <div className="mt-8">
            <Link href={SIGNUP_URL} className="cta-primary inline-flex justify-center" target="_blank" rel="noopener noreferrer">
              Join now
            </Link>
          </div>
            <p className="mt-4 text-sm text-[#4a4a4a]">
              Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Trusted by — refined strip */}
      <section className="border-y border-[#e5e4e0] bg-white py-8">
        <div className="section-inner">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#4a4a4a]">
            Trusted by barbers & barbershops
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["Fade & Co", "The Cut", "Chair King", "Prime Cuts", "Uptown Barbers"].map((name) => (
              <span key={name} className="text-base font-semibold text-[#1a1a1a]/80 transition-colors hover:text-[#1a1a1a]">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Benefits — grid, hover cards */}
      <section id="benefits" className="py-20 sm:py-24">
        <div className="section-inner">
          <AnimateIn>
            <h2 className="text-center text-4xl font-normal tracking-tight text-[#1a1a1a] sm:text-5xl [font-family:var(--font-bebas)]">
              Why barbers choose ChairFill
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-[#4a4a4a]">
              Built for the chair. AI outreach on iMessage—where your clients actually read and reply.
            </p>
          </AnimateIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "iMessage = real replies", desc: "98% open rate. Your clients read and respond.", icon: "💬" },
              { title: "AI that sounds like you", desc: "Personalized messages, rebooks, fill-ins. No robotic scripts.", icon: "🤖" },
              { title: "Fill your chair", desc: "Fewer no-shows. Last-minute openings get filled.", icon: "💰" },
              { title: "Set it and forget it", desc: "Reminders and rebooking on autopilot.", icon: "⚡" },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="card-modern p-8">
                <span className="text-3xl" role="img" aria-hidden>{icon}</span>
                <h3 className="mt-4 text-lg font-bold text-[#1a1a1a]">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4a4a4a]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution — flex + absolute image overlapping card */}
      <section className="py-20 sm:py-24">
        <div className="section-inner">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-center">
            <AnimateIn direction="left">
              <h2 className="text-3xl font-normal tracking-tight text-[#1a1a1a] sm:text-4xl [font-family:var(--font-bebas)]">
                Empty chair = lost money. Manual texts don’t scale.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#4a4a4a]">
                No-shows and last-minute cancellations leave your chair empty. You’re busy cutting—you don’t have time to chase every client by text.
              </p>
              <ul className="mt-8 space-y-4">
                {["Hours spent texting reminders and rebooking", "Clients forget or ghost—empty chairs", "No way to fill last-minute openings"].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-[#1a1a1a]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#cd1c18] text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="font-medium text-[#1a1a1a]">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
            {/* Right column: 5 images — center focal + 4 at edges, different scales */}
            <AnimateIn direction="right" delay={150} className="relative flex min-h-[280px] justify-center sm:min-h-[360px] md:min-h-[420px] lg:min-h-[520px] lg:justify-end">
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[520px]">
                {/* Top edge — smallest */}
                <div className="absolute left-1/2 top-0 z-0 h-[32%] w-[32%] -translate-x-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-lg">
                  <Image src={IMG_BARBER} alt="Barber at work" fill className="object-cover" sizes="170px" />
                </div>
                {/* Right edge — medium */}
                <div className="absolute right-0 top-1/2 z-10 h-[42%] w-[42%] -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-xl">
                  <Image src={IMG_CHAIR} alt="Barber chair" fill className="object-cover" sizes="220px" />
                </div>
                {/* Bottom edge — medium */}
                <div className="absolute bottom-0 left-1/2 z-10 h-[38%] w-[38%] -translate-x-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-xl">
                  <Image src={IMG_BARBER_2} alt="Barber" fill className="object-cover" sizes="200px" />
                </div>
                {/* Left edge — small */}
                <div className="absolute left-0 top-1/2 z-0 h-[30%] w-[30%] -translate-y-1/2 overflow-hidden rounded-xl border-2 border-white shadow-lg">
                  <Image src={IMG_BARBER_1} alt="Client" fill className="object-cover" sizes="160px" />
                </div>
                {/* Center — focal, largest */}
                <div className="absolute left-1/2 top-1/2 z-20 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-white shadow-2xl ring-2 ring-[#cd1c18]/15">
                  <Image src={IMG_HAIRCUT} alt="Haircut" fill className="object-cover" sizes="300px" />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Stats — large numbers, tabular */}
      <section className="bg-white py-20 sm:py-24">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
            <AnimateIn delay={0}>
              <div className="text-center">
                <div className="text-5xl font-bold tabular-nums text-[#cd1c18] sm:text-6xl [font-family:var(--font-bebas)]">3x</div>
                <div className="mt-3 text-sm font-medium text-[#4a4a4a]">Higher conversion vs email</div>
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <div className="text-center">
                <div className="text-5xl font-bold tabular-nums text-[#cd1c18] sm:text-6xl [font-family:var(--font-bebas)]">98%</div>
                <div className="mt-3 text-sm font-medium text-[#4a4a4a]">iMessage open rate</div>
              </div>
            </AnimateIn>
            <AnimateIn delay={200}>
              <div className="text-center">
                <div className="text-5xl font-bold tabular-nums text-[#cd1c18] sm:text-6xl [font-family:var(--font-bebas)]">$2M+</div>
                <div className="mt-3 text-sm font-medium text-[#4a4a4a]">Revenue recovered</div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Testimonial — flex row: circular image (absolute in bubble) + quote */}
      <section id="testimonials" className="py-20 sm:py-24">
        <div className="section-inner">
          <AnimateIn>
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-10">
              {/* Left: relative container with circular image + speech-bubble shape */}
              <div className="relative flex shrink-0 items-center justify-center lg:order-2 lg:w-[280px]">
              <div className="relative h-52 w-52 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-white shadow-xl">
                  <Image src={IMG_TESTIMONIAL} alt="Marcus Johnson" fill className="object-cover" sizes="288px" unoptimized />
                </div>
                {/* Decorative blob behind — absolute */}
                <div className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-[#cd1c18]/10 blur-2xl" />
              </div>
            </div>
            {/* Right: quote card */}
            <div className="card-modern relative flex flex-1 flex-col justify-center p-8 sm:p-10">
              <span className="absolute left-10 top-10 text-7xl font-serif leading-none text-[#cd1c18]/10" aria-hidden>&ldquo;</span>
              <blockquote className="relative">
                <p className="text-xl font-medium leading-relaxed text-[#1a1a1a] sm:text-2xl">
                  No-shows dropped by half. ChairFill texts my clients on iMessage and fills last-minute openings—I don’t touch my phone.
                </p>
                <footer className="mt-6">
                  <cite className="not-italic">
                    <span className="block font-bold text-[#1a1a1a]">Marcus Johnson</span>
                    <span className="block text-sm text-[#4a4a4a]">Owner, Fade & Co</span>
                  </cite>
                </footer>
              </blockquote>
            </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* How it works — red block, glass cards */}
      <section id="how-it-works"  className="bg-[#cd1c18] py-16 sm:py-20">
        <div className="section-inner">
          <AnimateIn>
            <h2 className="text-center text-4xl font-normal tracking-tight text-white sm:text-5xl [font-family:var(--font-bebas)]">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-white/90">
              Connect your client list. Our AI does the rest—reminders, rebooks, and fill-ins via iMessage.
            </p>
          </AnimateIn>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { step: "1", title: "Add your clients", desc: "Connect your client list or booking system. We sync with your schedule and openings." },
              { step: "2", title: "AI texts on iMessage", desc: "Our AI sends reminders, rebooks no-shows, and fills last-minute slots—human-sounding messages that get replies." },
              { step: "3", title: "Fill your chair", desc: "Fewer empty chairs. More appointments. We handle outreach; you stay behind the chair." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all hover:bg-white/15">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-[#cd1c18] [font-family:var(--font-bebas)]">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/90">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — three tiers, Professional anchored in center */}
      <section id="pricing" className="py-16 sm:py-20">
        <div className="section-inner">
          <AnimateIn>
            <h2 className="text-center text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl [font-family:var(--font-satoshi)]">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-[#4a4a4a]">
              Built for barbers—from solo to shop owner. Pick the plan that fits.
            </p>
          </AnimateIn>
          <div className="mt-8 grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-4">
            {/* Tier 1: The Independent */}
            <div className="card-modern flex flex-col rounded-3xl p-8 sm:p-10">
              <h3 className="text-xl font-bold text-[#1a1a1a]">The Independent</h3>
              <p className="mt-2 text-sm text-[#4a4a4a]">The solo barber building their own book.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tabular-nums text-[#1a1a1a]">$97</span>
                <span className="text-[#4a4a4a]">/month</span>
              </div>
              <p className="mt-4 text-sm font-medium text-[#4a4a4a]">Essential automation for one person.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {["AI outreach via iMessage", "Reminders, rebooks & fill-ins", "Single chair / one barber", "Dashboard & analytics", "Email support"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[#1a1a1a]">
                    <svg className="h-5 w-5 shrink-0 text-[#cd1c18]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={SIGNUP_URL} className="cta-secondary mt-8 inline-block w-full text-center" target="_blank" rel="noopener noreferrer">
                Join now
              </Link>
            </div>

            {/* Tier 2: The Professional — MOST POPULAR (anchored center) */}
            <div className="relative flex flex-col rounded-3xl border-2 border-[#cd1c18] bg-white p-8 shadow-xl sm:p-10 lg:-my-1 lg:py-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#cd1c18] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a]">The Professional</h3>
              <p className="mt-2 text-sm text-[#4a4a4a]">The high-volume barber or booth renter.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tabular-nums text-[#1a1a1a]">$247</span>
                <span className="text-[#4a4a4a]">/month</span>
              </div>
              <p className="mt-4 text-sm font-medium text-[#4a4a4a]">Best value for serious volume.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {["Everything in Independent", "Higher message volume", "Priority rebooks & fill-ins", "Advanced analytics", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[#1a1a1a]">
                    <svg className="h-5 w-5 shrink-0 text-[#cd1c18]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={SIGNUP_URL} className="cta-primary mt-8 inline-block w-full text-center" target="_blank" rel="noopener noreferrer">
                Join now
              </Link>
            </div>

            {/* Tier 3: The Shop Owner — Coming Soon */}
            <div className="card-modern flex flex-col rounded-3xl p-8 opacity-90 sm:p-10">
              <span className="inline-block w-fit rounded-full border border-[#4a4a4a]/30 bg-[#4a4a4a]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#4a4a4a]">
                Coming Soon
              </span>
              <h3 className="mt-4 text-xl font-bold text-[#1a1a1a]">The Shop Owner</h3>
              <p className="mt-2 text-sm text-[#4a4a4a]">Shop owners with multiple chairs and barbers.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#1a1a1a]">Custom</span>
                <span className="text-[#4a4a4a]">/ Contact us</span>
              </div>
              <p className="mt-4 text-sm font-medium text-[#4a4a4a]">Management for the whole team and multi-chair analytics.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {["Everything in Professional", "Multi-chair & multi-barber", "Team management", "Shop-wide analytics", "Dedicated onboarding"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[#1a1a1a]">
                    <svg className="h-5 w-5 shrink-0 text-[#cd1c18]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={SIGNUP_URL} className="mt-8 inline-block w-full rounded-full border-2 border-[#4a4a4a]/40 py-4 text-center font-semibold text-[#4a4a4a] transition-colors hover:border-[#4a4a4a] hover:bg-[#4a4a4a]/5" target="_blank" rel="noopener noreferrer">
                Join now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-24">
        <div className="section-inner">
          <AnimateIn>
            <h2 className="text-center text-4xl font-normal tracking-tight text-[#1a1a1a] sm:text-5xl [font-family:var(--font-bebas)]">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-[#4a4a4a]">
              Everything you need to know about ChairFill.
            </p>
          </AnimateIn>
          <AnimateIn delay={100} className="mt-12">
            <FAQ />
          </AnimateIn>
        </div>
      </section>

      {/* Final CTA — red, high contrast */}
      <section id="cta" className="bg-[#cd1c18] py-20 sm:py-24">
        <div className="section-inner text-center">
          <AnimateIn>
            <h2 className="text-4xl font-normal tracking-tight text-white sm:text-5xl [font-family:var(--font-bebas)]">
              Ready to fill every chair?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/95">
              Join barbers already using ChairFill.
            </p>
            <div className="mt-8">
              <Link href={SIGNUP_URL} className="cta-secondary inline-flex justify-center border-white bg-white text-[#cd1c18] hover:bg-white/95" target="_blank" rel="noopener noreferrer">
                Join now
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Footer — dark, clean */}
      <footer className="bg-[#2D2D2D] py-12">
        <div className="section-inner">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="#" className="text-xl font-bold tracking-wide text-white">
              chairfill
            </Link>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-white/80">
              <Link href="#" className="transition-colors hover:text-white">Privacy</Link>
              <Link href="#" className="transition-colors hover:text-white">Terms</Link>
              <Link href="#" className="transition-colors hover:text-white">Contact</Link>
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
