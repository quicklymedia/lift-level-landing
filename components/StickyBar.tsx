import { business, formatPhone } from "@/lib/content";
import TelLink from "./TelLink";

/** Mobile-only sticky bottom bar: Call Now + Get Free Estimate. */
export default function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-concrete-200 bg-white p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <TelLink phoneDigits={business.phoneDigits} location="sticky_bar" className="btn-secondary">
        {/* Google's call tracking only rewrites a tel: link when the number
            appears in the link's TEXT. A bare "Call Now" is left pointing at
            the real line, so calls from it never count as conversions — this
            was the one link of six that failed to swap in a live test. The
            sr-only number gives the swap something to match, and doubles as
            the accessible label (same pattern as Header's icon-only button). */}
        <span className="sr-only">Call {formatPhone(business.phoneDigits)}</span>
        <span aria-hidden="true">Call Now</span>
      </TelLink>
      <a href="#estimate" className="btn-primary">
        Get Free Estimate
      </a>
    </div>
  );
}
