"use client";

import AnimateIn from "./AnimateIn";

const ITEMS = [
  {
    name: "The Reactivation Engine™",
    tagline: "Your quiet clients, back in the chair.",
    desc: "Finds every client who's gone silent and reaches out in your voice, at the pace of a real conversation.",
    value: "$200/mo",
  },
  {
    name: "Personal Channel Delivery™",
    tagline: "Sent where people actually reply.",
    desc: "Messages go through iMessage, the channel clients use for friends and family. Not email, not a group text.",
    value: "$150/mo",
  },
  {
    name: "The No-Show Shield™",
    tagline: "Stop giving away free appointments.",
    desc: "Confirms, reminds, and follows up before every appointment so the people you book actually show.",
    value: "$100/mo",
  },
  {
    name: "The Gap Filler™",
    tagline: "Cancellations become revenue.",
    desc: "The moment a slot opens, it reaches the overdue clients most likely to take it.",
    value: "$120/mo",
  },
  {
    name: "Revenue Recovered Dashboard™",
    tagline: "Not metrics. Money.",
    desc: "Every client brought back and every gap filled, tied to a real dollar amount.",
    value: "$80/mo",
  },
  {
    name: "Done-For-You Launch™",
    tagline: "Live in 48 hours.",
    desc: "We configure everything, write the first campaign in your voice, and launch it for you.",
    value: "$300 once",
  },
];

export default function BundleSection() {
  return (
    <section id="system" className="bg-[var(--ink-2)] py-24 sm:py-32">
      <div className="section-inner grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Everything inside{" "}
              <span className="text-[var(--gold)]">The Full Chair System.</span>
            </h2>
            <p className="pretty mt-5 max-w-[42ch] text-lg leading-relaxed text-[var(--text-2)]">
              Six parts, each with one job, all working to keep your chair full
              without you chasing anyone.
            </p>
          </div>
        </div>

        <AnimateIn className="lg:col-span-7">
          <div className="tnum rounded-[24px] border border-[var(--line)] bg-[var(--ink)] p-6 sm:p-10">
            <ol>
              {ITEMS.map(({ name, tagline, desc, value }) => (
                <li
                  key={name}
                  className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-dashed border-[var(--line-strong)] py-6 first:pt-0"
                >
                  <div>
                    <h3 className="text-lg font-bold tracking-[-0.01em]">{name}</h3>
                    <p className="mt-1 text-sm font-medium text-[var(--gold)]">{tagline}</p>
                    <p className="pretty mt-2 max-w-[48ch] text-sm leading-relaxed text-[var(--text-2)]">
                      {desc}
                    </p>
                  </div>
                  <span className="pt-0.5 text-right font-semibold text-[var(--text)]">{value}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex items-baseline justify-between gap-6 text-[var(--text-2)]">
              <span>Total value</span>
              <span className="line-through decoration-[var(--text-3)] decoration-2">
                $650/mo + $300 setup
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <span className="text-lg font-semibold">Founding price</span>
                <p className="mt-1 text-sm text-[var(--text-2)]">First 5 barbers. Free for life.</p>
              </div>
              <span className="text-6xl font-black leading-none tracking-[-0.04em] text-[var(--gold)]">
                $0
              </span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
