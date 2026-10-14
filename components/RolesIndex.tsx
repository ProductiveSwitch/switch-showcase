"use client";

import Link from "next/link";
import { vacancies } from "@/lib/data";
import { useLang } from "./LangContext";

export function RolesIndex() {
  const { t } = useLang();
  return (
    <main className="hire role-page">
      <section className="h-hero h-hero--short">
        <div className="wrap">
          <div className="h-hero-text">
            <div className="eyebrow">Productive Search</div>
            <h1>{t({ nl: "Openstaande rollen", en: "Open roles" })}</h1>
            <p className="lede">{t({ nl: "Senior HR-rollen waar we nu voor werven, vast en interim. De naam van de opdrachtgever delen we in een eerste gesprek.", en: "Senior HR roles we are recruiting for right now, permanent and interim. We share the client's name in a first conversation." })}</p>
          </div>
        </div>
      </section>
      <div className="wrap">
        <section className="section">
          <div className="vac-list">
            {vacancies.map((v) => (
              <Link href={`/jobs/${v.slug}`} className="vac" key={v.slug}>
                <div className="vac-main">
                  <div className="vac-role">{t(v.role)}</div>
                  <div className="vac-org">{t(v.org)} · {v.location}</div>
                  <div className="vac-tags">
                    <span className="vac-tag">{t(v.duration)}</span>
                    <span className="vac-tag muted">{t(v.hours)}</span>
                  </div>
                </div>
                <div className="vac-side"><span className="btn btn-hire btn-sm">{t({ nl: "Bekijk de rol", en: "View the role" })}</span></div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
