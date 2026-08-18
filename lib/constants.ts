/**
 * GHL PAYLOAD KEYS — SINGLE SOURCE OF TRUTH
 *
 * ⚠️ PAYLOAD COMPATIBILITY: the team already runs GHL Inbound Webhooks on
 * other landings (e.g. Mi Hogar Atlanta, Luis Ortiz). BEFORE connecting
 * GHL_WEBHOOK_URL, compare these keys against the payload of those landings
 * and rename here if they differ, so the existing GHL field mapping can be
 * copied as-is into the new workflow. Changing a key here changes it
 * everywhere (form → route handler → webhook → API fallback).
 */
export const PAYLOAD_KEYS = {
  firstName: "first_name",
  lastName: "last_name",
  phone: "phone",
  email: "email",
  zip: "zip",
  service: "service",
  message: "message",
  tcpaConsent: "tcpa_consent",
  sourceUrl: "source_url",
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
} as const;

export type LeadPayload = Record<string, string | boolean>;

/** UTM params captured from the landing URL into hidden form fields. */
export const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** GTM dataLayer event names — documented in README for Ads conversion setup. */
export const GTM_EVENTS = {
  formStart: "form_start",
  formSubmit: "form_submit",
  callClick: "call_click",
} as const;

/**
 * Google Ads conversion (form lead). Fired from the form's SUCCESS handler —
 * never on button click (would count failed validations) and never on page
 * load. The site navigates client-side to /thankyou, so a URL-based
 * conversion alone would not register; this explicit event is the source of
 * truth for Ads.
 */
export const ADS_CONVERSION_SEND_TO = "AW-18371630260/UUqaCOzUlNwcELSpo7hE";
