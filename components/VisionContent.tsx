"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";

// De visie: volvlakke bosgroene hero met zijkaart, daarna de drie verschuivingen,
// drie overtuigingen, het anker en de terugval-zin. Inhoud naar
// "Productive Switch - Visie.docx" (juli 2026), aangescherpt oktober 2026.
export function VisionContent() {
  const { lang, t } = useLang();
  useReveal();
  useHashScroll();

  const shifts = [
    {
      title: { nl: "AI en robotica raken elke functie", en: "AI and robotics touch every job" },
      body: {
        nl: "Veel kantoorbanen veranderen van inhoud of verdwijnen. Niet in één keer, wel gestaag: het gat tussen wat AI kan en wat er vandaag gebeurt, sluit de komende jaren.",
        en: "Many office jobs change in content or disappear. Not all at once, but steadily: the gap between what AI can do and what happens today closes over the coming years.",
      },
    },
    {
      title: { nl: "De energietransitie vraagt om vakmensen", en: "The energy transition needs skilled hands" },
      body: {
        nl: "Netten, installaties, isolatie en infrastructuur moeten gebouwd en onderhouden worden. Dat werk is er, en het blijft er langer.",
        en: "Grids, installations, insulation and infrastructure have to be built and maintained. That work exists, and it lasts longer.",
      },
    },
    {
      title: { nl: "Zorg en onderwijs vragen om handen en aandacht", en: "Care and education need people and attention" },
      body: {
        nl: "Tekorten die automatisering niet oplost. Werk waar mensen het verschil maken, en waar instappen makkelijker moet worden.",
        en: "Shortages automation will not solve. Work where people make the difference, and where entry has to get easier.",
      },
    },
  ];

  const beliefs = [
    {
      title: { nl: "Reorganiseren is geen falen, wegkijken wel.", en: "Restructuring is not failure. Looking away is." },
      body: {
        nl: "Werkgevers verdienen de ruimte om meer met minder te doen, op één voorwaarde: dat ze zich inspannen om hun mensen goed te laten landen. Die ruimte organiseren wij.",
        en: "Employers deserve the room to do more with less, on one condition: that they make the effort to let their people land well. We organise that room.",
      },
    },
    {
      title: { nl: "Werk mag niet vastzitten aan een diploma.", en: "Work should not be locked to a diploma." },
      body: {
        nl: "Tekortsectoren moeten instappen makkelijk maken: korte, erkende leertrajecten en leren op de werkvloer. Wij bouwen die routes met opleiders en werkgevers.",
        en: "Shortage sectors have to make entry easy: short, accredited learning tracks and learning on the job. We build those routes with training providers and employers.",
      },
    },
    {
      title: { nl: "Mensen kiezen, wij geven richting.", en: "People choose, we give direction." },
      body: {
        nl: "Geen reflectietrajecten van maanden, maar een concreet aanbod: dit zijn de routes, dit is wat ze vragen, dit is waar je over vier weken staat.",
        en: "No months of reflection exercises, but a concrete offer: these are the routes, this is what they ask of you, this is where you'll stand in four weeks.",
      },
    },
  ];

  return (
    <main className="visie-page">
      <section className="h-hero h-hero--forest">
        <div className="wrap h-hero-grid">
          <div className="h-hero-text">
            <div className="eyebrow">{t({ nl: "De visie", en: "The vision" })}</div>
            <h1>
              {t({
                nl: "Van werk dat verandert naar werk waar vraag naar is.",
                en: "From work that is changing to work that is in demand.",
              })}
            </h1>
            <p className="lede">
              {t({
                nl: "Het opnieuw uitvinden van productief mensenwerk in een tijd van AI en robotica is een van de grootste opgaven van deze tijd. Wij helpen mensen van wie het werk verandert de overstap maken naar werk waar de arbeidsmarkt om vraagt. Op basis van basiscompetenties, een frisse blik en het optimaal benutten van de nieuwste tools om snel productief te zijn.",
                en: "Reinventing productive human work in an age of AI and robotics is one of the great tasks of our time. We help people whose work is changing step into work the labour market is asking for. Built on core competences, a fresh perspective and making the most of the newest tools to become productive fast.",
              })}
            </p>
            <div className="cta-actions">
              <a className="btn btn-light btn-lg" href="#visie-contact">
                {t({ nl: "Kom in contact", en: "Get in touch" })}
              </a>
              <Link className="btn btn-ghost-light btn-lg" href="/productive-switch">
                {t({ nl: "Hoe we dit doen", en: "How we do this" })}
              </Link>
            </div>
          </div>
          <div className="h-hero-side">
            <div className="h-side-card">
              <div className="h-side-k">{t({ nl: "Op deze pagina", en: "On this page" })}</div>
              <ul>
                <li><a href="#verschuivingen">{t({ nl: "Drie verschuivingen", en: "Three shifts" })}</a></li>
                <li><a href="#overtuigingen">{t({ nl: "Drie overtuigingen", en: "Three convictions" })}</a></li>
                <li><a href="#anker">{t({ nl: "Het anker", en: "The anchor" })}</a></li>
                <li><a href="#terugval">{t({ nl: "Waar we op terugvallen", en: "What we fall back on" })}</a></li>
                <li><a href="#visie-contact">{t({ nl: "Kom in contact", en: "Get in touch" })}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section reveal" id="verschuivingen">
          <div className="section-head">
            <div className="eyebrow">{t({ nl: "Wat er gebeurt", en: "What is happening" })}</div>
            <h2>{t({ nl: "Drie verschuivingen. Wij maken ze elkaars oplossing.", en: "Three shifts. We make them each other's solution." })}</h2>
          </div>
          <div className="shift-grid stagger">
            {shifts.map((s, i) => (
              <div className="shift" key={i}>
                <div className="shift-num">0{i + 1}</div>
                <h3>{t(s.title)}</h3>
                <p>{t(s.body)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section reveal" id="overtuigingen">
          <div className="section-head">
            <div className="eyebrow">{t({ nl: "Waar we in geloven", en: "What we believe" })}</div>
            <h2>{t({ nl: "Drie overtuigingen", en: "Three convictions" })}</h2>
          </div>
          <ol className="belief-list stagger">
            {beliefs.map((b, i) => (
              <li key={i}>
                <span className="adv-num">0{i + 1}</span>
                <div>
                  <h3>{t(b.title)}</h3>
                  <p>{t(b.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="vision reveal" id="anker">
        <p>
          {t({
            nl: "Een functieomschrijving kan over een half jaar anders zijn. Blijvend inzetbaar zijn betekent blijven leren, met technologie in plaats van ertegen.",
            en: "A job description can look different in six months. Staying employable means continuing to learn, with technology rather than against it.",
          })}
        </p>
        <h2>
          {lang === "nl" ? (
            <>
              Het anker: <span className="anchor">leren om te blijven leren.</span>
            </>
          ) : (
            <>
              The anchor: <span className="anchor">learning to keep learning.</span>
            </>
          )}
        </h2>
      </section>

      <div className="wrap">
        <section className="section reveal" id="terugval">
          <div className="quote">
            <blockquote>
              {t({
                nl: "We staan HR-leiders aan beide kanten van de cyclus bij: mensen vinden als je aanneemt, en je mensen goed laten landen als je reorganiseert.",
                en: "We stand beside HR leaders on both sides of the cycle: finding people when you hire, and letting your people land well when you restructure.",
              })}
            </blockquote>
            <div className="who">
              <div className="role">{t({ nl: "De zin waar we altijd op terugvallen", en: "The sentence we always fall back on" })}</div>
            </div>
          </div>
        </section>

        <section className="cta-band reveal" id="visie-contact">
          <div>
            <h2>{t({ nl: "Benieuwd hoe dit voor jouw mensen werkt?", en: "Curious how this works for your people?" })}</h2>
            <p>
              {t({
                nl: "Vertel kort wie je bent en wat er speelt, en plan een kennismaking in.",
                en: "Tell us briefly who you are and what's going on, and book an introduction.",
              })}
            </p>
          </div>
          <Link href="/productive-switch#contact" className="btn btn-light btn-lg">
            {t({ nl: "Plan een kennismaking", en: "Book an introduction" })}
          </Link>
        </section>
      </div>
    </main>
  );
}
