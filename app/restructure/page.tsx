import type { Metadata } from "next";
import { RestructurePage } from "@/components/RestructurePage";

export const metadata: Metadata = {
  title: "Productive Restructure, werving voor HR en werktransitie",
  description:
    "Productive Restructure werft senior HR-rollen en functies rond werktransitie: de mensen die een reorganisatie zorgvuldig laten verlopen.",
};

export default function Restructure() {
  return <RestructurePage />;
}
