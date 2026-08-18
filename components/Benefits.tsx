import { benefits } from "@/lib/content";
import { BenefitIcon, type BenefitIconName } from "./icons";

/** Icon per benefit, keyed by position in the content config. */
const benefitIcons: BenefitIconName[] = [
  "no-demolition",
  "ready",
  "cost",
  "lasting",
  "clean",
  "quiet",
];

/**
 * Cards fold like a page corner on hover (.fold-card in globals.css) while
 * the benefit icon springs in. Hover-only states exclude touch users, so on
 * mobile (< md) the icon is always visible and the fold stays closed.
 */
export default function Benefits() {
  return (
    <section className="mx-auto max-w-content px-4 py-12 md:py-16" aria-labelledby="benefits-h2">
      <h2 id="benefits-h2" className="text-2xl font-bold sm:text-3xl">
        Why Homeowners Choose Lifting
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <li
            key={b.title}
            className="fold-card group relative overflow-hidden rounded-xl border border-concrete-200 bg-white p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-900/10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-600/10 text-accent-700 transition-all duration-300 ease-out md:-translate-x-2 md:scale-50 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:scale-100 md:group-hover:opacity-100">
                <BenefitIcon name={benefitIcons[i]} className="h-6 w-6" />
              </span>
              <h3 className="font-semibold transition-transform duration-300 md:-translate-x-14 md:group-hover:translate-x-0">
                {b.title}
              </h3>
            </div>
            <p className="mt-2 text-concrete-500">{b.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
