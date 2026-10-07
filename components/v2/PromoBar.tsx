import { promoBar } from "@/lib/content-v2";

/** Floor Daddy's loud offer strip, in Lift + Level orange. White on accent-600 = 4.6:1. */
export default function PromoBar() {
  return (
    <div className="bg-accent-600 px-4 py-2 text-center text-sm font-semibold text-white sm:text-base">
      <span>{promoBar.lead}</span>
      <span className="hidden sm:inline"> — {promoBar.tail}</span>
    </div>
  );
}
