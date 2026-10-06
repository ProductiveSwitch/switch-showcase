"use client";

import { useState } from "react";
import { financeSources, type Bi } from "@/lib/data";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { Modal, IntakeForm } from "./Forms";

interface Regeling {
  title: string;
  forWho: Bi;
  body: Bi;
  url?: string;
}

// Naar rijksoverheid.nl (leven lang ontwikkelen), business.gov.nl en de interne
// marktverkenning (juli 2026). Bedragen indicatief; regelingen wisselen per jaar.
const regelingen: Regeling[] = [
  {
    title: "SLIM-regeling",
    forWho: { nl: "Mkb-werkgevers", en: "SME employers" },
    body: {
      nl: "Subsidie voor leren en ontwikkelen in het mkb en in samenwerkingsverbanden: van doorlichting en loopbaanadvies tot maatwerktrajecten in de derde leerweg. In 2026 is er €71,9 miljoen beschikbaar, met een verlicht regime tot €25.000 per aanvraag. Wij checken of je in aanmerking komt en regelen de aanvraag. Budget en tijdvakken zijn beperkt, dus een garantie is het niet.",
      en: "A subsidy for learning and development in SMEs and partnerships: from company scans and career guidance to tailored tracks in the third learning pathway. In 2026 there is €71.9 million available, with a light-touch regime up to €25,000 per application. We check whether you qualify and handle the application. Budget and windows are limited, so it isn't a guarantee.",
    },
    url: "https://www.rijksoverheid.nl/themas/onderwijs/leven-lang-ontwikkelen/leven-lang-ontwikkelen-financiele-regelingen/slim-regeling",
  },
  {
    title: "Subsidieregeling praktijkleren",
    forWho: { nl: "Werkgevers met een leerwerkplek", en: "Employers with a work-learn placement" },
    body: {
      nl: "Vergoeding tot circa €2.700 per leerwerkplek per schooljaar, plus €500 extra bij klimaat- en energietransitie, verlengd tot en met schooljaar 2027-2028. Er is een aparte variant voor kortere trajecten in de derde leerweg, precies de routes waar onze omscholing op leunt.",
      en: "Compensation of up to about €2,700 per work-learn placement per school year, plus €500 extra in climate and energy transition roles, extended through the 2027-2028 school year. A separate variant covers shorter third-pathway tracks, exactly the routes our re-training builds on.",
    },
    url: "https://www.rvo.nl/subsidies-financiering/praktijkleren",
  },
  {
    title: "Cao- en O&O-fondsen",
    forWho: { nl: "Per sector", en: "Per sector" },
    body: {
      nl: "Veel sectoren hebben eigen opleidingspotten: Wij Techniek (ontwikkelvouchers tot €1.500 per persoon), OOM in de metaal, A+O Metalektro, en in zorg en welzijn loopt de subsidie Strategisch Opleiden via de regionale werkgeversverbanden. We kijken per cao wat er al voor je klaarstaat.",
      en: "Many sectors hold their own training funds: Wij Techniek (development vouchers up to €1,500 per person), OOM in metalworking, A+O Metalektro, and in care and welfare the strategic training subsidy runs via regional employer associations. We check per collective agreement what's already there for you.",
    },
    url: "https://www.wij-techniek.nl/alle-vergoedingen",
  },
  {
    title: "Levenlanglerenkrediet",
    forWho: { nl: "Voor de medewerker zelf", en: "For the employee" },
    body: {
      nl: "Een lening bij DUO voor erkende mbo-, hbo- en wo-opleidingen, terug te betalen in maximaal 15 jaar. Geldt voor BBL en derde leerweg, niet voor losse trainingen. Een aanvulling op werkgeversbudget, geen vervanging ervan.",
      en: "A DUO loan for accredited vocational and higher education, repaid over up to 15 years. Applies to BBL and third-pathway tracks, not to loose trainings. A supplement to employer budget, not a replacement.",
    },
    url: "https://duo.nl/particulier/levenlanglerenkrediet.jsp",
  },
  {
    title: "Expeditieregeling",
    forWho: { nl: "Samenwerkingsverbanden", en: "Partnerships" },
    body: {
      nl: "Subsidie voor samenwerkingsverbanden die werken aan duurzame inzetbaarheid en een leven lang ontwikkelen, met de eis dat de geleerde lessen gedeeld worden. Of er in 2026 een nieuwe ronde komt is nog niet bevestigd.",
      en: "A subsidy for partnerships working on sustainable employability and lifelong development, on the condition that lessons learned are shared. Whether a new 2026 round opens is not yet confirmed.",
    },
    url: "https://www.rijksoverheid.nl/themas/onderwijs/leven-lang-ontwikkelen/leven-lang-ontwikkelen-financiele-regelingen/expeditie-regeling",
  },
  {
    title: "UWV-scholingsbudget",
    forWho: { nl: "Kandidaten al uit dienst", en: "Candidates already out of employment" },
    body: {
      nl: "Voor mensen met een uitkering kan UWV scholing vergoeden, per geval beoordeeld. Relevant voor medewerkers die al vertrokken zijn maar alsnog de stap willen zetten.",
      en: "For people on benefits, UWV can fund training, assessed case by case. Relevant for employees who already left but still want to make the step.",
    },
    url: "https://www.leeroverzicht.nl/",
  },
];

