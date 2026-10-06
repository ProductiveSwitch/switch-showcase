import type { Metadata } from "next";
import { PrivacyContent } from "@/components/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacyverklaring, Productive Switch",
  description: "Hoe Productive Switch omgaat met persoonsgegevens die je via de website deelt.",
};

export default function Privacy() {
  return <PrivacyContent />;
}
