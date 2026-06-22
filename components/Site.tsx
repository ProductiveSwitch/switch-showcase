/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  destinations,
  partners,
  vacancies,
  vacancyFilters,
  type Bi,
  type Lang,
  type VacancyCategory,
} from "@/lib/data";

export function Site() {
  const [lang, setLang] = useState<Lang>("nl");
  const [brand, setBrand] = useState<"switch" | "hire">("switch");
  const [activeDest, setActiveDest] = useState<string | null>(null);
  const [vacFilter, setVacFilter] = useState<"all" | VacancyCategory>("all");

  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shownVacancies = vacancies.filter(
    (v) => vacFilter === "all" || v.category === vacFilter
  );

  return (
    <>
      <header className="topbar">
        <div className="wrap inner">
          <div className="brand">
            Productive<span className="dot">·</span>Switch
          </div>
          <nav className="navtabs">
            <button
              className={`tab${brand === "switch" ? " on" : ""}`}
              data-tab="switch"
              onClick={() => switchBrand("switch")}
            >
              <span className="t-name">
                <span className="pip" />
                Productive Switch
              </span>
              <span className="t-desc">
                {t({ nl: "Omscholing naar een tweede loopbaan", en: "Re-training for a second career" })}
              </span>
            </button>
            <button
              className={`tab${brand === "hire" ? " on" : ""}`}
              data-tab="hire"
              onClick={() => switchBrand("hire")}
            >
              <span className="t-name">
                <span className="pip" />
                Productive Hire
              </span>
              <span className="t-desc">
                {t({ nl: "Werving voor senior HR-rollen", en: "Recruitment for senior HR roles" })}
              </span>
            </button>
          </nav>
          <div className="top-right">
            <div className="lang">
              <button className={lang === "nl" ? "on" : ""} onClick={() => setLang("nl")}>
                NL
              </button>
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============ SWITCH PANEL ============ */}
      <main className={`panel${brand === "switch" ? " on" : ""}`}>
        <div className="wrap">
          <section className="hero">
            <div className="hero-text">
              <div className="eyebrow">{t({ nl: "Omscholing", en: "Re-training" })}</div>
              <h1>
                {t({
                  nl: "Als een functie verdwijnt, hoeft een loopbaan dat niet te doen.",
                  en: "When a role disappears, a career doesn't have to.",
                })}
              </h1>
              <p className="lede">
                {t({
                  nl: "Productive Switch helpt je mensen aan een tweede carrière, met korte en gerichte omscholing naar werk waar ze zichzelf in zien en waar de arbeidsmarkt om zit te springen.",
                  en: "Productive Switch helps your people into a second career, with short, focused re-training toward work they recognise themselves in and that the labour market is waiting for.",
                })}
              </p>
              <div className="hero-cta">
                <a href="/vision" className="lees-meer">
                  {t({ nl: "Lees meer →", en: "Read more →" })}
                </a>
              </div>
            </div>
            <div className="hero-media">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt=""
                loading="lazy"
              />
              <div className="hero-badge">
                <div className="bnum">2.400+</div>
                <div className="btxt">
                  {t({ nl: "mensen omgeschoold naar nieuw werk", en: "people re-trained into new work" })}
                </div>
              </div>
            </div>
          </section>

          {/* Destinations */}
          <section className="section reveal" id="showcase">
            <p className="dest-intro">
              {t({
                nl: "Kies een richting. Je ziet meteen het erkende aanbod en de open makersmarkt die erbij past.",
                en: "Pick a direction. You'll see the accredited supply and the matching open makers' market right away.",
              })}
            </p>

            <div className="dest-tabs stagger">
              {destinations.map((d) => (
                <button
                  key={d.id}
                  className={`dest-tab${activeDest === d.id ? " on" : ""}`}
                  onClick={() => setActiveDest(activeDest === d.id ? null : d.id)}
                >
                  <span className="dest-num">{d.num}</span>
                  <span className="dest-label">
                    {t(d.label)}
                    <span className="dest-sub">{t(d.sub)}</span>
                  </span>
                  <span className="dest-chev">▾</span>
                </button>
              ))}
            </div>

            {destinations.map((d) => (
              <div key={d.id} className={`dest-panel${activeDest === d.id ? " on" : ""}`}>
                <div className="dest-inner">
                  <img className="dest-photo" src={d.photo} alt="" loading="lazy" />
                  <div className="tier">
                    <span className="badge badge-cur">{t({ nl: "Gecureerd", en: "Curated" })}</span>{" "}
                    <span>{t({ nl: "erkende instituten", en: "accredited institutions" })}</span>
                  </div>
                  <div className="prog-grid">
                    {d.curated.map((c, i) => (
                      <div className="tile" key={i}>
                        <div className="org">{c.org}</div>
                        <div className="course">{c.course}</div>
                        <div className="meta">
                          {c.certified && (
                            <span className="chip">{t({ nl: "Gecertificeerd", en: "Certified" })}</span>
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
                    {d.makers.map((m, i) => (
                      <div className="tile" key={i}>
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

          {/* Vision band */}
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
          </section>

          {/* Logo wall */}
          <section className="logowall reveal">
            <div className="cap">
              {t({
                nl: "Samen met erkende instituten en partners",
                en: "Together with accredited institutions and partners",
              })}
            </div>
            <div className="logos stagger">
              {partners.map((p) => (
                <div className="logo-item" key={p.initials}>
                  <span className="logo-mark" style={{ background: p.color }}>
                    {p.initials}
                  </span>
                  <span className="logo-name">{p.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="cta-band reveal" id="contact">
            <div>
              <h2>{t({ nl: "Een reorganisatie op komst? Laten we praten.", en: "A restructuring ahead? Let's talk." })}</h2>
              <p>
                {t({
                  nl: "In een kort gesprek laten we zien hoe we je mensen goed laten landen.",
                  en: "In a short call we'll show how we help your people land well.",
                })}
              </p>
            </div>
            <a href="mailto:info@productiveswitch.nl" className="btn btn-switch">
              {t({ nl: "Boek een walkthrough", en: "Book a walkthrough" })}
            </a>
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
                <a href="#hire-contact" className="btn btn-hire">
                  {t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })}
                </a>
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
    </>
  );
}
