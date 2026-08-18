"use client";

import Script from "next/script";

/**
 * GHL native embedded form (replaces the custom LeadForm — team decision,
 * Aug 2026). Submissions create contacts directly in GHL; the /api/lead
 * webhook route is no longer in this path.
 *
 * ⚠️ For Google Ads tracking to work, the form MUST be configured in the GHL
 * form builder with On Submit → Redirect to
 * https://estimate.liftandlevelconcrete.com/thankyou — the conversion event
 * now fires on that page's load.
 *
 * The wrapper reserves the embed height up front so the iframe doesn't cause
 * CLS; form_embed.js then manages the height dynamically.
 */
export default function GhlForm() {
  return (
    <div className="min-h-[813px] overflow-hidden rounded-xl bg-white">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/1yvrck56rQqbXgZkqzuT"
        style={{ width: "100%", height: "100%", minHeight: 813, border: "none", borderRadius: "8px" }}
        id="inline-1yvrck56rQqbXgZkqzuT"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Form 0"
        data-height="813"
        data-layout-iframe-id="inline-1yvrck56rQqbXgZkqzuT"
        data-form-id="1yvrck56rQqbXgZkqzuT"
        title="Form 0"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
