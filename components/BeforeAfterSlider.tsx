"use client";

import { useState } from "react";
import type { BeforeAfterCase } from "@/lib/content";

/**
 * Custom before/after comparison — CSS clip-path + a native range input,
 * zero libraries. The range input makes it keyboard-accessible for free
 * (arrow keys move the divider).
 *
 * Photo layers render from the paths in lib/content.ts → beforeAfterCases.
 * ⚠️ Current images are AI-GENERATED placeholders (Gemini) — same scene
 * before/after. Swap the files for the client's real project photos before
 * launching ads; paths and this flag stay as-is.
 */
const HAS_REAL_PHOTOS = true;

export default function BeforeAfterSlider({ c }: { c: BeforeAfterCase }) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="rounded-xl border border-concrete-200 p-4">
      <figcaption className="mb-3 font-semibold">{c.title}</figcaption>
      <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg">
        {/* AFTER layer (full) */}
        <div className="absolute inset-0">
          {HAS_REAL_PHOTOS ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.afterSrc} alt={c.afterLabel} className="h-full w-full object-cover" />
          ) : (
            <div
              role="img"
              aria-label={c.afterLabel}
              className="flex h-full w-full items-center justify-center bg-concrete-100 p-6 text-center text-sm text-concrete-500"
            >
              {c.afterLabel}
            </div>
          )}
        </div>
        {/* BEFORE layer, clipped to the left of the divider */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {HAS_REAL_PHOTOS ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.beforeSrc} alt={c.beforeLabel} className="h-full w-full object-cover" />
          ) : (
            <div
              role="img"
              aria-label={c.beforeLabel}
              className="flex h-full w-full items-center justify-center bg-concrete-300 p-6 text-center text-sm text-ink"
            >
              {c.beforeLabel}
            </div>
          )}
        </div>
        {/* Divider */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-1 -translate-x-1/2 bg-navy-800"
          style={{ left: `${pos}%` }}
        />
        <span className="absolute left-2 top-2 rounded bg-navy-800 px-2 py-0.5 text-xs font-semibold text-white">
          Before
        </span>
        <span className="absolute right-2 top-2 rounded bg-accent-600 px-2 py-0.5 text-xs font-semibold text-white">
          After
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after: ${c.title}`}
        className="mt-3 h-11 w-full cursor-ew-resize accent-accent-600"
      />
    </figure>
  );
}
