"use client";

import { useState, type ReactNode } from "react";
import {
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

export type ModalKind = "intake" | "koffie" | "opleider" | null;

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

/* ---------- Intake (werkgever, primair) ---------- */
export function IntakeForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("");
  const [employees, setEmployees] = useState("");
  const [budget, setBudget] = useState("");
  const [sector, setSector] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | boolean>(null);

  if (done !== null) return <Sent lang={lang} onClose={onClose} viaMailto={done} />;

  const lbl = (arr: { key: string; label: Bi }[], key: string) =>
    arr.find((o) => o.key === key)?.label[lang === "nl" ? "nl" : "en"] || key;

  const steps = [
    // 0: richting
    <div key="s0" className="form-step">
      <label className="form-q">{t({ nl: "Om welke richting gaat het?", en: "Which direction is this about?" })}</label>
      <div className="choices">
        {intakeDirections.map((o) => (
          <button
            key={o.key}
            className={`choice${direction === o.key ? " on" : ""}`}
            onClick={() => setDirection(o.key)}
          >
            {t(o.label)}
          </button>
        ))}
      </div>
    </div>,
    // 1: omvang + budget
    <div key="s1" className="form-step">
      <label className="form-q">{t({ nl: "Om hoeveel medewerkers gaat het?", en: "How many employees?" })}</label>
      <div className="choices">
        {intakeEmployeeBands.map((o) => (
          <button key={o.key} className={`choice${employees === o.key ? " on" : ""}`} onClick={() => setEmployees(o.key)}>
            {t(o.label)}
          </button>
        ))}
      </div>
      <label className="form-q" style={{ marginTop: 18 }}>
        {t({ nl: "Welk budget ligt er?", en: "What budget is available?" })}
      </label>
      <div className="choices">
        {intakeBudgets.map((o) => (
          <button key={o.key} className={`choice${budget === o.key ? " on" : ""}`} onClick={() => setBudget(o.key)}>
            {t(o.label)}
          </button>
        ))}
      </div>
    </div>,
    // 2: context
    <div key="s2" className="form-step">
      <label className="form-q">{t({ nl: "In welke sector zit je organisatie?", en: "What sector is your organisation in?" })}</label>
      <input
        className="form-input"
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        placeholder={t({ nl: "Bijvoorbeeld zorg, industrie, financieel", en: "For example care, industry, finance" })}
      />
      <label className="form-q" style={{ marginTop: 18 }}>
        {t({ nl: "Wat is de tijdlijn van de reorganisatie?", en: "What's the timeline of the reorganisation?" })}
      </label>
      <div className="choices">
        {intakeTimelines.map((o) => (
          <button key={o.key} className={`choice${timeline === o.key ? " on" : ""}`} onClick={() => setTimeline(o.key)}>
            {t(o.label)}
          </button>
        ))}
      </div>
    </div>,
    // 3: contact
    <div key="s3" className="form-step">
      <label className="form-q">{t({ nl: "Naar wie sturen we de terugkoppeling?", en: "Who do we send the follow-up to?" })}</label>
      <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ nl: "Je naam", en: "Your name" })} />
      <input className="form-input" value={org} onChange={(e) => setOrg(e.target.value)} placeholder={t({ nl: "Organisatie", en: "Organisation" })} />
      <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t({ nl: "E-mailadres", en: "Email address" })} />
      <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t({ nl: "Telefoon (optioneel)", en: "Phone (optional)" })} />
    </div>,
  ];

  const canNext =
    (step === 0 && direction) ||
    (step === 1 && employees && budget) ||
    step === 2 ||
    (step === 3 && name && /.+@.+\..+/.test(email));

  const submit = async () => {
    setBusy(true);
    const text = [
      "Nieuwe intake-aanvraag via productiveswitch.nl",
      "",
      `Richting: ${lbl(intakeDirections, direction)}`,
      `Aantal medewerkers: ${lbl(intakeEmployeeBands, employees)}`,
      `Budget: ${lbl(intakeBudgets, budget)}`,
      `Sector: ${sector || "-"}`,
      `Tijdlijn: ${lbl(intakeTimelines, timeline)}`,
      "",
      `Naam: ${name}`,
      `Organisatie: ${org || "-"}`,
      `E-mail: ${email}`,
      `Telefoon: ${phone || "-"}`,
    ].join("\n");
    const res = await send("Intake aanvraag, Productive Switch", text);
    setBusy(false);
    setDone(res === "mailto");
  };

  return (
    <>
      <div className="form-progress">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`dot${i <= step ? " on" : ""}`} />
        ))}
      </div>
      {steps[step]}
      <div className="form-nav">
        {step > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)} disabled={busy}>
            {t({ nl: "Terug", en: "Back" })}
          </button>
        )}
        {step < 3 ? (
          <button className="btn btn-switch" onClick={() => setStep(step + 1)} disabled={!canNext}>
            {t({ nl: "Volgende", en: "Next" })}
          </button>
        ) : (
          <button className="btn btn-switch" onClick={submit} disabled={!canNext || busy}>
            {busy ? t({ nl: "Versturen…", en: "Sending…" }) : t({ nl: "Verstuur intake", en: "Send intake" })}
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
