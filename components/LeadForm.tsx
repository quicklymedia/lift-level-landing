"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GTM_EVENTS, PAYLOAD_KEYS, UTM_PARAMS } from "@/lib/constants";
import { pushEvent } from "@/lib/gtm";
import { isServiceSlug, services } from "@/lib/content";

const K = PAYLOAD_KEYS;

type Errors = Partial<Record<"name" | "phone" | "email" | "zip" | "tcpa", string>>;

/* Error copy follows the what + how-to-fix pattern (via /design:ux-copy). */
const ERRORS = {
  name: "Please enter your name so we know who to ask for.",
  phone: "Please enter a 10-digit phone number, like (404) 555-0123.",
  email: "That email doesn't look right. Check for typos like missing @.",
  zip: "Please enter your 5-digit ZIP so we can confirm you're in our area.",
  tcpa: "Please check the box so we're allowed to contact you about your estimate.",
} as const;

function validate(fields: {
  name: string;
  phone: string;
  email: string;
  zip: string;
  tcpa: boolean;
}): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = ERRORS.name;
  if (fields.phone.replace(/\D/g, "").length !== 10) errors.phone = ERRORS.phone;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = ERRORS.email;
  if (!/^\d{5}$/.test(fields.zip.trim())) errors.zip = ERRORS.zip;
  if (!fields.tcpa) errors.tcpa = ERRORS.tcpa;
  return errors;
}

export default function LeadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") ?? undefined;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  /* TCPA checkbox: removed during the A2P review (scanner rejects a second
     opt-in source), RESTORED after approval (user decision, Aug 2026) so form
     leads leave written SMS/call consent again. */
  const [tcpa, setTcpa] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const startedRef = useRef(false);
  const utmRef = useRef<Record<string, string>>({});

  // Pre-select service from ?service= (message match) — reacts to the
  // services-grid links that re-navigate with a new param.
  useEffect(() => {
    if (isServiceSlug(serviceParam)) setService(serviceParam);
  }, [serviceParam]);

  // Capture UTM params from the landing URL into hidden payload fields.
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const p of UTM_PARAMS) utm[p] = qs.get(p) ?? "";
    utmRef.current = utm;
  }, []);

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    pushEvent(GTM_EVENTS.formStart);
  }

  function fieldError(key: keyof Errors, id: string) {
    if (!errors[key]) return null;
    return (
      <p id={id} className="mt-1 text-sm font-medium text-accent-800" role="alert">
        {errors[key]}
      </p>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate({ name, phone, email, zip, tcpa });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const payload = {
      [K.firstName]: firstName,
      [K.lastName]: rest.join(" "),
      [K.phone]: phone,
      [K.email]: email.trim(),
      [K.zip]: zip.trim(),
      [K.service]: service,
      [K.message]: message.trim(),
      [K.tcpaConsent]: tcpa,
      [K.sourceUrl]: window.location.href,
      ...utmRef.current,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Lead API responded ${res.status}`);
      pushEvent(GTM_EVENTS.formSubmit, { service });
      // Ads conversion now fires on /thankyou load (ThankYouConversion) —
      // do NOT also fire here or a restored LeadForm would double-count.
      router.push("/thankyou");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const inputClass =
    "mt-1 w-full min-h-[44px] rounded-lg border border-concrete-300 px-3 py-2.5 text-base placeholder:text-concrete-500";

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl bg-white p-5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="lead-name" className="font-semibold">
            Full name
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onFocus={onFirstFocus}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setErrors((p) => ({ ...p, name: name.trim() ? undefined : ERRORS.name }))}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={inputClass}
            placeholder="Jane Smith"
          />
          {fieldError("name", "err-name")}
        </div>

        <div>
          <label htmlFor="lead-phone" className="font-semibold">
            Phone
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onFocus={onFirstFocus}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                phone: phone.replace(/\D/g, "").length === 10 ? undefined : ERRORS.phone,
              }))
            }
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            className={inputClass}
            placeholder="(404) 555-0123"
          />
          {fieldError("phone", "err-phone")}
        </div>

        <div>
          <label htmlFor="lead-email" className="font-semibold">
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onFocus={onFirstFocus}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? undefined : ERRORS.email,
              }))
            }
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
            className={inputClass}
            placeholder="jane@email.com"
          />
          {fieldError("email", "err-email")}
        </div>

        <div>
          <label htmlFor="lead-service" className="font-semibold">
            What needs lifting?
          </label>
          <select
            id="lead-service"
            name="service"
            value={service}
            onFocus={onFirstFocus}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose a service (optional)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead-zip" className="font-semibold">
            ZIP code
          </label>
          <input
            id="lead-zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            maxLength={5}
            value={zip}
            onFocus={onFirstFocus}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            onBlur={() =>
              setErrors((p) => ({ ...p, zip: /^\d{5}$/.test(zip.trim()) ? undefined : ERRORS.zip }))
            }
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? "err-zip" : undefined}
            className={inputClass}
            placeholder="30303"
          />
          {fieldError("zip", "err-zip")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lead-message" className="font-semibold">
            Anything else? <span className="font-normal text-concrete-500">(optional)</span>
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            value={message}
            onFocus={onFirstFocus}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
            placeholder="Tell us about the sunken area — size, how long it's been settling…"
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="lead-tcpa"
              name="tcpa"
              type="checkbox"
              required
              checked={tcpa}
              onFocus={onFirstFocus}
              onChange={(e) => {
                setTcpa(e.target.checked);
                if (e.target.checked) setErrors((p) => ({ ...p, tcpa: undefined }));
              }}
              aria-invalid={!!errors.tcpa}
              aria-describedby={errors.tcpa ? "err-tcpa" : "tcpa-copy"}
              className="mt-1 h-5 w-5 shrink-0 accent-accent-600"
            />
            {/* TCPA consent copy — written consent for SMS/call follow-up. */}
            <label htmlFor="lead-tcpa" id="tcpa-copy" className="text-sm text-concrete-500">
              By checking this box, I agree to receive calls and text messages from Lift +
              Level Concrete about my estimate request at the number provided, including via
              automated technology. Consent is not a condition of purchase. Message and data
              rates may apply. Reply STOP to opt out.
            </label>
          </div>
          {fieldError("tcpa", "err-tcpa")}
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 rounded-lg bg-accent-600/10 p-3 font-medium text-accent-800">
          Something went wrong sending your request. Please try again — or call us and
          we&rsquo;ll take your details over the phone.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Get My Free Estimate"}
      </button>
      <p className="mt-3 text-sm text-concrete-500">
        No obligation. We&rsquo;ll confirm a time that works for you.
      </p>
    </form>
  );
}
