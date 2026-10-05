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
                  nl: "HR-leiders spelen de komende jaren een cruciale rol op onder andere deze twee fronten: het begeleiden van hun organisatie naar een toekomstbestendige vorm, en het begeleiden van medewerkers van wie de functie verdwijnt. Wij helpen ze op beide onderdelen.",
                  en: "In the coming years HR leaders play a crucial role on, among others, these two fronts: guiding their organisation into a future-proof shape, and guiding employees whose roles disappear. We help them with both.",
                })}
              </p>
              <div className="s-hero-brands">
                <Link className="hero-brandbtn hb-hire" href="/productive-search">
                  <span className="hb-title">Productive Search & Advisory</span>
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
                <span className="radar-source">
                  {t({
                    nl: "Naar Anthropic, Labor market impacts of AI (maart 2026, figuur 2) en What work can robots do? (september 2026, figuur 6).",
                    en: "After Anthropic, Labor market impacts of AI (March 2026, figure 2) and What work can robots do? (September 2026, figure 6).",
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
              <h2>{t({ nl: "Twee diensten, één netwerk", en: "Two services, one network" })}</h2>
              <p>
                {t({
                  nl: "Het opnieuw uitvinden van productief mensenwerk in een tijd van AI en robotica is een van de grootste opgaven van deze tijd. Samenwerking is daarin cruciaal: tussen HR-leiders, senior HR-professionals, deelnemers, loopbaancoaches, opleiders en werkgevers met blijvende vraag. Wij brengen dat netwerk samen.",
                  en: "Reinventing productive human work in an age of AI and robotics is one of the great tasks of our time. Collaboration is crucial: between HR leaders, senior HR professionals, participants, career coaches, training providers and employers with lasting demand. We bring that network together.",
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
              <h2>{t({ nl: "Hoe we helpen", en: "How we help" })}</h2>
              <p>
                {t({
                  nl: "Voor de organisatie van morgen zoeken we de HR-leiders en adviseurs die de verandering dragen. Voor de medewerkers van wie de functie verdwijnt, bouwen we een korte, erkende route naar een nieuw vak.",
                  en: "For tomorrow's organisation we find the HR leaders and advisers who carry the change. For the employees whose roles disappear, we build a short, recognised route into a new trade.",
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
                    nl: "Gerichte outplacementtrajecten: intake door een erkende coach, korte en erkende omscholing, en een directe lijn naar organisaties in techniek, energie, zorg en het onderwijs.",
                    en: "Targeted outplacement tracks: intake by an accredited coach, short and recognised re-training, and a direct line to organisations in the trades, energy, care and education.",
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
              <button className="btn btn-light btn-lg" onClick={() => setModal("intake")}>
                {t({ nl: "Plan een kennismaking", en: "Book an introduction" })}
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
