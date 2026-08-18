import Header from "./Header";
import Footer from "./Footer";

/** Shared shell for /terms and /privacy: island header, prose body, footer. */
export default function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <div id="top">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-28 md:pt-32">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-concrete-500">Effective date: {effectiveDate}</p>
        <div className="mt-8 space-y-8 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
