"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { brand, business, formatPhone } from "@/lib/content";
import TelLink from "./TelLink";

/**
 * Floating "dynamic island" header: a permanently visible pill detached from
 * the viewport edges, using frosted glass (backdrop-blur + translucent white).
 *
 * Why LIGHT glass and not dark: the brand wordmark is dark gray on transparent,
 * so it only reads against a light surface. Light glass also keeps navy text
 * above 7:1 contrast over both the dark hero and the white sections below.
 *
 * On scroll the island narrows and gains opacity — the Apple-style morph.
 * Transitions are neutralized by the global prefers-reduced-motion rule.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <div
        className={`mx-auto flex items-center justify-between gap-2 rounded-full border border-white/60 shadow-lg shadow-navy-900/10 backdrop-blur-xl transition-all duration-300 sm:gap-4 ${
          scrolled
            ? "max-w-2xl bg-white/85 px-3 py-1.5 sm:px-4"
            : "max-w-4xl bg-white/70 px-3 py-2 sm:px-5 sm:py-2.5"
        }`}
      >
        <a
          href="#top"
          className="flex min-h-[44px] items-center pl-1"
          aria-label={`${business.name} — back to top`}
        >
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={brand.logoWidth}
            height={brand.logoHeight}
            /* Renders ~60px wide; without this Next would ship a 750w/1920w file. */
            sizes="64px"
            priority
            className={`w-auto transition-all duration-300 ${scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"}`}
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Full number on desktop; icon-only on mobile to keep the island compact. */}
          <TelLink
            phoneDigits={business.phoneDigits}
            location="header"
            className="hidden min-h-[44px] items-center rounded-full px-2 font-semibold text-navy-800 hover:text-accent-700 md:flex"
          >
            {formatPhone(business.phoneDigits)}
          </TelLink>
          <TelLink
            phoneDigits={business.phoneDigits}
            location="header"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-800/25 text-navy-800 hover:bg-navy-800/10 md:hidden"
          >
            <span className="sr-only">Call {formatPhone(business.phoneDigits)}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </TelLink>
          <a
            href="#estimate"
            className="btn-primary !px-4 !py-2.5 text-sm sm:!px-5 sm:text-base"
          >
            Free Estimate
          </a>
        </div>
      </div>
    </header>
  );
}
