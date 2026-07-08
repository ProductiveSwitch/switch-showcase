import type { Metadata } from "next";
import { OpleidersPage } from "@/components/OpleidersPage";

export const metadata: Metadata = {
  title: "Voor opleiders, Productive Switch",
  description:
    "Bied je korte, erkende omscholing aan in techniek, het sociaal domein of AI-bijscholing? Sluit je gratis aan bij Productive Switch en ontvang gekwalificeerde, vaak werkgever-gefinancierde instroom.",
};

export default function Opleiders() {
  return <OpleidersPage />;
}
