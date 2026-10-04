"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { vacancies, vacancyFilters, hrShifts, roleTypes, advisoryItems, type VacancyCategory } from "@/lib/data";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";
import { CvModal } from "./Forms";

export function ProductiveSearchPage() {
  const { lang, t } = useLang();
  const [vacFilter, setVacFilter] = useState<"all" | VacancyCategory>("all");
  const [cvOpen, setCvOpen] = useState(false);
  useReveal();
  useHashScroll();

  const shownVacancies = vacancies.filter((v) => vacFilter === "all" || v.category === vacFilter);

  return (
    <main className="hire">
      {/* Full-bleed blue hero, starts directly under the nav */}
      <section className="h-hero">
        <div className="wrap h-hero-grid">
          <div className="h-hero-text">
            <div className="eyebrow">Productive Search & Advisory</div>
            <h1>
              {t({
                nl: "Senior HR-leiders voor de transformatie die eraan komt.",
                en: "Senior HR leaders for the transformation that's coming.",
              })}
            </h1>
            <p className="lede">
              {t({
                nl: "Productive Search werft senior HR-rollen met de focus op HR-transformaties: reorganisaties, organisatieontwerp, loontransparantie en AI in HR. Daarnaast adviseren we HR-leiders die zo'n verandering zelf dragen. Hetzelfde netwerk dat je medewerkers goed laat landen, kent ook de mensen die dat proces leiden.",
                en: "Productive Search recruits senior HR roles with a focus on HR transformations: reorganisations, organisational design, pay transparency and AI in HR. We also advise HR leaders carrying such a change themselves. The same network that helps your employees land well also knows the people who lead that process.",
              })}
            </p>
            <div className="cta-actions">
              <a href="#search-contact" className="btn btn-light btn-lg">
                {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
              </a>
              <button className="btn btn-ghost-light btn-lg" onClick={() => setCvOpen(true)}>
                {t({ nl: "Upload CV", en: "Upload CV" })}
              </button>
            </div>
          </div>
          <div className="h-hero-side">
            <div className="h-side-card">
              <div className="h-side-k">{t({ nl: "Waar we voor werven", en: "What we recruit for" })}</div>
              <ul>
                <li>{t({ nl: "CHRO en HR-directeur", en: "CHRO and HR Director" })}</li>
                <li>{t({ nl: "HR Transformation Lead", en: "HR Transformation Lead" })}</li>
                <li>{t({ nl: "Head of Employee Relations", en: "Head of Employee Relations" })}</li>
                <li>{t({ nl: "Reward & Pay Transparency Lead", en: "Reward & Pay Transparency Lead" })}</li>
                <li>{t({ nl: "Organisational Design en AI in HR", en: "Organisational Design and AI in HR" })}</li>
              </ul>
              <a href="#rollen" className="h-side-link">
                {t({ nl: "Alle rollen", en: "All roles" })} <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        {/* What is coming for HR */}
        <section className="section reveal" id="verwachting">
          <div className="section-head">
            <div className="eyebrow">{t({ nl: "De komende jaren", en: "The coming years" })}</div>
            <h2>{t({ nl: "Wat er op HR afkomt", en: "What's heading for HR" })}</h2>
            <p>
              {t({
                nl: "Drie verschuivingen komen tegelijk binnen. Elk ervan vraagt om HR-leiderschap dat verder gaat dan de dagelijkse operatie.",
                en: "Three shifts arrive at once. Each asks for HR leadership that goes beyond daily operations.",
              })}
            </p>
          </div>
          <div className="shift-grid stagger">
            {hrShifts.map((s, i) => (
              <div className="shift" key={i}>
                <div className="shift-num">0{i + 1}</div>
                <h3>{t(s.title)}</h3>
                <p>{t(s.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Role types */}
        <section className="section reveal" id="rollen">
          <div className="section-head">
            <div className="eyebrow">Search</div>
            <h2>{t({ nl: "Rollen waarin we bemiddelen", en: "Roles we place" })}</h2>
            <p>
              {t({
                nl: "Senior HR, altijd met een transformatie-component. Vast en interim. Geen generiek HR-bureau: we kennen de mensen omdat we ze dagelijks spreken over precies deze onderwerpen.",
                en: "Senior HR, always with a transformation component. Permanent and interim. Not a generic HR agency: we know the people because we talk to them daily about exactly these topics.",
              })}
            </p>
          </div>
          <div className="role-grid stagger">
            {roleTypes.map((r, i) => (
              <div className="role" key={i}>
                <h3>{t(r.title)}</h3>
                <p>{t(r.body)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Advisory, dark band */}
      <section className="advisory reveal" id="advisory">
        <div className="wrap">
          <div className="advisory-grid">
            <div className="advisory-intro">
              <div className="eyebrow">Advisory</div>
              <h2>{t({ nl: "Sparren voordat je beslist", en: "Sparring before you decide" })}</h2>
              <p>
                {t({
                  nl: "Niet elke transformatie vraagt om een nieuwe hire. Soms heb je iemand nodig die het al eens gedaan heeft en een middag meekijkt. Op deze onderwerpen adviseren we HR-leiders, los van of er een vacature uit komt.",
                  en: "Not every transformation calls for a new hire. Sometimes you need someone who has done it before and looks along for an afternoon. On these topics we advise HR leaders, regardless of whether a vacancy comes out of it.",
                })}
              </p>
              <a href="#search-contact" className="btn btn-light">
                {t({ nl: "Plan een gesprek", en: "Plan a conversation" })}
              </a>
            </div>
            <ol className="advisory-list">
              {advisoryItems.map((a, i) => (
                <li key={i}>
                  <span className="adv-num">0{i + 1}</span>
                  <div>
                    <h3>{t(a.title)}</h3>
                    <p>{t(a.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="wrap">
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

        {/* Testimonial (placeholder until a real client quote exists) */}
        <section className="reveal">
          <div className="quote hire">
            <blockquote>
              {t({
                nl: "“Het contact was persoonlijk en de betrokkenheid groot. Ze dachten echt mee over wat wij nodig hadden, en dankzij hun netwerk in HR kwamen er kandidaten voorbij die we zelf nooit hadden bereikt.”",
                en: "“The contact was personal and the involvement real. They genuinely thought along with what we needed, and thanks to their network in HR, candidates came by that we'd never have reached ourselves.”",
              })}
            </blockquote>
            <div className="who">
              <div className="avatar">MK</div>
              <div style={{ textAlign: "left" }}>
                <div className="name">Marleen Koster</div>
                <div className="role">
                  {t({ nl: "HR-directeur, opdrachtgever Productive Search", en: "HR Director, Productive Search client" })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="cta-band cta-band--hire reveal" id="search-contact">
          <div>
            <h2>{t({ nl: "Een rol te vervullen? We kennen de mensen.", en: "A role to fill? We know the people." })}</h2>
            <p>
              {t({
                nl: "Vertel ons wat je zoekt, dan komen we met een korte, gerichte shortlist. Of plan een adviesgesprek over wat er bij jou speelt.",
                en: "Tell us what you're after, and we'll come back with a short, focused shortlist. Or plan an advisory conversation about what's going on at your end.",
              })}
            </p>
          </div>
          <a href="mailto:info@productiveswitch.nl" className="btn btn-light btn-lg">
            {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
          </a>
        </section>
      </div>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} lang={lang} />
    </main>
  );
}
