"use client";

import Script from "next/script";

/**
 * GHL native embedded SURVEY — the page's lead form (team decision, Oct 2026).
 * Three steps: name → phone/email/ZIP → service + terms consent. Submissions
 * create contacts directly in GHL; the /api/lead webhook route is not in
 * this path.
 *
 * Replaced the single-page GHL form `1yvrck56rQqbXgZkqzuT` (Aug–Oct 2026).
 * To roll back, restore that iframe from git history.
 *
 * ⚠️ For Google Ads tracking to work, the survey MUST be configured in GHL
 * with its final action → Redirect to
 * https://estimate.liftandlevelconcrete.com/thankyou — the conversion event
 * fires on that page's load.
 *
 * The wrapper reserves the first step's height so the iframe doesn't cause
 * CLS; form_embed.js then resizes it as the visitor moves between steps.
 */
export default function GhlForm() {
  return (
    <div className="min-h-[506px] overflow-hidden rounded-xl bg-white">
      <iframe
        src="https://api.leadconnectorhq.com/widget/survey/FhcToPU99ACV7MGOkmXV"
        style={{ width: "100%", border: "none" }}
        scrolling="no"
        id="FhcToPU99ACV7MGOkmXV"
        title="Free in-home estimate"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
