"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const BOOKING_PLATFORMS = [
  { value: "booksy", label: "Booksy" },
  { value: "square", label: "Square" },
  { value: "squire", label: "Squire" },
  { value: "glossgenius", label: "GlossGenius" },
  { value: "other", label: "Other" },
] as const;

const LIST_LOCATIONS = [
  { value: "iphone", label: "iPhone contacts" },
  { value: "booking_app", label: "Inside booking app" },
  { value: "spreadsheet", label: "Spreadsheet / CSV" },
  { value: "paper", label: "Paper / memory" },
  { value: "other", label: "Other" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

type FormState = {
  fullName: string;
  preferredName: string;
  email: string;
  cell: string;
  instagram: string;
  city: string;
  businessName: string;
  yearsCutting: string;
  shopAddress: string;
  bookingLink: string;
  bookingPlatform: string;
  bookingPlatformOther: string;
  totalClients: string;
  dormantCount: string;
  listLocation: string;
  daysWorking: string;
  hours: string;
  hardestSlots: string;
  voiceGreet: string;
  voiceOffer: string;
  voicePhrases: string;
  successVision: string;
  confirmAccurate: boolean;
  confirmLaunch: boolean;
  signature: string;
  sigDate: string;
};

const INITIAL: FormState = {
  fullName: "",
  preferredName: "",
  email: "",
  cell: "",
  instagram: "",
  city: "",
  businessName: "",
  yearsCutting: "",
  shopAddress: "",
  bookingLink: "",
  bookingPlatform: "",
  bookingPlatformOther: "",
  totalClients: "",
  dormantCount: "",
  listLocation: "",
  daysWorking: "",
  hours: "",
  hardestSlots: "",
  voiceGreet: "",
  voiceOffer: "",
  voicePhrases: "",
  successVision: "",
  confirmAccurate: false,
  confirmLaunch: false,
  signature: "",
  sigDate: new Date().toISOString().slice(0, 10),
};

export default function IntakePage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const sectionCompletion = useMemo(() => {
    const s1 = !!(form.fullName && form.preferredName && form.email && form.cell && form.city);
    const s2 = !!(form.businessName && form.yearsCutting && form.shopAddress && form.bookingPlatform);
    const s3 = !!(form.totalClients && form.dormantCount && form.listLocation);
    const s4 = !!(form.daysWorking && form.hours && form.hardestSlots);
    const s5 = !!(form.voiceGreet && form.voiceOffer);
    const s6 = !!form.successVision;
    const s7 = !!(form.confirmAccurate && form.confirmLaunch && form.signature && form.sigDate);
    const completed = [s1, s2, s3, s4, s5, s6, s7].filter(Boolean).length;
    return { completed, percent: Math.round((completed / 7) * 100), current: Math.min(completed + 1, 7) };
  }, [form]);

  const launchDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "intake-page" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Try again in a sec.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <main className="section-inner px-4 py-24">
          <div className="mx-auto max-w-md text-center">
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#141414] p-10 shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-3xl font-bold text-black">
                ✓
              </div>
              <h1 className="text-4xl font-bold text-white">
                Locked <span className="text-[#D4AF37]">in</span>.
              </h1>
              <p className="mt-4 text-[#a3a3a3] leading-relaxed">
                Got it, {form.preferredName || form.fullName.split(" ")[0] || "friend"}. I have everything I need to launch your first
                reactivation campaign by{" "}
                <span className="text-[#D4AF37] font-medium">{launchDate}</span>. Texting you within the hour with the install link.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#737373] [font-family:var(--font-geist-mono)]">
                — McArthur / ChairFill
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border-2 border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-[#737373] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-70";
  const labelClass = "block text-sm font-medium text-white";
  const hintClass = "mt-1.5 text-xs text-[#a3a3a3] italic";

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Sticky progress */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="h-[3px] w-full bg-white/5">
          <div
            className="h-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-all duration-500"
            style={{ width: `${sectionCompletion.percent}%` }}
          />
        </div>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[#a3a3a3] [font-family:var(--font-geist-mono)]">
          <span>
            <span className="text-[#D4AF37]">Section 0{sectionCompletion.current}</span> / 07
          </span>
          <span>
            <span className="text-white">{sectionCompletion.percent}%</span> complete
          </span>
        </div>
      </div>

      <main className="section-inner px-4 pb-24 pt-12">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">
              Founding Member · You&apos;re In
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let&apos;s get your <span className="text-[#D4AF37]">chair filled</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[#a3a3a3] leading-relaxed">
              Everything I need to launch your first reactivation campaign in 48 hours. Takes about 5 minutes — be honest, not polished. The more I know, the better it texts in your voice.
            </p>
          </div>

          <form onSubmit={handleSubmit} autoComplete="on" className="mt-12 space-y-12">
            {/* SECTION 01 */}
            <section className="border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">
                Section 01
              </p>
              <h2 className="mt-1 pb-3 text-2xl font-bold text-white border-b-2 border-[#D4AF37] inline-block">
                Who you are
              </h2>
              <p className="mt-3 mb-6 text-sm italic text-[#a3a3a3]">The basics so I know who&apos;s getting set up.</p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="full-name">Full name <span className="text-[#D4AF37]">*</span></label>
                  <input id="full-name" type="text" required autoComplete="name" placeholder="Anthony Rodriguez" value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="preferred-name">Preferred name <span className="text-[#737373] font-normal">(what we call you)</span> <span className="text-[#D4AF37]">*</span></label>
                  <input id="preferred-name" type="text" required autoComplete="given-name" placeholder="Tony" value={form.preferredName} onChange={(e) => setField("preferredName", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">Personal email <span className="text-[#D4AF37]">*</span></label>
                  <input id="email" type="email" required autoComplete="email" placeholder="tony@kingscuts.com" value={form.email} onChange={(e) => setField("email", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="cell">Cell phone <span className="text-[#D4AF37]">*</span></label>
                  <input id="cell" type="tel" required autoComplete="tel" placeholder="(813) 555-0100" value={form.cell} onChange={(e) => setField("cell", e.target.value)} className={`mt-2 ${inputClass}`} />
                  <p className={hintClass}>This becomes your iMessage line.</p>
                </div>
                <div>
                  <label className={labelClass} htmlFor="instagram">Instagram handle <span className="text-[#737373] font-normal">(optional)</span></label>
                  <input id="instagram" type="text" placeholder="@kingscuts_tony" value={form.instagram} onChange={(e) => setField("instagram", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="city">City / State <span className="text-[#D4AF37]">*</span></label>
                  <input id="city" type="text" required placeholder="Tampa, FL" value={form.city} onChange={(e) => setField("city", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
              </div>
            </section>

            {/* SECTION 02 */}
            <section className="border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">Section 02</p>
              <h2 className="mt-1 pb-3 text-2xl font-bold text-white border-b-2 border-[#D4AF37] inline-block">The shop</h2>
              <p className="mt-3 mb-6 text-sm italic text-[#a3a3a3]">Where you cut and how you book.</p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="biz-name">Business name <span className="text-[#D4AF37]">*</span></label>
                  <input id="biz-name" type="text" required placeholder="King's Cuts" value={form.businessName} onChange={(e) => setField("businessName", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="years">Years cutting <span className="text-[#D4AF37]">*</span></label>
                  <input id="years" type="number" required min={0} max={60} placeholder="8" value={form.yearsCutting} onChange={(e) => setField("yearsCutting", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="shop-addr">Shop address <span className="text-[#D4AF37]">*</span></label>
                  <input id="shop-addr" type="text" required autoComplete="street-address" placeholder="123 Howard Ave, Tampa, FL 33606" value={form.shopAddress} onChange={(e) => setField("shopAddress", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="booking-link">Booking link <span className="text-[#737373] font-normal">(Booksy / Square / Squire / GlossGenius)</span></label>
                  <input id="booking-link" type="url" placeholder="booksy.com/en_us/12345_kings-cuts" value={form.bookingLink} onChange={(e) => setField("bookingLink", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div className="sm:col-span-2">
                  <span className={labelClass}>Which booking platform? <span className="text-[#D4AF37]">*</span></span>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {BOOKING_PLATFORMS.map((opt) => (
                      <PillRadio
                        key={opt.value}
                        name="bookingPlatform"
                        value={opt.value}
                        label={opt.label}
                        checked={form.bookingPlatform === opt.value}
                        onChange={() => setField("bookingPlatform", opt.value)}
                      />
                    ))}
                  </div>
                  {form.bookingPlatform === "other" && (
                    <input type="text" placeholder="e.g. The Cut" value={form.bookingPlatformOther} onChange={(e) => setField("bookingPlatformOther", e.target.value)} className={`mt-3 ${inputClass}`} />
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 03 */}
            <section className="border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">Section 03</p>
              <h2 className="mt-1 pb-3 text-2xl font-bold text-white border-b-2 border-[#D4AF37] inline-block">Your client list</h2>
              <p className="mt-3 mb-6 text-sm italic text-[#a3a3a3]">Rough numbers are fine — this is where I find your goldmine.</p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="total-clients">Approx. clients in your book <span className="text-[#D4AF37]">*</span></label>
                  <input id="total-clients" type="number" required min={0} placeholder="250" value={form.totalClients} onChange={(e) => setField("totalClients", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="dormant">How many haven&apos;t booked in 60+ days? <span className="text-[#737373] font-normal">(rough)</span> <span className="text-[#D4AF37]">*</span></label>
                  <input id="dormant" type="number" required min={0} placeholder="70" value={form.dormantCount} onChange={(e) => setField("dormantCount", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div className="sm:col-span-2">
                  <span className={labelClass}>Where is your client list stored? <span className="text-[#D4AF37]">*</span></span>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {LIST_LOCATIONS.map((opt) => (
                      <PillRadio
                        key={opt.value}
                        name="listLocation"
                        value={opt.value}
                        label={opt.label}
                        checked={form.listLocation === opt.value}
                        onChange={() => setField("listLocation", opt.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 04 */}
            <section className="border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">Section 04</p>
              <h2 className="mt-1 pb-3 text-2xl font-bold text-white border-b-2 border-[#D4AF37] inline-block">Your schedule</h2>
              <p className="mt-3 mb-6 text-sm italic text-[#a3a3a3]">So we know when to send people back to you.</p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="days">Days you work <span className="text-[#D4AF37]">*</span></label>
                  <input id="days" type="text" required placeholder="Tue–Sat" value={form.daysWorking} onChange={(e) => setField("daysWorking", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="hours">Hours <span className="text-[#D4AF37]">*</span></label>
                  <input id="hours" type="text" required placeholder="9am–7pm" value={form.hours} onChange={(e) => setField("hours", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="hardest">Which slots are hardest to fill? <span className="text-[#737373] font-normal">(e.g. weekday mornings, Tuesday afternoons)</span> <span className="text-[#D4AF37]">*</span></label>
                  <input id="hardest" type="text" required placeholder="Tuesday + Wednesday afternoons" value={form.hardestSlots} onChange={(e) => setField("hardestSlots", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
              </div>
            </section>

            {/* SECTION 05 */}
            <section className="border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">Section 05</p>
              <h2 className="mt-1 pb-3 text-2xl font-bold text-white border-b-2 border-[#D4AF37] inline-block">Voice calibration</h2>
              <p className="mt-3 mb-6 text-sm italic text-[#a3a3a3]">
                The AI texts in your voice. Give me enough to sound like you, not a robot. Write it exactly how you&apos;d type it on your phone — slang, abbreviations, emojis, all of it.
              </p>

              <div className="space-y-5">
                <div>
                  <label className={labelClass} htmlFor="voice-greet">How would you greet a regular by text? <span className="text-[#D4AF37]">*</span></label>
                  <textarea id="voice-greet" required rows={3} placeholder="Yo big dawg, been a min — you tryna pull up this week?" value={form.voiceGreet} onChange={(e) => setField("voiceGreet", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="voice-offer">How would you offer a last-minute opening? <span className="text-[#D4AF37]">*</span></label>
                  <textarea id="voice-offer" required rows={3} placeholder="Got a cancel at 4 today if you tryna slide thru fam 🔥" value={form.voiceOffer} onChange={(e) => setField("voiceOffer", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="voice-phrases">Words / phrases you use a lot <span className="text-[#737373] font-normal">(slang, emojis, sign-offs)</span></label>
                  <textarea id="voice-phrases" rows={3} placeholder="fam, big dawg, 🔥, fr, lmk, slide thru, ✂️" value={form.voicePhrases} onChange={(e) => setField("voicePhrases", e.target.value)} className={`mt-2 ${inputClass}`} />
                </div>
              </div>
            </section>

            {/* SECTION 06 */}
            <section className="border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">Section 06</p>
              <h2 className="mt-1 pb-3 text-2xl font-bold text-white border-b-2 border-[#D4AF37] inline-block">What good looks like</h2>
              <p className="mt-3 mb-6 text-sm italic text-[#a3a3a3]">Be specific — this becomes the bar I judge whether we&apos;re winning.</p>

              <div>
                <label className={labelClass} htmlFor="success">If ChairFill works perfectly in 30 days, what happened? <span className="text-[#D4AF37]">*</span></label>
                <textarea id="success" required rows={5} placeholder="I got 15 dormant clients back, my Tuesday and Wednesday afternoons are full again, and I added $1,800 to the month without doing extra outreach myself." value={form.successVision} onChange={(e) => setField("successVision", e.target.value)} className={`mt-2 ${inputClass}`} />
              </div>
            </section>

            {/* SECTION 07 */}
            <section className="border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] [font-family:var(--font-geist-mono)]">Section 07</p>
              <h2 className="mt-1 pb-3 text-2xl font-bold text-white border-b-2 border-[#D4AF37] inline-block">Confirm &amp; send</h2>
              <p className="mt-3 mb-6 text-sm italic text-[#a3a3a3]">Almost done.</p>

              <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#141414] p-6 shadow-xl sm:p-8">
                <label className="flex cursor-pointer items-start gap-3 py-3">
                  <input type="checkbox" required checked={form.confirmAccurate} onChange={(e) => setField("confirmAccurate", e.target.checked)} className="mt-1 h-4 w-4 accent-[#D4AF37]" />
                  <span className="text-sm text-[#a3a3a3] leading-relaxed">I confirm the info above is accurate to the best of my knowledge.</span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 py-3">
                  <input type="checkbox" required checked={form.confirmLaunch} onChange={(e) => setField("confirmLaunch", e.target.checked)} className="mt-1 h-4 w-4 accent-[#D4AF37]" />
                  <span className="text-sm text-[#a3a3a3] leading-relaxed">I&apos;m ready to be set up and launched within 48 hours.</span>
                </label>

                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="signature">Signature <span className="text-[#737373] font-normal">(type your full name)</span> <span className="text-[#D4AF37]">*</span></label>
                    <input id="signature" type="text" required placeholder="Anthony Rodriguez" value={form.signature} onChange={(e) => setField("signature", e.target.value)} className={`mt-2 ${inputClass}`} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="sig-date">Date <span className="text-[#D4AF37]">*</span></label>
                    <input id="sig-date" type="date" required value={form.sigDate} onChange={(e) => setField("sigDate", e.target.value)} className={`mt-2 ${inputClass}`} />
                  </div>
                </div>

                {status === "error" && (
                  <p className="mt-4 text-sm text-amber-400">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-6 w-full rounded-full bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-[#E8C547] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                >
                  {status === "loading" ? "Sending…" : "Send & Launch My Setup"}
                </button>
                <p className="mt-3 text-center text-xs uppercase tracking-[0.08em] text-[#737373] [font-family:var(--font-geist-mono)]">
                  I&apos;ll text you within the hour to confirm
                </p>
              </div>
            </section>

            <div className="pt-4 text-center">
              <Link href="/" className="text-xs uppercase tracking-[0.18em] text-[#a3a3a3] hover:text-[#D4AF37] [font-family:var(--font-geist-mono)]">
                ← Back to home
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function PillRadio({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="relative cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer absolute h-0 w-0 opacity-0" />
      <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/50 px-3.5 py-3 text-sm text-[#a3a3a3] transition-all peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37]/[0.06] peer-checked:text-white">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/20 transition-all peer-[:checked]:border-[#D4AF37]">
          <span className={`block h-2 w-2 rounded-full transition-all ${checked ? "bg-[#D4AF37]" : "bg-transparent"}`} />
        </span>
        {label}
      </div>
    </label>
  );
}
