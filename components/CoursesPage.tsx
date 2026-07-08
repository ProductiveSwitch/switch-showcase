"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinations, type Bi } from "@/lib/data";
import {
  courses,
  veldLabels,
  vormLabels,
  duurCatLabels,
  binnenMaandLabels,
  prijsCatLabels,
  type CourseRichting,
  type DuurCat,
  type BinnenMaand,
  type VormCat,
  type PrijsCat,
} from "@/lib/courses";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { Modal, IntakeForm } from "./Forms";
import { RadarChart } from "./RadarChart";

const accents: Record<string, string> = {
  "eigen-vak": "var(--col-domain)",
  techniek: "var(--col-tech-deep)",
  sociaal: "var(--col-social)",
};

const intros: Record<string, Bi> = {
  techniek: {
    nl: "Kort, erkend aanbod uit onze marktverkenning. Vast patroon in de techniek: week één bestaat uit universele certificaten (VCA, BHV, heftruck, NEN 3140), samen vier dagen. Daarna neemt een opleidingsbedrijf of leerwerktraject het over, vaak met salaris vanaf dag één.",
    en: "Short, accredited offerings from our market scan. The trades follow a fixed pattern: week one is universal certificates (VCA, emergency response, forklift, NEN 3140), four days in total. After that a training company or work-learn track takes over, often with a salary from day one.",
  },
  sociaal: {
    nl: "Kort, erkend aanbod uit onze marktverkenning. Erkend aanbod binnen vier weken zit in het sociaal domein vrijwel altijd vast aan een (leer)werkplek. Precies dat regelen wij: werkplek en certificaattraject als één pakket.",
    en: "Short, accredited offerings from our market scan. In the social sector, accredited tracks that fit within four weeks almost always require a (learning) workplace. That is exactly what we arrange: workplace and certificate track as one package.",
  },
  "eigen-vak": {
    nl: "Niet iedereen hoeft van vak te wisselen. Voor veel mensen is de grootste stap productiever worden in het werk dat ze al doen, met AI als gereedschap in plaats van bedreiging. Kort, praktisch aanbod uit onze marktverkenning, van gratis basiscursussen tot trainingen per vakgebied.",
    en: "Not everyone needs to change trades. For many people the biggest step is becoming more productive in the work they already do, with AI as a tool instead of a threat. Short, practical offerings from our market scan, from free fundamentals to trainings per field.",
  },
};

interface Filters {
  velden: string[];
  aanbieders: string[];
  duur: DuurCat[];
  binnenMaand: BinnenMaand[];
  vorm: VormCat[];
  prijs: PrijsCat[];
}

