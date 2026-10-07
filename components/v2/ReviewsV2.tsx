import { reviews } from "@/lib/content";
import { heroV2 } from "@/lib/content-v2";

function initials(name: string) {
  return name
    .replace(/[^A-Za-z& ]/g, "")
    .split(/\s+/)
    .filter((w) => w && w !== "&")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Review-widget layout (Floor Daddy). Deliberately NO Google logo, dates or
 * star average: the reviews in lib/content.ts are SAMPLES, and dressing them
 * as Google reviews would misrepresent them. When the real GBP reviews come
 * in, add them there and set heroV2.googleRating to show the score.
 */
export default function ReviewsV2() {
  return (
    <section className="bg-concrete-50" aria-labelledby="reviews-h2">
      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <h2 id="reviews-h2" className="text-center font-display text-3xl font-black uppercase tracking-tight text-navy-800 sm:text-5xl">
          Atlanta homeowners, back on level ground
        </h2>
        {heroV2.googleRating ? (
          <p className="mt-3 text-center text-lg font-semibold text-navy-800">
            {heroV2.googleRating.score} <span className="text-accent-600" aria-hidden="true">★★★★★</span> ·{" "}
            {heroV2.googleRating.count} Google reviews
          </p>
        ) : null}
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={i} className="flex flex-col rounded-2xl bg-white p-6 shadow-md shadow-navy-900/5 ring-1 ring-concrete-200">
              <p aria-label={`${r.stars} out of 5 stars`} className="text-lg text-accent-600">
                <span aria-hidden="true">{"★".repeat(r.stars)}</span>
              </p>
              <blockquote className="mt-3 flex-1 leading-relaxed text-ink">&ldquo;{r.text}&rdquo;</blockquote>
              <div className="mt-5 flex items-center gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                  {initials(r.name)}
                </span>
                <p className="text-sm">
                  <span className="font-bold text-navy-800">{r.name}</span>
                  <span className="block text-concrete-500">{r.neighborhood}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
