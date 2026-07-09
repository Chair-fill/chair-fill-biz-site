import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import AnimateIn from "./components/AnimateIn";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { faqs } from "@/lib/faq";
import {
  SITE,
  softwareApplicationJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "ChairFill | AI Client Reactivation for Independent Barbers",
  description:
    "Stop losing revenue to quiet clients. ChairFill identifies every lapsed client and brings them back to your chair automatically — through iMessage, in your voice. Built for independent barbers.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ChairFill | AI Client Reactivation for Independent Barbers",
    description:
      "ChairFill identifies every lapsed client and brings them back to your chair automatically — through iMessage, in your voice.",
    url: SITE.url,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};
import {
  Bot,
  DollarSign,
  ClipboardList,
  Lightbulb,
  CheckCircle2,
  Smartphone,
  Mic,
  ShieldCheck,
} from "lucide-react";

// ── New components ───────────────────────────────────────────────────────
import AnimatedHero from "./components/AnimatedHero"; // replaces static hero
import FoundingMemberSection from "./components/FoundingMemberSection";
import TextDemoSection from "./components/TextDemoSection";
import { SpotsStat } from "./components/SpotsLeft";
import ObjectionsSection from "./components/ObjectionsSection";
import BundleSection from "./components/BundleSection";
import EmailCapturePopup from "./components/EmailCapturePopup";
import ProductShowcase from "./components/ProductShowcase";
import StatusSection from "./components/StatusSection";

