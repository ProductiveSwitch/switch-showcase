"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";
import { NetworkConnector } from "./NetworkConnector";

// Homepage (optie 1, oktober 2026): titel, één zin en twee deuren (Search,
// Switch), daarna het netwerk, "Waarom nu" en contact. De radar staat op /vision.
export function HomePage() {
  const { lang, t } = useLang();
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

  return (
    <>
      <main>
          <section className="s-hero s-hero--doors">
            <div className="wrap s-hero-head">
              <h1>
                {t({ nl: "Werving voor senior HR-professionals", en: "Recruitment for senior HR professionals" })}
                <br className="h1-break" />{" "}
                {t({ nl: "en omscholing via gerichte outplacementtrajecten.", en: "and re-training through targeted outplacement." })}
              </h1>
              <p className="lede">
                {t({
                  nl: "De komende jaren vraagt HR om twee dingen tegelijk: een organisatie die klaar is voor de verandering, en een goede landing voor medewerkers van wie de functie verdwijnt. Wij helpen HR-leiders met allebei.",
                  en: "In the coming years HR has to deliver two things at once: an organisation ready for the change ahead, and a good landing for employees whose roles disappear. We help HR leaders with both.",
                })}
              </p>
            </div>
            <div className="wrap">{doors}</div>
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
              <Link className="btn btn-light btn-lg" href="/contact">
                {t({ nl: "Plan een kennismaking", en: "Book an introduction" })}
              </Link>
            </div>
          </section>
        </div>
      </main>

    </>
  );
}
