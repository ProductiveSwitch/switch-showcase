// Placeholder data for Productive Switch + Productive Search.
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
  slug: string;
  num: string;
  label: Bi;
  sub: Bi;
  photo: string;
  curated: CuratedProgramme[];
  makers: MakerProgramme[];
}

export const destinations: Destination[] = [
  {
    id: "dest-2",
    slug: "techniek",
    num: "01",
    label: bi("Switch naar de techniek", "Switch to the trades"),
    sub: bi("Praktisch, ambachtelijk werk met blijvende vraag.", "Practical, hands-on work with lasting demand."),
    photo: "/photos/richting-techniek.jpg",
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
    slug: "sociaal",
    num: "02",
    label: bi("Switch naar het sociaal domein", "Switch to the social sector"),
    sub: bi("Werk met mensen, in de zorg en daarbuiten.", "Work with people, in care and beyond."),
    photo: "/photos/richting-sociaal.jpg",
    curated: [
      { org: "Erasmus School of Social", course: "Conflicthantering & Mediation", certified: true, duration: bi("6 weken", "6 weeks") },
      { org: "Nyenrode Business", course: "Leiderschap onder druk", certified: false, duration: bi("4 weken", "4 weeks") },
    ],
    makers: [
      { by: bi("door Miriam Aerts", "by Miriam Aerts"), course: "Spreken met impact", rating: "★ 4.9", reviews: "(341)" },
      { by: bi("door Thomas Huizinga", "by Thomas Huizinga"), course: "Deep Listening in Teams", rating: "★ 4.7", reviews: "(112)" },
    ],
  },
  {
    id: "dest-1",
    slug: "eigen-vak",
    num: "03",
    label: bi("Word productiever in je huidige domein", "Grow more productive in your current field"),
    sub: bi("Verdiep je vakkennis en blijf voorop lopen.", "Deepen your expertise and stay ahead."),
    photo: "/photos/richting-eigen-vak.webp",
    curated: [
      { org: "Universiteit van Amsterdam", course: "Data & AI Fundamentals", certified: true, duration: bi("12 weken", "12 weeks") },
      { org: "Delft Topinstituut", course: "Systems Engineering Basis", certified: true, duration: bi("8 weken", "8 weeks") },
    ],
    makers: [
      { by: bi("door Jelle Roodenburg", "by Jelle Roodenburg"), course: "Machine Learning van Nul", rating: "★ 4.8", reviews: "(203)" },
      { by: bi("door Sofie Klaassen", "by Sofie Klaassen"), course: "API Design voor Beginners", rating: "★ 4.6", reviews: "(87)" },
    ],
  },
];

export interface Partner {
  initials: string;
  color: string;
  name: string;
  logo?: string; // official logo file in /public/logos; without it we render a wordmark
}

