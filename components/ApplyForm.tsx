"use client";

import { useState } from "react";
import Link from "next/link";
import type { Bi, Lang, Vacancy } from "@/lib/data";
import { Modal } from "./Forms";

const TO = "douwe@productiveswitch.nl";

// Sollicitatieformulier op de rolpagina. Verstuurt via /api/apply (met cv als
// bijlage); zonder mailserver opent het de mailapp met de ingevulde tekst.
export function ApplyModal({ open, onClose, lang, v }: { open: boolean; onClose: () => void; lang: Lang; v: Vacancy }) {
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState("");
  const [from, setFrom] = useState("");
  const [forms, setForms] = useState<string[]>([v.category]);
  const [rate, setRate] = useState("");
  const [salary, setSalary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [privacy, setPrivacy] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | "sent" | "mailto">(null);
  const [error, setError] = useState("");

  const toggleForm = (k: string) => setForms((f) => (f.includes(k) ? f.filter((x) => x !== k) : [...f, k]));
  const emailOk = /.+@.+\..+/.test(email);
  const canSend = name.trim().length > 1 && emailOk && privacy && !busy;

  const channels = [
    { key: "email", label: { nl: "E-mail", en: "Email" } },
    { key: "phone", label: { nl: "Telefoon", en: "Phone" } },
    { key: "whatsapp", label: { nl: "WhatsApp", en: "WhatsApp" } },
    { key: "linkedin", label: { nl: "LinkedIn", en: "LinkedIn" } },
  ];
  const contractForms = [
    { key: "interim", label: { nl: "Interim", en: "Interim" } },
    { key: "vast", label: { nl: "Vast", en: "Permanent" } },
  ];

  const buildText = () => {
    const l = (b: Bi) => t(b);
    const lines = [
      `${l({ nl: "Rol", en: "Role" })}: ${t(v.role)} (${v.slug})`,
      "",
      `${l({ nl: "Naam", en: "Name" })}: ${name}`,
      `${l({ nl: "E-mail", en: "Email" })}: ${email}`,
      `${l({ nl: "Telefoon", en: "Phone" })}: ${phone || "-"}`,
      `${l({ nl: "Voorkeur contact", en: "Preferred contact" })}: ${channels.find((c) => c.key === channel)?.label[lang === "nl" ? "nl" : "en"] || "-"}`,
      `${l({ nl: "Beschikbaar vanaf", en: "Available from" })}: ${from || "-"}`,
      `${l({ nl: "Contractvorm", en: "Contract form" })}: ${forms.map((k) => contractForms.find((c) => c.key === k)?.label[lang === "nl" ? "nl" : "en"]).join(", ") || "-"}`,
      `${l({ nl: "Verwacht uurtarief", en: "Expected hourly rate" })}: ${rate || "-"}`,
      `${l({ nl: "Verwacht all-in jaarsalaris", en: "Expected all-in yearly salary" })}: ${salary || "-"}`,
      "",
      `${l({ nl: "Motivatie", en: "Motivation" })}:`,
      motivation || "-",
      "",
      `${l({ nl: "Privacyverklaring akkoord", en: "Privacy policy accepted" })}: ${privacy ? "ja" : "nee"}`,
      `${l({ nl: "Updates over vacatures", en: "Vacancy updates" })}: ${updates ? "ja" : "nee"}`,
      `CV: ${cv ? cv.name : "-"}`,
    ];
    return lines.join("\n");
  };

  const submit = async () => {
    if (!canSend) return;
    setBusy(true);
    setError("");
    const subject = `${t({ nl: "Sollicitatie", en: "Application" })}: ${t(v.role)}, ${name}`;
    const text = buildText();
    try {
      const fd = new FormData();
      fd.set("subject", subject);
      fd.set("text", text);
      if (cv) fd.set("cv", cv);
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      if (res.ok) {
        setDone("sent");
        setBusy(false);
        return;
      }
      if (res.status === 413) {
        setError(t({ nl: "Je cv is groter dan 8 MB. Kies een kleiner bestand.", en: "Your CV is larger than 8 MB. Please choose a smaller file." }));
        setBusy(false);
        return;
      }
    } catch {
      // fall through
    }
    const note = t({ nl: "\n\n(Voeg je cv als bijlage toe voor je verstuurt.)", en: "\n\n(Attach your CV before sending.)" });
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text + note)}`;
    setDone("mailto");
    setBusy(false);
  };

  if (done) {
    return (
      <Modal open={open} onClose={onClose} title={t({ nl: "Dank je", en: "Thank you" })}>
        <div className="form-sent">
          <div className="form-sent-mark" style={{ background: "var(--hire)" }}>✓</div>
          <p>
            {done === "mailto"
              ? t({ nl: "We hebben je mailprogramma geopend met je gegevens. Voeg je cv toe en verstuur het bericht, dan neemt Douwe contact op.", en: "We've opened your mail app with your details. Attach your CV and send the message, and Douwe will be in touch." })
              : t({ nl: "Je reactie is binnen. Douwe neemt binnen twee werkdagen contact met je op.", en: "Your application has arrived. Douwe will contact you within two working days." })}
          </p>
          <button className="btn btn-hire" onClick={onClose}>{t({ nl: "Sluiten", en: "Close" })}</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t({ nl: "Reageer op deze rol", en: "Apply for this role" })}
      intro={`${t(v.role)} · ${v.location}`}
    >
      <div className="apply-form">
        <div className="apply-grid">
          <label className="apply-field">
            <span>{t({ nl: "Naam", en: "Name" })} *</span>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className="apply-field">
            <span>{t({ nl: "E-mailadres", en: "Email address" })} *</span>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className="apply-field">
            <span>{t({ nl: "Telefoonnummer", en: "Phone number" })}</span>
            <input className="form-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </label>
          <label className="apply-field">
            <span>{t({ nl: "Voorkeur voor contact", en: "Preferred way of communicating" })}</span>
            <select className="form-input" value={channel} onChange={(e) => setChannel(e.target.value)}>
              <option value="">{t({ nl: "Maak een keuze", en: "Choose one" })}</option>
              {channels.map((c) => <option key={c.key} value={c.key}>{t(c.label)}</option>)}
            </select>
          </label>
          <label className="apply-field">
            <span>{t({ nl: "Beschikbaar vanaf", en: "Available from" })}</span>
            <input className="form-input" value={from} onChange={(e) => setFrom(e.target.value)} placeholder={t({ nl: "bijv. 1 november", en: "e.g. 1 November" })} />
          </label>
          <div className="apply-field">
            <span>{t({ nl: "Contractvorm waarin je interesse hebt", en: "Contract form interested in" })}</span>
            <div className="apply-checks">
              {contractForms.map((c) => (
                <label key={c.key} className="apply-check">
                  <input type="checkbox" checked={forms.includes(c.key)} onChange={() => toggleForm(c.key)} /> {t(c.label)}
                </label>
              ))}
            </div>
          </div>
          <label className="apply-field">
            <span>{t({ nl: "Verwacht uurtarief", en: "Expected hourly rate" })}</span>
            <input className="form-input" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="€" />
          </label>
          <label className="apply-field">
            <span>{t({ nl: "Verwacht all-in jaarsalaris", en: "Expected all-in yearly salary" })}</span>
            <input className="form-input" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="€" />
          </label>
        </div>
        <label className="apply-field">
          <span>{t({ nl: "Korte motivatie voor deze rol", en: "Short motivation for this position" })}</span>
          <textarea className="form-input" rows={4} value={motivation} onChange={(e) => setMotivation(e.target.value)} />
        </label>
        <label className="apply-field">
          <span>{t({ nl: "CV (pdf of Word, max 8 MB)", en: "CV (PDF or Word, max 8 MB)" })}</span>
          <input className="form-input apply-file" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files?.[0] || null)} />
        </label>
        <label className="apply-check">
          <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
          <span>
            {t({ nl: "Ik ga akkoord met de ", en: "I agree with the " })}
            <Link href="/privacy" target="_blank">{t({ nl: "privacyverklaring", en: "privacy policy" })}</Link> *
          </span>
        </label>
        <label className="apply-check">
          <input type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)} />
          <span>{t({ nl: "Houd me op de hoogte van relevante vacatures", en: "I would like to be updated on relevant vacancies" })}</span>
        </label>
        {error && <p className="apply-error">{error}</p>}
        <div className="form-nav">
          <button className="btn btn-ghost" onClick={onClose}>{t({ nl: "Annuleren", en: "Cancel" })}</button>
          <button className="btn btn-hire" disabled={!canSend} onClick={submit}>
            {busy ? t({ nl: "Versturen…", en: "Sending…" }) : t({ nl: "Verstuur reactie", en: "Send application" })}
          </button>
        </div>
      </div>
    </Modal>
  );
}
