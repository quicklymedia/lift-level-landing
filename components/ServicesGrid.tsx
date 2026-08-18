import { services } from "@/lib/content";
import { ServiceIcon } from "./icons";

/**
 * Each card links back to the page with ?service= so the hero, form select,
 * and hero image re-match, then anchors to the form.
 */
export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-content px-4 py-12 md:py-16" aria-labelledby="services-h2">
      <h2 id="services-h2" className="text-2xl font-bold sm:text-3xl">
        What We Lift &amp; Level
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug} className="rounded-xl border border-concrete-200 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-600/10 text-accent-700">
              <ServiceIcon slug={s.slug} className="h-7 w-7" />
            </span>
            <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
            <p className="mt-1 text-concrete-500">{s.description}</p>
            <a
              href={`/?service=${s.slug}#estimate`}
              className="mt-3 inline-flex min-h-[44px] items-center font-semibold text-accent-700 hover:text-accent-800"
            >
              Get estimate <span aria-hidden="true" className="ml-1">→</span>
              <span className="sr-only"> for {s.name.toLowerCase()}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
