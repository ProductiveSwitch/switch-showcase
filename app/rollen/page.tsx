import type { Metadata } from "next";
import { RolesIndex } from "@/components/RolesIndex";

export const metadata: Metadata = {
  title: "Openstaande rollen, Productive Search",
  description: "Senior HR-rollen waar Productive Search nu voor werft, vast en interim.",
};

export default function Rollen() {
  return <RolesIndex />;
}
