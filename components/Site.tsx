/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Search, GraduationCap, Handshake, Compass } from "lucide-react";

// lucide-react no longer ships brand icons, so LinkedIn and Instagram are inline
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}
import {
  destinations,
  partners,
  vacancies,
  vacancyFilters,
  howItWorks,
  financeSources,
  type Bi,
  type Lang,
  type VacancyCategory,
} from "@/lib/data";
import { Modal, IntakeForm, KoffieForm, OpleiderForm, type ModalKind } from "./Forms";
import { RadarChart } from "./RadarChart";

const stepIcons = [Search, GraduationCap, Handshake, Compass];
const stepColors = ["var(--col-social)", "var(--col-tech-deep)", "var(--col-domain)", "var(--navy)"];
const pillarColors = ["var(--col-domain)", "var(--col-tech)", "var(--col-social)"];

export function Site() {
  const [lang, setLang] = useState<Lang>("nl");
  const [brand, setBrand] = useState<"switch" | "hire">("switch");
  const [activeDest, setActiveDest] = useState<string | null>(null);
  const [vacFilter, setVacFilter] = useState<"all" | VacancyCategory>("all");
  const [modal, setModal] = useState<ModalKind>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll state for the fixed nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const switchBrand = (b: "switch" | "hire") => {
    setBrand(b);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goContact = () => {
    setMenuOpen(false);
    const id = brand === "switch" ? "contact" : "hire-contact";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const shownVacancies = vacancies.filter(
    (v) => vacFilter === "all" || v.category === vacFilter
  );

  const navLinks = (
    <>
      <button
        className={`nav-link${brand === "switch" ? " on" : ""}`}
        onClick={() => switchBrand("switch")}
      >
        Productive Switch
      </button>
      <button
        className={`nav-link${brand === "hire" ? " on" : ""}`}
        onClick={() => switchBrand("hire")}
      >
        Productive Hire
      </button>
      <a className="nav-link" href="/vision" onClick={() => setMenuOpen(false)}>
        {t({ nl: "Onze visie", en: "Our vision" })}
      </a>
      <div className="lang">
        <button className={lang === "nl" ? "on" : ""} onClick={() => setLang("nl")}>
          NL
        </button>
        <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
          EN
        </button>
      </div>
    </>
  );

  const navActions = (
    <>
      <a
        className="nav-social"
        href="https://www.linkedin.com/company/productiveswitch"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        className="nav-social"
        href="https://www.instagram.com/productiveswitch"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </a>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          setMenuOpen(false);
          setModal("cv");
        }}
      >
        {t({ nl: "Upload CV", en: "Upload CV" })}
      </button>
      <button className="btn btn-switch btn-sm" onClick={goContact}>
        Contact
      </button>
    </>
  );

  return (
    <>
      <header className={`nav${scrolled ? " nav--scrolled" : ""}${menuOpen ? " nav--open" : ""}`}>
        <div className="nav-inner">
          <a
            className="nav-brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              switchBrand("switch");
            }}
          >
            Productive<span className="dot">·</span>Switch
          </a>
          <nav className="nav-links">{navLinks}</nav>
          <div className="nav-actions">{navActions}</div>
          <button
            className="nav-burger"
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="nav-menu">
          <div className="nav-menu-links">{navLinks}</div>
          <div className="nav-menu-actions">{navActions}</div>
        </div>
      </header>

      {/* ============ SWITCH PANEL ============ */}
      <main className={`panel${brand === "switch" ? " on" : ""}`}>
        {/* Full-viewport hero with the re-drawn radar as backdrop */}
        <section className="s-hero">
          <div className="s-hero-bg" aria-hidden="true">
            <RadarChart variant="bg" />
          </div>
          <div className="wrap s-hero-inner">
            <div className="eyebrow">
              {t({ nl: "Voor HR bij reorganisatie", en: "For HR during restructuring" })}
            </div>
            <h1>
              {t({
                nl: "Als een functie verdwijnt, hoeft een loopbaan dat niet te doen.",
                en: "When a role disappears, a career doesn't have to.",
              })}
            </h1>
            <p className="lede">
              {t({
                nl: "Productive Switch begeleidt je mensen naar een nieuw vak, met korte en erkende omscholing en een directe lijn naar werkgevers die ze willen aannemen. Geen algemeen outplacementtraject, maar een concrete stap naar werk met blijvende vraag.",
                en: "Productive Switch guides your people into a new trade, with short, accredited re-training and a direct line to employers who want to hire them. Not a generic outplacement track, but a concrete step toward work with lasting demand.",
              })}
            </p>
            <div className="cta-actions s-hero-cta">
              <button className="btn btn-switch btn-lg" onClick={() => setModal("intake")}>
                {t({ nl: "Plan een intake", en: "Plan an intake" })}
              </button>
              <button className="btn btn-ghost" onClick={() => setModal("koffie")}>
                {t({ nl: "Nog geen plannen? Koffie", en: "No plans yet? Coffee" })}
              </button>
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
          {/* Three directions as pillar cards */}
          <section className="section reveal" id="showcase">
            <div className="section-head">
              <h2>{t({ nl: "Drie richtingen", en: "Three directions" })}</h2>
              <p>
                {t({
                  nl: "Kies een richting en je ziet meteen het erkende aanbod en de open makersmarkt die erbij past. De sterkste lijn naar werkgevers zit in techniek en het sociaal domein, want daar zit de structurele vraag.",
                  en: "Pick a direction and you'll see the accredited supply and the matching open makers' market right away. The strongest line to employers runs through the trades and the social sector, where demand is structural.",
                })}
              </p>
            </div>

            <div className="pillars stagger">
              {destinations.map((d, i) => (
                <button
                  key={d.id}
                  className={`pillar${activeDest === d.id ? " on" : ""}`}
                  style={{ "--pc": pillarColors[i] } as React.CSSProperties}
                  onClick={() => setActiveDest(activeDest === d.id ? null : d.id)}
                >
                  <img className="pillar-photo" src={d.photo} alt="" loading="lazy" />
                  <span className="pillar-shade" aria-hidden="true" />
                  <span className="pillar-body">
                    <span className="pillar-num">{d.num}</span>
                    <span className="pillar-title">{t(d.label)}</span>
                    <span className="pillar-sub">{t(d.sub)}</span>
                    <span className="pillar-chev" aria-hidden="true">
                      ▾
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {destinations.map((d, i) => (
              <div key={d.id} className={`dest-panel${activeDest === d.id ? " on" : ""}`}>
                <div className="dest-inner">
                  {d.id === "dest-1" ? (
                    <figure className="radar-block">
                      <RadarChart variant="figure" lang={lang} />
                      <figcaption>
                        <span className="radar-legend">
                          <i className="radar-swatch theo" />
                          {t({ nl: "Wat AI theoretisch kan", en: "What AI can do in theory" })}
                          <i className="radar-swatch obs" />
                          {t({ nl: "Wat er echt wordt gebruikt", en: "What is actually used" })}
                        </span>
                        {t({
                          nl: "Het gat tussen die twee lijnen is onbenutte productiviteit. Precies daar zit de bijscholing in je eigen vak. Naar de grafiek van de Anthropic Economic Index.",
                          en: "The gap between those two lines is untapped productivity. That is exactly where upskilling in your own field lives. After the Anthropic Economic Index chart.",
                        })}
                      </figcaption>
                    </figure>
                  ) : (
                    <img className="dest-photo" src={d.photo} alt="" loading="lazy" />
                  )}
                  <div className="tier">
                    <span className="badge badge-cur">{t({ nl: "Gecureerd", en: "Curated" })}</span>{" "}
                    <span>{t({ nl: "erkende instituten", en: "accredited institutions" })}</span>
                  </div>
                  <div className="prog-grid">
                    {d.curated.map((c, j) => (
                      <div className="tile" key={j}>
                        <div className="org">{c.org}</div>
                        <div className="course">{c.course}</div>
                        <div className="meta">
                          {c.certified && (
                            <span className="chip">{t({ nl: "Gecertificeerd", en: "Certified" })}</span>
                          )}{" "}
                          {(d.id === "dest-2" || d.id === "dest-3") && (
                            <span className="chip">{t({ nl: "SLIM-subsidiabel", en: "SLIM-eligible" })}</span>
                          )}{" "}
                          <span>{t(c.duration)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="tier">
                    <span className="badge badge-open">
                      {t({ nl: "Open makersmarkt", en: "Open makers' market" })}
                    </span>{" "}
                    <span>{t({ nl: "modules van makers uit het vak", en: "modules from makers in the field" })}</span>
                  </div>
                  <div className="prog-grid">
                    {d.makers.map((m, j) => (
                      <div className="tile" key={j}>
                        <div className="org">{t(m.by)}</div>
                        <div className="course">{m.course}</div>
                        <div className="meta">
                          <span className="stars">{m.rating}</span> <span>{m.reviews}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Financing as a fan: three stacking sources around one centre */}
          <section className="section reveal" id="financiering">
            <div className="section-head centered">
              <h2>{t({ nl: "Wat het de werkgever kost", en: "What it costs the employer" })}</h2>
              <p>
                {t({
                  nl: "Omscholing hoeft geen nieuwe kostenpost te zijn. Drie bronnen stapelen tot een laag netto bedrag voor jou.",
                  en: "Re-training doesn't have to be a new expense. Three sources stack into a low net amount for you.",
                })}
              </p>
            </div>
            <div className="fan">
              <div className="fan-center">
                <div className="fan-center-num">3</div>
                <div className="fan-center-txt">
                  {t({ nl: "bronnen die stapelen", en: "sources that stack" })}
                </div>
              </div>
              <div className="fan-cards stagger">
                {financeSources.map((f, i) => (
                  <div className={`fan-card fan-${i}`} key={i}>
                    <span className="fan-num">0{i + 1}</span>
                    <h3>{t(f.title)}</h3>
                    <p>{t(f.body)}</p>
                    <span className="fan-tag">{t(f.tag)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="fin-note">
              {t({
                nl: "Deze drie bronnen stapelen, en in de intake rekenen we het concreet voor je uit. Transitiebudget besteed aan omscholing voelt als herbesteed geld, niet als nieuwe kosten.",
                en: "These three sources stack, and in the intake we work it out concretely for you. Transition budget spent on re-training feels like money redirected, not a new cost.",
              })}
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
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1100&q=80"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="visie-text">
            <div className="eyebrow">{t({ nl: "Onze visie", en: "Our vision" })}</div>
            <h2>
              {t({
                nl: "Werk geeft mensen richting. Dat verdedigen we.",
                en: "Work gives people direction. We defend that.",
              })}
            </h2>
            <p>
              {t({
                nl: "De economie blijft veranderen, en tegelijk schreeuwen de zorg, het onderwijs en de techniek om mensen. De brug daartussen is kort, gericht leren, met een werkgever aan het eind. Niet iedereen hoeft opnieuw naar school. Wel kan bijna iedereen de stap zetten.",
                en: "The economy keeps changing, while care, education and the trades are crying out for people. The bridge between the two is short, focused learning, with an employer at the end. Not everyone needs to go back to school. Almost everyone can make the step.",
              })}
            </p>
            <a href="/vision" className="lees-meer light">
              {t({ nl: "Lees onze visie →", en: "Read our vision →" })}
            </a>
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
          <button className="btn btn-light" onClick={goContact}>
            {t({ nl: "Kom in contact", en: "Get in touch" })}
          </button>
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

      {/* ============ HIRE PANEL ============ */}
      <main className={`panel hire${brand === "hire" ? " on" : ""}`}>
        <div className="wrap">
          <section className="hero">
            <div className="hero-text">
              <div className="eyebrow">{t({ nl: "Werving", en: "Recruitment" })}</div>
              <h1>{t({ nl: "De juiste mensen voor je HR-leiderschap.", en: "The right people for your HR leadership." })}</h1>
              <p className="lede">
                {t({
                  nl: "Productive Hire werft senior HR-rollen en functies rond werktransitie. Hetzelfde netwerk dat mensen goed laat landen, vindt ook de mensen die jouw organisatie verder brengen.",
                  en: "Productive Hire recruits senior HR roles and workforce-transition functions. The same network that helps people land well also finds the people who move your organisation forward.",
                })}
              </p>
              <div className="hero-cta">
                <div className="cta-actions">
                  <a href="#hire-contact" className="btn btn-hire">
                    {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
                  </a>
                  <button className="btn btn-ghost" onClick={() => setModal("cv")}>
                    {t({ nl: "Upload CV", en: "Upload CV" })}
                  </button>
                </div>
              </div>
            </div>
            <div className="hero-media">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
                alt=""
                loading="lazy"
              />
              <div className="hero-badge">
                <div className="bnum">500+</div>
                <div className="btxt">
                  {t({ nl: "HR-professionals in ons netwerk", en: "HR professionals in our network" })}
                </div>
              </div>
            </div>
          </section>

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

          {/* Testimonial */}
          <section className="reveal">
            <div className="quote hire">
              <blockquote>
                {t({
                  nl: "“Binnen twee weken lag er een shortlist die echt klopte. Geen stapel cv's, maar drie mensen die we alle drie hadden aangenomen.”",
                  en: "“Within two weeks we had a shortlist that genuinely fit. Not a pile of CVs, but three people we'd have hired all three.”",
                })}
              </blockquote>
              <div className="who">
                <div className="avatar">MK</div>
                <div style={{ textAlign: "left" }}>
                  <div className="name">Marleen Koster</div>
                  <div className="role">
                    {t({ nl: "HR-directeur, opdrachtgever Productive Hire", en: "HR Director, Productive Hire client" })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="cta-band reveal" id="hire-contact">
            <div>
              <h2>{t({ nl: "Een rol te vervullen? We kennen de mensen.", en: "A role to fill? We know the people." })}</h2>
              <p>
                {t({
                  nl: "Vertel ons wat je zoekt, dan komen we met een korte, gerichte shortlist.",
                  en: "Tell us what you're after, and we'll come back with a short, focused shortlist.",
                })}
              </p>
            </div>
            <a href="mailto:info@productiveswitch.nl" className="btn btn-hire">
              {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
            </a>
          </section>
        </div>
      </main>

      <footer>
        <div className="wrap inner">
          <div className="brand">
            Productive<span className="dot">·</span>Switch
          </div>
          <div>
            {t({
              nl: "© 2026 Productive Switch. Omscholing en werving voor HR-leiders.",
              en: "© 2026 Productive Switch. Re-training and recruitment for HR leaders.",
            })}
          </div>
        </div>
      </footer>

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

      <Modal
        open={modal === "cv"}
        onClose={() => setModal(null)}
        title={t({ nl: "Stuur je CV", en: "Send your CV" })}
        intro={t({
          nl: "Werk jij in HR of werktransitie en wil je in beeld zijn voor rollen via Productive Hire? Mail je CV als bijlage, dan nemen we contact op zodra er een rol past.",
          en: "Do you work in HR or workforce transition and want to be on our radar for roles via Productive Hire? Email your CV as an attachment and we'll reach out when a role fits.",
        })}
      >
        <div className="cv-body">
          <a
            className="btn btn-hire"
            href={`mailto:info@productiveswitch.nl?subject=${encodeURIComponent("CV voor Productive Hire")}&body=${encodeURIComponent(
              lang === "nl"
                ? "Beste Productive Hire,\n\nHierbij mijn CV als bijlage. \n\nNaam:\nHuidige rol:\nTelefoon:\n"
                : "Dear Productive Hire,\n\nPlease find my CV attached.\n\nName:\nCurrent role:\nPhone:\n"
            )}`}
          >
            {t({ nl: "Open je mail met CV-bericht", en: "Open your mail with a CV message" })}
          </a>
          <p className="cv-note">
            {t({
              nl: "Vergeet niet je CV als bijlage toe te voegen voor je op verzenden drukt.",
              en: "Don't forget to attach your CV before hitting send.",
            })}
          </p>
        </div>
      </Modal>
    </>
  );
}
