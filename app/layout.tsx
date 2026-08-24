import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Productive Switch, omscholing & herplaatsing van personeel",
  description:
    "Productive Switch helpt je mensen aan een tweede loopbaan met korte, erkende omscholing. Productive Search werft senior HR-rollen en functies rond werktransitie. Eén netwerk, beide kanten van de cyclus.",
  openGraph: {
    title: "Productive Switch, omscholing & herplaatsing van personeel",
    description:
      "Productive Switch helpt je mensen aan een tweede loopbaan met korte, erkende omscholing. Productive Search werft senior HR-rollen en functies rond werktransitie.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" data-scroll-behavior="smooth" className={`${fraunces.variable} ${archivo.variable}`}>
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
