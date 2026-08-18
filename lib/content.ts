/**
 * CONTENT CONFIG — the PM edits THIS file only. No component changes needed.
 *
 * Contains: business info, hero copy per ?service= param, the provisional
 * savings claim, comparison table, services, steps, before/after image paths,
 * benefits, reviews, service area, FAQ.
 */

/* -------------------------------------------------------------------------- */
/* Business                                                                   */
/* -------------------------------------------------------------------------- */

export const business = {
  name: "Lift + Level Concrete",
  tagline: "Lift it. Level it. Don't Replace it.",
  // NEXT_PUBLIC_PHONE_NUMBER overrides at runtime; this is the fallback.
  phoneDigits: process.env.NEXT_PUBLIC_PHONE_NUMBER || "4045007450",
  addressLocality: "Atlanta",
  addressRegion: "GA",
  url: "https://liftandlevelconcrete.com",
} as const;

export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length !== 10) return digits;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * Brand logo. Source came 800×800 with large transparent margins; trimmed to
 * its bounding box so it reads large inside the compact header. Transparent
 * WebP — the wordmark is DARK, so it needs a light surface behind it (this is
 * why the floating header is light frosted glass, not dark).
 */
export const brand = {
  logoSrc: "/brand/logo.webp",
  logoAlt: "Lift + Level Concrete",
  logoWidth: 721,
  logoHeight: 526,
} as const;

