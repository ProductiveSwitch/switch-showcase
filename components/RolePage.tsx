"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "./LangContext";
import type { Vacancy } from "@/lib/data";
import { ApplyModal } from "./ApplyForm";

// Maakt het mailadres in een lopende zin klikbaar.
function withMail(text: string, email?: string) {
  if (!email || !text.includes(email)) return text;
  const [before, after] = text.split(email);
  return <>{before}<a href={`mailto:${email}`} style={{ color: "var(--hire)", fontWeight: 600, textDecoration: "underline" }}>{email}</a>{after}</>;
}

export function RolePage({ v }: { v: Vacancy }) {
  const { lang, t } = useLang();
  const [applyOpen, setApplyOpen] = useState(false);
  return (
    <main className="hire role-page">
      <section className="h-hero h-hero--short">
        <div className="wrap">
          <div className="h-hero-text">
            <div className="eyebrow">Productive Search · {v.category === "interim" ? t({ nl: "Interim", en: "Interim" }) : t({ nl: "Vast", en: "Permanent" })}</div>
            <h1>{t(v.role)}</h1>
            <p className="lede">{t(v.org)}</p>
            <div className="role-meta">
              <span>{v.location}</span>
              {v.details ? v.details.map((x, i) => <span key={i}>{t(x)}</span>) : (
                <>
                  <span>{t(v.duration)}</span>
                  <span>{t(v.hours)}</span>
                  {v.start && t(v.start) !== t(v.duration) && <span>{t(v.start)}</span>}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="wrap">
        <article className="role-body">
          <p className="role-summary">{t(v.summary)}</p>
          <div className="role-cols">
            <section>
              <h2>{t({ nl: "Wat je gaat doen", en: "What you will do" })}</h2>
              <ul>{v.tasks.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
            </section>
            <section>
              <h2>{t(v.asksTitle ?? { nl: "Wat we zoeken", en: "What we look for" })}</h2>
              <ul>{v.asks.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
            </section>
            {v.offers && (
              <section>
                <h2>{t({ nl: "Wat je krijgt", en: "What you get" })}</h2>
                <ul>{v.offers.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
              </section>
            )}
          </div>
          {v.closing && <p className="role-summary" style={{ marginTop: 28, marginBottom: 0 }}>{withMail(t(v.closing), v.contactEmail)}</p>}
          <div className="role-tags">
            {v.tags.map((x, i) => <span key={i} className="vac-tag">{t(x)}</span>)}
          </div>
          <div className="cta-band cta-band--hire" style={{ marginTop: 36 }}>
            <div>
              <h2>{t({ nl: "Interesse of iemand in gedachten?", en: "Interested, or know someone?" })}</h2>
              <p>{t({ nl: "Stuur je cv of een korte introductie. De naam van de opdrachtgever delen we in een eerste gesprek.", en: "Send your CV or a short introduction. We share the client's name in a first conversation." })}</p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-light btn-lg" onClick={() => setApplyOpen(true)}>{t({ nl: "Reageer op deze rol", en: "Apply for this role" })}</button>
              <a href={`mailto:${v.contactEmail ?? "douwe@productiveswitch.nl"}?subject=${encodeURIComponent(v.subject)}`} className="btn btn-ghost-light">{v.contactEmail ? t({ nl: "Of mail ons", en: "Or email us" }) : t({ nl: "Of mail Douwe", en: "Or email Douwe" })}</a>
            </div>
          </div>
          <p className="role-back"><Link href="/jobs" className="lees-meer">← {t({ nl: "Alle rollen", en: "All roles" })}</Link></p>
        </article>
      </div>
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} lang={lang} v={v} />
    </main>
  );
}
