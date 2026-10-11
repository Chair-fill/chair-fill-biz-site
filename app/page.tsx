import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

import AnimatedHero from "./components/AnimatedHero";
import FoundingMemberSection from "./components/FoundingMemberSection";
import TextDemoSection from "./components/TextDemoSection";
import ObjectionsSection from "./components/ObjectionsSection";
import BundleSection from "./components/BundleSection";
import EmailCapturePopup from "./components/EmailCapturePopup";
import ProductShowcase from "./components/ProductShowcase";
import StatusSection from "./components/StatusSection";

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

const STEPS = [
  {
    title: "Upload your client list",
    desc: "Export a CSV from the booking app you already use. We handle the setup from there.",
  },
  {
    title: "ChairFill texts them for you",
    desc: "Personal iMessages in your voice, one at a time. It sends reminders, chases no-shows, and offers open slots to the clients most likely to take them.",
  },
  {
    title: "They book. You cut.",
    desc: "When a client says yes, your booking link goes back right away and they get flagged as hot. You never leave the chair.",
  },
];

// Read from the barber's phone: outgoing = blue/right, incoming = gray/left.
const ANNOTATED_THREAD = [
  {
    from: "barber",
    text: "Ty! You been good bro? I got a slot open this Friday at 11 if you tryna pull up 💈",
    note: "Uses his nickname. Casual tone, no hard sell. It writes the way you already text.",
    side: "left",
  },
  {
    from: "client",
    text: "Yeah I been slippin fr. You got me",
    note: "Lands in iMessage next to texts from friends. No app to download, no spam folder.",
    side: "right",
  },
  {
    from: "barber",
    text: "Let's get it. Locked in Friday 11am. If anything changes just lmk 🤙",
    note: "Confirms and leaves the door open. If a client says they're busy, it backs off.",
    side: "left",
  },
] as const;

