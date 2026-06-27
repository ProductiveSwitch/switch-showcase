import type { Metadata } from "next";
import Link from "next/link";
import styles from "./vision.module.css";

export const metadata: Metadata = {
  title: "Onze visie, Productive Switch",
  description:
    "Waarom Productive Switch bestaat: werk geeft mensen richting, en functies blijven veranderen. Korte, erkende omscholing bouwt de brug naar werk met blijvende vraag.",
};

export default function VisionPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            Productive<span className={styles.dot}>·</span>Switch
          </div>
          <Link href="/" className={styles.back}>
            ← <span>Terug</span>
          </Link>
        </div>
      </header>

      <div className={styles.wrap}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>Onze visie</div>
          <h1>Werk geeft mensen richting. Daar bouwen we omheen.</h1>
          <p className={styles.lead}>
            De komende jaren draaien om één vraag: hoe houden we mensen productief en gewaardeerd in een
            economie die blijft veranderen?
          </p>
        </section>

        <article className={styles.article}>
          <p>
            Een functie kan er over een half jaar anders uitzien. Dat is geen bedreiging, het is gewoon hoe
            werk nu beweegt. Wie meebeweegt, blijft van waarde. En meebewegen lukt het beste door technologie
            te gebruiken in plaats van te vrezen.
          </p>

          <div className={styles.pull}>
            Daarom draait alles bij ons om één ding:{" "}
            <span className={styles.anchor}>leren om te blijven leren.</span>
          </div>

          <h2>Er is blijvende vraag naar mensen</h2>
          <p>
            Tegelijk is er werk dat niet verdwijnt. In de techniek, en in sectoren waar mensen voor mensen
            zorgen, blijven de tekorten groot en komt automatisering langzaam binnen.
          </p>
          <div className={styles.sectors}>
            <span>Ouderenzorg</span>
            <span>GGZ</span>
            <span>Jeugdzorg</span>
            <span>Onderwijs</span>
            <span>Techniek</span>
          </div>

          <h2>De brug die we bouwen</h2>
          <p>
            De stap naar dat werk is mogelijk. Maar alleen als we werk loskoppelen van een vast
            opleidingsniveau, en als korte, gerichte cursussen de vaardigheden opbouwen die nog missen. Dat is
            precies wat wij doen: kort, erkend, en op een tempo dat naast iemands leven past.
          </p>

          <h2>Eén netwerk, beide kanten van de cyclus</h2>
          <p>
            We staan HR-leiders aan beide kanten bij: mensen vinden als je aanneemt, en je mensen goed laten
            landen als je reorganiseert. Wie zijn baan verliest is niet een probleem dat je oplost, maar iemand
            die met de juiste stap weer van waarde wordt. Met durf, en een paar nieuwe vaardigheden die wij
            helpen opbouwen.
          </p>
        </article>

        <section className={styles.ctaBand}>
          <h2>Benieuwd hoe dit voor jouw mensen werkt?</h2>
          <Link href="/#contact" className={styles.btn}>
            Boek een walkthrough
          </Link>
        </section>
      </div>

      <footer className={styles.footer}>
        <div>© 2026 Productive Switch. Omscholing en werving voor HR-leiders.</div>
      </footer>
    </div>
  );
}
