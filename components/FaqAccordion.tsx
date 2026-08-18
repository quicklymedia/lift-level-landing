"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

/** The only expandable UI on the page (hard rule 2 forbids popups). */
export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-6 divide-y divide-concrete-200 rounded-xl border border-concrete-200 bg-white">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold hover:bg-concrete-50"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <span aria-hidden="true" className="text-accent-700">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="px-5 pb-5 text-ink"
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
