import { faqs } from "@/lib/content";
import FaqAccordion from "./FaqAccordion";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section className="bg-concrete-50" aria-labelledby="faq-h2">
      <div className="mx-auto max-w-content px-4 py-12 md:py-16">
        <h2 id="faq-h2" className="text-2xl font-bold sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <FaqAccordion />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
