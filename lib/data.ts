// Placeholder data for Productive Switch + Productive Hire.
// Bilingual fields hold [nl, en]. Swap freely; the structure stays.

export type Lang = "nl" | "en";
export type Bi = { nl: string; en: string };

const bi = (nl: string, en: string): Bi => ({ nl, en });

export interface CuratedProgramme {
  org: string;
  course: string;
  certified: boolean;
  duration: Bi;
}

export interface MakerProgramme {
  by: Bi;
  course: string;
  rating: string;
  reviews: string;
}

export interface Destination {
  id: string;
  num: string;
  label: Bi;
  sub: Bi;
  photo: string;
  curated: CuratedProgramme[];
  makers: MakerProgramme[];
}

export const destinations: Destination[] = [
  {
    id: "dest-1",
    num: "01",
    label: bi("Word productiever in je huidige domein", "Grow more productive in your current field"),
    sub: bi("Verdiep je vakkennis en blijf voorop lopen.", "Deepen your expertise and stay ahead."),
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
    curated: [
      { org: "Universiteit van Amsterdam", course: "Data & AI Fundamentals", certified: true, duration: bi("12 weken", "12 weeks") },
      { org: "Delft Topinstituut", course: "Systems Engineering Basis", certified: true, duration: bi("8 weken", "8 weeks") },
    ],
    makers: [
      { by: bi("door Jelle Roodenburg", "by Jelle Roodenburg"), course: "Machine Learning van Nul", rating: "★ 4.8", reviews: "(203)" },
      { by: bi("door Sofie Klaassen", "by Sofie Klaassen"), course: "API Design voor Beginners", rating: "★ 4.6", reviews: "(87)" },
    ],
  },
  {
    id: "dest-2",
    num: "02",
    label: bi("Switch naar de techniek", "Switch to the trades"),
    sub: bi("Praktisch, ambachtelijk werk met blijvende vraag.", "Practical, hands-on work with lasting demand."),
    photo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1100&q=80",
    curated: [
      { org: "HAN University", course: "Ergonomie & Bewegingsleer", certified: true, duration: bi("10 weken", "10 weeks") },
      { org: "Vakschool Schoonhoven", course: "Precisieambacht & Craftmanship", certified: true, duration: bi("16 weken", "16 weeks") },
    ],
    makers: [
      { by: bi("door Ruben Brands", "by Ruben Brands"), course: "Functionele Kracht Basics", rating: "★ 4.5", reviews: "(64)" },
      { by: bi("door Lena Posthuma", "by Lena Posthuma"), course: "Houding & Ademwerk", rating: "★ 4.8", reviews: "(156)" },
    ],
  },
  {
    id: "dest-3",
    num: "03",
    label: bi("Switch naar het sociaal domein", "Switch to the social sector"),
    sub: bi("Werk met mensen, in de zorg en daarbuiten.", "Work with people, in care and beyond."),
    photo: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1100&q=80",
    curated: [
      { org: "Erasmus School of Social", course: "Conflicthantering & Mediation", certified: true, duration: bi("6 weken", "6 weeks") },
      { org: "Nyenrode Business", course: "Leiderschap onder druk", certified: false, duration: bi("4 weken", "4 weeks") },
    ],
    makers: [
      { by: bi("door Miriam Aerts", "by Miriam Aerts"), course: "Spreken met impact", rating: "★ 4.9", reviews: "(341)" },
      { by: bi("door Thomas Huizinga", "by Thomas Huizinga"), course: "Deep Listening in Teams", rating: "★ 4.7", reviews: "(112)" },
    ],
  },
];

export interface Partner {
  initials: string;
  color: string;
  name: string;
}

export const partners: Partner[] = [
  { initials: "UvA", color: "#2D5A6B", name: "Universiteit van Amsterdam" },
  { initials: "HAN", color: "#BC5B38", name: "HAN University" },
  { initials: "ERA", color: "#3E6B47", name: "Erasmus" },
  { initials: "NYE", color: "#2B4C8C", name: "Nyenrode" },
  { initials: "DTI", color: "#1B4F5E", name: "Delft Topinstituut" },
  { initials: "VSS", color: "#9E4B2E", name: "Vakschool Schoonhoven" },
];

