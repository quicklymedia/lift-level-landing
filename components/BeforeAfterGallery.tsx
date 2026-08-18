import { beforeAfterCases } from "@/lib/content";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function BeforeAfterGallery() {
  return (
    <section className="bg-concrete-50" aria-labelledby="gallery-h2">
      <div className="mx-auto max-w-content px-4 py-12 md:py-16">
        <h2 id="gallery-h2" className="text-2xl font-bold sm:text-3xl">
          Before &amp; After
        </h2>
        <p className="mt-2 text-concrete-500">
          Drag the slider to compare the same spot before and after lifting.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {beforeAfterCases.map((c) => (
            <BeforeAfterSlider key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