export function SubsidiesPage() {
  const { lang, t } = useLang();
  const [intakeOpen, setIntakeOpen] = useState(false);
  useReveal();

  return (
    <main className="subpage">
      <div className="wrap">
        <section className="page-head">
          <div className="eyebrow">{t({ nl: "Subsidies", en: "Subsidies" })}</div>
          <h1>{t({ nl: "Wat het de werkgever kost", en: "What it costs the employer" })}</h1>
          <p className="lede">
            {t({
              nl: "Omscholing is vaak voordeliger dan in eerste instantie gedacht. Subsidies en opleidingsbudgetten kunnen een groot deel van een traject vergoeden, en ook daarin spelen wij een begeleidende rol.",
              en: "Re-training is often more affordable than first assumed. Subsidies and training budgets can cover a large part of a path, and there too we play a guiding role.",
            })}
          </p>
        </section>

        <section className="section reveal" id="financiering">
          <div className="fan">
            <div className="fan-center">
              <div className="fan-center-num">3</div>
              <div className="fan-center-txt">
                {t({ nl: "financieringsbronnen", en: "sources of funding" })}
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
              nl: "Deze drie bronnen zijn te combineren. In de intake rekenen we concreet voor wat er voor jou onder de streep overblijft.",
              en: "These three sources can be combined. In the intake we work out concretely what is left for you at the bottom line.",
            })}
          </div>
        </section>

        <section className="section reveal" id="regelingen">
          <div className="section-head">
            <h2>{t({ nl: "De regelingen op een rij", en: "The schemes at a glance" })}</h2>
          </div>
          <div className="reg-grid">
            {regelingen.map((r) => (
              <article className="reg-card" key={r.title}>
                <div className="reg-top">
                  <h3>{r.title}</h3>
                  <span className="chip">{t(r.forWho)}</span>
                </div>
                <p>{t(r.body)}</p>
                {r.url && (
                  <a className="cc-link" href={r.url} target="_blank" rel="noreferrer">
                    {t({ nl: "Lees meer →", en: "Read more →" })}
                  </a>
                )}
              </article>
            ))}
          </div>
          <p className="cc-disclaimer">
            {t({
              nl: "Bedragen en tijdvakken zijn indicatief en veranderen per jaar; niets hiervan is een garantie. Bronnen: ",
              en: "Amounts and windows are indicative and change per year; none of this is a guarantee. Sources: ",
            })}
            <a
              href="https://www.rijksoverheid.nl/themas/onderwijs/leven-lang-ontwikkelen/leven-lang-ontwikkelen-financiele-regelingen"
              target="_blank"
              rel="noreferrer"
            >
              Rijksoverheid (leven lang ontwikkelen)
            </a>{" "}
            {t({ nl: "en", en: "and" })}{" "}
            <a
              href="https://business.gov.nl/staff/terms-of-employment/retraining-for-employees-and-entrepreneurs/"
              target="_blank"
              rel="noreferrer"
            >
              business.gov.nl
            </a>
            {t({ nl: ", stand juli 2026.", en: ", as of July 2026." })}
          </p>
        </section>

        <section className="cta-band reveal">
          <div>
            <h2>{t({ nl: "Weten wat er voor jouw organisatie openstaat?", en: "Want to know what's available for your organisation?" })}</h2>
            <p>
              {t({
                nl: "In een korte intake rekenen we de stapeling door voor jouw situatie en regelen we de aanvragen. Geen verplichting.",
                en: "In a short intake we run the numbers for your situation and handle the applications. No obligation.",
              })}
            </p>
          </div>
          <button className="btn btn-switch btn-lg" onClick={() => setIntakeOpen(true)}>
            {t({ nl: "Plan een intake", en: "Plan an intake" })}
          </button>
        </section>
      </div>

      <Modal
        open={intakeOpen}
        onClose={() => setIntakeOpen(false)}
        title={t({ nl: "Plan een intake", en: "Plan an intake" })}
        intro={t({
          nl: "Een paar korte vragen, dan weten we genoeg om je concreet terug te bellen. Geen verplichting.",
          en: "A few short questions, then we know enough to call you back concretely. No obligation.",
        })}
      >
        <IntakeForm lang={lang} onClose={() => setIntakeOpen(false)} />
      </Modal>
    </main>
  );
}
