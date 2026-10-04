import type { Metadata } from "next";
import { Outfit, Archivo } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Display: Outfit (geometrisch, strak). Body: Archivo. Fraunces + cream is
// bewust losgelaten (september 2026): dat oogde te veel als een standaard
// AI-gegenereerde site.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Productive Switch, werving voor senior HR-transformaties en gerichte omscholing",
  description:
    "Werving voor senior HR-transformaties en omscholing via gerichte outplacementtrajecten. Eén netwerk van geselecteerde coaches, opleiders en organisaties in sectoren met blijvende vraag.",
  openGraph: {
    title: "Productive Switch, werving voor senior HR-transformaties en gerichte omscholing",
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
    <html lang="nl" data-scroll-behavior="smooth" className={`${outfit.variable} ${archivo.variable}`}>
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
