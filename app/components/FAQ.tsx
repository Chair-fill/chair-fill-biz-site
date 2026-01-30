"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How does ChairFill work?",
    answer:
      "ChairFill connects to your client list and booking system. Our AI automatically sends reminders before appointments, reaches out to rebook no-shows, and fills last-minute cancellations by texting available clients—all via iMessage.",
  },
  {
    question: "Why iMessage instead of SMS or email?",
    answer:
      "iMessage has a 98% open rate compared to ~20% for email and ~45% for SMS. Your clients actually see and respond to iMessages. Plus, it feels personal—not spammy.",
  },
  {
    question: "Will my clients know it's AI?",
    answer:
      "No. Our AI writes messages that sound like you—friendly, professional, and human. Clients reply naturally, and the conversation flows. No robotic scripts or obvious automation.",
  },
  {
    question: "What if I already use a booking system?",
    answer:
      "ChairFill integrates with most popular booking systems. We sync your schedule and client list automatically, so there's no double-entry or manual work.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "Most barbers are up and running in under 10 minutes. Connect your client list, set your preferences, and ChairFill starts working immediately.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No contracts, no commitments. Cancel anytime from your dashboard—no questions asked.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="divide-y divide-[#e5e4e0]">
        {faqs.map((faq, index) => (
          <div key={index} className="py-5">
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-lg font-semibold text-[#1a1a1a]">
                {faq.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cd1c18]/10 text-[#cd1c18] transition-transform duration-200">
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
                openIndex === index ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="leading-relaxed text-[#4a4a4a]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