export default function Home() {
  return (
    <div className="grain min-h-[100dvh] overflow-x-clip bg-[var(--ink)] text-[var(--text)]">
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

      <main>
        <AnimatedHero />

        {/* ── THE PROBLEM ── */}
        <section id="problem" className="border-t border-[var(--line)] py-24 sm:py-32">
          <div className="section-inner grid gap-14 lg:grid-cols-12 lg:items-center">
            <AnimateIn className="lg:col-span-7">
              <h2 className="balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                They didn&apos;t leave.
                <br />
                They just went quiet.
              </h2>
              <p className="pretty mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--text-2)]">
                The average barber has 40 to 60 clients who haven&apos;t sat in
                the chair in 60+ days. They still want a cut. Nobody reached
                out. ChairFill does, automatically, in a way that feels like
                you.
              </p>
            </AnimateIn>

            <AnimateIn delay={120} className="lg:col-span-5">
              <dl className="tnum border-l border-[var(--line-strong)] pl-8 sm:pl-10">
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-[var(--text-2)]">Quiet clients</dt>
                  <dd className="text-2xl font-semibold">40</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-[var(--text-2)]">One cut each</dt>
                  <dd className="text-2xl font-semibold">× $65</dd>
                </div>
                <div className="mt-3 border-t border-[var(--line-strong)] pt-6">
                  <dt className="sr-only">Total</dt>
                  <dd className="text-6xl font-black tracking-[-0.04em] text-[var(--gold)] sm:text-7xl">
                    $2,600
                  </dd>
                  <p className="mt-2 text-[var(--text)]">sitting in your phone.</p>
                  <p className="mt-4 text-sm text-[var(--text-3)]">
                    Example at $65 a cut, one visit each.
                  </p>
                </div>
              </dl>
            </AnimateIn>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="bg-[var(--ink-2)] py-24 sm:py-32">
          <div className="section-inner grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <h2 className="balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                  Three steps. Then it runs itself.
                </h2>
                <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-[var(--text-2)]">
                  Founding members don&apos;t touch a setting. We build the first
                  campaign and send it for you.
                </p>
              </div>
            </div>

            <ol className="lg:col-span-7">
              {STEPS.map(({ title, desc }, i) => (
                <AnimateIn key={title} delay={i * 80}>
                  <li className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-[var(--line)] py-9 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]">
                    <span className="tnum pt-1 text-sm font-semibold text-[var(--gold)]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                        {title}
                      </h3>
                      <p className="pretty mt-3 max-w-[52ch] leading-relaxed text-[var(--text-2)]">
                        {desc}
                      </p>
                    </div>
                  </li>
                </AnimateIn>
              ))}
            </ol>
          </div>
        </section>

        {/* ── WHY IT WORKS: annotated thread ── */}
        <section id="natural" className="py-24 sm:py-32">
          <div className="section-inner">
            <AnimateIn>
              <h2 className="balance max-w-[18ch] text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Messages that read like you wrote them.
              </h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-[var(--text-2)]">
                ChairFill learns how you text, then writes like that. Every
                message goes out on its own, never as a blast.
              </p>
            </AnimateIn>

            <div className="mt-16 space-y-10 lg:space-y-6">
              {ANNOTATED_THREAD.map((m, i) => (
                <AnimateIn key={m.text} delay={i * 120}>
                  <div className="grid gap-3 lg:grid-cols-[1fr_minmax(0,440px)_1fr] lg:items-center lg:gap-10">
                    <div className="flex flex-col lg:col-start-2 lg:row-start-1">
                      <div
                        className={
                          m.from === "barber"
                            ? "max-w-[85%] self-end rounded-[22px] rounded-br-[6px] bg-[#1D86EA] px-4 py-3 leading-snug text-white"
                            : "max-w-[85%] self-start rounded-[22px] rounded-bl-[6px] bg-[#3A3A3C] px-4 py-3 leading-snug text-white"
                        }
                      >
                        {m.text}
                      </div>
                    </div>
                    <p
                      className={`pretty max-w-[34ch] text-sm leading-relaxed text-[var(--text-2)] lg:row-start-1 ${
                        m.from === "barber" ? "justify-self-end text-right" : ""
                      } ${
                        m.side === "left"
                          ? "lg:col-start-1 lg:justify-self-end lg:text-right"
                          : "lg:col-start-3 lg:text-left"
                      }`}
                    >
                      {m.note}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <StatusSection />

        <ObjectionsSection />

        <BundleSection />

        <ProductShowcase />

        <TextDemoSection />

        <div id="founding">
          <FoundingMemberSection />
        </div>

        {/* ── FAQ ── */}
        <section id="faq" className="border-t border-[var(--line)] py-24 sm:py-32">
          <div className="section-inner grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Straight answers.
              </h2>
              <p className="mt-5 max-w-[32ch] leading-relaxed text-[var(--text-2)]">
                Something else on your mind?{" "}
                <Link
                  href="/book"
                  className="text-[var(--text)] underline decoration-[var(--gold)]/50 underline-offset-4 transition-colors hover:decoration-[var(--gold)]"
                >
                  Book a call
                </Link>{" "}
                and ask the founder directly.
              </p>
            </div>
            <div className="lg:col-span-8">
              <FAQ />
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section id="waitlist" className="relative overflow-hidden border-t border-[var(--line)] py-28 sm:py-40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(212,175,55,0.12),transparent_70%)]"
          />
          <div className="section-inner relative">
            <AnimateIn>
              <h2 className="balance max-w-[14ch] text-5xl font-black leading-[0.98] tracking-[-0.035em] sm:text-7xl">
                Stop leaving money in your phone.
              </h2>
              <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <p className="pretty max-w-[46ch] text-lg leading-relaxed text-[var(--text-2)]">
                  The first 5 barbers stay free for life. No card. We set it up
                  for you. If it doesn&apos;t bring clients back, walk away and
                  owe nothing.
                </p>
                <Link href="/founding-member" className="cta-primary group gap-2 self-start sm:self-auto">
                  Claim your free spot
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />

      <EmailCapturePopup />
    </div>
  );
}
