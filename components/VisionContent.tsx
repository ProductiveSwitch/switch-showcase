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

  const beliefs = [
    {
      title: { nl: "Reorganiseren is geen falen, wegkijken wel.", en: "Restructuring is not failure. Looking away is." },
      body: {
        nl: "Reorganiseren is soms noodzakelijk, maar komt met verantwoordelijkheid. Om toekomstbestendig te zijn hebben werkgevers ruimte nodig om meer te doen met minder mensen. In een arbeidsmarkt die steeds onzekerder wordt, groeit tegelijk de morele verplichting om goed te zorgen voor werknemers die zich altijd hard voor de zaak hebben ingezet.",
        en: "Restructuring is sometimes necessary, but it comes with responsibility. To stay future-proof, employers need room to do more with fewer people. In a labour market that grows ever more uncertain, the moral obligation grows with it: to take good care of employees who always gave their best for the business.",
      },
    },
    {
      title: { nl: "Werk moet loskomen van diploma's.", en: "Work has to come loose from diplomas." },
      body: {
        nl: "Tekortsectoren moeten instappen makkelijk maken: openheid voor zij-instromers met korte, erkende leertrajecten, en investeren in leren op de werkvloer. Er zit waarde in een frisse blik, en juist de nieuwe technologie maakt het makkelijker om sneller zelfstandig en productief te worden.",
        en: "Shortage sectors have to make entry easy: openness to career switchers with short, accredited learning tracks, and investment in learning on the job. There is value in a fresh perspective, and the new technology itself makes it easier to become independent and productive faster.",
      },
    },
    {
      title: { nl: "Effectieve herverdeling van talent wordt cruciaal.", en: "Effective redistribution of talent becomes crucial." },
      body: {
        nl: "Economisch succes hangt in belangrijke mate af van één vraag: hoe zorgen we voor een herverdeling van talent over sectoren? De snelheid van verandering vraagt niet om reflectietrajecten van zes tot twaalf maanden. Zorgvuldige maar efficiënte outplacementtrajecten zijn daarin cruciaal.",
        en: "Economic success largely depends on one question: how do we redistribute talent across sectors? The pace of change does not allow for six to twelve months of reflection. Careful but efficient outplacement tracks are crucial here.",
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
              <Link className="btn btn-light btn-lg" href="/blog">
                {t({ nl: "Blogs", en: "Blogs" })}
              </Link>
            </div>
          </div>
          <div className="h-hero-side">
            <div className="h-side-card">
              <div className="h-side-k">{t({ nl: "Op deze pagina", en: "On this page" })}</div>
              <ul>
                <li><a href="#overtuigingen">{t({ nl: "Drie overtuigingen", en: "Three convictions" })}</a></li>
                <li><a href="#anker">{t({ nl: "Het anker", en: "The anchor" })}</a></li>
                <li><Link href="/blog">{t({ nl: "Blogs", en: "Blogs" })}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
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
          <Link href="/contact" className="btn btn-light btn-lg">
            {t({ nl: "Plan een kennismaking", en: "Book an introduction" })}
          </Link>
        </section>
      </div>
    </main>
  );
}