// Founding-pricing deadline (Edit 2 / book p.41: pair scarcity with real urgency).
// NON-resetting on purpose. Set this to a date you will actually hold, or remove
// the line in the final CTA below. A fake/resetting countdown is the move the book
// warns against — only keep this if it is real.
const FOUNDING_DEADLINE = "September 30, 2026";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(faqs)),
        }}
      />
      <Navbar />
      <div className="pt-5 lg:pt-0"></div>

      {/* ── HERO. Animated rotating words (replaces static hero) ── */}
      <AnimatedHero />

      <div className="border-y border-[#222] bg-[#141414]/50 py-6 sm:py-8">
        <div className="section-inner">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { num: "98%", label: "iMessage open rate" },
              { num: "3x", label: "More recovery vs email" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] [font-family:var(--font-satoshi)]">
                  {num}
                </div>
                <div className="text-[10px] sm:text-xs font-medium text-[#888880] uppercase tracking-widest mt-1">
                  {label}
                </div>
              </div>
            ))}
            {/* Live founding-spots counter (client, /api/spots-taken) */}
            <SpotsStat />
          </div>
        </div>
      </div>

      {/* ── THE PROBLEM ── */}
      <section id="problem" className="bg-[#111111] py-20 sm:py-32">
        <div className="section-inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <AnimateIn direction="left">
              <div className="text-[10px] sm:text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-4">
                The problem
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)] leading-[1.1]">
                You have clients who stopped coming. They didn't leave.
                They just went quiet.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#888880] max-w-xl">
                The average barber has 40 to 60 clients who haven't shown
                up in 60+ days. That's thousands of dollars in recurring
                revenue sitting dormant in your phone.
                <br />
                <br />
                The problem isn't that they don't want a cut.
                It's that nobody reached out. ChairFill does that for you
                automatically. It connects in a way that feels natural.
              </p>
            </AnimateIn>

            <AnimateIn direction="right" delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    type: "empty",
                    time: "Mon 10:00 AM",
                    name: "No booking",
                    value: "$65 lost",
                  },
                  {
                    type: "filled",
                    time: "Mon 10:00 AM",
                    name: "Devin W.",
                    value: "+ $65 earned",
                  },
                  {
                    type: "empty",
                    time: "Wed 2:00 PM",
                    name: "No booking",
                    value: "$65 lost",
                  },
                  {
                    type: "filled",
                    time: "Wed 2:00 PM",
                    name: "Jordan K.",
                    value: "+ $65 earned",
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border ${
                      card.type === "empty"
                        ? "border-red-500/20 bg-red-500/5"
                        : "border-[#D4AF37]/30 bg-[#D4AF37]/5"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${card.type === "empty" ? "bg-red-500" : "bg-[#D4AF37]"}`}
                      />
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${card.type === "empty" ? "text-red-500" : "text-[#D4AF37]"}`}
                      >
                        {card.type === "empty" ? "Empty" : "Filled"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white [font-family:var(--font-satoshi)]">
                      {card.time}
                    </div>
                    <div className="text-xs text-[#888880] mt-1">
                      {card.name}
                    </div>
                    <div
                      className={`text-xs font-bold mt-3 ${card.type === "empty" ? "text-red-500" : "text-[#D4AF37]"}`}
                    >
                      {card.value}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-[#0a0a0a] py-20 sm:py-32">
        <div className="section-inner">
          <AnimateIn>
            <div className="text-[10px] sm:text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-4 text-center">
              How it works
            </div>
            <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)]">
              Three steps. Then it runs itself.
            </h2>
          </AnimateIn>
          <div className="mt-16 grid gap-2 sm:grid-cols-3 bg-[#222] border border-[#222] rounded-3xl overflow-hidden">
            {[
              {
                step: "01",
                title: "Add your clients",
                desc: "Connect your client list or booking system. We sync with your schedule and openings.",
                icon: <ClipboardList className="w-8 h-8 text-[#D4AF37]" />,
              },
              {
                step: "02",
                title: "AI reaches out for you",
                desc: "Our AI sends reminders and rebooks no-shows. It fills last-minute slots with messages that actually get replies.",
                icon: <Bot className="w-8 h-8 text-[#D4AF37]" />,
              },
              {
                step: "03",
                title: "Fill your chair",
                desc: "Fewer empty chairs. More appointments. We handle outreach while you stay behind the chair.",
                icon: <DollarSign className="w-8 h-8 text-[#D4AF37]" />,
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="bg-[#111111] p-10 group">
                <div className="text-6xl font-bold text-[#C9A84C] [font-family:var(--font-satoshi)] mb-6 transition-none">
                  {step}
                </div>
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 [font-family:var(--font-satoshi)]">{title}</h3>
                <p className="leading-relaxed text-[#888880] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NATURAL AI / iMESSAGE DEMO ── */}
      <section id="natural" className="bg-[#111111] py-20 sm:py-32">
        <div className="section-inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <AnimateIn direction="left">
              <div className="rounded-3xl border border-[#222] bg-[#161616] overflow-hidden shadow-2xl">
                <div className="bg-[#111111] px-6 py-4 border-b border-[#222] flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="text-[10px] font-bold text-[#888880] uppercase tracking-widest [font-family:var(--font-satoshi)]">
                    iMessage · Marcus and Tyler
                  </div>
                  <div className="w-10" />
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <div className="text-[10px] text-[#888880] font-medium uppercase tracking-widest">
                    AI calibrated to Marcus
                  </div>
                  <div className="self-start max-w-[85%] bg-[#1D86EA] text-white p-4 rounded-2xl rounded-bl-sm text-sm leading-relaxed">
                    Ty! You been good bro? I got a slot open this Friday at 11
                    if you're tryna pull up 💈
                  </div>
                  <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-3 flex gap-3 items-start">
                    <Lightbulb className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[#D4AF37] leading-relaxed">
                      Uses client's nickname, casual tone, no hard sell. It
                      matches the way barbers actually text.
                    </p>
                  </div>
                  <div className="self-end max-w-[85%] bg-[#3A3A3C] text-white p-4 rounded-2xl rounded-br-sm text-sm leading-relaxed">
                    Yeah I been slippin fr. You got me
                  </div>
                  <div className="self-start max-w-[85%] bg-[#1D86EA] text-white p-4 rounded-2xl rounded-bl-sm text-sm leading-relaxed">
                    Let's get it. I'll lock in Friday 11am. If
                    anything changes just lmk 🤙
                  </div>
                  <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-3 flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[#D4AF37] leading-relaxed">
                      Confirms booking naturally, leaves door open. No awkward
                      robot speak.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={150}>
              <div className="text-[10px] sm:text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-4">
                Why it works
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)] leading-[1.1]">
                Messages that feel personal, not like a blast.
              </h2>
              <div className="mt-10 space-y-8">
                {[
                  {
                    icon: <Smartphone className="w-6 h-6 text-[#D4AF37]" />,
                    title: "Delivered where clients actually read",
                    desc: "Open rates that blow email out of the water. Clients see it in the same place as your real messages. No spam folder, no app to download.",
                  },
                  {
                    icon: <Mic className="w-6 h-6 text-[#D4AF37]" />,
                    title: "Calibrated to your style",
                    desc: "We calibrate the AI to match your communication style. The result feels like it came from you — because it sounds like you.",
                  },
                  {
                    icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
                    title: "Annoyance shield built in",
                    desc: "ChairFill knows when to stop. If a client says they're busy, it backs off and won't message them again until the right time.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-5">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 [font-family:var(--font-satoshi)]">
                        {title}
                      </h4>
                      <p className="text-sm text-[#888880] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── STATUS / "WHO" (book p.140: how a full chair raises the barber's standing) ── */}
      <StatusSection />

      {/* ── OBJECTIONS ── */}
      <ObjectionsSection />

      {/* ── BUNDLE / FULL CHAIR SYSTEM ── */}
      <BundleSection />

      {/* ── PRODUCT SHOWCASE (dashboard preview with sample data) ── */}
      <ProductShowcase />

      {/* GuaranteeSection removed while the founding free-for-life offer runs —
          its "pay after 30 days" risk-reversal contradicts a free offer.
          Bring it back when paid plans launch. */}

      {/* ── TEXT YOURSELF THE DEMO (interactive: barber texts their own phone) ── */}
      <TextDemoSection />

      {/* ── FOUNDING MEMBER SECTION (replaces testimonials/pricing during beta) ── */}
      <div id="founding">
        <FoundingMemberSection />
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-32 bg-[#0a0a0a]">
        <div className="section-inner">
          <AnimateIn>
            <div className="text-[10px] sm:text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-4 text-center">
              FAQ
            </div>
            <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)]">
              Straight answers to real questions.
            </h2>
          </AnimateIn>
          <AnimateIn delay={100} className="mt-12">
            <FAQ />
          </AnimateIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="waitlist" className="bg-[#111111] py-20 sm:py-32">
        <div className="section-inner">
          <AnimateIn>
            <div className="max-w-3xl mx-auto rounded-[2.5rem] border border-[#222] bg-[#161616] p-12 sm:p-20 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

              <div className="text-[10px] sm:text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-6">
                Limited spots
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl [font-family:var(--font-satoshi)] leading-[1.1] mb-6">
                Stop leaving money in your phone.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-[#888880] leading-relaxed mb-10">
                We're accepting barbers now. The first 5 in stay free for life,
                no card. We set it up for you. If it doesn't bring clients
                back, walk away. Nothing owed.
              </p>
              <p className="mx-auto max-w-xl text-sm font-semibold text-[#D4AF37] mb-10 [font-family:var(--font-satoshi)]">
                Founding pricing ends {FOUNDING_DEADLINE}.
              </p>
              <div className="mt-8">
                <Link
                  href="/founding-member"
                  className="cta-secondary inline-flex justify-center border-black bg-black text-[#D4AF37] hover:bg-black/90 hover:text-[#E8C547]"
                >
                  Claim a Free Spot →
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

      {/* Marketing promo popup (founding free-for-life offer) — shown after a short delay */}
      <EmailCapturePopup />
    </div>
  );
}
