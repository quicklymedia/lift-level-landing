import { video } from "@/lib/content";

export default function VideoSection() {
  return (
    <section className="mx-auto max-w-content px-4 py-12 md:py-16" aria-labelledby="video-h2">
      <h2 id="video-h2" className="text-2xl font-bold sm:text-3xl">
        {video.heading}
      </h2>
      <p className="mt-2 text-concrete-500">{video.subheading}</p>
      {/* Manual play only (no autoplay); preload="none" keeps it off the LCP path.
          Swap /public/video/process-45s.mp4 + the poster when the final cut arrives. */}
      <video
        className="mt-6 aspect-video w-full rounded-xl border border-concrete-200 bg-concrete-100"
        controls
        preload="none"
        poster={video.poster}
        aria-label={video.posterLabel}
      >
        <source src={video.src} type="video/mp4" />
        Your browser doesn&rsquo;t support embedded video. Call us and we&rsquo;ll walk you
        through the process.
      </video>
    </section>
  );
}
