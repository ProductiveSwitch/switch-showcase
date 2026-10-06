"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";
import { RadarChart } from "./RadarChart";
import { NetworkConnector } from "./NetworkConnector";

// Homepage = het merk in één blik: één netwerk, twee diensten. De inhoud van
// Productive Switch zelf (drie richtingen, hoe het werkt, visie) staat op
// /productive-switch; Productive Search op /productive-search.
type Variant = "0" | "1" | "4";

export function HomePage() {
  const { lang, t } = useLang();
  // Lokaal testhulpmiddel (oktober 2026): drie varianten van het eerste scherm.
  // "0" = huidig (radar als middelpunt), "1" = één zin en twee deuren,
  // "4" = twee deuren en daarna de radar als "waarom nu". ?variant= of de
  // kiezer rechtsonder; onthouden in localStorage (ps-home-variant).
  const [variant, setVariant] = useState<Variant>("0");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("variant");
    const st = window.localStorage.getItem("ps-home-variant");
    const v = (["0", "1", "4"].includes(q || "") ? q : ["0", "1", "4"].includes(st || "") ? st : "0") as Variant;
    setVariant(v);
  }, []);
  const pick = (v: Variant) => {
    setVariant(v);
    window.localStorage.setItem("ps-home-variant", v);
  };
  useReveal();
  useHashScroll();

  const doors = (
    <div className="doors">
      <Link href="/productive-search" className="door door--search">
        <span className="door-k">Productive Search</span>
        <span className="door-t">{t({ nl: "Werving voor senior HR-professionals", en: "Recruitment for senior HR professionals" })}</span>
        <span className="door-s">
          {t({
            nl: "HR-leiders, senior professionals en interim adviseurs voor de transformatie die eraan komt.",
            en: "HR leaders, senior professionals and interim advisers for the transformation that is coming.",
          })}
        </span>
        <span className="door-cta">
          {t({ nl: "Bekijk Productive Search", en: "See Productive Search" })} <ArrowRight size={16} />
        </span>
      </Link>
      <Link href="/productive-switch" className="door door--switch">
        <span className="door-k">Productive Switch</span>
        <span className="door-t">{t({ nl: "Omscholing via gerichte outplacementtrajecten", en: "Re-training through targeted outplacement" })}</span>
        <span className="door-s">
          {t({
            nl: "Voor medewerkers van wie de functie verdwijnt: kort, erkend, en met een werkgever aan het eind.",
            en: "For employees whose role is ending: short, recognised, and with an employer at the end.",
          })}
        </span>
        <span className="door-cta">
          {t({ nl: "Bekijk Productive Switch", en: "See Productive Switch" })} <ArrowRight size={16} />
        </span>
      </Link>
    </div>
  );

  const radarBlock = (compact: boolean) => (
    <div className={`wrap s-hero-stage${compact ? " s-hero-stage--section" : ""}`}>
      <RadarChart variant="figure" lang={lang} animate />
      <div className="s-hero-chart-cap">
        <span className="radar-source">
          {t({ nl: "Bron: ", en: "Source: " })}
          <a href="https://www.anthropic.com/research/labor-market-impacts" target="_blank" rel="noreferrer">
            Anthropic, Labor market impacts of AI
          </a>{" "}
          {t({ nl: "(maart 2026, figuur 2) en ", en: "(March 2026, figure 2) and " })}
          <a href="https://www.anthropic.com/research/what-work-can-robots-do" target="_blank" rel="noreferrer">
            What work can robots do?
          </a>{" "}
          {t({ nl: "(september 2026, figuur 6).", en: "(September 2026, figure 6)." })}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <main>
        {variant === "0" ? (
          <>
        {/* Hero: the radar as centrepiece */}
        <section className="s-hero s-hero--centre">
          <div className="wrap s-hero-head">
            <h1>
              {t({
                nl: "Omscholing via gerichte outplacementtrajecten en werving voor senior HR-professionals.",
                en: "Re-training through targeted outplacement and recruitment for senior HR professionals.",
              })}
            </h1>
          </div>
          <div className="wrap s-hero-stage">
            <RadarChart variant="figure" lang={lang} animate />
            <div className="s-hero-chart-cap">
              <span className="radar-source">
                {t({ nl: "Bron: ", en: "Source: " })}
                <a href="https://www.anthropic.com/research/labor-market-impacts" target="_blank" rel="noreferrer">
                  Anthropic, Labor market impacts of AI
                </a>{" "}
                {t({ nl: "(maart 2026, figuur 2) en ", en: "(March 2026, figure 2) and " })}
                <a href="https://www.anthropic.com/research/what-work-can-robots-do" target="_blank" rel="noreferrer">
                  What work can robots do?
                </a>{" "}
                {t({ nl: "(september 2026, figuur 6).", en: "(September 2026, figure 6)." })}
              </span>
            </div>
          </div>
        </section>

          </>
        ) : (
          <section className="s-hero s-hero--doors">
            <div className="wrap s-hero-head">
              <h1>
                {t({
                  nl: "Omscholing via gerichte outplacementtrajecten en werving voor senior HR-professionals.",
                  en: "Re-training through targeted outplacement and recruitment for senior HR professionals.",
                })}
              </h1>
              <p className="lede">
                {t({
                  nl: "HR-leiders spelen de komende jaren een cruciale rol op twee fronten: de organisatie klaarmaken voor wat komt, en medewerkers van wie de functie verdwijnt goed laten landen. Wij helpen op beide.",
                  en: "In the coming years HR leaders play a crucial role on two fronts: readying the organisation for what is coming, and landing employees whose roles disappear well. We help with both.",
                })}
              </p>
            </div>
            <div className="wrap">{doors}</div>
          </section>
        )}

        {variant === "4" && (
          <section className="section radar-section" id="waarom-nu">
            <div className="wrap">
              <div className="section-head centered">
                <div className="eyebrow">{t({ nl: "Waarom nu", en: "Why now" })}</div>
                <h2>{t({ nl: "Elk werk verandert, maar de vraag verschuift.", en: "All work is changing, but the demand is shifting." })}</h2>
                <p>
                  {t({
                    nl: "Het gat tussen wat AI kan en wat vandaag gebeurt, sluit het snelst in kantoorwerk. Zet robotica erbij en ook fysiek werk schuift mee. Tegelijk blijft de vraag naar mensen in techniek, energie, zorg en onderwijs langer bestaan.",
                    en: "The gap between what AI can do and what happens today closes fastest in office work. Add robotics and physical work shifts too. Meanwhile demand for people in the trades, energy, care and education lasts longer.",
                  })}
                </p>
              </div>
            </div>
            {radarBlock(true)}
          </section>
        )}

        {/* Netwerkconnector */}
        <section className="netc-section reveal" id="netwerk">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">{t({ nl: "Het netwerk", en: "The network" })}</div>
              <h2>{t({ nl: "Twee diensten, één netwerk", en: "Two services, one network" })}</h2>
              <p>
                {t({
                  nl: "Het opnieuw uitvinden van productief mensenwerk in een tijd van AI en robotica is een van de grootste opgaven van deze tijd. Samenwerking is daarin cruciaal: tussen HR-leiders, senior HR-professionals, deelnemers, loopbaancoaches, opleiders en werkgevers met blijvende vraag. Wij brengen dat netwerk samen.",
                  en: "Reinventing productive human work in an age of AI and robotics is one of the great tasks of our time. Collaboration is crucial: between HR leaders, senior HR professionals, participants, career coaches, training providers and employers with lasting demand. We bring that network together.",
                })}
              </p>
            </div>
            {variant === "0" && (
            <div className="netc-brands">
            <div className="s-hero-brands">
              <Link className="hero-brandbtn hb-hire" href="/productive-search">
                <span className="hb-title">Productive Search</span>
                <span className="hb-sub">
                  {t({ nl: "Senior professionals voor je HR-transformatie", en: "Senior professionals for your HR transformation" })}
                </span>
                <ArrowRight size={18} className="hb-arrow" />
              </Link>
              <Link className="hero-brandbtn hb-switch" href="/productive-switch">
                <span className="hb-title">Productive Switch</span>
                <span className="hb-sub">
                  {t({ nl: "Gerichte omscholing voor werknemers van wie de functie verdwijnt", en: "Targeted re-training for employees whose role is ending" })}
                </span>
                <ArrowRight size={18} className="hb-arrow" />
              </Link>
            </div>
            </div>
            )}
            <NetworkConnector lang={lang} />
          </div>
        </section>

        {/* Two services */}
        {variant === "0" && (
        <section className="section reveal" id="diensten">
          <div className="wrap">
            <div className="section-head">
              <h2>{t({ nl: "Hoe we helpen", en: "How we help" })}</h2>
              <p>
                {t({
                  nl: "HR-leiders spelen de komende jaren een cruciale rol op onder andere deze twee fronten: het begeleiden van hun organisatie naar een toekomstbestendige vorm, en het begeleiden van medewerkers van wie de functie verdwijnt. Wij helpen ze op beide onderdelen.",
                  en: "In the coming years HR leaders play a crucial role on, among others, these two fronts: guiding their organisation into a future-proof shape, and guiding employees whose roles disappear. We help them with both.",
                })}
              </p>
            </div>
            <div className="service-grid stagger">
              <Link href="/productive-search" className="service-card sc-hire">
                <div className="sc-eyebrow">Productive Search</div>
                <h3>{t({ nl: "Recruitment voor senior HR-professionals", en: "Recruitment for senior HR professionals" })}</h3>
                <p>
                  {t({
                    nl: "Werving van HR-leiders, senior professionals en interim adviesopdrachten op onderwerpen als organisatieontwerp, employee relations, reorganisaties en de toepassing van AI binnen HR.",
                    en: "Recruitment of HR leaders, senior professionals and interim advisory assignments on topics such as organisational design, employee relations, reorganisations and the application of AI within HR.",
                  })}
                </p>
                <span className="sc-link">
                  {t({ nl: "Naar Productive Search", en: "To Productive Search" })} <ArrowRight size={16} />
                </span>
              </Link>
              <Link href="/productive-switch" className="service-card sc-switch">
                <div className="sc-eyebrow">Productive Switch</div>
                <h3>{t({ nl: "Omscholing die eindigt bij een werkgever", en: "Re-training that ends at an employer" })}</h3>
                <p>
                  {t({
                    nl: "Gerichte outplacementtrajecten: een productieve online start, een ondersteunende intake, begeleiding door een erkende coach, korte en erkende omscholing, en een directe lijn naar organisaties in techniek, energie, zorg en het onderwijs.",
                    en: "Targeted outplacement tracks: a productive online start, a supportive intake, guidance by an accredited coach, short and recognised re-training, and a direct line to organisations in the trades, energy, care and education.",
                  })}
                </p>
                <span className="sc-link">
                  {t({ nl: "Naar Productive Switch", en: "To Productive Switch" })} <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>
        )}

        {/* Why now: three numbers, plain */}
        {variant !== "4" && (
        <section className="why reveal" id="waarom">
          <div className="wrap">
            <div className="why-grid">
              <div className="why-text">
                <div className="eyebrow">{t({ nl: "Waarom nu", en: "Why now" })}</div>
                <h2>{t({ nl: "Elk werk verandert, maar de vraag verschuift.", en: "All work is changing, but the demand is shifting." })}</h2>
                <p>
                  {t({
                    nl: "De grafiek laat goed zien wat het gat is tussen wat er gaat gebeuren en waar we nu staan. Dat gat sluit de komende jaren in kantoorwerk. Tegelijk blijft de vraag naar mensen in de techniek, de energie, de zorg en het onderwijs langer bestaan. Daar bouwen wij een brug.",
                    en: "The chart shows the gap between what is coming and where we stand today. In office work that gap closes over the next few years. Meanwhile the demand for people in the trades, energy, care and education lasts longer. That is where we build a bridge.",
                  })}
                </p>
                <Link href="/vision" className="lees-meer">
                  {t({ nl: "Lees onze visie", en: "Read our vision" })} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
        )}

        <div className="wrap">
          <section className="cta-band reveal" id="contact">
            <div>
              <h2>{t({ nl: "Een transformatie of reorganisatie op komst?", en: "A transformation or restructuring ahead?" })}</h2>
              <p>
                {t({
                  nl: "Vertel kort wie je bent en wat er speelt, en plan een kennismaking in.",
                  en: "Tell us briefly who you are and what's going on, and book an introduction.",
                })}
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-light btn-lg" href="/contact">
                {t({ nl: "Plan een kennismaking", en: "Book an introduction" })}
              </Link>
            </div>
          </section>
        </div>
        <div className="variant-picker" role="group" aria-label="Homepage-variant (test)">
          <span>Voorblad</span>
          {(["0", "1", "4"] as Variant[]).map((v) => (
            <button key={v} className={variant === v ? "on" : ""} onClick={() => pick(v)}>
              {v === "0" ? "Huidig" : v === "1" ? "Optie 1" : "Optie 4"}
            </button>
          ))}
        </div>
      </main>

    </>
  );
}
