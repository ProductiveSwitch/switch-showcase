import type { Metadata } from "next";
import { DeelnemersPage } from "@/components/DeelnemersPage";

export const metadata: Metadata = {
  title: "Voor deelnemers, Productive Switch",
  description:
    "Werk verandert. Maak een account aan en begin direct online: CV, arbeidsmarktscan, skills en ambities in kaart, en een basis voor AI in je zoektocht. Daarna kies je uit drie richtingen.",
};

export default function Deelnemers() {
  return <DeelnemersPage />;
}
