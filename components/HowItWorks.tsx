import { steps, stepsNote } from "@/lib/content";
import { StepIcon } from "./icons";

/**
 * Timeline layout: icon circles joined by dashed connectors that arc
 * alternately above/below the axis (per the approved reference). Desktop
 * draws the arcs with one SVG behind the circles; mobile stacks vertically
 * with a dashed left rail.
 */
export default function HowItWorks() {
  return (
    <section className="bg-navy-800 text-white" aria-labelledby="how-h2">
      <div className="mx-auto max-w-content px-4 py-12 md:py-16">
        <h2 id="how-h2" className="text-2xl font-bold sm:text-3xl">
          How It Works
        </h2>

        <div className="relative mt-10">
          {/* Dashed arcs between circles — desktop only. Circles sit at
              1/6, 3/6 and 5/6 of the row width; arcs span the gaps. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 14"
            preserveAspectRatio="none"
            className="absolute left-0 top-10 hidden h-14 w-full -translate-y-1/2 md:block"
          >
            <path
              d="M21 7 C 27 1, 40 1, 46 7"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M54 7 C 60 13, 73 13, 79 7"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                {/* Mobile dashed rail connecting to the next step */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-10 top-20 h-[calc(100%-1.5rem)] border-l-2 border-dashed border-white/40 md:hidden"
                  />
                ) : null}

                <span className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-accent-700 shadow-lg shadow-navy-900/30">
                  <StepIcon index={i} className="h-9 w-9" />
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent-600 text-sm font-bold text-white"
                  >
                    {i + 1}
                  </span>
                </span>

                <div className="md:mt-5">
                  <h3 className="text-lg font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-concrete-100">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 text-center font-semibold text-concrete-100">{stepsNote}</p>
      </div>
    </section>
  );
}