/* -------------------------------------------------------------------------- */
/* Provisional claim                                                          */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ PROVISIONAL_CLAIM — "Save up to 70%" was approved provisionally WITHOUT
 * supporting data (blocker #5 in the brief). If the client can't back it up
 * before scaling ad spend, swap to the safe fallback below — one-line change:
 * set `heroSubheadline = SAFE_SUBHEADLINE`.
 */
export const PROVISIONAL_CLAIM =
  "Save up to 70% compared to full concrete replacement.";
export const SAFE_SUBHEADLINE = "A fraction of the cost of replacement.";
export const heroSubheadline: string = PROVISIONAL_CLAIM;

/* -------------------------------------------------------------------------- */
/* Dynamic message match (?service= query param)                              */
/* -------------------------------------------------------------------------- */

export type ServiceSlug =
  | "driveway"
  | "sidewalk"
  | "patio"
  | "pool-deck"
  | "garage"
  | "foundation"
  | "void-filling";

export interface HeroContent {
  h1: string;
  subheadline: string;
  /** Full-bleed hero background image. */
  imageSrc: string;
  imageAlt: string;
}

/**
 * Only one real hero photo exists today, so every service points at it. When
 * the client delivers per-service photos, drop them in /public/hero/ and change
 * just the `imageSrc` line for that service — nothing else needs to move.
 */
const DEFAULT_HERO_IMAGE = "/hero/foam-injection.webp";
const DEFAULT_HERO_ALT =
  "A Lift + Level technician injecting polyurethane foam through a small hole drilled in a residential concrete driveway.";

/*
 * HERO H1 — variants generated via /design:ux-copy, per hard rule 5:
 *   A. "Lift Your Concrete Without Replacement"
 *      — names the outcome AND kills the feared alternative (replacement) in
 *        6 words; mirrors "concrete lifting/leveling" search intent directly.
 *   B. "Sunken Concrete? We Lift It in Hours — Not Days"
 *      — problem-first + speed proof, but assumes the visitor self-identifies
 *        as "sunken concrete", which mismatches broader "leveling" queries.
 *   C. "Level Your Concrete for a Fraction of Replacement Cost"
 *      — leads with price, but duplicates the subheadline's claim and wastes
 *        the H1 on cost instead of the method's core promise.
 * CHOSEN: A. Strongest message match for paid queries, unique vs the
 * subheadline (cost) and trust chips (speed), and it's the brief's mandated
 * default — variants B/C remain here as tested alternates for the per-service
 * pages in phase 2.
 */
export const defaultHero: HeroContent = {
  h1: "Lift Your Concrete Without Replacement",
  subheadline: heroSubheadline,
  imageSrc: DEFAULT_HERO_IMAGE,
  imageAlt: DEFAULT_HERO_ALT,
};

export const heroByService: Record<ServiceSlug, HeroContent> = {
  driveway: {
    h1: "Lift Your Sunken Driveway — Without Replacing It",
    subheadline: heroSubheadline,
    imageSrc: DEFAULT_HERO_IMAGE,
    imageAlt: DEFAULT_HERO_ALT,
  },
  sidewalk: {
    h1: "Fix Uneven Sidewalks & Walkways in Hours",
    subheadline: heroSubheadline,
    imageSrc: DEFAULT_HERO_IMAGE,
    imageAlt: DEFAULT_HERO_ALT,
  },
  patio: {
    h1: "Level Your Sunken Patio — No Demolition",
    subheadline: heroSubheadline,
    imageSrc: DEFAULT_HERO_IMAGE,
    imageAlt: DEFAULT_HERO_ALT,
  },
  "pool-deck": {
    h1: "Lift Your Pool Deck Back to Level",
    subheadline: heroSubheadline,
    imageSrc: DEFAULT_HERO_IMAGE,
    imageAlt: DEFAULT_HERO_ALT,
  },
  garage: {
    h1: "Level Your Garage Floor — Without Tearing It Out",
    subheadline: heroSubheadline,
    imageSrc: DEFAULT_HERO_IMAGE,
    imageAlt: DEFAULT_HERO_ALT,
  },
  foundation: {
    h1: "Stabilize & Lift Settled Foundations",
    subheadline: heroSubheadline,
    imageSrc: DEFAULT_HERO_IMAGE,
    imageAlt: DEFAULT_HERO_ALT,
  },
  "void-filling": {
    h1: "Fill Voids & Stop Erosion Under Your Concrete",
    subheadline: heroSubheadline,
    imageSrc: DEFAULT_HERO_IMAGE,
    imageAlt: DEFAULT_HERO_ALT,
  },
};

export function getHero(service?: string): HeroContent {
  if (service && service in heroByService) {
    return heroByService[service as ServiceSlug];
  }
  return defaultHero;
}

export function isServiceSlug(v: string | undefined): v is ServiceSlug {
  return !!v && v in heroByService;
}

/* -------------------------------------------------------------------------- */
/* ⚠️ TEMPORARY — A2P registration                                            */
/* -------------------------------------------------------------------------- */

/**
 * Hide the lead form while an A2P 10DLC application is under review (the
 * compliance scan rejects any phone-collecting form on a page with the chat
 * widget). A call CTA renders in its place so no button breaks.
 * A2P was APPROVED on Aug 2026 — form restored. Flip only if a re-review
 * ever requires hiding it again.
 */
export const FORM_HIDDEN_FOR_A2P = false;

/* -------------------------------------------------------------------------- */
/* Trust chips                                                                */
/* -------------------------------------------------------------------------- */

// "Licensed & Insured" is CONFIRMED real (blocker #7 resolved).
export const trustChips = [
  "Licensed & Insured",
  "Same-Day Results",
  "Free Estimates",
] as const;

/* -------------------------------------------------------------------------- */
/* Video                                                                      */
/* -------------------------------------------------------------------------- */

export const video = {
  // Real 43s VSL, compressed 46MB→7.7MB (720p, faststart). preload="none"
  // keeps it off the critical path — it only downloads on play.
  src: "/video/process-45s.mp4",
  poster: "/video/poster.webp",
  posterLabel: "Video: see the full concrete lifting process, start to finish",
  heading: "See How Concrete Lifting Works",
  subheading: "43 seconds, start to finish. No demolition, no mess.",
} as const;

/* -------------------------------------------------------------------------- */
/* Comparison: Replace vs. Lift                                               */
/* -------------------------------------------------------------------------- */

export const comparison = {
  heading: "Replace vs. Lift",
  replaceLabel: "Full Replacement",
  liftLabel: "Lift + Level",
  rows: [
    { replace: "Expensive", lift: "Affordable" },
    { replace: "Days of work", lift: "Done in hours" },
    { replace: "Mess and debris", lift: "Clean process" },
    { replace: "New concrete (color mismatch)", lift: "Your existing concrete" },
    { replace: "Heavy equipment on your lawn", lift: "Small injection holes" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Services grid                                                              */
/* -------------------------------------------------------------------------- */

export interface ServiceCard {
  slug: ServiceSlug;
  name: string;
  description: string;
  iconLabel: string;
}

export const services: ServiceCard[] = [
  {
    slug: "driveway",
    name: "Driveway",
    description: "Lift sunken driveway slabs back to level in a few hours.",
    iconLabel: "Icon: driveway",
  },
  {
    slug: "sidewalk",
    name: "Sidewalk & Walkways",
    description: "Remove trip hazards before someone gets hurt.",
    iconLabel: "Icon: sidewalk",
  },
  {
    slug: "patio",
    name: "Patio",
    description: "Level your patio without tearing up your backyard.",
    iconLabel: "Icon: patio",
  },
  {
    slug: "pool-deck",
    name: "Pool Deck",
    description: "Even out settled pool decks — safe, level, ready to use.",
    iconLabel: "Icon: pool deck",
  },
  {
    slug: "garage",
    name: "Garage Floor",
    description: "Lift settled garage slabs without moving out your stuff.",
    iconLabel: "Icon: garage floor",
  },
  {
    slug: "foundation",
    name: "Foundations",
    description: "Stabilize and lift settled foundation slabs.",
    iconLabel: "Icon: foundation",
  },
  {
    slug: "void-filling",
    name: "Void Filling & Erosion",
    description: "Fill washed-out voids under concrete before it sinks.",
    iconLabel: "Icon: void filling",
  },
];

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

export const steps = [
  {
    title: "Drill small holes",
    description:
      "We drill a few dime-sized holes in the sunken slab — no demolition.",
  },
  {
    title: "Inject polyurethane foam",
    description:
      "Expanding foam fills the voids underneath and gently raises the slab.",
  },
  {
    title: "Concrete lifts, ready immediately",
    description:
      "The foam cures in minutes. Drive and walk on it the same day.",
  },
] as const;

export const stepsNote = "Most jobs done in a few hours.";

/* -------------------------------------------------------------------------- */
/* Before / After gallery                                                     */
/* -------------------------------------------------------------------------- */

export interface BeforeAfterCase {
  service: ServiceSlug;
  title: string;
  /**
   * Real photos EXIST and will be delivered (blocker #4). Drop the files at
   * these exact paths under /public and the slider picks them up — no code
   * changes. Until the files exist, labeled placeholders render instead.
   */
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
}

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    service: "driveway",
    title: "Driveway — Marietta",
    beforeSrc: "/before-after/driveway-before.webp",
    afterSrc: "/before-after/driveway-after.webp",
    beforeLabel: "Before: sunken driveway slab, 2″ drop at the garage",
    afterLabel: "After: slab lifted flush, same day",
  },
  {
    service: "sidewalk",
    title: "Sidewalk — Decatur",
    beforeSrc: "/before-after/sidewalk-before.webp",
    afterSrc: "/before-after/sidewalk-after.webp",
    beforeLabel: "Before: raised sidewalk edge, trip hazard",
    afterLabel: "After: walkway even and safe",
  },
  {
    service: "patio",
    title: "Patio — Sandy Springs",
    beforeSrc: "/before-after/patio-before.webp",
    afterSrc: "/before-after/patio-after.webp",
    beforeLabel: "Before: patio settled away from the house",
    afterLabel: "After: patio level, drainage corrected",
  },
  {
    service: "pool-deck",
    title: "Pool Deck — Alpharetta",
    beforeSrc: "/before-after/pool-deck-before.webp",
    afterSrc: "/before-after/pool-deck-after.webp",
    beforeLabel: "Before: pool deck slabs uneven at the joints",
    afterLabel: "After: deck level around the full perimeter",
  },
  {
    service: "garage",
    title: "Garage Floor — Smyrna",
    beforeSrc: "/before-after/garage-before.webp",
    afterSrc: "/before-after/garage-after.webp",
    beforeLabel: "Before: garage slab cracked and settled",
    afterLabel: "After: slab lifted and stabilized",
  },
];

/* -------------------------------------------------------------------------- */
/* Benefits                                                                   */
/* -------------------------------------------------------------------------- */

export const benefits = [
  { title: "No demolition", description: "Your existing concrete stays put." },
  { title: "Ready immediately", description: "Walk and drive on it the same day." },
  { title: "Cost-effective", description: "A fraction of replacement cost." },
  { title: "Long-lasting", description: "Polyurethane won't wash out or shrink." },
  { title: "Clean process", description: "No debris, no dust, no torn-up lawn." },
  { title: "Minimal disruption", description: "Most jobs wrapped up in hours." },
] as const;

/* -------------------------------------------------------------------------- */
/* Reviews (placeholders until GBP reviews arrive — blocker #6)               */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ SAMPLE REVIEWS — fictional names, written to preview the layout.
 * Replace with real Google Business Profile reviews before go-live
 * (never publish invented testimonials on a live ads campaign).
 */
export const reviews = [
  {
    name: "Marcus T.",
    neighborhood: "Marietta",
    stars: 5,
    text: "Our driveway had sunk almost two inches at the garage. Two contractors quoted us a full tear-out; Lift + Level did it in one morning for a fraction of that. We parked on it the same evening.",
  },
  {
    name: "Angela R.",
    neighborhood: "Decatur",
    stars: 5,
    text: "The sidewalk out front was a trip hazard and I was worried about my mom visiting. They lifted it flush in about two hours, cleaned everything up, and you can barely spot the injection holes.",
  },
  {
    name: "Dave & Carol S.",
    neighborhood: "Sandy Springs",
    stars: 5,
    text: "Honest crew. They told us one section of the pool deck couldn't be saved and lifted the rest instead of overselling us. Deck is level, gate closes again, and the price matched the quote.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Service area                                                               */
/* -------------------------------------------------------------------------- */

export const serviceArea = {
  heading: "Serving Atlanta, GA and Surrounding Areas",
  // Placeholder city list — confirm actual coverage with the client.
  cities: [
    "Atlanta",
    "Marietta",
    "Decatur",
    "Sandy Springs",
    "Alpharetta",
    "Roswell",
    "Smyrna",
    "Dunwoody",
    "Brookhaven",
    "Kennesaw",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "How long does concrete lifting last?",
    a: "Polyurethane foam is waterproof and permanent — it won't wash out, shrink, or break down. Once the soil underneath is stabilized, the repair typically lasts as long as the concrete itself.",
  },
  {
    q: "How much does it cost compared to replacement?",
    a: "Lifting typically costs a fraction of tearing out and pouring new concrete, because there's no demolition, hauling, or new material. Every job is different — request a free estimate and we'll give you an exact number.",
  },
  {
    q: "How soon can I use my driveway or patio?",
    a: "Immediately. The foam cures within minutes of injection, so you can walk and drive on the surface the same day — usually as soon as we pack up.",
  },
  {
    q: "Is the foam safe for my family, pets, and yard?",
    a: "Yes. Once cured, the polyurethane is inert and environmentally neutral. It doesn't leach chemicals into the soil and is commonly used near homes, pools, and gardens.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — our work is backed by a workmanship warranty. We'll walk you through the exact terms with your free estimate. [Confirm warranty terms with client before go-live.]",
  },
  {
    q: "What can and can't be lifted?",
    a: "We lift settled slabs: driveways, sidewalks, patios, pool decks, garage floors, and foundation slabs. Concrete that is severely crumbled or shattered into small pieces may need replacement — we'll tell you honestly at the estimate.",
  },
] as const;
