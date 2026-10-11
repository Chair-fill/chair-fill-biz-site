"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="border-b border-[var(--line)]">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-faq-${index}`;
        return (
          <li key={faq.question} className="border-t border-[var(--line)]">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-lg font-semibold leading-snug sm:text-xl">{faq.question}</span>
              <Plus
                aria-hidden
                className={`h-5 w-5 shrink-0 transition-transform duration-200 ease-out ${
                  open ? "rotate-45 text-[var(--gold)]" : "text-[var(--text-2)]"
                }`}
              />
            </button>
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pretty max-w-[62ch] pb-6 leading-relaxed text-[var(--text-2)]">{faq.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
