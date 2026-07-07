import type { Metadata } from "next";
import { SubsidiesPage } from "@/components/SubsidiesPage";

export const metadata: Metadata = {
  title: "Subsidies, Productive Switch",
  description:
    "Omscholing hoeft geen nieuwe kostenpost te zijn: transitiebudget, cao- en O&O-fondsen, SLIM, praktijkleren en meer regelingen stapelen tot een laag netto bedrag voor de werkgever.",
};

export default function Subsidies() {
  return <SubsidiesPage />;
}
