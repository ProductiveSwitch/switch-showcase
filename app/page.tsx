import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--paper)", minHeight: "100vh" }}>
      <Header />
      <main>
        <Hero />
        <ShowcaseGrid />
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "var(--line)" }}
      >
        <div
          className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Switch
          </span>
          <p
            className="text-sm"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            &copy; {new Date().getFullYear()} Switch. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    </div>
  );
}
