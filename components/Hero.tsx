import Image from "next/image";
import { business, formatPhone, getHero, trustChips } from "@/lib/content";
import TelLink from "./TelLink";

/**
 * Splits the headline around its emphasis phrase so that half can carry the
 * accent colour. Returns the whole string unsplit when there is no emphasis or
 * the phrase isn't found, so a copy edit can never break the headline.
 */
function splitHeadline(h1: string, emphasis?: string) {
  if (!emphasis) return null;
  const i = h1.indexOf(emphasis);
  if (i === -1) return null;
  return { before: h1.slice(0, i), match: emphasis, after: h1.slice(i + emphasis.length) };
}

export default function Hero({ service }: { service?: string }) {
  const hero = getHero(service);
  const parts = splitHeadline(hero.h1, hero.emphasis);
  return (
    <section className="bg-navy-800 text-white" aria-labelledby="hero-h1">
      <div className="mx-auto grid max-w-content gap-8 px-4 pb-12 pt-28 md:grid-cols-2 md:items-center md:pb-20 md:pt-36">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-concrete-200">
            Atlanta&rsquo;s Concrete Leveling Experts
          </p>
          {/* Display face, heavier weight and negative tracking: at this size the
              default stack reads like body copy scaled up. The emphasis half is
              accent-400 — 5.8:1 on navy, so the contrast still clears AA. */}
          <h1
            id="hero-h1"
            className="font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {parts ? (
              <>
                {parts.before}
                <span className="text-accent-400">{parts.match}</span>
                {parts.after}
              </>
            ) : (
              hero.h1
            )}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-concrete-100 sm:text-xl">
            {hero.subheadline}
          </p>
          <p className="mt-2 text-base font-semibold text-concrete-200">{business.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Why homeowners choose us">
            {trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-medium"
              >
                {chip}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#estimate" className="btn-primary">
              Get My Free Estimate
            </a>
            <TelLink
              phoneDigits={business.phoneDigits}
              location="hero"
              className="btn btn-shine border border-white/60 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            >
              Call {formatPhone(business.phoneDigits)}
            </TelLink>
          </div>
        </div>

        {/* LCP element: priority, no lazy loading. Aspect ratio is reserved by the
            wrapper so the image swap can never cause layout shift.
            The photo deliberately follows the copy on mobile. It used to be
            order-first, which filled ~520px of an 812px screen and pushed the
            H1, the value prop AND both CTAs below the fold — visitors landed on
            a photo with no offer attached. On md+ the two-column grid puts it
            in the right-hand column regardless of source order. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={hero.imageSrc}
            alt={hero.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
