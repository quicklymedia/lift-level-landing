import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business, formatPhone } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy | Lift + Level Concrete",
  description:
    "How Lift + Level Concrete collects, uses, and protects your information.",
};

/**
 * Standard template for a local-services lead site — have the client's
 * counsel review before treating it as legal advice.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="August 6, 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          {business.name} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) provides polyurethane concrete
          lifting and leveling services in {business.addressLocality},{" "}
          {business.addressRegion} and surrounding areas. This policy describes how we
          handle information collected through this website.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information you give us:</strong> name, phone number, email address,
            ZIP code, the service you&rsquo;re interested in, and anything you write in the
            estimate form or website chat.
          </li>
          <li>
            <strong>Information collected automatically:</strong> standard analytics and
            advertising data (pages visited, device and browser type, referring campaign)
            via cookies and similar technologies, including Google advertising tags.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To contact you about your estimate request and schedule service.</li>
          <li>To respond to messages you send through the website chat.</li>
          <li>To measure how our advertising performs and improve this website.</li>
        </ul>
      </section>

      <section>
        <h2>Text messages and calls</h2>
        <p>
          If you opt in to messaging through our website chat, we may text or call you
          about your request. Message frequency varies, and message and data rates may
          apply. Reply STOP to opt out of texts at any time, or HELP for help. Consent to
          messaging is not a condition of purchase.
        </p>
        <p>
          <strong>
            Text messaging originator opt-in data and consent are not shared with any
            third parties for their marketing purposes.
          </strong>
        </p>
      </section>

      <section>
        <h2>How we share information</h2>
        <p>
          We do not sell your personal information. We share it only with service
          providers that operate this website and our customer management tools (for
          example, our CRM and web hosting providers), with analytics and advertising
          platforms as described above, and when required by law.
        </p>
      </section>

      <section>
        <h2>Data retention &amp; your choices</h2>
        <p>
          We keep contact records for as long as needed to serve you and meet legal
          obligations. You may request access to, correction of, or deletion of your
          information by calling us at {formatPhone(business.phoneDigits)}. You can
          control cookies through your browser settings.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          This website is not directed to children under 13, and we do not knowingly
          collect their information.
        </p>
      </section>

      <section>
        <h2>Changes &amp; contact</h2>
        <p>
          We may update this policy from time to time; the effective date above reflects
          the latest revision. Questions? Call {business.name} at{" "}
          {formatPhone(business.phoneDigits)}.
        </p>
      </section>
    </LegalPage>
  );
}
