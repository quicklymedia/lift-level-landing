import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { business, formatPhone } from "@/lib/content";
import { CALL_CONVERSION_SEND_TO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Concrete Leveling Atlanta | Lift + Level Concrete — Free Estimates",
  description:
    "Sunken concrete? Lift it, level it — don't replace it. Polyurethane concrete lifting in Atlanta, GA for driveways, patios, pool decks and more. Done in hours, ready immediately. Free estimates.",
  // Live host of this landing (the client's main site stays on business.url).
  metadataBase: new URL("https://estimate.liftandlevelconcrete.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
// Google Ads tag (gtag.js). Public ID, safe in source; env var allows override.
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18371630260";
/**
 * Number Google's call-tracking swaps out. It must match the number as
 * RENDERED on the page character for character, so it is derived from the same
 * formatPhone() every visible number uses — swapping NEXT_PUBLIC_PHONE_NUMBER
 * (e.g. when the call-tracking line arrives) can't silently break the swap.
 */
const CALL_DISPLAY_NUMBER = formatPhone(business.phoneDigits);

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  slogan: business.tagline,
  telephone: `+1${business.phoneDigits}`,
  url: business.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.addressLocality,
    addressRegion: business.addressRegion,
    addressCountry: "US",
  },
  areaServed: "Atlanta, GA and surrounding areas",
  description:
    "Polyurethane concrete lifting and leveling for driveways, sidewalks, patios, pool decks, garage floors, foundations, and void filling.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Google tag (gtag.js) — Google Ads AW-18371630260.
            The call-tracking config lives in the SAME inline block as the base
            config, not in a <Script> of its own: the swap silently no-ops if it
            runs before gtag() is defined, and one block makes that impossible. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ADS_ID}');
gtag('config', '${CALL_CONVERSION_SEND_TO}', {'phone_conversion_number': '${CALL_DISPLAY_NUMBER}'});`}
        </Script>
        {GTM_ID ? (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* GHL chat widget — the A2P 10DLC registration runs on the chat-widget
            opt-in flow (PM decision, 2026-08), so the widget is THE opt-in
            source and the form's TCPA checkbox was removed instead.
            lazyOnload keeps it off the critical path. */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a74a20457d382a07715e8bd"
          data-source="WEB_USER"
          strategy="lazyOnload"
        />
        {/* The widget renders in an open shadow root, unreachable from page CSS,
            so we inject a style INTO the shadow root. Two mobile fixes:
            1. its bubble (bottom:20px) covers the sticky CTA bar — lift it.
            2. the auto-opening greeting (.lc_text-widget--prompt) is fixed
               position and sat on top of whatever was behind it: the hero
               subheadline on load, and the lead form's EMAIL FIELD once
               scrolled down. Hidden under 768px; the bubble stays tappable,
               so chat is still one tap away for anyone who wants it. */}
        <Script id="chat-widget-offset" strategy="lazyOnload">
          {`(function(){var tries=0;var t=setInterval(function(){var w=document.querySelector('chat-widget');if(w&&w.shadowRoot){var s=document.createElement('style');s.textContent='@media (max-width:767px){.lc_text-widget,.lc_text-widget--bubble{bottom:88px !important;}.lc_text-widget--prompt{display:none !important;}}';w.shadowRoot.appendChild(s);clearInterval(t);}else if(++tries>120){clearInterval(t);}},500);})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
