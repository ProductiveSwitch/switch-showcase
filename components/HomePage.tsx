"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";
import { Modal, IntakeForm, type ModalKind } from "./Forms";
import { RadarChart } from "./RadarChart";
import { NetworkConnector } from "./NetworkConnector";

// Homepage = het merk in één blik: één netwerk, twee diensten. De inhoud van
// Productive Switch zelf (drie richtingen, hoe het werkt, visie) staat op
// /productive-switch; Productive Search & Advisory op /productive-search.
export function HomePage() {
  const { lang, t } = useLang();
  const [modal, setModal] = useState<ModalKind>(null);
  useReveal();
  useHashScroll();

  return (
    <>
      <main>
        {/* Hero: title covers both services, radar right */}
        <section className="s-hero">
          <div className="wrap s-hero-grid">
            <div className="s-hero-text">
              <h1>
                {t({
                  nl: "Werving voor senior HR-transformaties, en omscholing via gerichte outplacementtrajecten.",
                  en: "Recruitment for senior HR transformations, and re-training through targeted outplacement tracks.",
                })}
              </h1>
              <p className="lede">
                {t({
                  nl: "Via een netwerk van geselecteerde coaches, omscholings- en trainingspartijen en organisaties in sectoren waar automatisering minder snel impact heeft, staan we HR-leiders aan beide kanten van de cyclus bij: de juiste mensen vinden als je een transformatie leidt, en je mensen goed laten landen als functies verdwijnen.",
                  en: "Through a network of selected coaches, re-training and training partners, and organisations in sectors where automation bites more slowly, we stand beside HR leaders on both sides of the cycle: finding the right people when you lead a transformation, and landing your people well when roles disappear.",
                })}
              </p>
              <div className="s-hero-brands">
                <Link className="hero-brandbtn hb-hire" href="/productive-search">
                  <span className="hb-title">Productive Search & Advisory</span>
                  <span className="hb-sub">
                    {t({ nl: "Senior HR-leiders voor je transformatie", en: "Senior HR leaders for your transformation" })}
                  </span>
                  <ArrowRight size={18} className="hb-arrow" />
                </Link>
                <Link className="hero-brandbtn hb-switch" href="/productive-switch">
                  <span className="hb-title">Productive Switch</span>
                  <span className="hb-sub">
                    {t({ nl: "Gerichte omscholing voor je mensen", en: "Targeted re-training for your people" })}
                  </span>
                  <ArrowRight size={18} className="hb-arrow" />
                </Link>
              </div>
              <div className="s-hero-cta">
                <button className="btn btn-ink btn-lg" onClick={() => setModal("intake")}>
                  {t({ nl: "Kom in contact", en: "Get in touch" })}
                </button>
              </div>
            </div>
            <div className="s-hero-chart">
              <h2 className="s-hero-chart-title">
                {t({
                  nl: "Potentiële en huidige waargenomen toepassing van AI per beroepscategorie",
                  en: "Theoretical capability and observed usage by occupational category",
                })}
              </h2>
              <RadarChart variant="figure" lang={lang} />
              <div className="s-hero-chart-cap">
                <span className="radar-legend">
                  <span className="radar-key">
                    <i className="radar-swatch theo" />
                    {t({ nl: "Theoretische AI-dekking", en: "Theoretical AI coverage" })}
                  </span>
                  <span className="radar-key">
                    <i className="radar-swatch obs" />
                    {t({ nl: "Waargenomen AI-dekking", en: "Observed AI coverage" })}
                  </span>
                </span>
                <span className="radar-source">
                  {t({
                    nl: "Naar Anthropic, Labor market impacts of AI (maart 2026), figuur 2.",
                    en: "After Anthropic, Labor market impacts of AI (March 2026), figure 2.",
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Netwerkconnector */}
        <section className="netc-section reveal" id="netwerk">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">{t({ nl: "Het netwerk", en: "The network" })}</div>
              <h2>{t({ nl: "Wie we verbinden", en: "Who we connect" })}</h2>
              <p>
                {t({
                  nl: "Geen marktplaats, wel een netwerk dat we zelf onderhouden. Elke lijn hieronder is een relatie die we kennen en spreken.",
                  en: "Not a marketplace, but a network we maintain ourselves. Every line below is a relationship we know and talk to.",
                })}
              </p>
            </div>
            <NetworkConnector lang={lang} />
          </div>
        </section>

        {/* Two services */}
        <section className="section reveal" id="diensten">
          <div className="wrap">
            <div className="section-head">
              <h2>{t({ nl: "Twee diensten, één gesprek", en: "Two services, one conversation" })}</h2>
              <p>
                {t({
                  nl: "Werving, advies en omscholing komen uit één netwerk van HR-leiders, coaches en opleiders. Je hebt één aanspreekpunt, voor beide kanten van een reorganisatie.",
                  en: "Recruitment, advisory and re-training come from one network of HR leaders, coaches and training partners. One point of contact, for both sides of a reorganisation.",
                })}
              </p>
            </div>
            <div className="service-grid stagger">
              <Link href="/productive-search" className="service-card sc-hire">
                <div className="sc-eyebrow">Productive Search & Advisory</div>
                <h3>{t({ nl: "Recruitment voor senior HR-professionals", en: "Recruitment for senior HR professionals" })}</h3>
                <p>
                  {t({
                    nl: "Werving van HR-leiders en adviseurs, en adviesopdrachten op onderwerpen als employee relations, loontransparantie, AI-implementatie in HR en organisatieontwerp.",
                    en: "Recruitment of HR leaders and advisers, and advisory work on topics such as employee relations, pay transparency, AI implementation in HR and organisational design.",
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
                    nl: "Gerichte outplacementtrajecten: intake door een erkende coach, korte en erkende omscholing, en een directe lijn naar organisaties in zorg, onderwijs, techniek en energie.",
                    en: "Targeted outplacement tracks: intake by an accredited coach, short and recognised re-training, and a direct line to organisations in care, education, the trades and energy.",
                  })}
                </p>
                <span className="sc-link">
                  {t({ nl: "Naar Productive Switch", en: "To Productive Switch" })} <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Why now: three numbers, plain */}
        <section className="why reveal" id="waarom">
          <div className="wrap">
            <div className="why-grid">
              <div className="why-text">
                <div className="eyebrow">{t({ nl: "Waarom nu", en: "Why now" })}</div>
                <h2>{t({ nl: "Elk werk verandert, maar de vraag verschuift.", en: "All work is changing, but the demand is shifting." })}</h2>
                <p>
                  {t({
                    nl: "De grafiek laat goed zien wat het gat is tussen wat er gaat gebeuren en waar we nu staan. Dat gat sluit de komende jaren in kantoorwerk. Tegelijk blijft de vraag naar mensen in de zorg, het onderwijs, de techniek en de energie langer bestaan. Daar bouwen wij een brug.",
                    en: "The chart shows the gap between what is coming and where we stand today. In office work that gap closes over the next few years. Meanwhile the demand for people in care, education, the trades and energy lasts longer. That is where we build a bridge.",
                  })}
                </p>
                <Link href="/vision" className="lees-meer">
                  {t({ nl: "Lees onze visie", en: "Read our vision" })} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <section className="cta-band reveal" id="contact">
            <div>
              <h2>{t({ nl: "Een transformatie of reorganisatie op komst?", en: "A transformation or restructuring ahead?" })}</h2>
              <p>
                {t({
                  nl: "Vertel kort wie je bent en wat er speelt. We bellen je terug, concreet en zonder verplichting.",
                  en: "Tell us briefly who you are and what's going on. We'll call you back, concretely and without obligation.",
                })}
              </p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-light btn-lg" onClick={() => setModal("intake")}>
                {t({ nl: "Kom in contact", en: "Get in touch" })}
              </button>
            </div>
          </section>
        </div>
      </main>

      <Modal
        open={modal === "intake"}
        onClose={() => setModal(null)}
        title={t({ nl: "Kom in contact", en: "Get in touch" })}
        intro={t({
          nl: "Een paar korte vragen, dan weten we genoeg om je concreet terug te bellen. Geen verplichting.",
          en: "A few short questions, then we know enough to call you back concretely. No obligation.",
        })}
      >
        <IntakeForm lang={lang} onClose={() => setModal(null)} />
      </Modal>

    </>
  );
}
