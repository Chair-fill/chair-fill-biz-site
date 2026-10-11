import Image from "next/image";
import AnimateIn from "./AnimateIn";

/**
 * StatusSection — the "Who" block ($100M Leads, Paid Ads p.140).
 *
 * The rest of the page sells the "What" (how the product works). This section
 * sells the "Who": how a full chair changes the barber's standing in other
 * people's eyes. The third point ("your name travels") plants the referral
 * seed for the Phase 3 referral system.
 */
const POINTS = [
  {
    title: "Your clients feel remembered",
    desc: "The text lands like their barber thought of them, not like a business chasing a sale. That feeling is what brings people back.",
  },
  {
    title: "A booked week gets noticed",
    desc: "Empty chairs are quiet. A full one gets seen by every barber in the shop.",
  },
  {
    title: "Your name travels",
    desc: "Clients you win back tell their people where they get right. A full chair today is next month's walk-ins.",
  },
];

export default function StatusSection() {
  return (
    <section id="status" className="relative isolate overflow-hidden">
      <Image
        src="/assets/nate-johnston-tgPrIYnW3g4-unsplash.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[60%_40%] lg:object-[50%_36%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,10,8,0.96)_0%,rgba(11,10,8,0.8)_45%,rgba(11,10,8,0.6)_100%)]"
      />

      <div className="section-inner grid gap-14 py-28 sm:py-40 lg:grid-cols-12 lg:items-center">
        <AnimateIn className="lg:col-span-6">
          <h2 className="balance text-5xl font-black leading-[0.98] tracking-[-0.035em] sm:text-6xl">
            A full chair is the loudest flex in the shop.
          </h2>
        </AnimateIn>

        <ul className="space-y-8 lg:col-span-5 lg:col-start-8">
          {POINTS.map(({ title, desc }, i) => (
            <AnimateIn key={title} delay={i * 100}>
              <li className="border-l border-[var(--gold)]/60 pl-5">
                <h3 className="text-xl font-bold tracking-[-0.01em]">{title}</h3>
                <p className="pretty mt-2 leading-relaxed text-[var(--text-2)]">{desc}</p>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
