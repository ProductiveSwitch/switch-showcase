import type { Metadata } from "next";
import { ProductiveSearchPage } from "@/components/ProductiveSearchPage";

export const metadata: Metadata = {
  title: "Productive Search, senior HR-professionals voor transformaties",
  description:
    "Productive Search werft HR-leiders, senior professionals en interim adviseurs met de focus op HR-transformaties: organisatieontwerp, employee relations, reorganisaties en AI binnen HR.",
};

export default function ProductiveSearch() {
  return <ProductiveSearchPage />;
}
