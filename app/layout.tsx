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
  title: "Switch — Programme Explorer",
  description:
    "Discover curated programmes and community modules across domain, social, and physical learning.",
  openGraph: {
    title: "Switch — Programme Explorer",
    description:
      "Discover curated programmes and community modules across domain, social, and physical learning.",
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
