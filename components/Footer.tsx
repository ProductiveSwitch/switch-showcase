"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import { Logo } from "./Logo";
import { company } from "@/lib/data";

export function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo size={24} />
          <p>{t({ nl: "Omscholing en werving voor HR-leiders.", en: "Re-training and recruitment for HR leaders." })}</p>
        </div>
        <div className="footer-col">
          <div className="footer-k">{t({ nl: "Contact", en: "Contact" })}</div>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <Link href="/contact">{t({ nl: "Kom in contact", en: "Get in touch" })}</Link>
        </div>
        <div className="footer-col">
          <div className="footer-k">{t({ nl: "Bedrijf", en: "Company" })}</div>
          {company.kvk && <span>KvK {company.kvk}</span>}
          {company.address && <span>{company.address}</span>}
          <Link href="/privacy">{t({ nl: "Privacyverklaring", en: "Privacy statement" })}</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">© 2026 {company.name}</div>
    </footer>
  );
}
