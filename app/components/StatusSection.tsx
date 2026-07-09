import AnimateIn from "./AnimateIn";
import { UserCheck, Crown, Share2 } from "lucide-react";

/**
 * StatusSection — the "Who" block ($100M Leads, Paid Ads p.140).
 *
 * The rest of the page sells the "What" (deliverability, calibration, the
 * annoyance shield — how the product works). This section sells the "Who":
 * how a full chair changes the barber's standing in other people's eyes.
 * Status is the strongest driver Hormozi names, and the third card ("your
 * name travels") plants the referral seed for the Phase 3 referral system.
 *
 * Styling mirrors the existing "How it works" / "Why it works" sections:
 * section-inner, gold kicker, Satoshi headline, gold-bordered cards.
 */
const POINTS = [
  {
    icon: UserCheck,
    title: "Your clients feel remembered",
    desc: "The text lands like their barber thought of them, not like a business chasing a sale. That feeling is what actually brings people back.",
  },
  {
    icon: Crown,
    title: "A booked week is the flex",
    desc: "Empty chairs are quiet. A full one gets noticed by every barber in the shop. ChairFill keeps yours full without you lifting a finger.",
  },
  {
    icon: Share2,
    title: "Your name travels",
    desc: "Clients you win back tell their people where they get right. A full chair today is your next month of walk-ins.",
  },
];

export default function StatusSection() {
  return (
    <section id="status" className="bg-[#0a0a0a] py-20 sm:py-32">
      <div className="section-inner">
        <AnimateIn>
          <div className="text-[10px] sm:text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-4 text-center">
            What it says about you
          </div>
          <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)] leading-[1.1]">
            A full chair is the loudest flex in the shop.
          </h2>
        </AnimateIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, desc }, i) => (
            <AnimateIn key={title} delay={i * 120}>
              <div className="card-modern h-full p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                  <Icon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 [font-family:var(--font-satoshi)]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#888880]">{desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
