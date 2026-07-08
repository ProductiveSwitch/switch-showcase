/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, GraduationCap, Handshake, MonitorSmartphone } from "lucide-react";
import { destinations, partners, howItWorks } from "@/lib/data";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { useHashScroll } from "./useHashScroll";
import { Modal, IntakeForm, KoffieForm, OpleiderForm, type ModalKind } from "./Forms";
import { RadarChart } from "./RadarChart";

const stepIcons = [MonitorSmartphone, Search, GraduationCap, Handshake];
const stepColors = ["var(--col-social)", "var(--col-tech-deep)", "var(--col-domain)", "var(--navy)"];
const pillarColors = ["var(--col-tech)", "var(--col-social)", "var(--col-domain)"];

export function HomePage() {
  const { lang, t } = useLang();
  const [modal, setModal] = useState<ModalKind>(null);
  useReveal();
  useHashScroll();

  return (
    <>
      <main>
        {/* Full-viewport hero: text left, labeled radar right (which fields AI touches) */}
        <section className="s-hero">
          <div className="wrap s-hero-grid">
            <div className="s-hero-text">
              <h1>
                {t({
                  nl: "Omscholing & herplaatsing van personeel",
                  en: "Re-training & redeployment of your people",
                })}
              </h1>
              <p className="lede">
                {t({
                  nl: "Productive Switch begeleidt je mensen naar een nieuw vak, met korte en erkende omscholing en een directe lijn naar werkgevers die ze willen aannemen. Geen algemeen outplacementtraject, maar een concrete stap naar werk met blijvende vraag.",
                  en: "Productive Switch guides your people into a new trade, with short, accredited re-training and a direct line to employers who want to hire them. Not a generic outplacement track, but a concrete step toward work with lasting demand.",
                })}
              </p>
              <div className="s-hero-brands">
                <button
                  className="hero-brandbtn hb-switch"
                  onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <span className="hb-title">Productive Switch</span>
                  <span className="hb-sub">
                    {t({ nl: "Omscholing naar een tweede loopbaan", en: "Re-training for a second career" })}
                  </span>
                </button>
                <Link className="hero-brandbtn hb-hire" href="/restructure">
                  <span className="hb-title">Productive Restructure</span>
                  <span className="hb-sub">
                    {t({ nl: "Werving voor senior HR-rollen", en: "Recruitment for senior HR roles" })}
                  </span>
                </Link>
              </div>
              <div className="s-hero-cta">
                <button className="btn btn-switch btn-lg" onClick={() => setModal("intake")}>
                  {t({ nl: "Kom in contact", en: "Get in touch" })}
                </button>
              </div>
            </div>
            <div className="s-hero-chart">
              <h2 className="s-hero-chart-title">
                {t({
                  nl: "Potentiële en huidige waargenomen toepassing van AI per beroepscategorie",
                  en: "Potential and currently observed use of AI per occupational category",
                })}
              </h2>
              <RadarChart variant="figure" lang={lang} />
              <div className="s-hero-chart-cap">
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
              </div>
            </div>
          </div>
          <a className="s-hero-scroll" href="#showcase" aria-label={t({ nl: "Scroll verder", en: "Scroll on" })}>
            ▾
          </a>
        </section>

        {/* Ticker with accredited institutions */}
        <section className="ticker-block reveal">
          <div className="ticker-cap">
            {t({
              nl: "Omscholing bij erkende opleiders, onder andere",
              en: "Re-training with accredited providers, including",
            })}
          </div>
          <div className="ticker-track">
            <div className="ticker-strip">
              {[...partners, ...partners].map((p, i) => (
                <span className="ticker-item" key={`${p.initials}-${i}`}>
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} loading="lazy" />
                  ) : (
                    <span className="ticker-wordmark" style={{ color: p.color }}>
                      {p.name}
                    </span>
                  )}
                  <span className="ticker-dot" aria-hidden="true">
                    ·
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="wrap">
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
                    nl: "Omscholing kost minder dan je denkt. Subsidies en opleidingsbudgetten dekken een flink deel van het traject, en wij rekenen vooraf uit wat er voor jou onder de streep overblijft.",
                    en: "Re-training costs less than you'd think. Subsidies and training budgets cover a good part of the path, and we work out in advance what's left for you at the bottom line.",
                  })}
                </p>
              </div>
              <Link className="btn btn-switch btn-lg" href="/subsidies">
                {t({ nl: "Bekijk de subsidies", en: "See the subsidies" })}
              </Link>
            </div>
          </section>

          {/* How it works: four ribbon step cards */}
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
            <div className="steps stagger">
              {howItWorks.map((s, i) => {
                const Icon = stepIcons[i];
                return (
                  <div
                    className="step-card"
                    key={s.num}
                    style={{ "--sc": stepColors[i] } as React.CSSProperties}
                  >
                    <span className="step-ribbon">{s.num}</span>
                    <span className="step-corner tr" aria-hidden="true" />
                    <span className="step-corner bl" aria-hidden="true" />
                    <div className="step-icon">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>
                    <h3>{t(s.title)}</h3>
                    <span className="step-rule" aria-hidden="true">
                      <i />
                    </span>
                    <p>{t(s.body)}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Testimonial */}
          <section className="reveal">
            <div className="quote">
              <blockquote>
                {t({
                  nl: "“Ik dacht dat mijn vak verdween. Een half jaar later sta ik in de techniek, met meer werkplezier dan ooit.”",
                  en: "“I thought my profession was disappearing. Six months later I'm in the trades, with more joy in my work than ever.”",
                })}
              </blockquote>
              <div className="who">
                <div className="avatar">DV</div>
                <div style={{ textAlign: "left" }}>
                  <div className="name">Daan Verhoeven</div>
                  <div className="role">
                    {t({ nl: "Omgeschoold via Productive Switch", en: "Re-trained via Productive Switch" })}
                  </div>
                </div>
              </div>
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
                nl: "AI verandert wat kantoorwerk is, de energietransitie vraagt om vakmensen, en de zorg om handen en aandacht. Die verschuivingen zijn nu elkaars probleem. Wij helpen mensen van wie het werk verandert de overstap maken naar werk waar de arbeidsmarkt om zit te springen.",
                en: "AI is changing what office work is, the energy transition needs skilled hands, and care needs people and attention. Right now those shifts are each other's problem. We help people whose work is changing step into work the labour market is crying out for.",
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
              nl: "Je functieomschrijving kan over een half jaar anders zijn.",
              en: "Your job description can look different in six months.",
            })}
          </p>
          <h2>
            {lang === "nl" ? (
              <>
                Daarom draait alles bij ons om één ding:{" "}
                <span className="anchor">leren om te blijven leren.</span>
              </>
            ) : (
              <>
                That&apos;s why everything we do comes down to one thing:{" "}
                <span className="anchor">learning to keep learning.</span>
              </>
            )}
          </h2>
          <a className="btn btn-light" href="#contact">
            {t({ nl: "Kom in contact", en: "Get in touch" })}
          </a>
        </section>

        <div className="wrap">
          {/* Contact / CTAs */}
          <section className="cta-band reveal" id="contact">
            <div>
              <h2>{t({ nl: "Een reorganisatie op komst? Laten we praten.", en: "A restructuring ahead? Let's talk." })}</h2>
              <p>
                {t({
                  nl: "Plan een intake, of drink eerst gewoon eens koffie. Geen verplichting, wel meteen concreet.",
                  en: "Plan an intake, or just grab a coffee first. No obligation, concrete from the start.",
                })}
              </p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-switch btn-lg" onClick={() => setModal("intake")}>
                {t({ nl: "Plan een intake", en: "Plan an intake" })}
              </button>
              <button className="btn btn-ghost" onClick={() => setModal("koffie")}>
                {t({ nl: "Nog geen plannen? Koffie", en: "No plans yet? Coffee" })}
              </button>
            </div>
          </section>

          {/* Opleiders, aanbodkant, apart */}
          <section className="reveal">
            <div className="opleider-band">
              <div className="ob-text">
                <strong>{t({ nl: "Ben je een opleider?", en: "Are you a training provider?" })}</strong>{" "}
                {t({
                  nl: "Sluit je aan en ontvang gekwalificeerde, vaak werkgever-gefinancierde instroom. Aanmelden is gratis.",
                  en: "Join and receive qualified, often employer-funded enrolments. Signing up is free.",
                })}
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal("opleider")}>
                {t({ nl: "Aansluiten als opleider", en: "Join as a provider" })}
              </button>
            </div>
          </section>
        </div>
      </main>

      <Modal
        open={modal === "intake"}
        onClose={() => setModal(null)}
        title={t({ nl: "Plan een intake", en: "Plan an intake" })}
        intro={t({
          nl: "Een paar korte vragen, dan weten we genoeg om je concreet terug te bellen. Geen verplichting.",
          en: "A few short questions, then we know enough to call you back concretely. No obligation.",
        })}
      >
        <IntakeForm lang={lang} onClose={() => setModal(null)} />
      </Modal>

      <Modal
        open={modal === "koffie"}
        onClose={() => setModal(null)}
        title={t({ nl: "Even koffie drinken", en: "Grab a coffee" })}
        intro={t({
          nl: "Nog geen plannen, wel benieuwd? Laten we koffie drinken. Kennismaken, sparren, vragen stellen.",
          en: "No plans yet, but curious? Let's grab a coffee. Meet, spar, ask anything.",
        })}
      >
        <KoffieForm lang={lang} onClose={() => setModal(null)} />
      </Modal>

      <Modal
        open={modal === "opleider"}
        onClose={() => setModal(null)}
        title={t({ nl: "Aansluiten als opleider", en: "Join as a provider" })}
        intro={t({
          nl: "Vertel kort wie je bent en wat je aanbiedt. Je ontvangt gekwalificeerde, vaak werkgever-gefinancierde instroom.",
          en: "Tell us briefly who you are and what you offer. You'll receive qualified, often employer-funded enrolments.",
        })}
      >
        <OpleiderForm lang={lang} onClose={() => setModal(null)} />
      </Modal>
    </>
  );
}
