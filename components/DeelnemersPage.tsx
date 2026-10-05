"use client";

import { useState } from "react";
import Link from "next/link";
import { destinations, intakeDirections } from "@/lib/data";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { send } from "./Forms";

// Voor deelnemers: groene hero met een inlog/aanmeld-kaart. Er is nog geen
// accountsysteem (fase 1 = concierge); aanmelden stuurt een mail naar het
// centrale adres, inloggen toont dat accounts in voorbereiding zijn.
export function DeelnemersPage() {
  const { lang, t } = useLang();
  useReveal();

  return (
    <main className="switch-page deelnemers-page">
      <section className="h-hero h-hero--switch">
        <div className="wrap h-hero-grid h-hero-grid--account">
          <div className="h-hero-text">
            <div className="eyebrow">{t({ nl: "Voor deelnemers", en: "For participants" })}</div>
            <h1>{t({ nl: "Werk verandert. Mee veranderen is belangrijker dan ooit.", en: "Work is changing. Changing with it matters more than ever." })}</h1>
            <p className="lede">
              {t({
                nl: "Het veranderen van je functie of het verdwijnen van je rol kan een enorme impact hebben. Deze onzekere tijd vraagt meer dan ooit om een flexibele mindset, het aanleren van nieuwe vaardigheden en het inzetten van je competenties op andere gebieden. Wij kunnen je daarmee helpen.",
                en: "A changing role, or a role that disappears, can have an enormous impact. These uncertain times call more than ever for a flexible mindset, learning new skills and applying your competences in other fields. We can help you with that.",
              })}
            </p>
            <p className="lede">
              {t({
                nl: "Maak een account aan en begin direct online: update je CV, doe je eigen scan van de arbeidsmarkt, breng je skills, ambities en vervolgrichtingen in kaart, en zet de basis neer voor het gebruik van AI in je zoektocht.",
                en: "Create an account and start online right away: update your CV, do your own scan of the labour market, map your skills, ambitions and next directions, and lay the basis for using AI in your search.",
              })}
            </p>
            <ul className="deel-points">
              <li>{t({ nl: "Start online, zonder te wachten op een afspraak", en: "Start online, without waiting for an appointment" })}</li>
              <li>{t({ nl: "Intake en een door ons geselecteerde loopbaancoach", en: "An intake and a career coach we have selected" })}</li>
              <li>{t({ nl: "Korte, erkende omscholing met een werkgever in beeld", en: "Short, recognised re-training with an employer in view" })}</li>
            </ul>
          </div>
          <div className="h-hero-side">
            <AccountCard lang={lang} />
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section reveal" id="richtingen">
          <div className="section-head">
            <h2>{t({ nl: "Drie richtingen", en: "Three directions" })}</h2>
            <p>
              {t({
                nl: "Elke richting heeft een eigen aanbod van korte, erkende cursussen. Bekijk wat past, filter op duur, vorm en prijs, en zie meteen waar je kunt beginnen.",
                en: "Each direction has its own catalogue of short, accredited courses. See what fits, filter by length, format and price, and spot where you can start right away.",
              })}
            </p>
          </div>
          <div className="pillars stagger">
            {destinations.map((d, i) => (
              <Link
                key={d.id}
                className="pillar"
                href={`/richtingen/${d.slug}`}
                style={{ "--pc": ["var(--col-tech)", "var(--col-social)", "var(--col-domain)"][i] } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="pillar-photo" src={d.photo} alt="" loading="lazy" />
                <span className="pillar-shade" aria-hidden="true" />
                <span className="pillar-body">
                  <span className="pillar-num">{d.num}</span>
                  <span className="pillar-title">{t(d.label)}</span>
                  <span className="pillar-sub">{t(d.sub)}</span>
                  <span className="pillar-chev" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AccountCard({ lang }: { lang: "nl" | "en" }) {
  const t = (b: { nl: string; en: string }) => (lang === "nl" ? b.nl : b.en);
  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [direction, setDirection] = useState("");
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<"idle" | "sent" | "mailto" | "soon">("idle");
  const emailOk = /.+@.+\..+/.test(email);

  const signup = async () => {
    setBusy(true);
    const dir = intakeDirections.find((d) => d.key === direction)?.label.nl || "-";
    const text = ["Aanmelding deelnemer via productiveswitch.nl", "", `Naam: ${name}`, `E-mail: ${email}`, `Richting: ${dir}`].join("\n");
    const res = await send("Aanmelding deelnemer", text);
    setBusy(false);
    setState(res === "mailto" ? "mailto" : "sent");
  };

  if (state === "sent" || state === "mailto") {
    return (
      <div className="account-card">
        <div className="form-sent">
          <div className="form-sent-mark">✓</div>
          <h3>{t({ nl: "Je aanmelding is binnen", en: "Your sign-up is in" })}</h3>
          <p>
            {state === "mailto"
              ? t({ nl: "We hebben je mailprogramma geopend. Verstuur het bericht, dan sturen we je snel je startlink.", en: "We've opened your mail app. Send the message and we'll send you your start link soon." })
              : t({ nl: "We sturen je binnen één werkdag een persoonlijke startlink voor de online start.", en: "Within one working day we'll send you a personal link to the online start." })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-card">
      <div className="account-tabs" role="tablist">
        <button role="tab" aria-selected={tab === "signup"} className={tab === "signup" ? "on" : ""} onClick={() => { setTab("signup"); setState("idle"); }}>
          {t({ nl: "Account aanmaken", en: "Create account" })}
        </button>
        <button role="tab" aria-selected={tab === "login"} className={tab === "login" ? "on" : ""} onClick={() => { setTab("login"); setState("idle"); }}>
          {t({ nl: "Inloggen", en: "Log in" })}
        </button>
      </div>

      {tab === "signup" ? (
        <div className="account-body">
          <h3>{t({ nl: "Begin vandaag", en: "Start today" })}</h3>
          <p className="account-sub">{t({ nl: "Gratis voor deelnemers. Je werkgever of de regeling betaalt het traject.", en: "Free for participants. Your employer or the scheme pays for the path." })}</p>
          <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ nl: "Je naam", en: "Your name" })} />
          <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
          <label className="form-q">{t({ nl: "Welke richting heeft je interesse?", en: "Which direction interests you?" })}</label>
          <div className="choices choices-stack">
            {intakeDirections.map((d) => (
              <button key={d.key} className={`choice${direction === d.key ? " on" : ""}`} onClick={() => setDirection(d.key)}>
                {t(d.label)}
              </button>
            ))}
          </div>
          <button className="btn btn-switch btn-lg account-submit" disabled={!name || !emailOk || !direction || busy} onClick={signup}>
            {busy ? t({ nl: "Versturen…", en: "Sending…" }) : t({ nl: "Maak mijn account aan", en: "Create my account" })}
          </button>
          <p className="account-note">
            {t({
              nl: "Je ontvangt een persoonlijke startlink per e-mail. Geen wachtwoord nodig.",
              en: "You'll receive a personal start link by email. No password needed.",
            })}
          </p>
        </div>
      ) : (
        <div className="account-body">
          <h3>{t({ nl: "Welkom terug", en: "Welcome back" })}</h3>
          <p className="account-sub">{t({ nl: "Log in om verder te gaan waar je gebleven was.", en: "Log in to pick up where you left off." })}</p>
          <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
          <input className="form-input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder={t({ nl: "Wachtwoord", en: "Password" })} />
          <button className="btn btn-switch btn-lg account-submit" disabled={!emailOk || !pw} onClick={() => setState("soon")}>
            {t({ nl: "Inloggen", en: "Log in" })}
          </button>
          {state === "soon" && (
            <p className="account-note account-note--warn">
              {t({
                nl: "De deelnemersomgeving is in voorbereiding. Heb je je al aangemeld? Dan krijg je je startlink per e-mail zodra die klaar is.",
                en: "The participant environment is being prepared. Already signed up? You'll get your start link by email as soon as it is ready.",
              })}
            </p>
          )}
          <button className="account-link" onClick={() => setTab("signup")}>
            {t({ nl: "Nog geen account? Maak er een aan", en: "No account yet? Create one" })}
          </button>
        </div>
      )}
    </div>
  );
}
