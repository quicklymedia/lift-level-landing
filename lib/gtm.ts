import { ADS_CONVERSION_SEND_TO } from "./constants";

/** Thin dataLayer helper. Safe to call when GTM is not loaded. */
export function pushEvent(event: string, data: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}

/**
 * Report the Google Ads lead conversion. Call ONLY from the form's success
 * handler. gtag sends the hit via beacon, and the subsequent router.push is
 * client-side (no unload), so the request is not cut off.
 */
export function reportAdsConversion() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("event", "conversion", {
    send_to: ADS_CONVERSION_SEND_TO,
    value: 1.0,
    currency: "USD",
  });
}