// ----- How it works (Switch) -----
export interface Step {
  num: string;
  title: Bi;
  body: Bi;
}

export const howItWorks: Step[] = [
  {
    num: "01",
    title: bi("Intake en advies", "Intake and guidance"),
    body: bi(
      "We starten met een gesprek, bij voorkeur met een erkende loopbaancoach. Samen bepalen we welke richting bij je medewerker past en wat haalbaar is.",
      "We start with a conversation, ideally with a certified career coach. Together we map which direction fits your employee and what's realistic."
    ),
  },
  {
    num: "02",
    title: bi("Omscholing bij erkende opleiders", "Re-training with accredited providers"),
    body: bi(
      "De intake stuurt direct naar een kort, erkend traject bij universiteiten, hogescholen, ROC's of erkende private opleiders. Gericht op het nieuwe vak, niet op een algemeen programma.",
      "The intake routes straight to a short, accredited path at universities, colleges, vocational schools or recognised private providers. Aimed at the new trade, not a generic programme."
    ),
  },
  {
    num: "03",
    title: bi("Directe lijn naar werkgevers", "A direct line to employers"),
    body: bi(
      "We verbinden de omscholing aan werkgevers in sectoren die mensen tekortkomen. In zorg en techniek kijken werkgevers soms al tijdens het traject mee.",
      "We connect the re-training to employers in sectors that are short of people. In care and the trades, employers sometimes already look on during the path."
    ),
  },
  {
    num: "04",
    title: bi("Begeleiding tot de landing", "Guidance until they land"),
    body: bi(
      "We blijven naast je medewerker staan tot het nieuwe werk er echt is. Die begeleiding is het verschil met een kaal lijstje cursussen.",
      "We stay alongside your employee until the new work is genuinely there. That guidance is the difference from a bare list of courses."
    ),
  },
];

// ----- Financing sources (Voor HR) -----
export interface FinanceSource {
  title: Bi;
  body: Bi;
  tag: Bi;
}

export const financeSources: FinanceSource[] = [
  {
    title: bi("Transitiebudget", "Transition budget"),
    tag: bi("Fiscaal gunstig", "Tax-friendly"),
    body: bi(
      "Besteed je de transitievergoeding aan omscholing naar een ander vakgebied, dan is dat fiscaal gunstiger dan uitkeren als cash. Het voelt als herbesteed geld, niet als nieuwe kosten.",
      "Spend the transition payment on re-training toward a different field and it's more tax-friendly than paying it out as cash. It feels like money redirected, not a new expense."
    ),
  },
  {
    title: bi("Cao- en O&O-budgetten", "Collective and sector funds"),
    tag: bi("Vaak al beschikbaar", "Often already there"),
    body: bi(
      "Veel cao's en O&O-fondsen kennen reguliere, fiscaal voordelige trainingsbudgetten. Die zetten we in waar ze er zijn.",
      "Many collective agreements and sector funds hold regular, tax-advantaged training budgets. We put those to work where they exist."
    ),
  },
  {
    title: bi("SLIM-scholingssubsidie", "SLIM training subsidy"),
    tag: bi("We regelen de aanvraag", "We handle the application"),
    body: bi(
      "Voor cruciale sectoren (techniek, zorg en welzijn, onderwijs, ICT, bouw, energie) dekt SLIM een deel van de opleidingskosten. We kijken of je in aanmerking komt en regelen de aanvraag. Budget en tijdvakken zijn beperkt, dus een garantie is het niet.",
      "For crucial sectors (trades, care and welfare, education, ICT, construction, energy) SLIM covers part of the training costs. We check whether you qualify and handle the application. Budget and windows are limited, so it isn't a guarantee."
    ),
  },
];

