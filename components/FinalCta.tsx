import GhlForm from "./GhlForm";
import TelLink from "./TelLink";
import { FORM_HIDDEN_FOR_A2P, business, formatPhone } from "@/lib/content";

export default function FinalCta() {
  return (
    <section id="estimate" className="bg-navy-800" aria-labelledby="cta-h2">
      <div className="mx-auto max-w-content px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 id="cta-h2" className="text-2xl font-bold text-white sm:text-3xl">
            Get Your Free Estimate
          </h2>
          <p className="mt-2 text-concrete-100">
            Tell us what&rsquo;s sinking. We&rsquo;ll take a look and give you a straight
            answer — lift it, or don&rsquo;t.
          </p>
          <div className="mt-6">
            {FORM_HIDDEN_FOR_A2P ? (
              /* Temporary call-only CTA while the A2P application is reviewed.
                 Restore the form via FORM_HIDDEN_FOR_A2P in lib/content.ts. */
              <div className="rounded-xl bg-white p-8 text-center">
                <p className="text-xl font-bold text-ink">
                  Call us and we&rsquo;ll schedule your free estimate
                </p>
                <p className="mt-2 text-concrete-500">
                  It takes two minutes — most visits are booked within one
                  business day. You can also message us in the chat.
                </p>
                <TelLink
                  phoneDigits={business.phoneDigits}
                  location="estimate_section"
                  className="btn-primary mt-5"
                >
                  Call {formatPhone(business.phoneDigits)}
                </TelLink>
              </div>
            ) : (
              <>
                {/* Oversized call CTA kept from the A2P period — many home-services
                    visitors prefer calling over typing. */}
                <TelLink
                  phoneDigits={business.phoneDigits}
                  location="estimate_section"
                  className="btn btn-shine mb-6 w-full border border-white/60 bg-white/10 !py-4 text-lg font-bold text-white backdrop-blur-md hover:bg-white/20 sm:text-xl"
                >
                  Call Now — {formatPhone(business.phoneDigits)}
                </TelLink>
                {/* GHL native embedded form (replaced the custom LeadForm,
                    team decision Aug 2026 — LeadForm.tsx kept in repo). */}
                <GhlForm />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
