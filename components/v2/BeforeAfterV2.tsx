"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { beforeAfterV2 } from "@/lib/content-v2";

/**
 * One large comparison slider with service tabs — Floor Daddy's "Same room.
 * Same light. Completely new life." block. clip-path + pointer events on the
 * photo, and an ARIA slider handle for keyboards (no libraries). Each pair is the SAME scene
 * edited before → after, so the slider compares like with like.
 *
 * ⚠️ The photos are AI-generated demo images (Gemini). Replace them with the
 * client's real job photos — same paths in lib/content-v2.ts — before this
 * version runs ads.
 */
export default function BeforeAfterV2() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const c = beforeAfterV2[active];

  const clamp = (n: number) => Math.min(100, Math.max(0, n));
  const moveTo = (clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (r && r.width) setPos(clamp(((clientX - r.left) / r.width) * 100));
  };
  const onKey = (e: KeyboardEvent<HTMLSpanElement>) => {
    const step = e.shiftKey ? 10 : 5;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown" ? pos - step
      : e.key === "ArrowRight" || e.key === "ArrowUp" ? pos + step
      : e.key === "Home" ? 0
      : e.key === "End" ? 100
      : null;
    if (next === null) return;
    e.preventDefault();
    setPos(clamp(next));
  };

  return (
    <section className="bg-navy-800 text-white" aria-labelledby="ba-h2">
      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-accent-400">Before &amp; after</p>
        <h2 id="ba-h2" className="mt-2 text-center font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
          Same slab. Same spot. Level again.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-concrete-200">
          Drag across the photo to compare. The small round patches are where the foam went in.
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
          {/* Drag anywhere on the photo (mouse or finger), or focus the handle
              and use the arrow keys. touch-action: pan-y keeps vertical page
              scrolling on phones; only sideways drags move the divider. */}
          <div
            ref={frame}
            onPointerDown={(e) => {
              dragging.current = true;
              moveTo(e.clientX);
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl shadow-2xl shadow-black/40"
          >
            <Image src={c.after} alt={c.afterAlt} fill draggable={false} sizes="(min-width: 896px) 896px, 100vw" className="pointer-events-none object-cover" />
            <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image src={c.before} alt={c.beforeAlt} fill draggable={false} sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow" style={{ left: `${pos}%` }}>
              <span
                role="slider"
                tabIndex={0}
                aria-label={`Compare before and after: ${c.title}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                aria-valuetext={`${Math.round(pos)}% before`}
                onKeyDown={onKey}
                className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg ring-accent-600 transition-transform focus-visible:outline-none focus-visible:ring-4 active:scale-95"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
                </svg>
              </span>
            </div>
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-navy-900/85 px-3 py-1 text-xs font-bold uppercase tracking-wide">Before</span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">After</span>
          </div>
          <figcaption className="sr-only">{c.title}: before and after concrete lifting.</figcaption>
        </figure>
      </div>
    </section>
  );
}