// ----- Intake flow options -----
export const intakeDirections: { key: string; label: Bi }[] = [
  { key: "domein", label: bi("Blijf in je eigen domein", "Stay in your own field") },
  { key: "sociaal", label: bi("Sociaal domein (zorg, welzijn, onderwijs)", "Social sector (care, welfare, education)") },
  { key: "techniek", label: bi("Hands-on en techniek", "Hands-on and trades") },
  { key: "onbekend", label: bi("Weet ik nog niet", "Not sure yet") },
];

export const intakeEmployeeBands: { key: string; label: Bi }[] = [
  { key: "1", label: bi("1 medewerker", "1 employee") },
  { key: "2-5", label: bi("2 tot 5", "2 to 5") },
  { key: "6-15", label: bi("6 tot 15", "6 to 15") },
  { key: "15+", label: bi("15 of meer", "15 or more") },
];

export const intakeBudgets: { key: string; label: Bi }[] = [
  { key: "transitie", label: bi("Transitiebudget", "Transition budget") },
  { key: "cao", label: bi("Cao- of O&O-trainingsbudget", "Collective or sector training budget") },
  { key: "onbekend", label: bi("Weet ik nog niet", "Not sure yet") },
];

export const intakeTimelines: { key: string; label: Bi }[] = [
  { key: "kort", label: bi("Binnen 3 maanden", "Within 3 months") },
  { key: "midden", label: bi("3 tot 6 maanden", "3 to 6 months") },
  { key: "later", label: bi("Later, nog aan het oriënteren", "Later, still orienting") },
];

export type VacancyCategory = "leadership" | "transition" | "advies";

export interface Vacancy {
  category: VacancyCategory;
  role: Bi;
  org: Bi;
  tags: Bi[];
  salary: string;
  subject: string;
}

export const vacancyFilters: { key: "all" | VacancyCategory; label: Bi }[] = [
  { key: "all", label: bi("Alle rollen", "All roles") },
  { key: "leadership", label: bi("HR-leiderschap", "HR leadership") },
  { key: "transition", label: bi("Werktransitie", "Workforce transition") },
  { key: "advies", label: bi("Advies", "Counsel") },
];

export const vacancies: Vacancy[] = [
  {
    category: "leadership",
    role: bi("HR-directeur", "HR Director"),
    org: bi("Internationale maakindustrie · Eindhoven", "International manufacturing · Eindhoven"),
    tags: [bi("Fulltime", "Full-time"), bi("Vast", "Permanent"), bi("Hybride", "Hybrid")],
    salary: "€ 9.000 – 12.000",
    subject: "HR-directeur",
  },
  {
    category: "transition",
    role: bi("Lead Werktransitie & L&D", "Lead Workforce Transition & L&D"),
    org: bi("Financiële dienstverlener · Utrecht", "Financial services · Utrecht"),
    tags: [bi("Fulltime", "Full-time"), bi("Interim", "Interim"), bi("Op locatie", "On-site")],
    salary: "€ 7.500 – 9.500",
    subject: "Lead Werktransitie",
  },
  {
    category: "leadership",
    role: bi("HR Business Partner", "HR Business Partner"),
    org: bi("Scale-up in tech · Amsterdam", "Tech scale-up · Amsterdam"),
    tags: [bi("32–40 uur", "32–40 hrs"), bi("Vast", "Permanent"), bi("Hybride", "Hybrid")],
    salary: "€ 5.500 – 7.000",
    subject: "HR Business Partner",
  },
  {
    category: "advies",
    role: bi("Adviseur Arbeidsrecht", "Employment Law Counsel"),
    org: bi("Advieskantoor · Rotterdam", "Advisory firm · Rotterdam"),
    tags: [bi("Fulltime", "Full-time"), bi("Vast", "Permanent"), bi("Hybride", "Hybrid")],
    salary: "€ 6.500 – 8.500",
    subject: "Adviseur Arbeidsrecht",
  },
];
