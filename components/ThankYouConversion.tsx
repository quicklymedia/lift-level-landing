"use client";

import { useEffect, useRef } from "react";
import { reportAdsConversion } from "@/lib/gtm";

/**
 * Fires the Google Ads lead conversion on /thankyou load. This page is only
 * reachable after a form submission (GHL form redirect), it's noindex, and
 * the Ads conversion action should count "One per click", so refreshes don't
 * inflate reported conversions.
 */
export default function ThankYouConversion() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    reportAdsConversion();
  }, []);
  return null;
}
