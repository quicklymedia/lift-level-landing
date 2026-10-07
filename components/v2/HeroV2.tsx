import Image from "next/image";
import { business, formatPhone, getHero, services, trustChips } from "@/lib/content";
import { heroV2, heroPicker, savingsShort, v2Images } from "@/lib/content-v2";
import TelLink from "../TelLink";
import { ArrowRight, CheckIcon, PhoneIcon } from "./icons-v2";

/**
 * Full-bleed hero (Floor Daddy): real-feeling job photo, heavy uppercase
 * beats, an offer sticker, and a form-style card on desktop.
 *
 * Message match: the eyebrow names the ?service= the ad promised
 * ("Driveway lifting & leveling"), and the per-service subheadline still
 * comes from getHero(), so Ads relevance doesn't drop in the redesign.
 *
 * Mobile: the photo is the BACKGROUND, so the offer and both CTAs sit above
 * the fold — the problem the stacked layout had (photo first, offer below).
 */
export default function HeroV2({ service }: { service?: string }) {
  const hero = getHero(service);
  const svc = services.find((s) => s.slug === service);
  const eyebrow = svc ? `${svc.name} lifting & leveling · Atlanta` : heroV2.eyebrow;
  const phone = formatPhone(business.phoneDigits);

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white" aria-labelledby="hero-h1">
      <Image
        src={v2Images.hero.src}
        alt={v2Images.hero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      {/* Contrast scrim: copy sits on ≥85% navy, so white text clears AA
          regardless of what the photo does underneath. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/90 via-navy-900/80 to-navy-900/95 lg:bg-gradient-to-r lg:from-navy-900/95 lg:via-navy-900/80 lg:to-navy-900/20"
      />

      <div className="mx-auto grid max-w-content gap-10 px-4 pb-14 pt-10 md:pb-20 md:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-400">{eyebrow}</p>

          <h1
            id="hero-h1"
            className="mt-3 font-display text-[2.75rem] font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {heroV2.lines.map((line, i) => (
              <span key={line} className={`block [text-wrap:balance] ${i === heroV2.accentLine ? "text-accent-400" : ""}`}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-concrete-100">{heroV2.sub}</p>

          {/* Offer sticker — Floor Daddy's "$35 ROOM" graphic, in brand colours.
              Text follows the PROVISIONAL_CLAIM swap automatically. */}
          <div className="mt-6 inline-flex -rotate-2 items-center gap-3 rounded-xl border-2 border-white bg-accent-600 px-4 py-2.5 shadow-lg shadow-black/30">
            <span className="whitespace-nowrap font-display text-xl font-black uppercase leading-none sm:text-3xl">{savingsShort}</span>
            <span className="text-xs font-semibold uppercase leading-tight tracking-wide text-white/90">
              vs. full
              <br />
              replacement*
            </span>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Why homeowners choose us">
            {trustChips.map((chip) => (
              <li key={chip} className="flex items-center gap-1.5 text-sm font-semibold">
                <CheckIcon className="h-4 w-4 text-accent-400" />
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#estimate"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-accent-600 px-7 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-accent-600/30 hover:bg-accent-800"
            >
              Get my free estimate
              <ArrowRight className="h-5 w-5" />
            </a>
            <TelLink
              phoneDigits={business.phoneDigits}
              location="hero"
              className="btn-shine inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-md hover:bg-white/20"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {phone}
            </TelLink>
          </div>

          {heroV2.googleRating ? (
            <p className="mt-6 text-sm font-semibold">
              Rated {heroV2.googleRating.score} <span className="text-accent-400" aria-hidden="true">★★★★★</span>{" "}
              <span className="text-concrete-200">({heroV2.googleRating.count} Google reviews)</span>
            </p>
          ) : null}

          <p className="mt-6 text-xs text-concrete-200">*{hero.subheadline}</p>
        </div>

        {/* Floor Daddy puts a form step in the hero. Ours is a one-tap service
            picker that hands off to the full form — a low-effort first click. */}
        <div className="hidden rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-black/40 lg:block">
          <p className="rounded-lg bg-accent-600 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white">
            {heroPicker.title}
          </p>
          <p className="mt-5 font-display text-lg font-extrabold">{heroPicker.prompt}</p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {heroPicker.options.map((o) => (
              <li key={o.slug}>
                <a
                  href="#estimate"
                  className="flex min-h-[48px] items-center justify-between rounded-lg border-2 border-concrete-200 px-3.5 text-sm font-semibold hover:border-accent-600 hover:bg-accent-600/5"
                >
                  {o.label}
                  <ArrowRight className="h-4 w-4 text-accent-700" />
                </a>
              </li>
            ))}
          </ul>
          <TelLink
            phoneDigits={business.phoneDigits}
            location="hero_card"
            className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-navy-800 text-sm font-bold text-white hover:bg-navy-700"
          >
            <PhoneIcon className="h-4 w-4" />
            Or call {phone}
          </TelLink>
          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-concrete-500">
            {heroPicker.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
