import type { Metadata } from "next";
import { DeelnemersPage } from "@/components/DeelnemersPage";

export const metadata: Metadata = {
  title: "Voor deelnemers, Productive Switch",
  description:
    "Verandert je vak of verdwijnt je rol? Kies uit drie opleidingsvelden: techniek, het sociaal domein of bijscholen in je eigen vak. Korte, erkende trajecten met persoonlijke begeleiding.",
};

export default function Deelnemers() {
  return <DeelnemersPage />;
}
