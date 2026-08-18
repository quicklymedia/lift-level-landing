import { business, formatPhone } from "@/lib/content";
import TelLink from "./TelLink";

export default function Footer() {
  return (
    <footer className="bg-navy-900 pb-20 text-concrete-200 md:pb-0">
      <div className="mx-auto max-w-content px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* NAP — keep identical to the Google Business Profile listing */}
          <address className="not-italic">
            <p className="font-semibold text-white">{business.name}</p>
            <p>
              {business.addressLocality}, {business.addressRegion}
            </p>
            <TelLink
              phoneDigits={business.phoneDigits}
              location="footer"
              className="inline-flex min-h-[44px] items-center underline hover:text-white"
            >
              {formatPhone(business.phoneDigits)}
            </TelLink>
          </address>
          <nav aria-label="Legal">
            <ul className="flex gap-6">
              <li>
                <a href="/terms" className="inline-flex min-h-[44px] items-center underline hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy" className="inline-flex min-h-[44px] items-center underline hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-sm">
          © {new Date().getFullYear()} {business.name}. All rights reserved. —{" "}
          {business.tagline}
        </p>
      </div>
    </footer>
  );
}
