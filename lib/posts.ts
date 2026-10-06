import type { Bi } from "./data";

const bi = (nl: string, en: string): Bi => ({ nl, en });

export interface Post {
  slug: string;
  date: Bi;
  title: Bi;
  teaser: Bi;
  body: Bi;
  /** optional photo shown under the text, path in /public */
  image?: string;
  imageAlt?: Bi;
}

// Blogs. Eerste stuk: de start van Productive Switch (oktober 2026). Nieuwe
// stukken bovenaan toevoegen; ze verschijnen op /blog, op /vision en als /blog/[slug].
export const posts: Post[] = [
  {
    slug: "een-nieuwe-start",
    date: bi("Oktober 2026", "October 2026"),
    title: bi("Een nieuwe start", "A new start"),
    teaser: bi(
      "Vandaag ben ik officieel voor mezelf begonnen. Productive Switch is gebouwd rond één vraag: wat moet je veranderen om productief te blijven in een tijd waarin AI en robotica het werk in hoog tempo automatiseren?",
      "Today I officially started working for myself. The company is called Productive Switch and is built around one question: what do you need to change to stay productive in an era where AI and robotics bring rapid automation?"
    ),
    body: bi(
      "Vandaag ben ik officieel voor mezelf begonnen. Het bedrijf heet Productive Switch, en het is gebouwd rond één vraag die ik mezelf de afgelopen tijd steeds vaker stelde: wat moet ik veranderen om productief te blijven in een tijd waarin AI en robotica het werk in hoog tempo automatiseren?\n\n## Waarom nu\n\nElke functie verandert, en veel functies verdwijnen. Dat is geen voorspelling meer, het is zichtbaar in de cijfers. De grote opgave van de komende jaren is om de mensen die dat raakt productief te houden, in andere delen van de economie waar de vraag juist blijft.\n\nDie opgave landt grotendeels bij HR. De HR-functie krijgt in mijn ogen niet altijd de waardering die ze verdient, maar haar strategische gewicht groeit snel. Twee onderwerpen komen in het bijzonder op het bord van HR-leiders terecht: de organisatie door de transformatie leiden, en medewerkers van wie de functie verdwijnt naar nieuw werk begeleiden.\n\n## Wat Productive Switch doet\n\nOp beide fronten wil ik HR-leiders ondersteunen, met twee diensten onder één naam.\n\nProductive Search: werving van senior HR-professionals, vast en interim, die zo'n transformatie kunnen leiden.\n\nProductive Switch: outplacement dat medewerkers van wie de functie verdwijnt helpt de overstap te maken naar ander werk. Kort, erkend en met een werkgever aan het eind.\n\n## Kom in gesprek\n\nBen je een HR-leider met een transformatie voor de boeg, of een senior HR-professional die openstaat voor een gesprek? Ik hoor graag van je.\n\nDe komende weken deel ik hier meer van mijn kijk op dit onderwerp, en van wat ik onderweg leer.",
      "Today I officially started working for myself. The company is called Productive Switch, and it is built around one question I kept asking myself over the past months: what do I need to change to stay productive in an era where AI and robotics automate work at speed?\n\n## Why now\n\nEvery job is changing, and many jobs are disappearing. That is no longer a forecast; it shows in the numbers. The big task of the coming years is keeping the people affected productive, in other parts of the economy where demand remains.\n\nThat task lands largely with HR. In my view the HR function does not always get the recognition it deserves, but its strategic weight is growing fast. Two topics in particular land on the desk of HR leaders: guiding the organisation through its transformation, and guiding employees whose roles disappear towards new work.\n\n## What Productive Switch does\n\nOn both fronts I want to support HR leaders, with two services under one name.\n\nProductive Search: recruitment of senior HR professionals, permanent and interim, who can lead that transformation.\n\nProductive Switch: outplacement that helps employees whose roles disappear make the switch to a different line of work. Short, recognised, and with an employer at the end.\n\n## Let's talk\n\nAre you an HR leader with a transformation ahead, or a senior HR professional open to a conversation? I would love to hear from you.\n\nIn the coming weeks I will share more of my views here, and what I learn along the way."
    ),
    image: "/blog/een-nieuwe-start.jpg",
    imageAlt: bi("Douwe, oprichter van Productive Switch", "Douwe, founder of Productive Switch"),
  },
];
