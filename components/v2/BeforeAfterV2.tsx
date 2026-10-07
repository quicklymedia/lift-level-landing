"use client";

import Image from "next/image";
import { useState } from "react";
import { beforeAfterV2 } from "@/lib/content-v2";

/**
 * One large comparison slider with service tabs — Floor Daddy's "Same room.
 * Same light. Completely new life." block. clip-path + a native range input
 * (keyboard-accessible for free, no libraries). Each pair is the SAME scene
 * edited before → after, so the slider compares like with like.
 *
 * ⚠️ The photos are AI-generated demo images (Gemini). Replace them with the
 * client's real job photos — same paths in lib/content-v2.ts — before this
 * version runs ads.
 */
export default function BeforeAfterV2() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const c = beforeAfterV2[active];

  return (
    <section className="bg-navy-800 text-white" aria-labelledby="ba-h2">
      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-accent-400">Before &amp; after</p>
        <h2 id="ba-h2" className="mt-2 text-center font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
          Same slab. Same spot. Level again.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-concrete-200">
          Drag the handle to compare. The small round patches are where the foam went in.
        </p>

        <div role="tablist" aria-label="Choose a project" className="mt-8 flex flex-wrap justify-center gap-2">
          {beforeAfterV2.map((item, i) => (
            <button
              key={item.service}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="ba-panel"
              onClick={() => {
                setActive(i);
                setPos(50);
              }}
              className={`min-h-[44px] rounded-full px-5 text-sm font-bold uppercase tracking-wide transition-colors ${
                i === active ? "bg-accent-600 text-white" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <figure id="ba-panel" role="tabpanel" className="mx-auto mt-8 max-w-4xl">
          <div className="relative aspect-[4/3] select-none overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
            <Image src={c.after} alt={c.afterAlt} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image src={c.before} alt={c.beforeAlt} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            </div>
            <div aria-hidden="true" className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg">
                ⇆
              </span>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-navy-900/85 px-3 py-1 text-xs font-bold uppercase tracking-wide">Before</span>
            <span className="absolute right-3 top-3 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">After</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`Compare before and after: ${c.title}`}
            className="mt-4 h-11 w-full cursor-ew-resize accent-accent-600"
          />
          <figcaption className="sr-only">{c.title}: before and after concrete lifting.</figcaption>
        </figure>
      </div>
    </section>
  );
}