const emptyFilters: Filters = { velden: [], aanbieders: [], duur: [], binnenMaand: [], vorm: [], prijs: [] };

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function CoursesPage({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [intakeOpen, setIntakeOpen] = useState(false);
  useReveal();

  const dest = destinations.find((d) => d.slug === slug)!;
  const accent = accents[slug];
  const richting = (slug === "eigen-vak" ? "domein" : slug) as CourseRichting;
  const isDomein = slug === "eigen-vak";

  const all = useMemo(() => courses.filter((c) => c.richting === richting), [richting]);
  const velden = useMemo(() => [...new Set(all.map((c) => c.veld))], [all]);
  const aanbieders = useMemo(() => [...new Set(all.map((c) => c.aanbieder))].sort((a, b) => a.localeCompare(b, "nl")), [all]);

  const shown = all.filter(
    (c) =>
      (filters.velden.length === 0 || filters.velden.includes(c.veld)) &&
      (filters.aanbieders.length === 0 || filters.aanbieders.includes(c.aanbieder)) &&
      (filters.duur.length === 0 || filters.duur.includes(c.duurCat)) &&
      (filters.binnenMaand.length === 0 || filters.binnenMaand.includes(c.binnenMaand)) &&
      (filters.vorm.length === 0 || c.vorm.some((v) => filters.vorm.includes(v))) &&
      (filters.prijs.length === 0 || filters.prijs.includes(c.prijsCat))
  );

  const hasFilters = Object.values(filters).some((a) => a.length > 0);

  return (
    <main className="subpage" style={{ "--pc": accent } as React.CSSProperties}>
      <div className="wrap">
        <section className="page-head">
          <Link href="/#showcase" className="crumb">
            ← {t({ nl: "Alle richtingen", en: "All directions" })}
          </Link>
          <div className="eyebrow" style={{ color: accent }}>
            {t({ nl: `Richting ${dest.num}`, en: `Direction ${dest.num}` })}
          </div>
          <h1>{t(dest.label)}</h1>
          <p className="lede">{t(intros[slug])}</p>

          {/* Switcher: jump straight to another richting's catalogue */}
          <nav className="richting-switch" aria-label={t({ nl: "Kies een richting", en: "Choose a direction" })}>
            <span className="rs-label">{t({ nl: "Bekijk ook:", en: "Also see:" })}</span>
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/richtingen/${d.slug}`}
                className={`rs-pill${d.slug === slug ? " on" : ""}`}
                style={{ "--rc": accents[d.slug] } as React.CSSProperties}
                aria-current={d.slug === slug ? "page" : undefined}
              >
                {t(d.label)}
              </Link>
            ))}
          </nav>
        </section>

        {isDomein && (
          <section className="reveal domein-figure">
            <figure className="radar-block">
              <RadarChart variant="figure" lang={lang} />
              <figcaption>
                <span className="radar-legend">
                  <span className="radar-key">
                    <i className="radar-swatch theo" />
                    {t({ nl: "Wat AI theoretisch kan", en: "What AI can do in theory" })}
                  </span>
                  <span className="radar-key">
                    <i className="radar-swatch obs" />
                    {t({ nl: "Wat er echt wordt gebruikt", en: "What is actually used" })}
                  </span>
                </span>
                {t({
                  nl: "Bijscholen in je eigen vak: het gat tussen wat AI theoretisch kan en wat er echt wordt gebruikt is onbenutte productiviteit. Precies daar zetten deze trainingen op in. Naar de grafiek van de Anthropic Economic Index.",
                  en: "Upskilling in your own field: the gap between what AI can do in theory and what is actually used is untapped productivity. That is exactly where these trainings aim. After the Anthropic Economic Index chart.",
                })}
              </figcaption>
            </figure>
          </section>
        )}

        {
          <section className="courses-layout">
            <aside className="course-filters" aria-label={t({ nl: "Filters", en: "Filters" })}>
              <div className="cf-head">
                <span>{t({ nl: "Filter cursussen", en: "Filter courses" })}</span>
                {hasFilters && (
                  <button className="cf-clear" onClick={() => setFilters(emptyFilters)}>
                    {t({ nl: "Wis alles", en: "Clear all" })}
                  </button>
                )}
              </div>

              <div className="f-group">
                <div className="f-title">{t({ nl: "Veld", en: "Field" })}</div>
                {velden.map((v) => (
                  <label className="f-check" key={v}>
                    <input
                      type="checkbox"
                      checked={filters.velden.includes(v)}
                      onChange={() => setFilters({ ...filters, velden: toggle(filters.velden, v) })}
                    />
                    <span>{t(veldLabels[v])}</span>
                  </label>
                ))}
              </div>

              <div className="f-group">
                <div className="f-title">{t({ nl: "Aanbieder", en: "Provider" })}</div>
                <div className="f-scroll">
                  {aanbieders.map((a) => (
                    <label className="f-check" key={a}>
                      <input
                        type="checkbox"
                        checked={filters.aanbieders.includes(a)}
                        onChange={() => setFilters({ ...filters, aanbieders: toggle(filters.aanbieders, a) })}
                      />
                      <span>{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="f-group">
                <div className="f-title">{t({ nl: "Duur", en: "Length" })}</div>
                {(Object.keys(duurCatLabels) as DuurCat[]).map((d) => (
                  <label className="f-check" key={d}>
                    <input
                      type="checkbox"
                      checked={filters.duur.includes(d)}
                      onChange={() => setFilters({ ...filters, duur: toggle(filters.duur, d) })}
                    />
                    <span>{t(duurCatLabels[d])}</span>
                  </label>
                ))}
              </div>

              <div className="f-group">
                <div className="f-title">{t({ nl: "Eerste stap binnen 1 maand", en: "First step within 1 month" })}</div>
                <div className="f-pills">
                  {(Object.keys(binnenMaandLabels) as BinnenMaand[]).map((b) => (
                    <button
                      key={b}
                      className={`f-pill${filters.binnenMaand.includes(b) ? " on" : ""}`}
                      onClick={() => setFilters({ ...filters, binnenMaand: toggle(filters.binnenMaand, b) })}
                    >
                      {t(binnenMaandLabels[b])}
                    </button>
                  ))}
                </div>
              </div>

              <div className="f-group">
                <div className="f-title">{t({ nl: "Vorm", en: "Format" })}</div>
                {(Object.keys(vormLabels) as VormCat[]).map((v) => (
                  <label className="f-check" key={v}>
                    <input
                      type="checkbox"
                      checked={filters.vorm.includes(v)}
                      onChange={() => setFilters({ ...filters, vorm: toggle(filters.vorm, v) })}
                    />
                    <span>{t(vormLabels[v])}</span>
                  </label>
                ))}
              </div>

              <div className="f-group">
                <div className="f-title">{t({ nl: "Prijs (indicatie)", en: "Price (indicative)" })}</div>
                {(Object.keys(prijsCatLabels) as PrijsCat[]).map((p) => (
                  <label className="f-check" key={p}>
                    <input
                      type="checkbox"
                      checked={filters.prijs.includes(p)}
                      onChange={() => setFilters({ ...filters, prijs: toggle(filters.prijs, p) })}
                    />
                    <span>{t(prijsCatLabels[p])}</span>
                  </label>
                ))}
              </div>
            </aside>

            <div className="course-results">
              <div className="cr-count">
                {shown.length}{" "}
                {t(
                  shown.length === 1
                    ? { nl: "cursus", en: "course" }
                    : { nl: "cursussen", en: "courses" }
                )}
                {hasFilters && (
                  <button className="cf-clear" onClick={() => setFilters(emptyFilters)}>
                    {t({ nl: "Wis filters", en: "Clear filters" })}
                  </button>
                )}
              </div>

              <div className="course-grid">
                {shown.map((c, i) => (
                  <article className="course-card" key={i}>
                    <div className="cc-top">
                      <span className="chip" style={{ background: "color-mix(in srgb, var(--pc) 12%, #fff)", color: "var(--pc)" }}>
                        {t(veldLabels[c.veld])}
                      </span>
                      <span className={`cc-month cc-${c.binnenMaand}`}>
                        {t({ nl: "Binnen 1 mnd: ", en: "Within 1 mo: " })}
                        {t(binnenMaandLabels[c.binnenMaand]).toLowerCase()}
                      </span>
                    </div>
                    <h3 className="cc-title">{c.naam}</h3>
                    <div className="cc-org">{c.aanbieder}</div>
                    <dl className="cc-meta">
                      <div>
                        <dt>{t({ nl: "Duur", en: "Length" })}</dt>
                        <dd>{t(c.duur)}</dd>
                      </div>
                      <div>
                        <dt>{t({ nl: "Vorm", en: "Format" })}</dt>
                        <dd>{c.vorm.map((v) => t(vormLabels[v])).join(" / ")}</dd>
                      </div>
                      <div>
                        <dt>{t({ nl: "Prijs", en: "Price" })}</dt>
                        <dd>{t(c.prijs)}</dd>
                      </div>
                      <div>
                        <dt>{t({ nl: "Erkenning", en: "Recognition" })}</dt>
                        <dd>{c.erkenning}</dd>
                      </div>
                    </dl>
                    {c.url && (
                      <a className="cc-link" href={c.url} target="_blank" rel="noreferrer">
                        {t({ nl: "Bekijk bij de aanbieder →", en: "View at the provider →" })}
                      </a>
                    )}
                  </article>
                ))}
              </div>

              {shown.length === 0 && (
                <div className="vac-empty">
                  {t({
                    nl: "Geen cursussen binnen deze filters. Wis een filter, of vraag ons naar het volledige aanbod.",
                    en: "No courses match these filters. Clear a filter, or ask us for the full catalogue.",
                  })}
                </div>
              )}

              <p className="cc-disclaimer">
                {t({
                  nl: "Prijzen zijn indicatief en ex btw. Aanbod en startdata wisselen; in de intake controleren we alles en kijken we welke financiering erop past.",
                  en: "Prices are indicative and exclude VAT. Offerings and start dates change; in the intake we verify everything and match the right financing.",
                })}
              </p>
            </div>
          </section>
        }

        {isDomein && (
          <section className="reveal">
            <div className="cta-band">
              <div>
                <h2>{t({ nl: "Dit aanbod stellen we per vak samen", en: "We build this catalogue per trade" })}</h2>
                <p>
                  {t({
                    nl: "AI-bijscholing werkt alleen als die aansluit op het werk van je mensen. In de intake bepalen we samen welke tools en cursussen bij hun vak passen.",
                    en: "AI upskilling only works when it fits the work your people actually do. In the intake we map which tools and courses fit their trade.",
                  })}
                </p>
              </div>
              <button className="btn btn-switch btn-lg" onClick={() => setIntakeOpen(true)}>
                {t({ nl: "Plan een intake", en: "Plan an intake" })}
              </button>
            </div>
          </section>
        )}
      </div>

      <Modal
        open={intakeOpen}
        onClose={() => setIntakeOpen(false)}
        title={t({ nl: "Plan een intake", en: "Plan an intake" })}
        intro={t({
          nl: "Een paar korte vragen, dan weten we genoeg om je concreet terug te bellen. Geen verplichting.",
          en: "A few short questions, then we know enough to call you back concretely. No obligation.",
        })}
      >
        <IntakeForm lang={lang} onClose={() => setIntakeOpen(false)} />
      </Modal>
    </main>
  );
}
