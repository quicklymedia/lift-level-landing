/**
 * CONTENT CONFIG — V2 REDESIGN (/v2, Floor Daddy-inspired).
 *
 * Only what is NEW in v2 lives here. Shared facts (phone, services, steps,
 * FAQ, reviews, the provisional 70% claim) are imported from ./content so a
 * copy edit there updates both versions.
 *
 * Every claim below is one the client already makes on the live page — no
 * invented financing, warranties or ratings. Floor Daddy leans on offers
 * Lift + Level doesn't have; v2 borrows the structure, not the promises.
 */
import {
  PROVISIONAL_CLAIM,
  heroSubheadline,
  type ServiceSlug,
} from "./content";

/** True while the unbacked "Save up to 70%" claim is the live subheadline. */
const usingProvisionalClaim = heroSubheadline === PROVISIONAL_CLAIM;

/** Short form of the savings claim for badges/cards — follows the swap. */
export const savingsShort = usingProvisionalClaim
  ? "Save up to 70%"
  : "A fraction of the cost";

/* -------------------------------------------------------------------------- */
/* Images (AI-generated with Gemini for the client demo — swap for real jobs) */
/* -------------------------------------------------------------------------- */

export const v2Images = {
  hero: {
    src: "/v2/hero.webp",
    alt: "A Lift + Level technician injecting polyurethane foam into a sunken driveway slab at a brick ranch home in Atlanta, with the company truck behind him.",
  },
  crew: {
    src: "/v2/crew.webp",
    alt: "A smiling Lift + Level technician holding a foam injection gun on a freshly leveled Atlanta driveway.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Promo bar + hero                                                           */
/* -------------------------------------------------------------------------- */

export const promoBar = {
  lead: "Free on-site estimates — booking this week",
  tail: "Lift it. Level it. Don't Replace it.",
} as const;

export const heroV2 = {
  eyebrow: "Atlanta's concrete leveling experts",
  /** Three short beats, Floor Daddy style ("NEW FLOORS. BIG SAVINGS…"). */
  lines: ["Lift it.", "Level it.", "Don't replace it."],
  /** Index of the line that carries the accent colour. */
  accentLine: 2,
  sub: "We raise sunken driveways, sidewalks, patios and pool decks with polyurethane foam — in hours, not days.",
  /**
   * Google rating badge. null = hidden. Set it ONLY to the client's real GBP
   * numbers, e.g. { score: "4.9", count: 87 } — never a placeholder.
   */
  googleRating: null as null | { score: string; count: number },
};

/** Service picker on the hero card — each links to the form. */
export const heroPicker = {
  title: "Get your free estimate",
  prompt: "What needs lifting?",
  options: [
    { slug: "driveway", label: "Driveway" },
    { slug: "sidewalk", label: "Sidewalk" },
    { slug: "patio", label: "Patio" },
    { slug: "pool-deck", label: "Pool deck" },
    { slug: "garage", label: "Garage floor" },
    { slug: "foundation", label: "Foundation" },
  ] satisfies { slug: ServiceSlug; label: string }[],
  footnote: "Free · No obligation · Same-day results",
} as const;

/* -------------------------------------------------------------------------- */
/* Ticker (Floor Daddy's live "market" marquee)                               */
/* -------------------------------------------------------------------------- */

export const tickerItems = [
  { label: "Free estimates", value: "Booking now" },
  { label: "Same-day results", value: "Most jobs" },
  { label: "Licensed & insured", value: "Confirmed" },
  { label: "Ready to use", value: "In hours" },
  { label: "Demolition", value: "None" },
  { label: "Atlanta metro", value: "Serving now" },
] as const;

/* -------------------------------------------------------------------------- */
/* "Included with every lift" (dark grid)                                     */
/* -------------------------------------------------------------------------- */

export type IncludedIcon =
  | "estimate"
  | "drill"
  | "foam"
  | "clock"
  | "shield"
  | "broom"
  | "badge"
  | "dollar";

export const included = {
  eyebrow: "No surprises",
  heading: "Included with every lift",
  items: [
    { icon: "estimate", title: "Free on-site estimate", text: "We measure the settling and give you a straight answer — lift it, or don't." },
    { icon: "drill", title: "Dime-sized holes", text: "A few small injection points. No jackhammers, no demolition." },
    { icon: "foam", title: "Polyurethane foam", text: "Expands under the slab to fill voids and lift it gently back to level." },
    { icon: "clock", title: "Ready the same day", text: "Walk and drive on it as soon as we pack up — most jobs take a few hours." },
    { icon: "shield", title: "Won't wash out", text: "The foam is waterproof and permanent, so the soil can't erode it away." },
    { icon: "broom", title: "Clean job site", text: "No debris, no dust and no heavy equipment tearing up your lawn." },
    { icon: "badge", title: "Licensed & insured", text: "A licensed, insured Atlanta crew on every job." },
    { icon: "dollar", title: "A fraction of the cost", text: "No demolition, hauling or new concrete — you keep the slab you have." },
  ] satisfies { icon: IncludedIcon; title: string; text: string }[],
};

/* -------------------------------------------------------------------------- */
/* Offer band (Floor Daddy's yellow "SEXY FLOORING | …" band)                 */
/* -------------------------------------------------------------------------- */

export const offerBand = {
  beats: ["Lift it", "Level it", "Don't replace it"],
  cards: [
    {
      title: savingsShort,
      text: "Compared with tearing out and re-pouring the slab.",
      image: { src: "/v2/ba-driveway-after.webp", alt: "A leveled Atlanta driveway with small patched injection holes." },
    },
    {
      title: "Ready in hours",
      text: "Most jobs are done in a few hours. Park on it tonight.",
      image: { src: "/v2/crew.webp", alt: "A Lift + Level technician on a finished driveway." },
    },
    {
      title: "No demolition",
      text: "Dime-sized holes instead of jackhammers and dumpsters.",
      image: { src: "/v2/hero.webp", alt: "Foam being injected through a small hole in a concrete slab." },
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Feature split — why polyurethane (Floor Daddy's crew + sticker split)      */
/* -------------------------------------------------------------------------- */

export const featureSplit = {
  heading: "Why we lift with polyurethane foam",
  sub: "A lighter, cleaner fix than mudjacking or replacement.",
  points: [
    "The foam weighs a fraction of the mud slurry used in mudjacking, so it doesn't add load to the soil that's already settling.",
    "It's waterproof — rain and runoff can't wash it out from under the slab.",
    "It cures in minutes, which is why you can use the surface the same day.",
  ],
  sticker: { top: "Same-day", big: "Results", bottom: "On most jobs" },
};

/* -------------------------------------------------------------------------- */
/* Before / after (new realistic set)                                         */
/* -------------------------------------------------------------------------- */

export interface BeforeAfterV2 {
  service: ServiceSlug;
  title: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

const ba = (service: ServiceSlug, title: string, beforeAlt: string, afterAlt: string): BeforeAfterV2 => ({
  service,
  title,
  before: `/v2/ba-${service}-before.webp`,
  after: `/v2/ba-${service}-after.webp`,
  beforeAlt,
  afterAlt,
});

export const beforeAfterV2: BeforeAfterV2[] = [
  ba("driveway", "Driveway", "Driveway slab sunk about two inches at the garage, with an open joint.", "The same driveway lifted flush, with small patched injection holes."),
  ba("sidewalk", "Front walkway", "Walkway slab sunk below the next one, creating a trip hazard.", "The same walkway level again, trip edge gone."),
  ba("patio", "Back patio", "Patio slab settled away from the house.", "The same patio lifted back against the foundation."),
  ba("pool-deck", "Pool deck", "Pool deck slabs uneven at the expansion joint.", "The same pool deck level across the joint."),
  ba("garage", "Garage floor", "Garage slab dropped at the door threshold.", "The same garage floor lifted level with the threshold."),
];

/* -------------------------------------------------------------------------- */
/* Services — photo cards                                                     */
/* -------------------------------------------------------------------------- */

/** Photo per service. Problem shots: visitors recognise their own slab. */
export const serviceImages: Record<ServiceSlug, string> = {
  driveway: "/v2/ba-driveway-before.webp",
  sidewalk: "/v2/ba-sidewalk-before.webp",
  patio: "/v2/ba-patio-before.webp",
  "pool-deck": "/v2/ba-pool-deck-before.webp",
  garage: "/v2/ba-garage-before.webp",
  foundation: "/v2/service-foundation.webp",
  "void-filling": "/v2/service-void-filling.webp",
};
