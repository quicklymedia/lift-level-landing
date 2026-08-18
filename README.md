# Lift + Level Concrete — Landing Page (Google Ads)

Mobile-first conversion landing for polyurethane concrete lifting in Atlanta, GA.
**Tagline:** *Lift it. Level it. Don't Replace it.*

Next.js 14 (App Router) + Tailwind CSS + TypeScript. Deploy target: Vercel.
No UI-kit dependencies, no localStorage/sessionStorage, no popups.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Requires Node 18+. Deployed on Vercel (team **Quickly Media**, project
`lift-level-landing`) — production is
**https://estimate.liftandlevelconcrete.com**. Pushing to this repo does not
deploy: the project is currently deployed via the Vercel CLI, so either run
`vercel --prod` or connect this repo in the Vercel dashboard for auto-deploys.

## Source assets (not in this repo)

`assets/` is gitignored: ~205 MB of raw material (original 46 MB VSL video and
the full-size AI-generated before/after PNGs). The optimized files the site
serves are tracked under `public/`:

| In repo (`public/`) | Source (kept outside the repo) |
|---|---|
| `video/process-45s.mp4` (7.8 MB, 720p) | original 46 MB 1080p VSL |
| `before-after/*.webp` (1600px) | full-size PNGs, plus watermark-free `clean/` versions |
| `hero/foam-injection.webp` | original 6.2 MB PNG |

Ask the Quickly Media team for the originals if you need to re-export.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Var | Scope | Purpose |
|---|---|---|
| `GHL_WEBHOOK_URL` | server | **Primary** lead delivery — GHL Inbound Webhook (form payload POSTed as JSON) |
| `GHL_API_TOKEN` | server | **Fallback** — GHL API v2 contacts upsert (used if webhook missing/fails) |
| `GHL_LOCATION_ID` | server | Required with the API token |
| `NEXT_PUBLIC_PHONE_NUMBER` | public | Tracking phone, digits only. Default placeholder: `4045007450` |
| `NEXT_PUBLIC_GTM_ID` | public | GTM container id. GTM is simply not injected if empty |

**Missing env vars never break the build.** With no GHL vars, the form still
works end-to-end and the server logs `[lead] … lead NOT delivered` with the full
payload — fine for preview, **not for launching ads**.

## Content config (PM edits, no code)

Everything editable lives in **`lib/content.ts`**:

- **`PROVISIONAL_CLAIM`** — the hero subheadline "Save up to 70%…" was approved
  *provisionally without supporting data*. To swap to the safe fallback
  ("A fraction of the cost of replacement."), change one line:
  `export const heroSubheadline: string = SAFE_SUBHEADLINE;`
- **`heroByService` / `defaultHero`** — message-match copy per `?service=` param
  (`driveway | sidewalk | patio | pool-deck | garage | foundation | void-filling`).
  The param swaps the H1, subheadline, hero image label, and pre-selects the
  form's service dropdown.
- **`beforeAfterCases`** — before/after image paths. Real photos exist; drop the
  files at the listed paths under `public/before-after/` and flip
  `HAS_REAL_PHOTOS = true` in `components/BeforeAfterSlider.tsx`.
- **`video`** — drop the final 45s MP4 at `public/video/process-45s.mp4` and
  replace the poster path.
- **`reviews`, `faqs`, `serviceArea.cities`** — swap placeholder text in place.

## GHL payload compatibility

Payload keys live in **`lib/constants.ts` → `PAYLOAD_KEYS`**:
`first_name, last_name, phone, email, zip, service, message, tcpa_consent,
source_url, utm_source, utm_medium, utm_campaign`.

⚠️ **Before connecting the webhook**, compare these keys against the payloads of
the team's existing GHL landings and rename in that one file if needed, so the
existing GHL field mapping can be copied as-is. UTM params are captured from the
landing URL into hidden fields automatically.

## GTM events (Google Ads conversion setup)

