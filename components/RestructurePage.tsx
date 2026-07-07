/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { vacancies, vacancyFilters, type VacancyCategory } from "@/lib/data";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";
import { CvModal } from "./Forms";

export function RestructurePage() {
  const { lang, t } = useLang();
  const [vacFilter, setVacFilter] = useState<"all" | VacancyCategory>("all");
  const [cvOpen, setCvOpen] = useState(false);
  useReveal();
  useHashScroll();

  const shownVacancies = vacancies.filter(
    (v) => vacFilter === "all" || v.category === vacFilter
  );

  return (
    <main className="subpage hire">
      <div className="wrap">
        <section className="hero">
          <div className="hero-text">
            <div className="eyebrow">
              {t({ nl: "Werving voor HR en werktransitie", en: "Recruitment for HR and workforce transition" })}
            </div>
            <h1>
              {t({
                nl: "De juiste mensen om je reorganisatie te dragen.",
                en: "The right people to carry your restructuring.",
              })}
            </h1>
            <p className="lede">
              {t({
                nl: "Productive Restructure werft senior HR-rollen en functies rond werktransitie: de mensen die een reorganisatie zorgvuldig laten verlopen. Hetzelfde netwerk dat je medewerkers goed laat landen, vindt ook de leiders die dat proces dragen.",
                en: "Productive Restructure recruits senior HR roles and workforce-transition functions: the people who carry a reorganisation with care. The same network that helps your employees land well also finds the leaders who drive that process.",
              })}
            </p>
            <div className="hero-cta">
              <div className="cta-actions">
                <a href="#restructure-contact" className="btn btn-hire">
                  {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
                </a>
                <button className="btn btn-ghost" onClick={() => setCvOpen(true)}>
                  {t({ nl: "Upload CV", en: "Upload CV" })}
                </button>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
              alt=""
              loading="lazy"
            />
            <div className="hero-badge">
              <div className="bnum">500+</div>
              <div className="btxt">
                {t({ nl: "HR-professionals in ons netwerk", en: "HR professionals in our network" })}
              </div>
            </div>
          </div>
        </section>

        {/* Vacancies */}
        <section className="section reveal" id="vacatures">
          <div className="section-head">
            <h2>{t({ nl: "Openstaande rollen", en: "Open roles" })}</h2>
            <p>
              {t({
                nl: "Een selectie van vacatures waar we nu voor werven. Past er een bij je? Laat het ons weten.",
                en: "A selection of roles we're recruiting for right now. See a fit? Let us know.",
              })}
            </p>
          </div>

          <div className="vac-filters">
            {vacancyFilters.map((f) => (
              <button
                key={f.key}
                className={`vac-filter${vacFilter === f.key ? " on" : ""}`}
                onClick={() => setVacFilter(f.key)}
              >
                {t(f.label)}
              </button>
            ))}
          </div>

          <div className="vac-list">
            {shownVacancies.map((v, i) => (
              <div className="vac" key={i}>
                <div className="vac-main">
                  <div className="vac-role">{t(v.role)}</div>
                  <div className="vac-org">{t(v.org)}</div>
                  <div className="vac-tags">
                    {v.tags.map((tag, j) => (
                      <span className={`vac-tag${j === 0 ? "" : " muted"}`} key={j}>
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="vac-side">
                  <div className="vac-salary">{v.salary}</div>
                  <a
                    href={`mailto:info@productiveswitch.nl?subject=${encodeURIComponent(v.subject)}`}
                    className="btn btn-hire btn-sm"
                  >
                    {t({ nl: "Reageer", en: "Apply" })}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {shownVacancies.length === 0 && (
            <div className="vac-empty">
              {t({ nl: "Geen rollen in deze categorie op dit moment.", en: "No roles in this category right now." })}
            </div>
          )}
        </section>

        {/* Testimonial */}
        <section className="reveal">
          <div className="quote hire">
            <blockquote>
              {t({
                nl: "“Binnen twee weken lag er een shortlist die echt klopte. Geen stapel cv's, maar drie mensen die we alle drie hadden aangenomen.”",
                en: "“Within two weeks we had a shortlist that genuinely fit. Not a pile of CVs, but three people we'd have hired all three.”",
              })}
            </blockquote>
            <div className="who">
              <div className="avatar">MK</div>
              <div style={{ textAlign: "left" }}>
                <div className="name">Marleen Koster</div>
                <div className="role">
                  {t({
                    nl: "HR-directeur, opdrachtgever Productive Restructure",
                    en: "HR Director, Productive Restructure client",
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="cta-band reveal" id="restructure-contact">
          <div>
            <h2>{t({ nl: "Een rol te vervullen? We kennen de mensen.", en: "A role to fill? We know the people." })}</h2>
            <p>
              {t({
                nl: "Vertel ons wat je zoekt, dan komen we met een korte, gerichte shortlist.",
                en: "Tell us what you're after, and we'll come back with a short, focused shortlist.",
              })}
            </p>
          </div>
          <a href="mailto:info@productiveswitch.nl" className="btn btn-hire">
            {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
          </a>
        </section>
      </div>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} lang={lang} />
    </main>
  );
}
