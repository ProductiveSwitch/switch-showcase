import type { Metadata } from "next";
import { ProductiveSearchPage } from "@/components/ProductiveSearchPage";

export const metadata: Metadata = {
  title: "Productive Search, werving voor HR en werktransitie",
  description:
    "Productive Search werft senior HR-rollen en functies rond werktransitie: de mensen die een reorganisatie zorgvuldig laten verlopen.",
};

export default function ProductiveSearch() {
  return <ProductiveSearchPage />;
}
