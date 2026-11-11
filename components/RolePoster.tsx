import type { Vacancy } from "@/lib/data";
import { LogoMark } from "./Logo";

// Vaste posteropmaak voor LinkedIn (1080 x 1350). Wordt via headless Chrome
// naar PNG gerenderd; zie scripts/poster.sh. Altijd zonder naam van de klant.
export function RolePoster({ v, lang = "nl" }: { v: Vacancy; lang?: "nl" | "en" }) {
  const t = (b: { nl: string; en: string }) => (lang === "nl" ? b.nl : b.en);
  const kind = v.category === "interim" ? { nl: "Interim opdracht", en: "Interim assignment" } : { nl: "Vaste functie", en: "Permanent role" };
  // De soort functie staat al rechtsboven, dus niet nog eens als kenmerk.
  const details = v.details?.filter((x) => x.nl !== kind.nl);
  const tasks = v.poster?.tasks ?? v.tasks;
  const asks = v.poster?.asks ?? v.asks;
  const asksTitle = v.poster ? undefined : v.asksTitle;
  return (
    <div className="poster">
      <div className="poster-top">
        <div className="poster-brand"><LogoMark size={44} onDark /> <span>Productive Search</span></div>
        <div className="poster-kind">{t(kind)}</div>
      </div>
      <div className="poster-title">{t(v.role)}</div>
      <div className="poster-org">{t(v.org)}</div>
      <div className="poster-meta">
        <span>{v.location}</span>{details ? details.map((x, i) => <span key={i}>{t(x)}</span>) : <><span>{t(v.duration)}</span><span>{t(v.hours)}</span></>}
      </div>
      <div className="poster-card">
        <div className="poster-h">{t({ nl: "Wat je gaat doen", en: "What you will do" })}</div>
        <ul>{tasks.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
        <div className="poster-h">{t(asksTitle ?? { nl: "Wat we zoeken", en: "What we look for" })}</div>
        <ul>{asks.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
      </div>
      <div className="poster-foot">
        <div>
          <div className="poster-url">www.productiveswitch.nl/jobs</div>
          <div className="poster-url">douwe@productiveswitch.nl</div>
        </div>
      </div>
    </div>
  );
}
