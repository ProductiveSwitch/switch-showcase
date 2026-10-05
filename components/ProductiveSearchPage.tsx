"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { vacancies, vacancyFilters, hrShifts, roleTypes, type VacancyCategory } from "@/lib/data";
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
            <div className="eyebrow">Productive Search</div>
            <h1>
              {t({
                nl: "Senior HR-leiders voor de transformatie die eraan komt.",
                en: "Senior HR leaders for the transformation that's coming.",
              })}
            </h1>
            <p className="lede">
              {t({
                nl: "Productive Search werft HR-leiders, senior professionals en interim adviseurs met de focus op HR-transformaties: organisatieontwerp, employee relations, reorganisaties en de toepassing van AI binnen HR. Hetzelfde netwerk dat je medewerkers goed laat landen, kent ook de mensen die dat proces leiden.",
                en: "Productive Search recruits HR leaders, senior professionals and interim advisers with a focus on HR transformations: organisational design, employee relations, reorganisations and the application of AI within HR. The same network that helps your employees land well also knows the people who lead that process.",
              })}
            </p>
            <div className="cta-actions">
              <Link href="/contact?rol=vacature" className="btn btn-light btn-lg">
                {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
              </Link>
              <button className="btn btn-ghost-light btn-lg" onClick={() => setCvOpen(true)}>
                {t({ nl: "Upload CV", en: "Upload CV" })}
              </button>
            </div>
          </div>
          <div className="h-hero-side">
            <div className="h-side-card">
              <div className="h-side-k">{t({ nl: "Op deze pagina", en: "On this page" })}</div>
              <ul>
                <li><a href="#verwachting">{t({ nl: "Wat er op HR afkomt", en: "What's heading for HR" })}</a></li>
                <li><a href="#rollen">{t({ nl: "Rollen waarin we bemiddelen", en: "Roles we place" })}</a></li>
                <li><a href="#vacatures">{t({ nl: "Openstaande rollen", en: "Open roles" })}</a></li>
                <li><Link href="/contact?rol=vacature">{t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}</Link></li>
              </ul>
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
                nl: "Vertel ons wat je zoekt, dan komen we met een korte, gerichte shortlist.",
                en: "Tell us what you're after, and we'll come back with a short, focused shortlist.",
              })}
            </p>
          </div>
          <Link href="/contact?rol=vacature" className="btn btn-light btn-lg">
            {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
          </Link>
        </section>
      </div>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} lang={lang} />
    </main>
  );
}
