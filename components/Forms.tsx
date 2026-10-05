"use client";

import { useState, type ReactNode } from "react";
import {
  contactWho,
  hrGoals,
  intakeDirections,
  intakeEmployeeBands,
  intakeBudgets,
  intakeTimelines,
  type Bi,
  type Lang,
} from "@/lib/data";

const TO = "info@productiveswitch.nl";

type SendResult = "sent" | "mailto";

async function send(subject: string, text: string): Promise<SendResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, text }),
    });
    if (res.ok) return "sent";
  } catch {
    // fall through to mailto
  }
  const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  window.location.href = href;
  return "mailto";
}

export type ModalKind = "intake" | "koffie" | "opleider" | "cv" | null;

export function Modal({
  open,
  onClose,
  title,
  intro,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Sluiten" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">{title}</h2>
        {intro && <p className="modal-intro">{intro}</p>}
        {children}
      </div>
    </div>
  );
}

function Sent({ lang, onClose, viaMailto }: { lang: Lang; onClose: () => void; viaMailto: boolean }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  return (
    <div className="form-sent">
      <div className="form-sent-mark">✓</div>
      <p>
        {viaMailto
          ? t({
              nl: "We hebben je mailprogramma geopend. Verstuur het bericht, dan nemen we snel contact op.",
              en: "We've opened your mail app. Send the message and we'll be in touch soon.",
            })
          : t({
              nl: "Dank je. We hebben je bericht ontvangen en nemen snel contact op.",
              en: "Thank you. We've received your message and will be in touch soon.",
            })}
      </p>
      <button className="btn btn-switch" onClick={onClose}>
        {t({ nl: "Sluiten", en: "Close" })}
      </button>
    </div>
  );
}

