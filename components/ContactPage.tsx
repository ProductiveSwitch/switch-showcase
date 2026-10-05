"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { Modal, IntakeForm, CvModal } from "./Forms";

type Role = "hr" | "vacature" | "deelnemer" | "coach" | "opleider" | "kandidaat";

// Kom in contact: één pagina voor alle ingangen. Elke tegel opent het
// intakeformulier met de rol al ingevuld. ?rol=hr|vacature|deelnemer|coach|opleider
// opent het formulier direct (zo linken de knoppen op de andere pagina's hierheen).
export function ContactPage() {
  const { lang, t } = useLang();
  const [role, setRole] = useState<Role | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  useReveal();

  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("rol");
    if (r === "kandidaat") setCvOpen(true);
    else if (r && ["hr", "vacature", "deelnemer", "coach", "opleider"].includes(r)) setRole(r as Role);
  }, []);

  type Tile = { key: Role; k: { nl: string; en: string }; title: { nl: string; en: string }; sub: { nl: string; en: string }; primary?: boolean };
  const switchTiles: Tile[] = [
    {
      key: "hr",
      k: { nl: "Werkgever", en: "Employer" },
      title: { nl: "Een reorganisatie op komst?", en: "A restructuring ahead?" },
      sub: { nl: "Plan een intake voor omscholing en herplaatsing. Zonder verplichting.", en: "Plan an intake for re-training and redeployment. No obligation." },
      primary: true,
    },
    {
      key: "deelnemer",
      k: { nl: "Deelnemer", en: "Participant" },
      title: { nl: "Aanmelden als deelnemer", en: "Sign up as a participant" },
      sub: { nl: "Verandert of verdwijnt je functie? Start hier.", en: "Is your role changing or ending? Start here." },
    },
    {
      key: "coach",
      k: { nl: "Loopbaancoach", en: "Career coach" },
      title: { nl: "Aanmelden als loopbaancoach", en: "Sign up as a career coach" },
      sub: { nl: "Sluit je aan bij ons netwerk van geselecteerde coaches.", en: "Join our network of selected coaches." },
    },
    {
      key: "opleider",
      k: { nl: "Opleider", en: "Training provider" },
      title: { nl: "Aanmelden als opleider", en: "Sign up as a training provider" },
      sub: { nl: "Ontvang gekwalificeerde, vaak werkgever-gefinancierde instroom.", en: "Receive qualified, often employer-funded enrolments." },
    },
  ];
  const searchTiles: Tile[] = [
    {
      key: "vacature",
      k: { nl: "HR-leider", en: "HR leader" },
      title: { nl: "Een senior HR-rol te vervullen?", en: "A senior HR role to fill?" },
      sub: { nl: "Bespreek je vacature of interim adviesopdracht.", en: "Discuss your vacancy or interim advisory assignment." },
      primary: true,
    },
    {
      key: "kandidaat",
      k: { nl: "HR-professional", en: "HR professional" },
      title: { nl: "Open voor een volgende stap?", en: "Open to a next step?" },
      sub: { nl: "Deel je CV, dan nemen we contact op zodra er een passende rol is.", en: "Share your CV and we'll be in touch when a fitting role comes up." },
    },
  ];
  const open = (r: Role) => (r === "kandidaat" ? setCvOpen(true) : setRole(r));

  const titleFor = (r: Role) =>
    r === "hr"
      ? t({ nl: "Plan een intake", en: "Plan an intake" })
      : r === "vacature"
        ? t({ nl: "Bespreek je vacature", en: "Discuss your vacancy" })
        : r === "deelnemer"
          ? t({ nl: "Aanmelden als deelnemer", en: "Sign up as a participant" })
          : r === "coach"
            ? t({ nl: "Aanmelden als loopbaancoach", en: "Sign up as a career coach" })
            : t({ nl: "Aanmelden als opleider", en: "Sign up as a training provider" });

  return (
    <main className="contact-page">
      <section className="h-hero h-hero--forest h-hero--short">
        <div className="wrap">
          <div className="h-hero-text">
            <div className="eyebrow">{t({ nl: "Kom in contact", en: "Get in touch" })}</div>
            <h1>{t({ nl: "Vertel kort wie je bent en wat er speelt.", en: "Tell us briefly who you are and what's going on." })}</h1>
            <p className="lede">
              {t({
                nl: "Kies hieronder wat bij je past. Een paar korte vragen, dan nemen we binnen één werkdag contact op. Liever direct mailen? Dat kan via info@productiveswitch.nl.",
                en: "Pick what fits you below. A few short questions, then we get in touch within one working day. Prefer email? Write to info@productiveswitch.nl.",
              })}
            </p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section reveal contact-group contact-group--switch">
          <div className="section-head">
            <div className="eyebrow">Productive Switch</div>
            <h2>{t({ nl: "Omscholing en herplaatsing", en: "Re-training and redeployment" })}</h2>
          </div>
          <div className="entry-grid stagger">
            {switchTiles.map((x) => (
              <button key={x.key} className={`entry${x.primary ? " entry--primary" : ""}`} onClick={() => open(x.key)}>
                <span className="entry-k">{t(x.k)}</span>
                <span className="entry-t">{t(x.title)}</span>
                <span className="entry-s">{t(x.sub)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section reveal contact-group contact-group--search">
          <div className="section-head">
            <div className="eyebrow">Productive Search</div>
            <h2>{t({ nl: "Werving voor senior HR-professionals", en: "Recruitment for senior HR professionals" })}</h2>
          </div>
          <div className="entry-grid entry-grid--2 stagger">
            {searchTiles.map((x) => (
              <button key={x.key} className={`entry entry--search${x.primary ? " entry--hire" : ""}`} onClick={() => open(x.key)}>
                <span className="entry-k">{t(x.k)}</span>
                <span className="entry-t">{t(x.title)}</span>
                <span className="entry-s">{t(x.sub)}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <Modal
        open={role !== null}
        onClose={() => setRole(null)}
        title={role ? titleFor(role) : ""}
        intro={t({
          nl: "Een paar korte vragen, dan weten we genoeg om contact op te nemen. Geen verplichting.",
          en: "A few short questions, then we know enough to get in touch. No obligation.",
        })}
      >
        {role !== null && (
          <IntakeForm key={role} lang={lang} initialWho={role === "vacature" || role === "kandidaat" ? "hr" : role} initialGoal={role === "vacature" ? "transformatie" : role === "hr" ? "omscholing" : ""} onClose={() => setRole(null)} />
        )}
      </Modal>
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} lang={lang} />
    </main>
  );
}
