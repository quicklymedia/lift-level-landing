import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { business, formatPhone } from "@/lib/content";

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
        {/* Google tag (gtag.js) — Google Ads AW-18371630260 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ADS_ID}');`}
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
        {/* The widget renders in an open shadow root, unreachable from page CSS.
            On mobile its bubble (bottom:20px) covers the sticky CTA bar, so we
            inject a style INTO the shadow root lifting it above the bar. */}
        <Script id="chat-widget-offset" strategy="lazyOnload">
          {`(function(){var tries=0;var t=setInterval(function(){var w=document.querySelector('chat-widget');if(w&&w.shadowRoot){var s=document.createElement('style');s.textContent='@media (max-width:767px){.lc_text-widget,.lc_text-widget--bubble{bottom:88px !important;}}';w.shadowRoot.appendChild(s);clearInterval(t);}else if(++tries>120){clearInterval(t);}},500);})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
