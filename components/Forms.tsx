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

/* ---------- CV (Productive Restructure, mailto) ---------- */
export function CvModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Lang }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t({ nl: "Stuur je CV", en: "Send your CV" })}
      intro={t({
        nl: "Werk jij in HR of werktransitie en wil je in beeld zijn voor rollen via Productive Restructure? Mail je CV als bijlage, dan nemen we contact op zodra er een rol past.",
        en: "Do you work in HR or workforce transition and want to be on our radar for roles via Productive Restructure? Email your CV as an attachment and we'll reach out when a role fits.",
      })}
    >
      <div className="cv-body">
        <a
          className="btn btn-hire"
          href={`mailto:${TO}?subject=${encodeURIComponent("CV voor Productive Restructure")}&body=${encodeURIComponent(
            lang === "nl"
              ? "Beste Productive Restructure,\n\nHierbij mijn CV als bijlage. \n\nNaam:\nHuidige rol:\nTelefoon:\n"
              : "Dear Productive Restructure,\n\nPlease find my CV attached.\n\nName:\nCurrent role:\nPhone:\n"
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
