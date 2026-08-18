import type { ServiceSlug } from "@/lib/content";

/**
 * Icon system: single 24×24 grid, stroke-only, 1.75px weight, round caps —
 * no fills, so every icon carries the same visual weight. Color comes from
 * currentColor on the parent.
 */
function Icon({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/* ----------------------------- Services (7) ------------------------------ */

const serviceIconPaths: Record<ServiceSlug, React.ReactNode> = {
  // Converging driveway edges + center dashes
  driveway: (
    <>
      <path d="M5 20 10 5M19 20 14 5" />
      <path d="M12 9v1.6M12 13.5v1.6M12 18v1.6" />
    </>
  ),
  // Walkway in perspective with slab joints
  sidewalk: (
    <>
      <path d="M6 20 10 4M18 20 14 4" />
      <path d="M8.7 9.2h6.6M7.6 14.2h8.8" />
    </>
  ),
  // Patio umbrella over the slab
  patio: (
    <>
      <path d="M5 12a7 7 0 0 1 14 0Z" />
      <path d="M12 5V4M12 12v8M4 21h16" />
    </>
  ),
  // Pool ladder + water
  "pool-deck": (
    <>
      <path d="M8 5v9M12 5v9M8 8.5h4M8 11.5h4" />
      <path d="M3 18c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0" />
    </>
  ),
  // Garage with door slats
  garage: (
    <>
      <path d="M3 21V10l9-6 9 6v11" />
      <path d="M7 21v-8h10v8M7 16.5h10" />
    </>
  ),
  // House over slab with a settling crack
  foundation: (
    <>
      <path d="M5 10.5 12 5l7 5.5" />
      <path d="M6.5 11v4.5M17.5 11v4.5" />
      <path d="M4 15.5h16M4 19.5h16M4 15.5v4M20 15.5v4" />
      <path d="M11.3 15.5l.9 1.3-.9 1.4" />
    </>
  ),
  // Injector filling the void under a slab with foam
  "void-filling": (
    <>
      <path d="M12 2.5v5.5M10.5 2.5h3" />
      <path d="M3 10h18" />
      <circle cx="8.2" cy="15" r="1.5" />
      <circle cx="12.5" cy="17.5" r="1.9" />
      <circle cx="16.3" cy="13.8" r="1.2" />
    </>
  ),
};

export function ServiceIcon({
  slug,
  className = "",
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  return <Icon className={className}>{serviceIconPaths[slug]}</Icon>;
}

/* ---------------------------- How-it-works (3) ---------------------------- */

export const stepIcons: React.ReactNode[] = [
  // 1. Drill bit boring into the slab
  <>
    <path d="M12 3v9" />
    <path d="M10.3 5.6h3.4M10.3 8.6h3.4" />
    <path d="M4 16h16" />
    <path d="M10 16a2 2 0 0 0 4 0" />
  </>,
  // 2. Foam: droplet + expanding bubbles
  <>
    <path d="M11 4c2.4 3.2 4 5 4 7.4a4 4 0 1 1-8 0C7 9 8.6 7.2 11 4Z" />
    <circle cx="17.5" cy="16.5" r="1.6" />
    <circle cx="14.8" cy="20" r="1.1" />
  </>,
  // 3. Slab lifted: arrow rising from the line
  <>
    <path d="M5 19.5h14" />
    <path d="M12 15.5V6.5M8.5 10 12 6.5 15.5 10" />
  </>,
];

export function StepIcon({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  return <Icon className={className}>{stepIcons[index]}</Icon>;
}

/* ------------------------------ Benefits (6) ------------------------------ */

export type BenefitIconName =
  | "no-demolition"
  | "ready"
  | "cost"
  | "lasting"
  | "clean"
  | "quiet";

const benefitIconPaths: Record<BenefitIconName, React.ReactNode> = {
  // Hammer, crossed out
  "no-demolition": (
    <>
      <path d="M13.2 5.8 15.5 3.5l4.5 4.5-2.3 2.3" />
      <path d="M14.3 9.2 6.5 17l-2-2 7.8-7.8" />
      <path d="M4 4l16 16" />
    </>
  ),
  // Clock
  ready: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.4 2" />
    </>
  ),
  // Dollar
  cost: (
    <>
      <path d="M12 3.5v17" />
      <path d="M16 7.5c0-1.7-1.8-2.9-4-2.9s-4 1.2-4 2.9 1.5 2.6 4 3.1 4 1.5 4 3.2-1.8 2.9-4 2.9-4-1.2-4-2.9" />
    </>
  ),
  // Shield + check
  lasting: (
    <>
      <path d="M12 3l7 2.8V11c0 4.8-3.3 7.9-7 9.9-3.7-2-7-5.1-7-9.9V5.8Z" />
      <path d="M9 11.8l2.1 2.1 3.9-3.9" />
    </>
  ),
  // Sparkles
  clean: (
    <>
      <path d="M11 3.5 12.6 8.9 18 10.5l-5.4 1.6L11 17.5l-1.6-5.4L4 10.5l5.4-1.6Z" />
      <path d="M18.5 15.5v4M16.5 17.5h4" />
    </>
  ),
  // Speaker, low volume
  quiet: (
    <>
      <path d="M4 10v4h3l4.5 3.8V6.2L7 10Z" />
      <path d="M15 10.3a3.6 3.6 0 0 1 0 3.4" />
    </>
  ),
};

export function BenefitIcon({
  name,
  className = "",
}: {
  name: BenefitIconName;
  className?: string;
}) {
  return <Icon className={className}>{benefitIconPaths[name]}</Icon>;
}
