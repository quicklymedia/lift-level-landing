import { included } from "@/lib/content-v2";
import { IncludedIconV2 } from "./icons-v2";

/** Dark "Included with every lift" grid — Floor Daddy's "Included with the sale" block. */
export default function Included() {
  return (
    <section className="bg-navy-900 text-white" aria-labelledby="included-h2">
      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-accent-400">{included.eyebrow}</p>
        <h2 id="included-h2" className="mt-2 text-center font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
          {included.heading}
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
          {included.items.map((item) => (
            <li key={item.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent-400 ring-1 ring-white/10">
                <IncludedIconV2 name={item.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-base font-extrabold uppercase tracking-wide sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-concrete-200">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