/* ---------- CV (Productive Search, mailto) ---------- */
export function CvModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Lang }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t({ nl: "Stuur je CV", en: "Send your CV" })}
      intro={t({
        nl: "Werk jij in HR of werktransitie en wil je in beeld zijn voor rollen via Productive Search? Mail je CV als bijlage, dan nemen we contact op zodra er een rol past.",
        en: "Do you work in HR or workforce transition and want to be on our radar for roles via Productive Search? Email your CV as an attachment and we'll reach out when a role fits.",
      })}
    >
      <div className="cv-body">
        <a
          className="btn btn-hire"
          href={`mailto:${TO}?subject=${encodeURIComponent("CV voor Productive Search")}&body=${encodeURIComponent(
            lang === "nl"
              ? "Beste Productive Search,\n\nHierbij mijn CV als bijlage. \n\nNaam:\nHuidige rol:\nTelefoon:\n"
              : "Dear Productive Search,\n\nPlease find my CV attached.\n\nName:\nCurrent role:\nPhone:\n"
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
  );
}

/* ---------- Intake / contact router (segmenteert op "Wie ben je?") ---------- */
export function IntakeForm({ lang, onClose, initialWho = "" }: { lang: Lang; onClose: () => void; initialWho?: string }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  // Met een vooraf gekozen rol slaan we de "Wie ben je?"-stap over
  const [step, setStep] = useState(initialWho ? 1 : 0);
  const [who, setWho] = useState(initialWho);
  const [hrGoal, setHrGoal] = useState("");
  const [direction, setDirection] = useState("");
  const [employees, setEmployees] = useState("");
  const [budget, setBudget] = useState("");
  const [sector, setSector] = useState("");
  const [timeline, setTimeline] = useState("");
  const [question, setQuestion] = useState("");
  const [situation, setSituation] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | boolean>(null);

  if (done !== null) return <Sent lang={lang} onClose={onClose} viaMailto={done} />;

  const lbl = (arr: { key: string; label: Bi }[], key: string) =>
    arr.find((o) => o.key === key)?.label[lang === "nl" ? "nl" : "en"] || key;
  const emailOk = /.+@.+\..+/.test(email);

  // Opleider: toon meteen het volledige opleider-intakeformulier
  if (who === "opleider") {
    return (
      <>
        <div className="form-nav" style={{ justifyContent: "flex-start", marginBottom: 6 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setWho("")}>
            {t({ nl: "← Andere keuze", en: "← Change" })}
          </button>
        </div>
        <OpleiderIntake lang={lang} />
      </>
    );
  }

  const directionNode = (q: Bi) => (
    <div className="form-step">
      <label className="form-q">{t(q)}</label>
      <div className="choices">
        {intakeDirections.map((o) => (
          <button key={o.key} className={`choice${direction === o.key ? " on" : ""}`} onClick={() => setDirection(o.key)}>
            {t(o.label)}
          </button>
        ))}
      </div>
    </div>
  );

  const contactNode = (withOrg: boolean, withSituation: boolean) => (
    <div className="form-step">
      <label className="form-q">{t({ nl: "Naar wie sturen we de terugkoppeling?", en: "Who do we send the follow-up to?" })}</label>
      <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ nl: "Je naam", en: "Your name" })} />
      {withOrg && (
        <input className="form-input" value={org} onChange={(e) => setOrg(e.target.value)} placeholder={t({ nl: "Organisatie", en: "Organisation" })} />
      )}
      <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
      <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t({ nl: "Telefoon (optioneel)", en: "Phone (optional)" })} />
      {withSituation && (
        <>
          <label className="form-q" style={{ marginTop: 18 }}>{t({ nl: "Vertel kort waar het om gaat", en: "Tell us briefly what it's about" })}</label>
          <textarea
            className="form-input"
            rows={3}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder={t({ nl: "Optioneel, maar helpt ons je gericht terug te bellen", en: "Optional, but helps us call you back to the point" })}
          />
        </>
      )}
    </div>
  );

  const questionNode = (
    <div className="form-step">
      <label className="form-q">{t({ nl: "Stel je vraag", en: "Ask your question" })}</label>
      <textarea
        className="form-input"
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={t({ nl: "Waar kunnen we je mee helpen?", en: "How can we help you?" })}
      />
      <label className="form-q" style={{ marginTop: 18 }}>{t({ nl: "Naar wie sturen we het antwoord?", en: "Who do we send the answer to?" })}</label>
      <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ nl: "Je naam", en: "Your name" })} />
      <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
      <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t({ nl: "Telefoon (optioneel)", en: "Phone (optional)" })} />
    </div>
  );

  type Stp = { node: ReactNode; valid: boolean };
  const steps: Stp[] = [
    {
      valid: !!who,
      node: (
        <div className="form-step">
          <label className="form-q">{t({ nl: "Wie ben je?", en: "Who are you?" })}</label>
          <div className="choices">
            {contactWho.map((o) => (
              <button
                key={o.key}
                className={`choice${who === o.key ? " on" : ""}`}
                onClick={() => {
                  setWho(o.key);
                  setHrGoal("");
                }}
              >
                {t(o.label)}
              </button>
            ))}
          </div>
        </div>
      ),
    },
  ];

  if (who === "hr") {
    steps.push({
      valid: !!hrGoal,
      node: (
        <div className="form-step">
          <label className="form-q">{t({ nl: "Waar kunnen we je mee helpen?", en: "How can we help you?" })}</label>
          <div className="choices choices-stack">
            {hrGoals.map((o) => (
              <button key={o.key} className={`choice${hrGoal === o.key ? " on" : ""}`} onClick={() => setHrGoal(o.key)}>
                {t(o.label)}
              </button>
            ))}
          </div>
        </div>
      ),
    });
    if (hrGoal === "omscholing") {
      steps.push({ valid: !!direction, node: directionNode({ nl: "Om welke richting gaat het?", en: "Which direction is this about?" }) });
      steps.push({
        valid: !!(employees && budget),
        node: (
          <div className="form-step">
            <label className="form-q">{t({ nl: "Om hoeveel medewerkers gaat het?", en: "How many employees?" })}</label>
            <div className="choices">
              {intakeEmployeeBands.map((o) => (
                <button key={o.key} className={`choice${employees === o.key ? " on" : ""}`} onClick={() => setEmployees(o.key)}>
                  {t(o.label)}
                </button>
              ))}
            </div>
            <label className="form-q" style={{ marginTop: 18 }}>{t({ nl: "Welk budget ligt er?", en: "What budget is available?" })}</label>
            <div className="choices">
              {intakeBudgets.map((o) => (
                <button key={o.key} className={`choice${budget === o.key ? " on" : ""}`} onClick={() => setBudget(o.key)}>
                  {t(o.label)}
                </button>
              ))}
            </div>
          </div>
        ),
      });
      steps.push({
        valid: true,
        node: (
          <div className="form-step">
            <label className="form-q">{t({ nl: "In welke sector zit je organisatie?", en: "What sector is your organisation in?" })}</label>
            <input
              className="form-input"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder={t({ nl: "Bijvoorbeeld zorg, industrie, financieel", en: "For example care, industry, finance" })}
            />
            <label className="form-q" style={{ marginTop: 18 }}>{t({ nl: "Wat is de tijdlijn van de reorganisatie?", en: "What's the timeline of the reorganisation?" })}</label>
            <div className="choices">
              {intakeTimelines.map((o) => (
                <button key={o.key} className={`choice${timeline === o.key ? " on" : ""}`} onClick={() => setTimeline(o.key)}>
                  {t(o.label)}
                </button>
              ))}
            </div>
          </div>
        ),
      });
      steps.push({ valid: !!(name && emailOk), node: contactNode(true, false) });
    } else if (hrGoal === "transformatie" || hrGoal === "baan") {
      steps.push({ valid: !!(name && emailOk), node: contactNode(hrGoal === "transformatie", true) });
    } else if (hrGoal === "anders") {
      steps.push({ valid: !!(question && name && emailOk), node: questionNode });
    }
  } else if (who === "deelnemer") {
    steps.push({ valid: !!direction, node: directionNode({ nl: "Welke richting heeft je interesse?", en: "Which direction interests you?" }) });
    steps.push({ valid: !!(name && emailOk), node: contactNode(false, true) });
  } else if (who === "coach" || who === "anders") {
    steps.push({ valid: !!(question && name && emailOk), node: questionNode });
  }

  const safeStep = Math.min(step, steps.length - 1);
  const current = steps[safeStep];
  const isFinal = safeStep === steps.length - 1 && steps.length > 1;

  const submit = async () => {
    setBusy(true);
    const lines: string[] = ["Nieuw contactverzoek via productiveswitch.nl", "", `Wie: ${lbl(contactWho, who)}`];
    if (who === "hr") lines.push(`HR-vraag: ${lbl(hrGoals, hrGoal)}`);
    if ((who === "hr" && hrGoal === "omscholing") || who === "deelnemer") lines.push(`Richting: ${lbl(intakeDirections, direction)}`);
    if (who === "hr" && hrGoal === "omscholing") {
      lines.push(`Aantal medewerkers: ${lbl(intakeEmployeeBands, employees)}`);
      lines.push(`Budget: ${lbl(intakeBudgets, budget)}`);
      lines.push(`Sector: ${sector || "-"}`);
      lines.push(`Tijdlijn: ${lbl(intakeTimelines, timeline)}`);
    }
    if (situation) lines.push(`Toelichting: ${situation}`);
    if (question) lines.push(`Vraag: ${question}`);
    lines.push("", `Naam: ${name}`);
    if (who === "hr") lines.push(`Organisatie: ${org || "-"}`);
    lines.push(`E-mail: ${email}`, `Telefoon: ${phone || "-"}`);
    const res = await send("Contactverzoek, Productive Switch", lines.join("\n"));
    setBusy(false);
    setDone(res === "mailto");
  };

  return (
    <>
      {steps.length > 1 && (
        <div className="form-progress">
          {steps.map((_, i) => (
            <span key={i} className={`dot${i <= safeStep ? " on" : ""}`} />
          ))}
        </div>
      )}
      {current.node}
      <div className="form-nav">
        {safeStep > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(safeStep - 1)} disabled={busy}>
            {t({ nl: "Terug", en: "Back" })}
          </button>
        )}
        {!isFinal ? (
          <button className="btn btn-switch" onClick={() => setStep(safeStep + 1)} disabled={!current.valid}>
            {t({ nl: "Volgende", en: "Next" })}
          </button>
        ) : (
          <button className="btn btn-switch" onClick={submit} disabled={!current.valid || busy}>
            {busy ? t({ nl: "Versturen…", en: "Sending…" }) : t({ nl: "Verstuur", en: "Send" })}
          </button>
        )}
      </div>
    </>
  );
}

/* ---------- Koffie (warme tweede) ---------- */
export function KoffieForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | boolean>(null);

  if (done !== null) return <Sent lang={lang} onClose={onClose} viaMailto={done} />;

  const submit = async () => {
    setBusy(true);
    const text = [
      "Koffie-verzoek via productiveswitch.nl",
      "",
      `Naam: ${name}`,
      `E-mail: ${email}`,
      `Bericht: ${msg || "-"}`,
    ].join("\n");
    const res = await send("Koffie, even kennismaken", text);
    setBusy(false);
    setDone(res === "mailto");
  };

  const ok = name && /.+@.+\..+/.test(email);
  return (
    <div className="form-step">
      <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ nl: "Je naam", en: "Your name" })} />
      <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
      <textarea
        className="form-input"
        rows={3}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder={t({ nl: "Waar wil je over sparren? (optioneel)", en: "What would you like to talk through? (optional)" })}
      />
      <div className="form-nav">
        <button className="btn btn-switch" onClick={submit} disabled={!ok || busy}>
          {busy ? t({ nl: "Versturen…", en: "Sending…" }) : t({ nl: "Stuur het voorstel", en: "Send the invite" })}
        </button>
      </div>
    </div>
  );
}

/* ---------- Opleider-intake (volledige pagina, aanbodkant) ---------- */
const opleiderVormen: { key: string; label: Bi }[] = [
  { key: "klassikaal", label: { nl: "Klassikaal", en: "Classroom" } },
  { key: "online", label: { nl: "Online", en: "Online" } },
  { key: "blended", label: { nl: "Blended", en: "Blended" } },
  { key: "werkplek", label: { nl: "Op de werkplek", en: "On the job" } },
];

const opleiderStart: { key: string; label: Bi }[] = [
  { key: "ja", label: { nl: "Ja, binnen een maand", en: "Yes, within a month" } },
  { key: "deels", label: { nl: "Deels", en: "Partly" } },
  { key: "nee", label: { nl: "Nee, langere doorlooptijd", en: "No, longer lead time" } },
];

export function OpleiderIntake({ lang }: { lang: Lang }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [site, setSite] = useState("");
  const [dirs, setDirs] = useState<string[]>([]);
  const [vormen, setVormen] = useState<string[]>([]);
  const [start, setStart] = useState("");
  const [erkenning, setErkenning] = useState("");
  const [aanbod, setAanbod] = useState("");
  const [bedrijven, setBedrijven] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | boolean>(null);

  if (done !== null) return <Sent lang={lang} onClose={() => setDone(null)} viaMailto={done} />;

  const toggle = (arr: string[], k: string, set: (v: string[]) => void) =>
    set(arr.includes(k) ? arr.filter((x) => x !== k) : [...arr, k]);

  const submit = async () => {
    setBusy(true);
    const dirLabels = dirs.map((k) => intakeDirections.find((o) => o.key === k)?.label.nl || k).join(", ");
    const vormLabels = vormen.map((k) => opleiderVormen.find((o) => o.key === k)?.label.nl || k).join(", ");
    const text = [
      "Opleider-intake via productiveswitch.nl",
      "",
      `Organisatie: ${org}`,
      `Contactpersoon: ${name}`,
      `E-mail: ${email}`,
      `Telefoon: ${phone || "-"}`,
      `Website: ${site || "-"}`,
      `Richtingen: ${dirLabels || "-"}`,
      `Vorm: ${vormLabels || "-"}`,
      `Start binnen 1 maand: ${opleiderStart.find((o) => o.key === start)?.label.nl || "-"}`,
      `Erkenning: ${erkenning || "-"}`,
      `Bedrijven in contact: ${bedrijven || "-"}`,
      "",
      `Aanbod: ${aanbod || "-"}`,
    ].join("\n");
    const res = await send("Opleider-intake, Productive Switch", text);
    setBusy(false);
    setDone(res === "mailto");
  };

  const ok = org && name && /.+@.+\..+/.test(email);

  return (
    <div className="opleider-intake">
      <div className="form-step">
        <label className="form-q">{t({ nl: "Over je organisatie", en: "About your organisation" })}</label>
        <input className="form-input" value={org} onChange={(e) => setOrg(e.target.value)} placeholder={t({ nl: "Naam van je organisatie", en: "Your organisation's name" })} />
        <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ nl: "Contactpersoon", en: "Contact person" })} />
        <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
        <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t({ nl: "Telefoon (optioneel)", en: "Phone (optional)" })} />
        <input className="form-input" value={site} onChange={(e) => setSite(e.target.value)} placeholder={t({ nl: "Website (optioneel)", en: "Website (optional)" })} />

        <label className="form-q" style={{ marginTop: 20 }}>
          {t({ nl: "In welke richting bied je aan?", en: "In which direction do you offer?" })}
        </label>
        <div className="choices">
          {intakeDirections
            .filter((o) => o.key !== "onbekend")
            .map((o) => (
              <button key={o.key} className={`choice${dirs.includes(o.key) ? " on" : ""}`} onClick={() => toggle(dirs, o.key, setDirs)}>
                {t(o.label)}
              </button>
            ))}
        </div>

        <label className="form-q" style={{ marginTop: 20 }}>{t({ nl: "In welke vorm?", en: "In what format?" })}</label>
        <div className="choices">
          {opleiderVormen.map((o) => (
            <button key={o.key} className={`choice${vormen.includes(o.key) ? " on" : ""}`} onClick={() => toggle(vormen, o.key, setVormen)}>
              {t(o.label)}
            </button>
          ))}
        </div>

        <label className="form-q" style={{ marginTop: 20 }}>
          {t({ nl: "Kan een deelnemer binnen een maand starten?", en: "Can a participant start within a month?" })}
        </label>
        <div className="choices">
          {opleiderStart.map((o) => (
            <button key={o.key} className={`choice${start === o.key ? " on" : ""}`} onClick={() => setStart(o.key)}>
              {t(o.label)}
            </button>
          ))}
        </div>

        <label className="form-q" style={{ marginTop: 20 }}>
          {t({ nl: "Welke erkenning of certificaat?", en: "Which recognition or certificate?" })}
        </label>
        <input
          className="form-input"
          value={erkenning}
          onChange={(e) => setErkenning(e.target.value)}
          placeholder={t({ nl: "Bijv. mbo-certificaat, branchecertificaat, praktijkverklaring", en: "E.g. vocational certificate, sector certificate, practical statement" })}
        />

        <label className="form-q" style={{ marginTop: 20 }}>
          {t({ nl: "Met welke bedrijven sta je in contact over deze opleiding?", en: "Which companies are you in contact with about this training?" })}
        </label>
        <textarea
          className="form-input"
          rows={2}
          value={bedrijven}
          onChange={(e) => setBedrijven(e.target.value)}
          placeholder={t({ nl: "Bijv. werkgevers die je afgestudeerden aannemen of leerwerkplekken bieden", en: "E.g. employers who hire your graduates or offer work-placements" })}
        />

        <label className="form-q" style={{ marginTop: 20 }}>{t({ nl: "Vertel kort over je aanbod", en: "Tell us briefly about your offering" })}</label>
        <textarea
          className="form-input"
          rows={3}
          value={aanbod}
          onChange={(e) => setAanbod(e.target.value)}
          placeholder={t({ nl: "Welke opleidingen of trajecten bied je aan, en voor wie?", en: "Which programmes or tracks do you offer, and for whom?" })}
        />

        <div className="form-nav">
          <button className="btn btn-switch btn-lg" onClick={submit} disabled={!ok || busy}>
            {busy ? t({ nl: "Versturen…", en: "Sending…" }) : t({ nl: "Verstuur je aanmelding", en: "Send your application" })}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Opleider (aanbodkant, apart) ---------- */
export function OpleiderForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState("");
  const [dirs, setDirs] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | boolean>(null);

  if (done !== null) return <Sent lang={lang} onClose={onClose} viaMailto={done} />;

  const toggle = (k: string) => setDirs((d) => (d.includes(k) ? d.filter((x) => x !== k) : [...d, k]));

  const submit = async () => {
    setBusy(true);
    const dirLabels = dirs
      .map((k) => intakeDirections.find((o) => o.key === k)?.label.nl || k)
      .join(", ");
    const text = [
      "Aanmelding opleider via productiveswitch.nl",
      "",
      `Organisatie: ${org}`,
      `Contactpersoon: ${name}`,
      `E-mail: ${email}`,
      `Opleidingen: ${courses || "-"}`,
      `Richtingen: ${dirLabels || "-"}`,
    ].join("\n");
    const res = await send("Aanmelding opleider, Productive Switch", text);
    setBusy(false);
    setDone(res === "mailto");
  };

  const ok = org && name && /.+@.+\..+/.test(email);
  return (
    <div className="form-step">
      <input className="form-input" value={org} onChange={(e) => setOrg(e.target.value)} placeholder={t({ nl: "Naam van je organisatie", en: "Your organisation's name" })} />
      <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ nl: "Contactpersoon", en: "Contact person" })} />
      <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
      <textarea
        className="form-input"
        rows={2}
        value={courses}
        onChange={(e) => setCourses(e.target.value)}
        placeholder={t({ nl: "Welke opleidingen bied je aan?", en: "Which programmes do you offer?" })}
      />
      <label className="form-q" style={{ marginTop: 6 }}>
        {t({ nl: "In welke richting?", en: "In which direction?" })}
      </label>
      <div className="choices">
        {intakeDirections
          .filter((o) => o.key !== "onbekend")
          .map((o) => (
            <button key={o.key} className={`choice${dirs.includes(o.key) ? " on" : ""}`} onClick={() => toggle(o.key)}>
              {t(o.label)}
            </button>
          ))}
      </div>
      <div className="form-nav">
        <button className="btn btn-switch" onClick={submit} disabled={!ok || busy}>
          {busy ? t({ nl: "Versturen…", en: "Sending…" }) : t({ nl: "Meld je aan", en: "Sign up" })}
        </button>
      </div>
    </div>
  );
}
