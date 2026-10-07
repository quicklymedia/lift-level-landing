import PromoBar from "@/components/v2/PromoBar";
import HeaderV2 from "@/components/v2/HeaderV2";
import HeroV2 from "@/components/v2/HeroV2";
import Ticker from "@/components/v2/Ticker";
import Included from "@/components/v2/Included";
import StepsV2 from "@/components/v2/StepsV2";
import OfferBand from "@/components/v2/OfferBand";
import BeforeAfterV2 from "@/components/v2/BeforeAfterV2";
import FeatureSplit from "@/components/v2/FeatureSplit";
import ServicesV2 from "@/components/v2/ServicesV2";
import ReviewsV2 from "@/components/v2/ReviewsV2";
import VideoSection from "@/components/VideoSection";
import ComparisonTable from "@/components/ComparisonTable";
import ServiceArea from "@/components/ServiceArea";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import StickyBar from "@/components/StickyBar";
import Footer from "@/components/Footer";

/**
 * Main landing (Floor Daddy-inspired redesign, live since Oct 2026). It was
 * reviewed at /v2 first; /v2 now redirects here (next.config.mjs).
 *
 * The previous design's sections (Header, Hero, ServicesGrid, HowItWorks,
 * BeforeAfterGallery, Benefits, Reviews) are still in components/ — Header
 * is used by /thankyou and the legal pages, and the rest make a rollback a
 * one-file revert of this page.
 *
 * Shared pieces (video, comparison, FAQ, service area, the GHL form, sticky
 * bar, footer) are the same components as before, so the form, call
 * tracking and conversion tracking are unchanged.
 */
export default function Page({ searchParams }: { searchParams: { service?: string } }) {
  return (
    <div id="top" className="v2">
      <PromoBar />
      <HeaderV2 />
      <main>
        <HeroV2 service={searchParams.service} />
        <Ticker />
        <Included />
        <StepsV2 />
        <VideoSection />
        <OfferBand />
        <BeforeAfterV2 />
        <ComparisonTable />
        <FeatureSplit />
        <ServicesV2 />
        <ReviewsV2 />
        <ServiceArea />
        <Faq />
        <FinalCta />
      </main>
      <StickyBar />
      <Footer />
    </div>
  );
}
