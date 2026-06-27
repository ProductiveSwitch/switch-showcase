import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";

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
  title: "Productive Switch, omscholing en werving voor HR-leiders",
  description:
    "Productive Switch helpt je mensen aan een tweede loopbaan met korte, erkende omscholing. Productive Hire werft senior HR-rollen. Eén netwerk, beide kanten van de cyclus.",
  openGraph: {
    title: "Productive Switch, omscholing en werving voor HR-leiders",
    description:
      "Productive Switch helpt je mensen aan een tweede loopbaan met korte, erkende omscholing. Productive Hire werft senior HR-rollen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
