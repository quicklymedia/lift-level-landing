import { comparison } from "@/lib/content";

/** Stacked cards on mobile, two columns from md — never a horizontal scroll. */
export default function ComparisonTable() {
  return (
    <section className="bg-concrete-50" aria-labelledby="compare-h2">
      <div className="mx-auto max-w-content px-4 py-12 md:py-16">
        <h2 id="compare-h2" className="text-2xl font-bold sm:text-3xl">
          {comparison.heading}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-concrete-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-concrete-500">
              {comparison.replaceLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              {comparison.rows.map((row) => (
                <li key={row.replace} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-0.5 font-bold text-concrete-500">✕</span>
                  <span>{row.replace}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glow-card relative rounded-xl border-2 border-accent-600 bg-white p-5">
            <span className="absolute -top-3 left-5 rounded-full bg-accent-600 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
              The smart way
            </span>
            <h3 className="text-lg font-semibold text-accent-700">{comparison.liftLabel}</h3>
            <ul className="mt-4 space-y-3">
              {comparison.rows.map((row) => (
                <li key={row.lift} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-0.5 font-bold text-accent-700">✓</span>
                  <span className="font-medium">{row.lift}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
