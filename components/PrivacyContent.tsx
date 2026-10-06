"use client";

import { useLang } from "./LangContext";
import { company } from "@/lib/data";

// Privacyverklaring (oktober 2026). Beschrijft wat de site nu echt doet:
// formulieren en cv-uploads gaan per e-mail naar het centrale adres (via
// Resend of het mailprogramma van de bezoeker), er is geen database en geen
// accountsysteem. Aanpassen zodra dat verandert.
export function PrivacyContent() {
  const { lang } = useLang();
  const nl = lang === "nl";
  const kvk = company.kvk ? ` KvK ${company.kvk}.` : "";
  const adres = company.address ? ` ${company.address}.` : "";

  const blocks: { h: string; p: string[] }[] = nl
    ? [
        {
          h: "Wie wij zijn",
          p: [
            `Deze verklaring gaat over de website productiveswitch.nl van ${company.name}.${kvk}${adres} Vragen over privacy kun je sturen naar ${company.email}.`,
          ],
        },
        {
          h: "Welke gegevens we verwerken",
          p: [
            "Alleen wat je zelf invult of meestuurt: je naam, e-mailadres, telefoonnummer, organisatie en de antwoorden in het contact- of intakeformulier. Stuur je een cv, dan verwerken we de gegevens die daarin staan.",
            "De website gebruikt geen trackingcookies en geen advertentienetwerken. Je taalvoorkeur (Nederlands of Engels) wordt lokaal in je browser bewaard en komt niet bij ons terecht.",
          ],
        },
        {
          h: "Waarvoor en op welke grond",
          p: [
            "We gebruiken je gegevens om op je bericht te reageren, een intake of kennismaking in te plannen, en, als je je als deelnemer, loopbaancoach of opleider aanmeldt, om die aanmelding op te volgen. De grondslag is de uitvoering van de overeenkomst die je met ons wilt aangaan of ons gerechtvaardigd belang om op je verzoek te reageren. Voor een cv is de grondslag je toestemming; die kun je intrekken door ons te mailen.",
          ],
        },
        {
          h: "Hoe de gegevens bij ons komen",
          p: [
            "Formulieren op de site worden per e-mail naar ons verzonden. Daarvoor gebruiken we een e-maildienst (Resend) of, als die niet beschikbaar is, het mailprogramma op je eigen apparaat. De website wordt gehost door Vercel. Deze partijen verwerken gegevens in onze opdracht; we delen je gegevens verder niet met derden, tenzij we daar wettelijk toe verplicht zijn.",
            "Er is nog geen deelnemersomgeving met accounts. Een aanmelding als deelnemer komt op dezelfde manier per e-mail bij ons binnen.",
          ],
        },
        {
          h: "Bewaartermijn",
          p: [
            "We bewaren contactverzoeken en intakegegevens zolang dat nodig is om je verzoek af te handelen en maximaal twee jaar daarna. Cv's bewaren we maximaal een jaar na ontvangst, of korter als je dat vraagt.",
          ],
        },
        {
          h: "Je rechten",
          p: [
            `Je hebt recht op inzage, correctie en verwijdering van je gegevens, en je kunt bezwaar maken tegen de verwerking. Mail daarvoor naar ${company.email}. Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.`,
          ],
        },
        {
          h: "Wijzigingen",
          p: ["Deze verklaring is van oktober 2026. Als de website verandert, bijvoorbeeld met een deelnemersomgeving, passen we de verklaring aan."],
        },
      ]
    : [
        {
          h: "Who we are",
          p: [
            `This statement covers the website productiveswitch.nl of ${company.name}.${kvk}${adres} Privacy questions can be sent to ${company.email}.`,
          ],
        },
        {
          h: "What we process",
          p: [
            "Only what you enter or send yourself: your name, email address, phone number, organisation and the answers in the contact or intake form. If you send a CV, we process the data it contains.",
            "The website uses no tracking cookies and no advertising networks. Your language preference (Dutch or English) is stored locally in your browser and never reaches us.",
          ],
        },
        {
          h: "Why, and on what basis",
          p: [
            "We use your data to respond to your message, to plan an intake or introduction, and, if you sign up as a participant, career coach or training provider, to follow up on that sign-up. The legal basis is the performance of the agreement you want to enter into with us, or our legitimate interest in responding to your request. For a CV the basis is your consent, which you can withdraw by emailing us.",
          ],
        },
        {
          h: "How the data reaches us",
          p: [
            "Forms on the site are sent to us by email. For this we use an email service (Resend) or, when unavailable, the mail app on your own device. The website is hosted by Vercel. These parties process data on our behalf; we do not share your data with other third parties unless legally required.",
            "There is no participant environment with accounts yet. A participant sign-up reaches us by email in the same way.",
          ],
        },
        {
          h: "Retention",
          p: [
            "We keep contact requests and intake data for as long as needed to handle your request and for at most two years after that. CVs are kept for at most one year after receipt, or shorter if you ask.",
          ],
        },
        {
          h: "Your rights",
          p: [
            `You have the right to access, correct and delete your data, and to object to the processing. Email ${company.email} to do so. If you disagree with how we handle your data, you can file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).`,
          ],
        },
        {
          h: "Changes",
          p: ["This statement dates from October 2026. If the website changes, for example with a participant environment, we will update it."],
        },
      ];

  return (
    <main className="subpage">
      <div className="wrap">
        <section className="page-head">
          <div className="eyebrow">{nl ? "Privacy" : "Privacy"}</div>
          <h1>{nl ? "Privacyverklaring" : "Privacy statement"}</h1>
          <p className="lede">
            {nl
              ? "Kort en zonder kleine lettertjes: wat we met je gegevens doen als je ons via deze website iets stuurt."
              : "Short and without small print: what we do with your data when you send us something through this website."}
          </p>
        </section>
        <article className="post post--full legal">
          {blocks.map((b) => (
            <section key={b.h}>
              <h3>{b.h}</h3>
              {b.p.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
