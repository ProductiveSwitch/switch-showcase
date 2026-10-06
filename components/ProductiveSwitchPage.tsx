/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Search, GraduationCap, Handshake, MonitorSmartphone, Compass } from "lucide-react";
import { destinations, howItWorks } from "@/lib/data";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";

const stepIcons = [MonitorSmartphone, Search, Compass, GraduationCap, Handshake];
const stepColors = ["var(--switch)", "var(--switch)", "var(--switch)", "var(--switch)", "var(--switch)"];
const pillarColors = ["var(--col-tech)", "var(--col-social)", "var(--col-domain)"];

// De Productive Switch-dienstpagina: drie richtingen, financiering, hoe het
// werkt, visie en contact. Verhuisd van de homepage (september 2026).
export function ProductiveSwitchPage() {
  const { lang, t } = useLang();
  useReveal();
  useHashScroll();

  return (
    <>
      <main className="switch-page">
        <section className="h-hero h-hero--switch">
          <div className="wrap h-hero-grid">
            <div className="h-hero-text">
              <div className="eyebrow">Productive Switch</div>
              <h1>
                {t({
                  nl: "Omscholing via gerichte outplacement\u00ADtrajecten",
                  en: "Re-training through targeted outplacement",
                })}
              </h1>
              <p className="lede">
                {t({
                  nl: "Als een functie verdwijnt, hoeft een loopbaan dat niet te doen. We begeleiden mensen naar een nieuw vak door een sterke basis te leggen in hun zoektocht, ze in contact te brengen met de juiste loopbaancoach, korte en erkende omscholing, en een directe lijn naar organisaties in sectoren met blijvende vraag.",
                  en: "When a role ends, a career doesn't have to. We guide people into a new trade by laying a strong basis for their search, connecting them with the right career coach, short and recognised re-training, and a direct line to organisations in sectors with lasting demand.",
                })}
              </p>
              <div className="cta-actions">
                <Link className="btn btn-light btn-lg" href="/contact?rol=hr">
                  {t({ nl: "Plan een intake", en: "Plan an intake" })}
                </Link>
                <a className="btn btn-ghost-light btn-lg" href="#how">
                  {t({ nl: "Hoe het werkt", en: "How it works" })}
                </a>
              </div>
            </div>
            <div className="h-hero-side">
              <div className="h-side-card">
                <div className="h-side-k">{t({ nl: "Op deze pagina", en: "On this page" })}</div>
                <ul>
                  <li><a href="#how">{t({ nl: "Hoe het werkt", en: "How it works" })}</a></li>
                  <li><a href="#showcase">{t({ nl: "Drie richtingen", en: "Three directions" })}</a></li>
                  <li><a href="#financiering">{t({ nl: "Subsidies", en: "Subsidies" })}</a></li>
                  <li><a href="#visie">{t({ nl: "Onze visie", en: "Our vision" })}</a></li>
                  <li><Link href="/contact?rol=hr">{t({ nl: "Plan een intake", en: "Plan an intake" })}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          {/* How it works: five numbered steps, above the directions */}
          <section className="section reveal" id="how">
            <div className="section-head">
              <h2>{t({ nl: "Hoe het werkt", en: "How it works" })}</h2>
              <p>
                {t({
                  nl: "Van eerste gesprek tot een nieuwe baan. Een kort, begeleid traject, geen los lijstje cursussen.",
                  en: "From first conversation to a new job. A short, guided path, not a loose list of courses.",
                })}
              </p>
            </div>
            <div className="steps steps-5 stagger">
              {howItWorks.map((s, i) => {
                const Icon = stepIcons[i];
                return (
                  <div className="step-card" key={s.num} style={{ "--sc": stepColors[i] } as React.CSSProperties}>
                    <div className="step-top">
                      <span className="step-num">{s.num}</span>
                      <span className="step-icon">
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                    </div>
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.body)}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Three directions as pillar cards, each linking to its course page */}
          <section className="section reveal" id="showcase">
            <div className="section-head">
              <h2>{t({ nl: "Drie richtingen", en: "Three directions" })}</h2>
              <p>
                {t({
                  nl: "Kies een richting en je ziet het volledige cursusaanbod dat erbij past, te filteren op veld, aanbieder, duur, vorm en prijs. De sterkste lijn naar werkgevers zit in techniek en het sociaal domein, want daar zit de structurele vraag.",
                  en: "Pick a direction and you'll see the full matching course catalogue, filterable by field, provider, length, format and price. The strongest line to employers runs through the trades and the social sector, where demand is structural.",
                })}
              </p>
            </div>

            <div className="pillars stagger">
              {destinations.map((d, i) => (
                <Link
                  key={d.id}
                  className="pillar"
                  href={`/richtingen/${d.slug}`}
                  style={{ "--pc": pillarColors[i] } as React.CSSProperties}
                >
                  <img className="pillar-photo" src={d.photo} alt="" loading="lazy" />
                  <span className="pillar-shade" aria-hidden="true" />
                  <span className="pillar-body">
                    <span className="pillar-num">{d.num}</span>
                    <span className="pillar-title">{t(d.label)}</span>
                    <span className="pillar-sub">{t(d.sub)}</span>
                    <span className="pillar-chev" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Subsidies teaser: the full breakdown lives on /subsidies */}
          <section className="reveal">
            <div className="cta-band" id="financiering">
              <div>
                <h2>{t({ nl: "Wat het de werkgever kost", en: "What it costs the employer" })}</h2>
                <p>
                  {t({
                    nl: "Omscholing is vaak voordeliger dan in eerste instantie gedacht. Subsidies en opleidingsbudgetten kunnen een groot deel van een traject vergoeden, en ook daarin spelen wij een begeleidende rol.",
                    en: "Re-training is often more affordable than first assumed. Subsidies and training budgets can cover a large part of a path, and there too we play a guiding role.",
                  })}
                </p>
              </div>
              <Link className="btn btn-light btn-lg" href="/subsidies">
                {t({ nl: "Bekijk de subsidies", en: "See the subsidies" })}
              </Link>
            </div>
          </section>

        </div>

        {/* Onze visie, split section */}
        <section className="visie reveal" id="visie">
          <div className="visie-media">
            <img src="/photos/visie.jpg" alt="" loading="lazy" />
          </div>
          <div className="visie-text">
            <div className="eyebrow">{t({ nl: "Onze visie", en: "Our vision" })}</div>
            <h2>
              {t({
                nl: "Drie verschuivingen. Wij maken ze elkaars oplossing.",
                en: "Three shifts. We make them each other's solution.",
              })}
            </h2>
            <p>
              {t({
                nl: "Elke functie wordt door AI en robotica geraakt, en veel kantoorbanen zullen verdwijnen. Ondertussen vraagt de energietransitie om meer vakmensen, moet er veel infrastructuur worden gebouwd en onderhouden, en heeft de zorg handen en aandacht nodig. Wij helpen mensen van wie het werk verandert de overstap maken naar werk waar de arbeidsmarkt om vraagt. Op basis van basiscompetenties, een frisse blik en het optimaal benutten van de nieuwste tools om snel productief te zijn.",
                en: "Every job will be touched by AI and robotics, and many office jobs will disappear. Meanwhile the energy transition needs more skilled hands, a great deal of infrastructure has to be built and maintained, and care needs people and attention. We help people whose work is changing step into work the labour market is asking for. Built on core competences, a fresh perspective and making the most of the newest tools to become productive fast.",
              })}
            </p>
            <Link href="/vision" className="lees-meer light">
              {t({ nl: "Lees onze visie →", en: "Read our vision →" })}
            </Link>
          </div>
        </section>

        {/* Vision line + contact CTA */}
        <section className="vision reveal">
          <p>
            {t({
              nl: "Een functieomschrijving kan over een half jaar anders zijn. Blijvend inzetbaar zijn betekent jezelf opnieuw blijven uitvinden, met gebruik van technologie.",
              en: "A job description can look different in six months. Staying employable means reinventing yourself, again and again, with the help of technology.",
            })}
          </p>
          <h2>
            {lang === "nl" ? (
              <>
                De kerncompetentie: <span className="anchor">leren om te blijven leren.</span>
              </>
            ) : (
              <>
                The core competence: <span className="anchor">learning to keep learning.</span>
              </>
            )}
          </h2>
          <Link className="btn btn-light" href="/contact">
            {t({ nl: "Kom in contact", en: "Get in touch" })}
          </Link>
        </section>

        <div className="wrap">
        </div>
      </main>

    </>
  );
}
