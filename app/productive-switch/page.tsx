import type { Metadata } from "next";
import { ProductiveSwitchPage } from "@/components/ProductiveSwitchPage";

export const metadata: Metadata = {
  title: "Productive Switch, omscholing via gerichte outplacementtrajecten",
  description:
    "Productive Switch begeleidt je mensen naar een nieuw vak: intake door een erkende coach, korte en erkende omscholing, en een directe lijn naar organisaties in sectoren met blijvende vraag.",
};

export default function ProductiveSwitch() {
  return <ProductiveSwitchPage />;
}
