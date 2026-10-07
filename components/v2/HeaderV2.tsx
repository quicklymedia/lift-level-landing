import Image from "next/image";
import { brand, business, formatPhone } from "@/lib/content";
import TelLink from "../TelLink";
import { PhoneIcon } from "./icons-v2";

/**
 * Solid sticky header (Floor Daddy pattern): logo, navy phone pill, orange CTA.
 * Call tracking note: Google's number swap only rewrites a tel: link whose
 * TEXT contains the number, so every phone link keeps the formatted number in
 * its text — visibly on desktop, sr-only on the icon-only mobile button.
 */
export default function HeaderV2() {
  const phone = formatPhone(business.phoneDigits);
  return (
    <header className="sticky top-0 z-50 border-b border-concrete-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-2.5">
        <a href="#top" className="flex min-h-[44px] items-center" aria-label={`${business.name} — back to top`}>
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={brand.logoWidth}
            height={brand.logoHeight}
            sizes="72px"
            priority
            className="h-10 w-auto sm:h-12"
          />
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <TelLink
            phoneDigits={business.phoneDigits}
            location="header"
            className="hidden min-h-[44px] items-center gap-2 rounded-full bg-navy-800 px-5 font-semibold text-white hover:bg-navy-700 md:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {phone}
          </TelLink>
          <TelLink
            phoneDigits={business.phoneDigits}
            location="header"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-white md:hidden"
          >
            <span className="sr-only">Call {phone}</span>
            <PhoneIcon className="h-5 w-5" />
          </TelLink>
          <a
            href="#estimate"
            className="inline-flex min-h-[44px] items-center rounded-full bg-accent-600 px-4 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent-800 sm:px-6"
          >
            Free estimate
          </a>
        </div>
      </div>
    </header>
  );
}
