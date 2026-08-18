import { serviceArea } from "@/lib/content";

export default function ServiceArea() {
  return (
    <section className="mx-auto max-w-content px-4 py-12 md:py-16" aria-labelledby="area-h2">
      <h2 id="area-h2" className="text-2xl font-bold sm:text-3xl">
        {serviceArea.heading}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {serviceArea.cities.map((city) => (
          <li
            key={city}
            className="rounded-full border border-concrete-200 bg-concrete-50 px-3 py-1.5 text-sm"
          >
            {city}
          </li>
        ))}
      </ul>
    </section>
  );
}
