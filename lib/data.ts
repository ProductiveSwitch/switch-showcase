export type ColumnId = "domain" | "social" | "physical";

export interface CuratedProgramme {
  institution: string;
  initials: string;
  courseName: string;
  certified: boolean;
  duration: string;
}

export interface MakerProfile {
  initials: string;
  color: string;
  courseTitle: string;
  makerName: string;
  rating: number;
  reviewCount: number;
}

export interface Column {
  id: ColumnId;
  label: string;
  blurb: string;
  makerCount: number;
  moduleCount: number;
  curated: CuratedProgramme[];
  makers: MakerProfile[];
}

export const columns: Column[] = [
  {
    id: "domain",
    label: "Domeinkennis",
    blurb:
      "Verdiep je in vakinhoudelijke expertises, van technologie en data tot recht en architectuur.",
    makerCount: 38,
    moduleCount: 124,
    curated: [
      {
        institution: "Universiteit van Amsterdam",
        initials: "UvA",
        courseName: "Data & AI Fundamentals",
        certified: true,
        duration: "12 weken",
      },
      {
        institution: "Delft Topinstituut",
        initials: "DTI",
        courseName: "Systems Engineering Basis",
        certified: true,
        duration: "8 weken",
      },
    ],
    makers: [
      {
        initials: "JR",
        color: "#2D5A6B",
        courseTitle: "Machine Learning van Nul",
        makerName: "Jelle Roodenburg",
        rating: 4.8,
        reviewCount: 203,
      },
      {
        initials: "SK",
        color: "#1B4F5E",
        courseTitle: "API Design voor Beginners",
        makerName: "Sofie Klaassen",
        rating: 4.6,
        reviewCount: 87,
      },
    ],
  },
  {
    id: "social",
    label: "Sociale Vaardigheden",
    blurb:
      "Bouw aan je vermogen om samen te werken, te communiceren en leiderschap te tonen in complexe contexten.",
    makerCount: 29,
    moduleCount: 96,
    curated: [
      {
        institution: "Erasmus School of Social",
        initials: "ESS",
        courseName: "Conflicthantering & Mediation",
        certified: true,
        duration: "6 weken",
      },
      {
        institution: "Nyenrode Business",
        initials: "NYE",
        courseName: "Leiderschap onder druk",
        certified: false,
        duration: "4 weken",
      },
    ],
    makers: [
      {
        initials: "MA",
        color: "#BC5B38",
        courseTitle: "Spreken met impact",
        makerName: "Miriam Aerts",
        rating: 4.9,
        reviewCount: 341,
      },
      {
        initials: "TH",
        color: "#9E4B2E",
        courseTitle: "Deep Listening in Teams",
        makerName: "Thomas Huizinga",
        rating: 4.7,
        reviewCount: 112,
      },
    ],
  },
  {
    id: "physical",
    label: "Fysieke Competenties",
    blurb:
      "Ontwikkel praktische, lichamelijke en ambachtelijke vaardigheden die je ook digitaal kunt overdragen.",
    makerCount: 21,
    moduleCount: 73,
    curated: [
      {
        institution: "HAN University",
        initials: "HAN",
        courseName: "Ergonomie & Bewegingsleer",
        certified: true,
        duration: "10 weken",
      },
      {
        institution: "Vakschool Schoonhoven",
        initials: "VSS",
        courseName: "Precisieambacht & Craftmanship",
        certified: true,
        duration: "16 weken",
      },
    ],
    makers: [
      {
        initials: "LP",
        color: "#3E6B47",
        courseTitle: "Houding & Ademwerk",
        makerName: "Lena Posthuma",
        rating: 4.8,
        reviewCount: 156,
      },
      {
        initials: "RB",
        color: "#2E5136",
        courseTitle: "Functionele Kracht Basics",
        makerName: "Ruben Brands",
        rating: 4.5,
        reviewCount: 64,
      },
    ],
  },
];

export const columnMeta: Record<
  ColumnId,
  { accent: string; soft: string; barClass: string }
> = {
  domain: {
    accent: "var(--c1)",
    soft: "var(--c1-soft)",
    barClass: "bg-c1",
  },
  social: {
    accent: "var(--c2)",
    soft: "var(--c2-soft)",
    barClass: "bg-c2",
  },
  physical: {
    accent: "var(--c3)",
    soft: "var(--c3-soft)",
    barClass: "bg-c3",
  },
};
