import type { Vacancy } from "@/lib/data";
import { LogoMark } from "./Logo";

// Vaste posteropmaak voor LinkedIn (1080 x 1350). Wordt via headless Chrome
// naar PNG gerenderd; zie scripts/poster.sh. Altijd zonder naam van de klant.
export function RolePoster({ v, lang = "nl" }: { v: Vacancy; lang?: "nl" | "en" }) {
  const t = (b: { nl: string; en: string }) => (lang === "nl" ? b.nl : b.en);
  return (
    <div className="poster">
      <div className="poster-top">
        <div className="poster-brand"><LogoMark size={44} onDark /> <span>Productive Search</span></div>
        <div className="poster-kind">{v.category === "interim" ? t({ nl: "Interim opdracht", en: "Interim assignment" }) : t({ nl: "Vaste functie", en: "Permanent role" })}</div>
      </div>
      <div className="poster-title">{t(v.role)}</div>
      <div className="poster-org">{t(v.org)}</div>
      <div className="poster-meta">
        <span>{v.location}</span><span>{t(v.duration)}</span><span>{t(v.hours)}</span>
      </div>
      <div className="poster-card">
        <div className="poster-h">{t({ nl: "Wat je gaat doen", en: "What you will do" })}</div>
        <ul>{v.tasks.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
        <div className="poster-h">{t({ nl: "Wat we zoeken", en: "What we look for" })}</div>
        <ul>{v.asks.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
      </div>
      <div className="poster-foot">
        <div>
          <div className="poster-cta">{t({ nl: "Interesse of iemand in gedachten?", en: "Interested, or know someone?" })}</div>
          <div className="poster-url">productiveswitch.nl/rollen</div>
        </div>
        <div className="poster-start">{t(v.start)}</div>
      </div>
    </div>
  );
}
