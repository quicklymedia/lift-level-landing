import Image from "next/image";
import { business, formatPhone, getHero, trustChips } from "@/lib/content";
import TelLink from "./TelLink";

export default function Hero({ service }: { service?: string }) {
  const hero = getHero(service);
  return (
    <section className="bg-navy-800 text-white" aria-labelledby="hero-h1">
      <div className="mx-auto grid max-w-content gap-8 px-4 pb-12 pt-28 md:grid-cols-2 md:items-center md:pb-20 md:pt-36">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-concrete-200">
            Atlanta&rsquo;s Concrete Leveling Experts
          </p>
          <h1 id="hero-h1" className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {hero.h1}
          </h1>
          <p className="mt-4 text-lg text-concrete-100">{hero.subheadline}</p>
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
            order-first: on mobile the photo sits ABOVE the headline; on md+ it
            returns to the right-hand column. */}
        <div className="relative order-first aspect-[4/3] w-full overflow-hidden rounded-xl md:order-none">
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
