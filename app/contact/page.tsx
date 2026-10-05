import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Kom in contact, Productive Switch",
  description:
    "Een reorganisatie op komst, een senior HR-rol te vervullen, of aanmelden als deelnemer, loopbaancoach of opleider. Een paar korte vragen, dan nemen we contact op.",
};

export default function Contact() {
  return <ContactPage />;
}
