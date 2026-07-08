"use client";

import { CheckCircle2 } from "lucide-react";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { OpleiderIntake } from "./Forms";

export function OpleidersPage() {
  const { lang, t } = useLang();
  useReveal();

  const points = [
    {
      nl: "Gekwalificeerde, vaak werkgever-gefinancierde instroom voor je cursussen.",
      en: "Qualified, often employer-funded enrolments for your courses.",
    },
    {
      nl: "Wij doen de intake en matching, jij ontvangt deelnemers die passen bij je aanbod.",
      en: "We handle intake and matching, you receive participants who fit your offering.",
    },
    {
      nl: "Aanmelden is gratis en vrijblijvend. Geen exclusiviteit, geen opstartkosten.",
      en: "Signing up is free and without obligation. No exclusivity, no setup fees.",
    },
  ];

  return (
    <main className="subpage">
      <div className="wrap">
        <section className="page-head">
          <div className="eyebrow">{t({ nl: "Voor opleiders", en: "For providers" })}</div>
          <h1>{t({ nl: "Vul je opleidingen met mensen die klaarstaan", en: "Fill your programmes with people who are ready" })}</h1>
          <p className="lede">
            {t({
              nl: "Bied je korte, erkende omscholing aan in techniek, het sociaal domein of AI-bijscholing? Sluit je aan bij Productive Switch. Wij begeleiden mensen van wie het werk verandert naar een nieuw vak, en verbinden ze aan het juiste aanbod.",
              en: "Do you offer short, accredited re-training in the trades, the social sector or AI upskilling? Join Productive Switch. We guide people whose work is changing toward a new trade, and connect them to the right offering.",
            })}
          </p>
        </section>

        <section className="reveal opleider-why">
          <ul className="opleider-points">
            {points.map((p, i) => (
              <li key={i}>
                <CheckCircle2 size={20} strokeWidth={2} />
                <span>{t(p)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="reveal opleider-form-block">
          <div className="section-head">
            <h2>{t({ nl: "Meld je aan als opleider", en: "Register as a provider" })}</h2>
            <p>
              {t({
                nl: "Een paar vragen over je organisatie en je aanbod, dan nemen we contact op. We hebben minimaal je organisatie, contactpersoon en e-mail nodig; de rest helpt ons je goed te plaatsen.",
                en: "A few questions about your organisation and your offering, then we'll be in touch. We need at least your organisation, contact and email; the rest helps us place you well.",
              })}
            </p>
          </div>
          <div className="opleider-form-card">
            <OpleiderIntake lang={lang} />
          </div>
        </section>
      </div>
    </main>
  );
}
