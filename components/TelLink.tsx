"use client";

import { GTM_EVENTS } from "@/lib/constants";
import { pushEvent } from "@/lib/gtm";

/** tel: link that fires the call_click dataLayer event (any tel: on the page). */
export default function TelLink({
  phoneDigits,
  location,
  className = "",
  children,
}: {
  phoneDigits: string;
  /** Where on the page the link lives — sent with the event for reporting. */
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`tel:+1${phoneDigits}`}
      className={className}
      onClick={() => pushEvent(GTM_EVENTS.callClick, { link_location: location })}
    >
      {children}
    </a>
  );
}
