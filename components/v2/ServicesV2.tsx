import Image from "next/image";
import { services } from "@/lib/content";
import { serviceImages } from "@/lib/content-v2";
import { ArrowRight } from "./icons-v2";

/**
 * Photo cards (Floor Daddy's carpet / pet / kid-friendly cards). The photos
 * show the PROBLEM — visitors from Ads recognise their own sunken slab.
 */
export default function ServicesV2() {
  return (
    <section className="bg-concrete-50" aria-labelledby="services-h2">
      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <h2 id="services-h2" className="font-display text-3xl font-black uppercase tracking-tight text-navy-800 sm:text-5xl">
          What we lift &amp; level
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-concrete-500">
          If it&rsquo;s concrete and it&rsquo;s sinking, we can usually save it.
        </p>
        {/* lg: the lead card fills 2×2 of the 4-col grid, the next four fill
            the rest of those rows, and cards 6–7 go half-width so the last
            row closes without a hole. */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li
              key={s.slug}
              className={`group overflow-hidden rounded-3xl bg-navy-900 text-white shadow-lg shadow-navy-900/10 ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : i >= 5 ? "lg:col-span-2" : ""
              }`}
            >
              <a href="#estimate" className="flex h-full flex-col">
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : i >= 5 ? "aspect-[4/3] lg:aspect-[2/1]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={serviceImages[s.slug]}
                    alt=""
                    fill
                    sizes={
                      i === 0 || i >= 5
                        ? "(min-width: 1024px) 50vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-black uppercase">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-concrete-200">{s.description}</p>
                  <span className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent-400">
                    Get estimate <ArrowRight className="h-4 w-4" />
                    <span className="sr-only"> for {s.name.toLowerCase()}</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
