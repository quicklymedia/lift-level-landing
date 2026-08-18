import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import ComparisonTable from "@/components/ComparisonTable";
import ServicesGrid from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Benefits from "@/components/Benefits";
import Reviews from "@/components/Reviews";
import ServiceArea from "@/components/ServiceArea";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import StickyBar from "@/components/StickyBar";
import Footer from "@/components/Footer";

export default function Page({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero service={searchParams.service} />
        <VideoSection />
        <ComparisonTable />
        <ServicesGrid />
        <HowItWorks />
        <BeforeAfterGallery />
        <Benefits />
        <Reviews />
        <ServiceArea />
        <Faq />
        <FinalCta />
      </main>
      <StickyBar />
      <Footer />
    </div>
  );
}
