import Image from "next/image";
import { offerBand } from "@/lib/content-v2";
import { ArrowRight } from "./icons-v2";

/**
 * Floor Daddy's yellow "SEXY FLOORING | AFFORDABLE PRICES | QUALITY INSTALL"
 * band, rebuilt around the client's own tagline. Safety-yellow suits a
 * concrete crew; navy-900 on #FFC83D is 11.9:1.
 */
export default function OfferBand() {
  return (
    <section className="bg-gradient-to-b from-[#FFD45C] to-[#FFC23D]" aria-labelledby="offer-h2">
      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <h2
          id="offer-h2"
          className="text-center font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
        >
          {offerBand.beats.map((beat, i) => (
            <span key={beat}>
              {i > 0 ? <span aria-hidden="true" className="mx-2 text-accent-600 sm:mx-3">|</span> : null}
              <span className="whitespace-nowrap">{beat}</span>
            </span>
          ))}
        </h2>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {offerBand.cards.map((card) => (
            <li key={card.title} className="overflow-hidden rounded-3xl bg-navy-900 shadow-xl shadow-navy-900/20">
              <div className="relative aspect-[4/3]">
                <Image src={card.image.src} alt={card.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6 text-white">
                <h3 className="font-display text-2xl font-black uppercase leading-tight">{card.title}</h3>
                <p className="mt-2 text-concrete-200">{card.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <a
            href="#estimate"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-navy-900 px-8 text-base font-bold uppercase tracking-wide text-white hover:bg-navy-800"
          >
            Get my free estimate
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
