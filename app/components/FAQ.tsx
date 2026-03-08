"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Will my clients know it's an AI texting them?",
    answer:
      "Nope — and that's intentional. We calibrate the AI to match your tone, your slang, the way you naturally text. The messages come from your number over iMessage. Most clients assume it's you. If they ask, you can tell them, but most won't.",
  },
  {
    question: "What if a client says they're not interested?",
    answer:
      "ChairFill's Annoyance Shield handles this automatically. If a client responds negatively, opts out, or signals disinterest, the system stops messaging them and flags it for you. We're not here to spam your clients — we're here to re-engage the ones who actually want a cut.",
  },
  {
    question: "Do my clients need to download an app?",
    answer:
      "Zero. That's one of the biggest advantages of iMessage — it lives in their default texting app. No friction, no app store, no signup. They just reply to a text like they always would.",
  },
  {
    question: "How do I connect my booking system?",
    answer:
      "We integrate with popular booking tools, and you can also just upload a CSV export of your client list. Setup takes about 5 minutes. Your onboarding call walks through everything.",
  },
  {
    question: "What if I want to take over a conversation manually?",
    answer:
      "Easy — you can jump in at any point from the dashboard. The AI steps aside when you take over, and you can flag certain clients to be manual-only if you prefer. You're always in control.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="divide-y divide-[#D4AF37]/30">
        {faqs.map((faq, index) => (
          <div key={index} className="py-5">
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-lg font-semibold text-white">
                {faq.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] transition-transform duration-200">
                <svg
                  className={`h-5 w-5 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "mt-3 max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="leading-relaxed text-[#a3a3a3]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
