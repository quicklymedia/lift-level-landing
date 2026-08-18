import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business, formatPhone } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service | Lift + Level Concrete",
  description: "Terms governing the use of the Lift + Level Concrete website.",
};

/**
 * Standard template for a local-services lead site — have the client's
 * counsel review before treating it as legal advice.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" effectiveDate="August 6, 2026">
      <section>
        <h2>Acceptance of these terms</h2>
        <p>
          By using this website you agree to these Terms of Service. If you do not
          agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2>Estimates and service information</h2>
        <p>
          Content on this site — including savings comparisons, timelines, and process
          descriptions — is provided for general information. Every project is
          different: final pricing, scope, and suitability for concrete lifting are
          determined only after an on-site evaluation and written estimate. Submitting
          the estimate form does not create a service contract.
        </p>
      </section>

      <section>
        <h2>Communications</h2>
        <p>
          When you submit your contact information or message us through the website
          chat, you authorize {business.name} to contact you about your request by
          phone, and by text if you have opted in through the chat. Reply STOP to any
          text to opt out. Consent is not a condition of purchase.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The content, branding, and design of this website belong to {business.name}{" "}
          or its licensors and may not be copied or reused without permission.
        </p>
      </section>

      <section>
        <h2>Disclaimer &amp; limitation of liability</h2>
        <p>
          This website is provided &ldquo;as is&rdquo; without warranties of any kind. To the
          fullest extent permitted by law, {business.name} is not liable for damages
          arising from use of this website. Nothing in these terms limits warranties or
          rights that applicable law does not allow to be limited, including any written
          workmanship warranty provided with a signed service agreement.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Georgia, without regard
          to conflict-of-law rules.
        </p>
      </section>

      <section>
        <h2>Changes &amp; contact</h2>
        <p>
          We may update these terms from time to time; the effective date above
          reflects the latest revision. Questions? Call {business.name} at{" "}
          {formatPhone(business.phoneDigits)}.
        </p>
      </section>
    </LegalPage>
  );
}
