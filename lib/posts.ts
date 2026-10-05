import type { Bi } from "./data";

const bi = (nl: string, en: string): Bi => ({ nl, en });

export interface Post {
  slug: string;
  date: Bi;
  title: Bi;
  teaser: Bi;
  body: Bi;
}

// Blogs. Eerste stuk oktober 2026, aanzet van Douwe; uitbreiden per stuk.
export const posts: Post[] = [
  {
    slug: "omscholing-belangrijker-dan-ooit",
    date: bi("Oktober 2026", "October 2026"),
    title: bi("Omscholing is belangrijker dan ooit", "Re-training matters more than ever"),
    teaser: bi(
      "In een exponentiële verandercurve zijn snelheid en flexibiliteit belangrijk. Langdradige reflectietrajecten moeten worden ingekort.",
      "On an exponential curve of change, speed and flexibility matter. Long-winded reflection tracks have to be shortened."
    ),
    body: bi(
      "Werk verandert sneller dan de meeste trajecten die mensen van werk naar werk moeten helpen. Een outplacementtraject van zes tot twaalf maanden was ontworpen voor een arbeidsmarkt die stilstond terwijl iemand nadacht. Die arbeidsmarkt bestaat niet meer.\n\nWat wel werkt: snel starten, de eerste weken gebruiken om concreet te worden, en de reflectie koppelen aan een echt aanbod. Dit zijn de routes, dit is wat ze vragen, dit is waar je over vier weken staat. Zorgvuldig, maar niet langdradig.\n\nMeer volgt.",
      "Work is changing faster than most of the tracks meant to move people from job to job. An outplacement track of six to twelve months was designed for a labour market that stood still while someone thought things over. That labour market no longer exists.\n\nWhat does work: start fast, use the first weeks to get concrete, and tie reflection to a real offer. These are the routes, this is what they ask, this is where you stand in four weeks. Careful, but not long-winded.\n\nMore to follow."
    ),
  },
];