| Event | Fires when | Notes |
|---|---|---|
| `form_start` | First focus on any form field | Funnel diagnostics |
| `form_submit` | Form successfully delivered | Fires right before redirect to `/thankyou`. Includes `service` |
| `call_click` | Any `tel:` link clicked | Includes `link_location`: `header` / `hero` / `sticky_bar` / `footer` / `thankyou` |

**Google Ads conversion:** fires on `/thankyou` load
(`components/ThankYouConversion.tsx` →
`gtag('event','conversion',{send_to:'AW-18371630260/UUqaCOzUlNwcELSpo7hE'})`).
Set the Ads conversion action to count **One per click** so refreshes don't
inflate. `/thankyou` is `noindex` and only reachable via the form redirect.

**FORM (Aug 2026): the custom LeadForm was replaced by the GHL native
embedded form** (`components/GhlForm.tsx`, form id `1yvrck56rQqbXgZkqzuT`).
Submissions create contacts directly in GHL — the `/api/lead` webhook route
is NOT in this path anymore (kept for rollback). ⚠️ Two settings live in GHL,
not in this repo:
1. Form builder → On Submit → **Redirect to
   `https://estimate.liftandlevelconcrete.com/thankyou`** — without this the
   Ads conversion never fires.
2. Lead automations must hang off the **"Form Submitted"** trigger (the old
   Inbound Webhook workflow does not fire for the embedded form).
`form_start`/`form_submit` dataLayer events no longer fire (iframe), and the
`?service=` param no longer pre-selects the service inside the GHL form.

## Swapping placeholders

All visuals are labeled gray blocks (`components/Placeholder.tsx`) with reserved
aspect ratios (no CLS on swap). Replace with `next/image` using the label as the
starting point for `alt` text.

## Chat widget & TCPA (A2P 10DLC decision — Aug 2026)

The A2P registration runs on GHL's **chat-widget opt-in flow** (agency PM's
call). That flow rejects a page with a second SMS opt-in source, so:

- The **chat widget is live** on all pages (id `6a74a20457d382a07715e8bd`).
- The form's **TCPA checkbox was removed**. The payload still sends
  `tcpa_consent: false` so the GHL field mapping keeps working.

⚠️ Consequence: form leads have **no SMS consent on record**. Automated SMS
follow-up must rely on consent captured elsewhere (e.g., the widget's own
opt-in). Manual calls are unaffected. If SMS-to-form-leads is ever needed,
restore the checkbox and re-register A2P with web-form opt-in.

## Go-live blockers (do NOT start the campaign until resolved)

1. **GHL webhook URL / API token** — set in Vercel env vars; send a test lead
   and confirm it lands in the right pipeline.
2. **Call-tracking phone number** — until then, click-to-call conversions are
   invisible to Ads optimization (risk accepted).
3. **Replace AI before/after images with real project photos** — the current
   5 pairs in `public/before-after/` are AI-generated (Gemini) same-scene
   simulations, approved as unlabeled placeholders for preview only.
   Running ads that show AI images as real jobs risks Ads disapproval and
   deceptive-advertising claims. Drop the real pairs at the same paths.
4. **Replace sample reviews** — the 3 testimonials in `lib/content.ts` are
   fictional (marked SAMPLE in code). Swap for real GBP reviews.
5. Verify the Google Ads conversion against `form_submit` end-to-end.
6. Confirm **warranty terms** in the FAQ with the client.
7. Have the client's counsel review `/terms` and `/privacy` — they are standard
   templates written for this site, not legal advice.

**Resolved:** ✅ 43s VSL live at `public/video/process-45s.mp4` (46MB→7.7MB,
poster from the 30s "No demolition." frame). ✅ Real logo + hero photo.
✅ A2P 10DLC approved (chat-widget opt-in). ✅ `/terms` + `/privacy` live and
linked in the footer (includes the carrier-required clause that SMS opt-in
data is not shared with third parties).
