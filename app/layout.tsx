import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Lettertypen (oktober 2026, "Northline"-palet): Poppins voor koppen, Inter voor
// lopende tekst. De paletkiezer met drie alternatieven is verwijderd.
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", display: "swap", weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Productive Switch, werving voor senior HR-professionals en gerichte omscholing",
  description:
    "Werving voor senior HR-transformaties en omscholing via gerichte outplacementtrajecten. Eén netwerk van geselecteerde coaches, opleiders en organisaties in sectoren met blijvende vraag.",
  openGraph: {
    title: "Productive Switch, werving voor senior HR-professionals en gerichte omscholing",
    description:
      "Werving voor senior HR-transformaties en omscholing via gerichte outplacementtrajecten. Eén netwerk, beide kanten van de cyclus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" data-scroll-behavior="smooth" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <LangProvider>
          <Nav />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
