import type { IncludedIcon } from "@/lib/content-v2";

/**
 * V2 icon set — same system as components/icons.tsx: 24px grid, 1.75 stroke,
 * round caps, no fills, colour from currentColor. Decorative by default.
 */
function Svg({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const included: Record<IncludedIcon, React.ReactNode> = {
  // Clipboard with a check
  estimate: (
    <>
      <path d="M9 4h6v3H9z" />
      <path d="M9 5.5H6.5v15h11v-15H15" />
      <path d="m9.5 13.5 2 2 3.5-4" />
    </>
  ),
  // Drill bit entering a slab
  drill: (
    <>
      <path d="M12 3v10" />
      <path d="M10.3 6h3.4M10.3 9h3.4" />
      <path d="M4 17h16" />
      <path d="M10 17a2 2 0 0 0 4 0" />
    </>
  ),
  // Droplet + bubbles
  foam: (
    <>
      <path d="M11 4c2.4 3.2 4 5 4 7.4a4 4 0 1 1-8 0C7 9 8.6 7.2 11 4Z" />
      <circle cx="17.5" cy="16.5" r="1.6" />
      <circle cx="14.8" cy="20" r="1.1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.4 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.8V11c0 4.8-3.3 7.9-7 9.9-3.7-2-7-5.1-7-9.9V5.8Z" />
      <path d="M9 11.8l2.1 2.1 3.9-3.9" />
    </>
  ),
  // Broom
  broom: (
    <>
      <path d="M19 4 12.5 10.5" />
      <path d="M12.5 10.5 9 9l-5 5 1.5 3.5L9 21l5-5-1.5-5.5Z" />
      <path d="M6.5 15.5 10 19" />
    </>
  ),
  // Award badge
  badge: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9.3 13.8-1.3 7.2 4-2.2 4 2.2-1.3-7.2" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 3.5v17" />
      <path d="M16 7.5c0-1.7-1.8-2.9-4-2.9s-4 1.2-4 2.9 1.5 2.6 4 3.1 4 1.5 4 3.2-1.8 2.9-4 2.9-4-1.2-4-2.9" />
    </>
  ),
};

export function IncludedIconV2({ name, className = "" }: { name: IncludedIcon; className?: string }) {
  return <Svg className={className}>{included[name]}</Svg>;
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M21 16.4v2.8a1.9 1.9 0 0 1-2 1.9 18.8 18.8 0 0 1-8.2-2.9 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.2 4.2 1.9 1.9 0 0 1 4.1 2.2h2.8a1.9 1.9 0 0 1 1.9 1.6c.1.9.3 1.8.7 2.7a1.9 1.9 0 0 1-.4 2L7.9 9.7a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.8.6 2.7.7a1.9 1.9 0 0 1 1.5 1.9Z" />
    </Svg>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

/** Service truck — rides the 3-step progress line. */
export function TruckIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M2.5 6.5h11v9.5h-11z" />
      <path d="M13.5 9.5h4l3.5 3.5V16h-7.5" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </Svg>
  );
}
