import { reviews } from "@/lib/content";

export default function Reviews() {
  return (
    <section className="bg-concrete-50" aria-labelledby="reviews-h2">
      <div className="mx-auto max-w-content px-4 py-12 md:py-16">
        <h2 id="reviews-h2" className="text-2xl font-bold sm:text-3xl">
          What Atlanta Homeowners Say
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={i} className="rounded-xl border border-concrete-200 bg-white p-5">
              <p aria-label={`${r.stars} out of 5 stars`} className="text-accent-600">
                <span aria-hidden="true">{"★".repeat(r.stars)}</span>
              </p>
              <blockquote className="mt-2 text-ink">{r.text}</blockquote>
              <p className="mt-3 text-sm font-semibold">
                {r.name} <span className="font-normal text-concrete-500">— {r.neighborhood}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
