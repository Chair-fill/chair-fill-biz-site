"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import AnimateIn from "./AnimateIn";

const ROWS = [
  {
    fear: "I don't want to spam my clients and look desperate.",
    answer:
      "ChairFill messages read like you wrote them: casual, timed right, one at a time. Clients don't feel marketed to. They feel like their barber remembered them.",
    kicker: "The difference between a text and a blast is how it reads. ChairFill always reads like a text.",
    bubbles: [
      { dir: "out", text: "Aye Jay what's good, it's Marcus 💈" },
      { dir: "out", text: "Been a minute. Wanted to stay in your contacts, sending my card real quick" },
      { dir: "in", text: "Saved bro 🤝 been a minute, ima pull up soon" },
    ],
  },
  {
    fear: "My texts get ignored anyway. Why would this be different?",
    answer:
      "Most business texts read like a blast, so people tune them out. ChairFill reaches clients through iMessage, the same place they text friends and family. Not a marketing app. Not a mass text service.",
    kicker: "The channel is different, so the response is different.",
  },
  {
    fear: "What if a client replies and I miss it?",
    answer:
      "Every reply triggers an instant alert. If a client is ready to book, your booking link goes back automatically and they get marked hot. If they ask a question, ChairFill answers it or flags it for you.",
    kicker: "Nothing falls through. The loop closes before you see the notification.",
  },
  {
    fear: "I don't have time to learn new software.",
    answer:
      "Founding members get a done-for-you launch. We build your first campaign, set everything up, and send your first outreach. You're live and getting replies before you touch a setting.",
    kicker: "You'll be cutting hair while ChairFill runs. That's the point.",
  },
  {
    fear: "I already use Booksy or Square. Why switch?",
    answer:
      "You don't. Keep your booking app. It waits for clients to come back on their own. ChairFill goes out and gets them, then sends them to the booking link you already use.",
    kicker: "Nothing to migrate. It adds the one job your booking app never does.",
  },
  {
    fear: "What if I message someone who doesn't want to hear from me?",
    answer:
      "ChairFill only reaches clients who've already done business with you: people who chose you once and went quiet. Anyone who opts out is removed instantly and never contacted again.",
    kicker: "It's built to protect your name, not risk it.",
  },
  {
    fear: "How will I know it's actually making me money?",
    answer:
      "Your dashboard shows Revenue Recovered: the dollar amount tied to every client ChairFill brought back. Not open rates. Real appointments, traced to the outreach that booked them.",
    kicker: "You'll know what ChairFill made you this month, to the dollar.",
  },
];

function Answer({ row }) {
  return (
    <div>
      <p className="pretty text-lg leading-relaxed text-[var(--text)]">{row.answer}</p>
      <p className="pretty mt-4 leading-relaxed text-[var(--gold)]">{row.kicker}</p>
      {row.bubbles && (
        <div className="mt-8 flex max-w-sm flex-col gap-2">
          {row.bubbles.map((b) => (
            <div
              key={b.text}
              className={
                b.dir === "out"
                  ? "max-w-[85%] self-end rounded-[18px] rounded-br-[5px] bg-[#1D86EA] px-3.5 py-2 text-sm leading-snug text-white"
                  : "max-w-[85%] self-start rounded-[18px] rounded-bl-[5px] bg-[#3A3A3C] px-3.5 py-2 text-sm leading-snug text-white"
              }
            >
              {b.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ObjectionsSection() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <section id="objections" className="border-t border-[var(--line)] py-24 sm:py-32">
      <div className="section-inner">
        <AnimateIn>
          <h2 className="balance max-w-[20ch] text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            We already know what&apos;s holding you back.
          </h2>
          <p className="pretty mt-5 max-w-[54ch] text-lg leading-relaxed text-[var(--text-2)]">
            The real reasons barbers don&apos;t text their old clients, and what
            ChairFill does about each one.
          </p>
        </AnimateIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-6">
            {ROWS.map((row, i) => {
              const active = open === i;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <li key={row.fear} className="border-t border-[var(--line)] last:border-b">
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-controls={panelId}
                    onClick={() => setOpen(i)}
                    className={`group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 ${
                      active ? "text-[var(--text)]" : "text-[var(--text-2)] hover:text-[var(--text)]"
                    }`}
                  >
                    <span className="text-lg font-medium leading-snug sm:text-xl">
                      &ldquo;{row.fear}&rdquo;
                    </span>
                    <Plus
                      aria-hidden
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ease-out ${
                        active ? "rotate-45 text-[var(--gold)]" : ""
                      }`}
                    />
                  </button>
                  {/* Inline answer on small screens */}
                  {active && (
                    <div id={panelId} className="pb-8 lg:hidden">
                      <Answer row={row} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-32" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)", transform: "translateY(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
                  exit={{ opacity: 0, filter: reduce ? "blur(0px)" : "blur(2px)" }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Answer row={ROWS[open]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
