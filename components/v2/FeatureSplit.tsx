import Image from "next/image";
import { featureSplit, v2Images } from "@/lib/content-v2";
import { CheckIcon } from "./icons-v2";

/** Floor Daddy's text + crew-photo split with an offer sticker on the photo. */
export default function FeatureSplit() {
  return (
    <section className="bg-white" aria-labelledby="feature-h2">
      <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 id="feature-h2" className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-navy-800 sm:text-4xl">
            {featureSplit.heading}
          </h2>
          <p className="mt-3 text-xl text-concrete-500">{featureSplit.sub}</p>
          <ul className="mt-8 space-y-5">
            {featureSplit.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="leading-relaxed text-ink">{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#estimate"
            className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-accent-600 px-7 text-base font-bold uppercase tracking-wide text-white hover:bg-accent-800"
          >
            Free on-site estimate
          </a>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image src={v2Images.crew.src} alt={v2Images.crew.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          {/* Sticker — Floor Daddy's "FREE Air Duct Cleaning" overlay. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-5 left-4 -rotate-3 rounded-2xl border-4 border-white bg-[#FFC83D] px-5 py-3 text-navy-900 shadow-xl sm:left-[-1.5rem]"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em]">{featureSplit.sticker.top}</p>
            <p className="font-display text-4xl font-black uppercase leading-none">{featureSplit.sticker.big}</p>
            <p className="mt-1 rounded bg-navy-900 px-2 py-0.5 text-center text-[11px] font-bold uppercase tracking-wide text-white">
              {featureSplit.sticker.bottom}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