export const partners: Partner[] = [
  { initials: "LOI", color: "#E2001A", name: "LOI" },
  { initials: "UvA", color: "#1B1A17", name: "Universiteit van Amsterdam", logo: "/logos/uva.svg" },
  { initials: "EUR", color: "#0C8066", name: "Erasmus Universiteit Rotterdam", logo: "/logos/erasmus.svg" },
  { initials: "UL", color: "#001158", name: "Universiteit Leiden", logo: "/logos/leiden.svg" },
  { initials: "HvA", color: "#25167A", name: "Hogeschool van Amsterdam", logo: "/logos/hva.png" },
  { initials: "NYE", color: "#002F5F", name: "Nyenrode Business Universiteit", logo: "/logos/nyenrode.png" },
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
    title: bi("Start online", "Start online"),
    body: bi(
      "Je medewerker begint direct, zonder te wachten op een afspraak. Praktische zaken komen aan bod, zoals het CV en het zelf scannen van de arbeidsmarkt, en skills en ambities worden globaal in kaart gebracht. Ook geven we een basis mee voor het gebruik van AI in de nieuwe zoektocht.",
      "Your employee starts right away, without waiting for an appointment. Practical matters come first, such as the CV and scanning the labour market, and skills and ambitions are mapped in outline. We also hand over a basis for using AI in the new search."
    ),
  },
  {
    num: "02",
    title: bi("Intake en advies", "Intake and advice"),
    body: bi(
      "In een online call of een fysieke afspraak geven we de online start een concreter vervolg. We leggen de basis voor een succesvolle zoektocht en brengen je medewerker in contact met de meest passende, door ons geselecteerde loopbaancoach.",
      "In a video call or an in-person meeting we give the online start a more concrete follow-up. We lay the basis for a successful search and connect your employee with the best-fitting career coach we have selected."
    ),
  },
  {
    num: "03",
    title: bi("Loopbaancoach en advies", "Career coach and advice"),
    body: bi(
      "Een gesprek met een loopbaancoach of arbeidsmarktdeskundige, goed voorbereid door de online start en de intake. Het doel is niet maanden praten, maar actiegericht werken. Deze gesprekken eindigen in de meeste gevallen met een concreet advies voor een richting en een traject.",
      "A conversation with a career coach or labour-market expert, well prepared by the online start and the intake. The aim is not months of talking but action. In most cases these conversations end with concrete advice on a direction and a path."
    ),
  },
  {
    num: "04",
    title: bi("Omscholing via erkende opleiders", "Re-training with accredited providers"),
    body: bi(
      "Een kort, erkend traject bij erkende private opleiders, hogescholen of beroepsonderwijs. Gericht op het nieuwe vak, niet op een algemeen programma. Aanvullend bevelen we een concrete cursus aan om AI vanaf dag één in dat nieuwe vak toe te passen, voor een snelle start.",
      "A short, accredited path at recognised private providers, colleges or vocational schools. Aimed at the new trade, not a generic programme. On top of that we recommend a concrete course for applying AI in that new trade from day one, for a fast start."
    ),
  },
  {
    num: "05",
    title: bi("Lijn naar nieuwe werkgevers", "A line to new employers"),
    body: bi(
      "We verbinden de omscholing aan werkgevers in sectoren met blijvende vraag. In techniek en zorg betrekken we werkgevers al voor of tijdens het traject.",
      "We connect the re-training to employers in sectors with lasting demand. In the trades and care we involve employers before or during the path already."
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

// ----- Contact router options -----
export const contactWho: { key: string; label: Bi }[] = [
  { key: "hr", label: bi("HR-leider", "HR leader") },
  { key: "deelnemer", label: bi("Deelnemer", "Participant") },
  { key: "coach", label: bi("Loopbaancoach", "Career coach") },
  { key: "opleider", label: bi("Opleider", "Training provider") },
  { key: "anders", label: bi("Anders", "Something else") },
];

export const hrGoals: { key: string; label: Bi }[] = [
  { key: "omscholing", label: bi("Op zoek naar hulp voor omscholing of herplaatsing van personeel", "Looking for help with re-training or redeploying staff") },
  { key: "transformatie", label: bi("Op zoek naar een HR-leider voor het leiden van een transformatie", "Looking for an HR leader to lead a transformation") },
  { key: "baan", label: bi("Zelf op zoek naar een nieuwe baan", "Looking for a new job myself") },
  { key: "anders", label: bi("Anders", "Something else") },
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

// ----- Netwerkconnector (homepage) -----
// Productive Switch in het midden; om ons heen de partijen die we verbinden.
export interface NetworkNode {
  id: string;
  label: Bi;
  short: Bi;
  body: Bi;
  color: string;
  /** ids of the nodes this one is directly linked to */
  links: string[];
  /** which services (hubs) this party connects to: search | advisory | switch */
  hubs: string[];
}

export const networkNodes: NetworkNode[] = [
  {
    id: "hr",
    label: bi("HR-leiders", "HR leaders"),
    short: bi("Klant", "Client"),
    body: bi(
      "De HR-directeur of ondernemingsraad bij een reorganisatie of transformatie. Zij zoeken de juiste mensen om het proces te dragen, sparren over de aanpak, en willen dat de medewerkers die vertrekken goed landen.",
      "The HR director or works council facing a reorganisation or transformation. They need the right people to carry the process, want to spar on the approach, and want the employees who leave to land well."
    ),
    color: "var(--hire)",
    links: ["kandidaten", "coaches", "medewerkers"],
    hubs: ["search", "switch"],
  },
  {
    id: "kandidaten",
    label: bi("Senior HR-professionals", "Senior HR professionals"),
    short: bi("Kandidaat", "Candidate"),
    body: bi(
      "HR-leiders en adviseurs met ervaring in transformaties: organisatieontwerp, employee relations, beloning en transparantie, AI in HR. Wij kennen ze omdat we ze dagelijks spreken.",
      "HR leaders and advisers with transformation experience: organisational design, employee relations, reward and transparency, AI in HR. We know them because we talk to them daily."
    ),
    color: "var(--hire)",
    links: ["hr"],
    hubs: ["search"],
  },
  {
    id: "coaches",
    label: bi("Loopbaancoaches", "Career coaches"),
    short: bi("Coach", "Coach"),
    body: bi(
      "Door ons geselecteerde loopbaancoaches en arbeidsmarktdeskundigen. Zij pakken het gesprek op na de online start en de intake, goed voorbereid dus. Niet maanden praten, maar actiegericht werken: in de meeste gevallen eindigen deze gesprekken met een concreet advies voor een richting en een traject.",
      "Career coaches and labour-market experts we have selected. They pick up the conversation after the online start and the intake, so well prepared. Not months of talking but action: in most cases these conversations end with concrete advice on a direction and a path."
    ),
    color: "var(--switch)",
    links: ["hr", "opleiders", "medewerkers", "werkgevers"],
    hubs: ["switch"],
  },
  {
    id: "opleiders",
    label: bi("Opleiders", "Training providers"),
    short: bi("Opleider", "Provider"),
    body: bi(
      "Universiteiten, hogescholen, ROC's en erkende private opleiders. Kort en gericht op het nieuwe vak, met een erkend certificaat of diploma aan het eind.",
      "Universities, colleges, vocational schools and accredited private providers. Short and aimed at the new trade, with a recognised certificate or diploma at the end."
    ),
    color: "var(--switch)",
    links: ["coaches", "werkgevers", "medewerkers"],
    hubs: ["switch"],
  },
  {
    id: "werkgevers",
    label: bi("Werkgevers met blijvende vraag", "Employers with lasting demand"),
    short: bi("Werkgever", "Employer"),
    body: bi(
      "Organisaties in zorg, welzijn, onderwijs, techniek en energie: sectoren waar automatisering minder snel impact heeft en de vraag naar mensen structureel is. Zij kijken vaak al tijdens de omscholing mee.",
      "Organisations in care, welfare, education, the trades and energy: sectors where automation bites more slowly and demand for people is structural. They often look on during the re-training already."
    ),
    color: "var(--col-social)",
    links: ["opleiders", "medewerkers", "coaches"],
    hubs: ["switch"],
  },
  {
    id: "medewerkers",
    label: bi("Medewerkers in transitie", "Employees in transition"),
    short: bi("Deelnemer", "Participant"),
    body: bi(
      "Medewerkers van wie de functie verdwijnt of verandert. Zij starten online, krijgen een intake en een loopbaancoach, en kiezen samen met ons een richting. Wij zorgen dat de weg ernaartoe kort, erkend en gefinancierd is, tot het nieuwe werk er echt is.",
      "Employees whose role is ending or changing. They start online, get an intake and a career coach, and choose a direction together with us. We make sure the road there is short, recognised and funded, until the new work is really there."
    ),
    color: "var(--col-tech)",
    links: ["hr", "coaches", "opleiders", "werkgevers"],
    hubs: ["switch"],
  },
];

// ----- Productive Search -----
export interface Shift {
  title: Bi;
  body: Bi;
}

// Wat er de komende jaren op HR afkomt (context voor de rollen en advisory).
export const hrShifts: Shift[] = [
  {
    title: bi("AI verandert het werk, en dus de functies en de organisatiestructuur", "AI changes the work, and so the jobs and the organisational structure"),
    body: bi(
      "Functieomschrijvingen die elk half jaar verschuiven, teams die opnieuw ontworpen worden. Iemand moet dat ontwerpen, uitleggen en zorgvuldig invoeren.",
      "Job descriptions that shift every six months, teams redesigned. Someone has to design that, explain it and roll it out with care."
    ),
  },
  {
    title: bi("HR-organisaties veranderen zelf ook", "HR organisations change themselves too"),
    body: bi(
      "Veel operationele HR-processen worden geautomatiseerd. Daardoor verschuift ook binnen HR het werk naar inhoudelijke onderwerpen: organisatieontwerp en transformatie, business partnership en workforce-ontwikkeling.",
      "Many operational HR processes are being automated. Within HR the work therefore shifts toward substantive topics: organisational design and transformation, business partnership and workforce development."
    ),
  },
  {
    title: bi("Reorganisaties vragen om employee relations", "Reorganisations call for employee relations"),
    body: bi(
      "Sociale plannen, medezeggenschap, vakbonden en individuele trajecten nemen toe. Met de snelheid van verandering gaan die trajecten door elkaar lopen. Dat vraagt om sterk HR-leiderschap dat dit zorgvuldig en menselijk doet, en grip houdt op hoe de organisatie er na de transformatie voorstaat.",
      "Social plans, co-determination, unions and individual cases increase. With the pace of change those tracks start to overlap. That calls for strong HR leadership that handles it carefully and humanely, and keeps a grip on where the organisation stands after the transformation."
    ),
  },
];

export interface RoleType {
  title: Bi;
  body: Bi;
}

// Rollen waarin Productive Search bemiddelt: senior HR, altijd met een transformatie-component.
export const roleTypes: RoleType[] = [
  {
    title: bi("CHRO en HR-directeur", "CHRO and HR Director"),
    body: bi("Eindverantwoordelijk voor een reorganisatie, fusie of cultuurverandering.", "Ultimately responsible for a reorganisation, merger or culture change."),
  },
  {
    title: bi("HR Transformation Lead", "HR Transformation Lead"),
    body: bi("Programmamanager die het HR-huis opnieuw inricht: processen, systemen, organisatieontwerp.", "Programme lead who rebuilds the HR house: processes, systems, organisational design."),
  },
  {
    title: bi("Head of Employee Relations", "Head of Employee Relations"),
    body: bi("Sociaal plan, medezeggenschap, vakbonden en het menselijke verloop van een reorganisatie.", "Social plan, co-determination, unions and the human course of a reorganisation."),
  },
  {
    title: bi("Reward & Pay Transparency Lead", "Reward & Pay Transparency Lead"),
    body: bi("Functiewaardering, beloningsstructuur en de implementatie van loontransparantie.", "Job grading, pay structure and the implementation of pay transparency."),
  },
  {
    title: bi("Head of Organisational Design", "Head of Organisational Design"),
    body: bi("Functiehuizen, teamstructuren en functieomschrijvingen die meebewegen met AI.", "Job architecture, team structures and job descriptions that move along with AI."),
  },
  {
    title: bi("People Analytics en AI in HR", "People Analytics and AI in HR"),
    body: bi("Datagedreven HR en het verantwoord automatiseren van HR-processen.", "Data-driven HR and the responsible automation of HR processes."),
  },
  {
    title: bi("Workforce Transition en L&D Lead", "Workforce Transition and L&D Lead"),
    body: bi("Herplaatsing, omscholing en leren tijdens en na een reorganisatie.", "Redeployment, re-training and learning during and after a reorganisation."),
  },
  {
    title: bi("Arbeidsrecht en HR Legal Counsel", "Employment Law and HR Legal Counsel"),
    body: bi("Juridische begeleiding van reorganisaties en nieuwe wetgeving rond werk en beloning.", "Legal guidance on reorganisations and new legislation around work and pay."),
  },
];

export interface AdvisoryItem {
  title: Bi;
  body: Bi;
}

export const advisoryItems: AdvisoryItem[] = [
  {
    title: bi("Employee relations", "Employee relations"),
    body: bi(
      "Sparren over sociaal plan, medezeggenschap en de menselijke kant van een reorganisatie, voordat het op tafel ligt.",
      "Sparring on the social plan, co-determination and the human side of a reorganisation, before it lands on the table."
    ),
  },
  {
    title: bi("Loontransparantie (EU-richtlijn)", "Pay transparency (EU directive)"),
    body: bi(
      "Wat de richtlijn concreet van je vraagt, waar je functiehuis en beloningsbeleid nu staan, en wat als eerste moet.",
      "What the directive concretely asks of you, where your job architecture and pay policy stand today, and what comes first."
    ),
  },
  {
    title: bi("AI in HR-werkstromen", "AI in HR work streams"),
    body: bi(
      "Welke HR-processen je verantwoord kunt automatiseren, wat je team daarvoor moet leren, en wat je juist bij mensen houdt.",
      "Which HR processes you can responsibly automate, what your team needs to learn for it, and what you deliberately keep with people."
    ),
  },
  {
    title: bi("Functieomschrijvingen en organisatieontwerp", "Job descriptions and organisational design"),
    body: bi(
      "Functies die meebewegen met veranderend werk: functiehuis, teamstructuur en de omschrijvingen die daarbij horen.",
      "Roles that move with changing work: job architecture, team structure and the descriptions that go with them."
    ),
  },
  {
    title: bi("Peer-to-peer sparren tussen senior HR-leiders", "Peer-to-peer sparring between senior HR leaders"),
    body: bi(
      "Een kleine kring van HR-leiders die dezelfde transformatie doormaken. Geen congres, wel een tafel waar je eerlijk kunt vragen hoe een ander het doet.",
      "A small circle of HR leaders going through the same transformation. Not a conference, but a table where you can honestly ask how someone else does it."
    ),
  },
];
