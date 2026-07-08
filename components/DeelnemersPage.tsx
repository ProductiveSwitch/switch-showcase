/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { destinations } from "@/lib/data";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { Modal, KoffieForm } from "./Forms";

const pillarColors = ["var(--col-tech)", "var(--col-social)", "var(--col-domain)"];

export function DeelnemersPage() {
  const { lang, t } = useLang();
  const [koffieOpen, setKoffieOpen] = useState(false);
  useReveal();

  return (
    <main className="subpage">
      <div className="wrap">
        <section className="page-head">
          <div className="eyebrow">{t({ nl: "Voor deelnemers", en: "For participants" })}</div>
          <h1>{t({ nl: "Jouw vak verandert. Jij groeit mee.", en: "Your work is changing. You grow with it." })}</h1>
          <p className="lede">
            {t({
              nl: "Verandert je functie of verdwijnt je rol? Dat voelt als een streep, maar het is vaker een start. Met een kort, erkend traject en persoonlijke begeleiding help je jezelf naar werk waar de vraag juist groeit. Kies hieronder de richting die bij je past.",
              en: "Is your role changing or disappearing? It can feel like an ending, but more often it's a start. With a short, accredited path and personal guidance you move toward work where demand is actually growing. Pick the direction that fits you below.",
            })}
          </p>
        </section>

        {/* Three fields of study */}
        <section className="section reveal">
          <div className="section-head">
            <h2>{t({ nl: "Drie opleidingsvelden", en: "Three fields of study" })}</h2>
            <p>
              {t({
                nl: "Elk veld heeft een eigen aanbod van korte, erkende cursussen. Bekijk wat past, filter op duur, vorm en prijs, en zie meteen waar je kunt beginnen.",
                en: "Each field has its own catalogue of short, accredited courses. See what fits, filter by length, format and price, and spot where you can start right away.",
              })}
            </p>
          </div>

          <div className="pillars stagger">
            {destinations.map((d, i) => (
              <Link
                key={d.id}
                className="pillar"
                href={`/richtingen/${d.slug}`}
                style={{ "--pc": pillarColors[i] } as React.CSSProperties}
              >
                <img className="pillar-photo" src={d.photo} alt="" loading="lazy" />
                <span className="pillar-shade" aria-hidden="true" />
                <span className="pillar-body">
                  <span className="pillar-num">{d.num}</span>
                  <span className="pillar-title">{t(d.label)}</span>
                  <span className="pillar-sub">{t(d.sub)}</span>
                  <span className="pillar-chev" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Guidance reassurance + soft CTA */}
        <section className="reveal">
          <div className="cta-band">
            <div>
              <h2>{t({ nl: "Je staat er niet alleen voor", en: "You're not on your own" })}</h2>
              <p>
                {t({
                  nl: "Twijfel je welke richting bij je past? Een loopbaancoach denkt met je mee, van de eerste vraag tot een concreet plan. Drink eerst gewoon eens koffie, zonder verplichting.",
                  en: "Not sure which direction fits you? A career coach thinks along with you, from the first question to a concrete plan. Grab a coffee first, no obligation.",
                })}
              </p>
            </div>
            <button className="btn btn-switch btn-lg" onClick={() => setKoffieOpen(true)}>
              {t({ nl: "Even koffie drinken", en: "Grab a coffee" })}
            </button>
          </div>
        </section>
      </div>

      <Modal
        open={koffieOpen}
        onClose={() => setKoffieOpen(false)}
        title={t({ nl: "Even koffie drinken", en: "Grab a coffee" })}
        intro={t({
          nl: "Nog geen plannen, wel benieuwd? Laten we koffie drinken. Kennismaken, sparren, vragen stellen.",
          en: "No plans yet, but curious? Let's grab a coffee. Meet, spar, ask anything.",
        })}
      >
        <KoffieForm lang={lang} onClose={() => setKoffieOpen(false)} />
      </Modal>
    </main>
  );
}
