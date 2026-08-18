import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TelLink from "@/components/TelLink";
import ThankYouConversion from "@/components/ThankYouConversion";
import { business, formatPhone } from "@/lib/content";

/**
 * Post-submit confirmation page. Its URL (/thankyou) is the Google Ads
 * conversion target ("page reached after form submission"), so it must only
 * be reachable via the form redirect — hence noindex.
 */
export const metadata: Metadata = {
  title: "Request Received | Lift + Level Concrete",
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    title: "We call you",
    description: "Within one business day to confirm a time that works.",
  },
  {
    title: "Quick on-site look",
    description: "We measure the settling and check the soil under the slab.",
  },
  {
    title: "Exact quote, no pressure",
    description: "A straight answer — lift it, or don't. You decide.",
  },
];

export default function ThankYouPage() {
  return (
    <div id="top">
      <ThankYouConversion />
      <Header />
      <main className="bg-navy-800 text-white">
        <div className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center px-4 py-28 text-center">
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-600 text-3xl font-bold"
          >
            ✓
          </span>
          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            Request received!
          </h1>
          <p className="mt-3 max-w-xl text-lg text-concrete-100">
            Thanks for reaching out. We&rsquo;ll call you within one business day to
            schedule your free estimate.
          </p>

          <ol className="mt-10 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="rounded-xl bg-white/5 p-5">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-navy-800"
                >
                  {i + 1}
                </span>
                <h2 className="mt-3 font-semibold">{step.title}</h2>
                <p className="mt-1 text-sm text-concrete-100">{step.description}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-concrete-100">Want it faster?</p>
          <TelLink
            phoneDigits={business.phoneDigits}
            location="thankyou"
            className="btn btn-shine mt-3 border border-white/60 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          >
            Call {formatPhone(business.phoneDigits)} now
          </TelLink>
        </div>
      </main>
      <Footer />
    </div>
  );
}
