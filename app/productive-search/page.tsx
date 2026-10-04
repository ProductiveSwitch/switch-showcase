import type { Metadata } from "next";
import { ProductiveSearchPage } from "@/components/ProductiveSearchPage";

export const metadata: Metadata = {
  title: "Productive Search & Advisory, senior HR-leiders voor transformaties",
  description:
    "Productive Search werft senior HR-rollen met de focus op HR-transformaties en adviseert HR-leiders op employee relations, loontransparantie, AI in HR en organisatieontwerp.",
};

export default function ProductiveSearch() {
  return <ProductiveSearchPage />;
}
