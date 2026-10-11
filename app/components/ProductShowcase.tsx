import AnimateIn from "./AnimateIn";

const CLIENT_ROWS = [
  { name: "Devin W.", lastVisit: "9 weeks ago", status: "booked", statusLabel: "Booked Fri 11:00" },
  { name: "Jordan K.", lastVisit: "7 weeks ago", status: "replied", statusLabel: "Replied 2m ago" },
  { name: "Chris B.", lastVisit: "11 weeks ago", status: "reached", statusLabel: "Reached out" },
  { name: "Marcus T.", lastVisit: "8 weeks ago", status: "booked", statusLabel: "Booked Sat 2:30" },
] as const;

const STATUS_STYLES: Record<string, string> = {
  booked: "bg-[var(--gold)] text-[#14110a]",
  replied: "bg-[var(--gold-wash)] text-[var(--gold)]",
  reached: "bg-white/[0.06] text-[var(--text-2)]",
};

const POINTS = [
  {
    title: "Every lapsed client, surfaced",
    desc: "Anyone who hasn't been in your chair for 60+ days gets flagged, so nobody slips through.",
  },
  {
    title: "Replies land in real time",
    desc: "The AI handles the back and forth. You watch bookings show up.",
  },
  {
    title: "Money, not metrics",
    desc: "Recovered revenue is the headline number, tied to the clients who came back.",
  },
];

export default function ProductShowcase() {
  return (
    <section id="product" className="border-t border-[var(--line)] py-24 sm:py-32">
      <div className="section-inner grid gap-16 lg:grid-cols-12 lg:items-center">
        <AnimateIn className="lg:col-span-5">
          <h2 className="balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Watch quiet clients turn back into bookings.
          </h2>
          <p className="pretty mt-5 max-w-[44ch] text-lg leading-relaxed text-[var(--text-2)]">
            Check it like you check your texts. Nothing to manage.
          </p>
          <dl className="mt-10 space-y-6">
            {POINTS.map(({ title, desc }) => (
              <div key={title}>
                <dt className="font-bold">{title}</dt>
                <dd className="pretty mt-1 max-w-[46ch] text-[var(--text-2)]">{desc}</dd>
              </div>
            ))}
          </dl>
        </AnimateIn>

        <AnimateIn delay={120} className="lg:col-span-7">
          <figure>
            <div className="tnum rounded-[24px] border border-[var(--line)] bg-[var(--ink-2)] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-7">
              <div className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
                <div>
                  <div className="text-sm text-[var(--text-2)]">Recovered this month</div>
                  <div className="mt-1 text-5xl font-black tracking-[-0.04em] text-[var(--gold)]">$390</div>
                </div>
                <div className="flex gap-6 text-right">
                  {[
                    { num: "43", label: "Lapsed" },
                    { num: "27", label: "Reached" },
                    { num: "6", label: "Booked" },
                  ].map(({ num, label }) => (
                    <div key={label}>
                      <div className="text-2xl font-bold">{num}</div>
                      <div className="text-xs text-[var(--text-2)]">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <ul className="mt-2">
                {CLIENT_ROWS.map(({ name, lastVisit, status, statusLabel }) => (
                  <li key={name} className="flex items-center justify-between gap-3 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-white/[0.06] text-xs font-bold text-[var(--text-2)]"
                      >
                        {name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{name}</div>
                        <div className="text-xs text-[var(--text-2)]">Last visit {lastVisit}</div>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
                      {statusLabel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <figcaption className="mt-3 text-center text-xs text-[var(--text-3)]">
              Product preview with sample data.
            </figcaption>
          </figure>
        </AnimateIn>
      </div>
    </section>
  );
}
