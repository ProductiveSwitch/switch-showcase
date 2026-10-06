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
      "Vandaag ben ik officieel voor mezelf begonnen. Het bedrijf heet Productive Switch en is gebouwd rond één vraag: wat moet je veranderen om productief te blijven in een tijd waarin AI en robotica zorgen voor snelle automatisering?",
      "Today I officially started working for myself. The company is called Productive Switch and is built around one question: what do you need to change to stay productive in an era where AI and robotics bring rapid automation?"
    ),
    body: bi(
      "Vandaag begint een periode waar ik al een tijd naar uitkijk, en die me veel energie geeft: ik ben officieel voor mezelf begonnen.\n\nHet bedrijf dat ik start heet Productive Switch.\n\nMijn keuze kwam vooral voort uit een vraag waar veel mensen mee worstelen: wat moet ik veranderen om productief te blijven in een tijd waarin AI en robotica zorgen voor snelle automatisering? Mijn eigen antwoord was: voor mezelf beginnen, en een bedrijf bouwen rond precies die vraag.\n\nWat vaststaat, is dat elke functie verandert en dat veel functies verdwijnen. De mensen die dat raakt productief houden in andere delen van de economie wordt een van de grootste opgaven van deze tijd. Dat geeft de HR-functie, die in mijn ogen niet altijd de waardering krijgt die ze verdient, een groeiend strategisch gewicht.\n\nTwee onderwerpen komen in het bijzonder op het bord van HR-leiders terecht: de organisatie door de transformatie leiden, en medewerkers van wie de functie verdwijnt naar nieuw werk begeleiden. Op beide wil ik ze ondersteunen.\n\nProductive Search: werving van senior HR-professionals, vast en interim, die zo'n transformatie kunnen leiden.\n\nProductive Switch: outplacement dat die medewerkers helpt de overstap te maken naar ander werk.\n\nBen je een HR-leider met een transformatie voor de boeg, of een senior HR-professional die openstaat voor een gesprek? Ik hoor graag van je.\n\nDe komende weken deel ik meer van mijn kijk op dit onderwerp en van wat ik onderweg leer.",
      "Today marks the start of a period I have anticipated for some time, and one that excites me a lot: I have officially started working for myself.\n\nThe company I am starting is called Productive Switch.\n\nMy decision was mainly driven by a question many people are grappling with: what do I need to change to stay productive in an era where AI and robotics bring rapid automation? My own answer was to start for myself, and to build a company around that same question.\n\nWhat seems certain is that every job will change and many will disappear. Keeping the people affected productive in other parts of the economy will be one of the main challenges of our time. That gives the HR function, which in my view does not always get the recognition it deserves, growing strategic importance.\n\nTwo topics in particular will land on the desk of HR leaders: guiding the organisation through its transformation, and guiding the employees whose roles disappear towards new work. I aim to support them on both.\n\nProductive Search: recruitment of senior HR professionals, permanent and interim, who can lead that transformation.\n\nProductive Switch: outplacement that supports those employees in making the switch to a different line of work.\n\nAre you an HR leader with a transformation ahead, or a senior HR professional open to a conversation? I would love to hear from you.\n\nIn the coming weeks I will share more of my views and what I learn along the way."
    ),
    image: "/blog/een-nieuwe-start.jpg",
    imageAlt: bi("Douwe, oprichter van Productive Switch", "Douwe, founder of Productive Switch"),
  },
];
