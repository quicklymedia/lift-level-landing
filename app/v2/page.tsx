import type { Metadata } from "next";
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
 * V2 REDESIGN — client preview at /v2 (Floor Daddy-inspired).
 *
 * Isolated on purpose: the live page at / is untouched, ads keep landing
 * there, and /v2 is noindex. To promote v2 to the main page once approved,
 * render <V2Page /> from app/page.tsx (or move this file's body there).
 *
 * Shared pieces (video, comparison, FAQ, service area, the GHL form, sticky
 * bar, footer) are the SAME components as the live page, so the form,
 * call tracking and conversion tracking behave identically.
 */
export const metadata: Metadata = {
  title: "Concrete Leveling Atlanta | Lift + Level Concrete — Free Estimates",
  robots: { index: false, follow: false },
};

export default function V2Page({ searchParams }: { searchParams: { service?: string } }) {
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
