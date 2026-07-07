import type { Metadata } from "next";
import { VisionContent } from "@/components/VisionContent";

export const metadata: Metadata = {
  title: "Onze visie, Productive Switch",
  description:
    "Nederland gaat door drie verschuivingen tegelijk. Productive Switch maakt ze elkaars oplossing: wij helpen mensen van wie het werk verandert de overstap maken naar werk waar de arbeidsmarkt om zit te springen.",
};

export default function VisionPage() {
  return <VisionContent />;
}
