import { tickerItems } from "@/lib/content-v2";

/**
 * Floor Daddy's scrolling "market" ticker. The list is rendered twice so the
 * CSS loop (translateX 0 → -50%) is seamless; the copy is aria-hidden so
 * screen readers hear the list once. Motion stops under prefers-reduced-motion
 * (global rule) and on hover.
 */
function Items({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {tickerItems.map((t) => (
        <li key={t.label} className="flex items-center gap-2 whitespace-nowrap text-sm">
          <span aria-hidden="true" className="text-accent-400">▲</span>
          <span className="font-bold uppercase tracking-wide text-white">{t.label}</span>
          <span className="text-concrete-200">{t.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  return (
    <div className="ticker overflow-hidden border-y border-white/10 bg-navy-900 py-3" role="region" aria-label="At a glance">
      <div className="ticker-track flex w-max">
        <Items />
        <Items hidden />
      </div>
    </div>
  );
}
