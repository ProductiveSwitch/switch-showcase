"use client";

import Link from "next/link";
import styles from "@/app/vision/vision.module.css";
import { useLang } from "./LangContext";

export function VisionContent() {
  const { lang, t } = useLang();

  const beliefs = [
    {
      title: {
        nl: "Reorganiseren is geen falen, wegkijken wel.",
        en: "Restructuring is not failure. Looking away is.",
      },
      body: {
        nl: "Werkgevers verdienen de ruimte om meer met minder te doen, op één voorwaarde: dat ze zich inspannen om hun mensen goed te laten landen. Die ruimte organiseren wij.",
        en: "Employers deserve the room to do more with less, on one condition: that they make the effort to let their people land well. We organise that room.",
      },
    },
    {
      title: {
        nl: "Werk mag niet vastzitten aan een diploma.",
        en: "Work should not be locked to a diploma.",
      },
      body: {
        nl: "Tekortsectoren moeten instappen makkelijk maken: korte, erkende leertrajecten en leren op de werkvloer. Wij bouwen die routes met opleiders en werkgevers.",
        en: "Shortage sectors have to make entry easy: short, accredited learning tracks and learning on the job. We build those routes with training providers and employers.",
      },
    },
    {
      title: {
        nl: "Mensen kiezen, wij geven richting.",
        en: "People choose, we give direction.",
      },
      body: {
        nl: "Geen reflectietrajecten van maanden, maar een concreet aanbod: dit zijn de routes, dit is wat ze vragen, dit is waar je over vier weken staat.",
        en: "No months of reflection exercises, but a concrete offer: these are the routes, this is what they ask of you, this is where you'll stand in four weeks.",
      },
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>{t({ nl: "Onze visie", en: "Our vision" })}</div>
          <h1>
            {t({
              nl: "Van werk dat verandert naar werk waar vraag naar is.",
              en: "From work that is changing to work that is in demand.",
            })}
          </h1>
          <p className={styles.lead}>
            {t({
              nl: "Nederland gaat door drie verschuivingen tegelijk: AI verandert wat kantoorwerk is, de energietransitie vraagt om vakmensen, en de zorg om handen en aandacht. Die verschuivingen zijn nu elkaars probleem. Productive Switch maakt ze elkaars oplossing: wij helpen mensen van wie het werk verandert de overstap maken naar werk waar de arbeidsmarkt om zit te springen.",
              en: "The Netherlands is going through three shifts at once: AI is changing what office work is, the energy transition is calling for skilled trades, and care needs hands and attention. Right now those shifts are each other's problem. Productive Switch makes them each other's solution: we help people whose work is changing move into work the labour market is crying out for.",
            })}
          </p>
        </section>

        <article className={styles.article}>
          <h2>{t({ nl: "Drie overtuigingen", en: "Three convictions" })}</h2>
          <div className={styles.beliefs}>
            {beliefs.map((b, i) => (
              <div className={styles.belief} key={i}>
                <span className={styles.beliefNum}>0{i + 1}</span>
                <div>
                  <h3>{t(b.title)}</h3>
                  <p>{t(b.body)}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>{t({ nl: "Het anker", en: "The anchor" })}</h2>
          <div className={styles.pull}>
            {lang === "nl" ? (
              <span className={styles.anchor}>Leren om te blijven leren.</span>
            ) : (
              <span className={styles.anchor}>Learning to keep learning.</span>
            )}
          </div>
          <p>
            {t({
              nl: "Een functieomschrijving kan over een half jaar anders zijn. Blijvend inzetbaar zijn betekent blijven leren, met technologie in plaats van ertegen.",
              en: "A job description can look different in six months. Staying employable means continuing to learn, with technology rather than against it.",
            })}
          </p>

          <h2>{t({ nl: "De zin waar we altijd op terugvallen", en: "The sentence we always fall back on" })}</h2>
          <p>
            {t({
              nl: "We staan HR-leiders aan beide kanten van de cyclus bij: mensen vinden als je aanneemt, en je mensen goed laten landen als je reorganiseert.",
              en: "We stand beside HR leaders on both sides of the cycle: finding people when you hire, and letting your people land well when you restructure.",
            })}
          </p>
        </article>

        <section className={styles.ctaBand}>
          <h2>{t({ nl: "Benieuwd hoe dit voor jouw mensen werkt?", en: "Curious how this works for your people?" })}</h2>
          <Link href="/#contact" className={styles.btn}>
            {t({ nl: "Kom in contact", en: "Get in touch" })}
          </Link>
        </section>
      </div>
    </div>
  );
}
