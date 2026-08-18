/**
 * Labeled gray block standing in for a real asset (hard rule 4).
 * Swap by replacing the parent with <Image> once real files exist — the
 * aspect ratio is reserved here so there's no CLS on swap.
 */
export default function Placeholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center border border-dashed border-concrete-300 bg-concrete-100 p-4 text-center text-sm text-concrete-500 ${className}`}
    >
      {label}
    </div>
  );
}
