import { steps, stepsNote } from "@/lib/content";
import { TruckIcon } from "./icons-v2";

/**
 * Floor Daddy's "3-step experience": outlined step boxes with the middle one
 * filled, over a progress line a service truck drives along. The truck only
 * animates when motion is allowed (global prefers-reduced-motion rule).
 */
export default function StepsV2() {
  return (
    <section className="bg-white" aria-labelledby="steps-h2">
      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-accent-700">The Lift + Level way</p>
        <h2 id="steps-h2" className="mt-2 text-center font-display text-3xl font-black uppercase tracking-tight text-navy-800 sm:text-5xl">
          Fixed in 3 steps
        </h2>
        <p className="mt-3 text-center text-sm font-semibold uppercase tracking-[0.15em] text-concrete-500">{stepsNote}</p>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => {
            const featured = i === 1;
            return (
              <li key={step.title} className="flex flex-col items-center text-center">
                <span
                  className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl border-2 font-display ${
                    featured
                      ? "border-navy-800 bg-navy-800 text-white shadow-xl shadow-navy-900/25"
                      : "border-navy-800 bg-white text-navy-800"
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">Step</span>
                  <span className="text-4xl font-black leading-none">{i + 1}</span>
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold uppercase text-navy-800">{step.title}</h3>
                <p className="mt-2 max-w-xs text-concrete-500">{step.description}</p>
              </li>
            );
          })}
        </ol>

        {/* Progress line + truck (decorative). */}
        <div aria-hidden="true" className="relative mx-auto mt-12 hidden h-12 max-w-3xl md:block">
          <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-concrete-300" />
          <div className="steps-truck absolute top-1/2 flex h-12 w-16 -translate-y-1/2 items-center justify-center rounded-xl bg-accent-600 text-white shadow-lg shadow-accent-600/30">
            <TruckIcon className="h-8 w-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
