import { business } from "@/lib/content";
import TelLink from "./TelLink";

/** Mobile-only sticky bottom bar: Call Now + Get Free Estimate. */
export default function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-concrete-200 bg-white p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <TelLink phoneDigits={business.phoneDigits} location="sticky_bar" className="btn-secondary">
        Call Now
      </TelLink>
      <a href="#estimate" className="btn-primary">
        Get Free Estimate
      </a>
    </div>
  );
}
