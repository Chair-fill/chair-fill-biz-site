import AnimateIn from "./AnimateIn";
import { Users, MessageCircle, CalendarCheck } from "lucide-react";

const CLIENT_ROWS = [
  {
    name: "Devin W.",
    lastVisit: "9 weeks ago",
    status: "booked",
    statusLabel: "Booked · Fri 11:00 AM",
  },
  {
    name: "Jordan K.",
    lastVisit: "7 weeks ago",
    status: "replied",
    statusLabel: "Replied 2m ago",
  },
  {
    name: "Chris B.",
    lastVisit: "11 weeks ago",
    status: "reached",
    statusLabel: "Reached out",
  },
  {
    name: "Marcus T.",
    lastVisit: "8 weeks ago",
    status: "booked",
    statusLabel: "Booked · Sat 2:30 PM",
  },
] as const;

const STATUS_STYLES: Record<string, string> = {
  booked: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30",
  replied: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  reached: "bg-[#3A3A3C]/40 text-[#b5b5ad] border-[#3A3A3C]",
};

export default function ProductShowcase() {
  return (
    <section id="product" className="bg-[#0a0a0a] py-20 sm:py-32">
      <div className="section-inner">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <AnimateIn direction="left">
            <div className="text-[10px] sm:text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-4">
              Inside the app
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)] leading-[1.1]">
              Watch your quiet clients turn back into bookings.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#888880] max-w-xl">
              Your dashboard shows every lapsed client, every message that
              went out, and every reply as it lands. You see who booked and
              what came back to your chair. Nothing to manage, you check it
              like you check your texts.
            </p>
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: <Users className="w-6 h-6 text-[#D4AF37]" />,
                  title: "Every lapsed client, surfaced",
                  desc: "ChairFill flags everyone who has not been in your chair in 60+ days so nobody slips through.",
                },
                {
                  icon: <MessageCircle className="w-6 h-6 text-[#D4AF37]" />,
                  title: "Replies land in real time",
                  desc: "See conversations as they happen. The AI handles the back and forth, you watch bookings appear.",
                },
                {
                  icon: <CalendarCheck className="w-6 h-6 text-[#D4AF37]" />,
                  title: "Booked straight onto your schedule",
                  desc: "When a client says yes, the slot is locked in. Your calendar fills without you touching it.",
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

          <AnimateIn direction="right" delay={150}>
            <div className="rounded-3xl border border-[#222] bg-[#161616] overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="bg-[#111111] px-6 py-4 border-b border-[#222] flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="text-[10px] font-bold text-[#888880] uppercase tracking-widest [font-family:var(--font-satoshi)]">
                  app.chairfill.co · Dashboard
                </div>
                <div className="text-[9px] font-bold text-[#D4AF37]/60 uppercase tracking-widest border border-[#D4AF37]/20 rounded-full px-2 py-0.5">
                  Preview
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {/* Stat tiles */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { num: "43", label: "Lapsed clients" },
                    { num: "27", label: "Reached out" },
                    { num: "6", label: "Booked this week" },
                  ].map(({ num, label }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-[#222] bg-[#111111] p-4 text-center"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-[#D4AF37] [font-family:var(--font-satoshi)]">
                        {num}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-medium text-[#888880] uppercase tracking-wider mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Client rows */}
                <div className="rounded-xl border border-[#222] bg-[#111111] divide-y divide-[#1d1d1d] mb-6">
                  {CLIENT_ROWS.map(({ name, lastVisit, status, statusLabel }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white [font-family:var(--font-satoshi)] truncate">
                          {name}
                        </div>
                        <div className="text-[11px] text-[#888880]">
                          Last visit {lastVisit}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-[10px] font-bold uppercase tracking-wider border rounded-full px-2.5 py-1 ${STATUS_STYLES[status]}`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recovered revenue bar */}
                <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-3 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#888880] uppercase tracking-wider">
                    Recovered this month
                  </span>
                  <span className="text-lg font-bold text-[#D4AF37] [font-family:var(--font-satoshi)]">
                    $390
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] text-[#555550]">
              Product preview with sample data.
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
