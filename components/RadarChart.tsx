// Stylised re-drawing of the "theoretical capability vs observed usage by
// occupational category" radar (bron: Anthropic Economic Index). Values are
// indicative, rounded from the published chart. Two variants:
//  - "bg": decorative, no labels, sits behind the hero at low opacity
//  - "figure": readable figure with bilingual labels, used in richting 01
import type { Lang } from "@/lib/data";

type Cat = { nl: string; en: string; theo: number; obs: number };

const CATS: Cat[] = [
  { nl: "Management", en: "Management", theo: 0.95, obs: 0.18 },
  { nl: "Financieel", en: "Business & finance", theo: 0.9, obs: 0.12 },
  { nl: "ICT & data", en: "Computer & math", theo: 0.93, obs: 0.45 },
  { nl: "Engineering", en: "Engineering", theo: 0.85, obs: 0.08 },
  { nl: "Juridisch", en: "Legal", theo: 0.95, obs: 0.1 },
  { nl: "Onderwijs", en: "Education", theo: 0.72, obs: 0.12 },
  { nl: "Media & creatie", en: "Arts & media", theo: 0.82, obs: 0.15 },
  { nl: "Zorgprofessionals", en: "Healthcare practitioners", theo: 0.45, obs: 0.05 },
  { nl: "Zorgondersteuning", en: "Healthcare support", theo: 0.28, obs: 0.03 },
  { nl: "Horeca", en: "Food & serving", theo: 0.22, obs: 0.02 },
  { nl: "Persoonlijke zorg", en: "Personal care", theo: 0.12, obs: 0.02 },
  { nl: "Verkoop", en: "Sales", theo: 0.75, obs: 0.25 },
  { nl: "Administratie", en: "Office & admin", theo: 0.95, obs: 0.3 },
  { nl: "Transport", en: "Transportation", theo: 0.15, obs: 0.02 },
  { nl: "Productie", en: "Production", theo: 0.15, obs: 0.03 },
  { nl: "Bouw", en: "Construction", theo: 0.1, obs: 0.02 },
];

const N = CATS.length;

function pt(cx: number, cy: number, r: number, i: number): [number, number] {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function poly(cx: number, cy: number, R: number, key: "theo" | "obs"): string {
  return CATS.map((c, i) =>
    pt(cx, cy, c[key] * R, i)
      .map((v) => v.toFixed(1))
      .join(",")
  ).join(" ");
}

export function RadarChart({ variant, lang = "nl" }: { variant: "bg" | "figure"; lang?: Lang }) {
  const size = 660;
  const cx = size / 2;
  const cy = size / 2;
  const R = variant === "figure" ? 218 : 310;
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={variant === "figure" ? "radar-figure" : "radar-bg"}
      role={variant === "figure" ? "img" : "presentation"}
      aria-hidden={variant === "bg" ? true : undefined}
      aria-label={
        variant === "figure"
          ? lang === "nl"
            ? "Radargrafiek: wat AI theoretisch kan per beroepsgroep, tegenover wat er in de praktijk wordt gebruikt."
            : "Radar chart: what AI can theoretically do per occupation, versus what is actually used."
          : undefined
      }
    >
      {rings.map((f) => (
        <circle
          key={f}
          cx={cx}
          cy={cy}
          r={R * f}
          fill="none"
          stroke="var(--line)"
          strokeWidth={f === 1 ? 1.4 : 1}
        />
      ))}
      {CATS.map((_, i) => {
        const [x, y] = pt(cx, cy, R, i);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" strokeWidth="1" />;
      })}
      <polygon
        points={poly(cx, cy, R, "theo")}
        fill="var(--col-domain)"
        fillOpacity={variant === "figure" ? 0.16 : 0.1}
        stroke="var(--col-domain)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon
        points={poly(cx, cy, R, "obs")}
        fill="var(--col-social)"
        fillOpacity={variant === "figure" ? 0.28 : 0.14}
        stroke="var(--col-social)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {variant === "figure" &&
        CATS.map((c, i) => {
          const [x, y] = pt(cx, cy, R + 16, i);
          const anchor = Math.abs(x - cx) < 12 ? "middle" : x > cx ? "start" : "end";
          return (
            <text
              key={c.en}
              x={x.toFixed(1)}
              y={(y + 4).toFixed(1)}
              textAnchor={anchor}
              fontSize="14.5"
              fontFamily="var(--font-body)"
              fill="var(--ink-soft)"
            >
              {lang === "nl" ? c.nl : c.en}
            </text>
          );
        })}
    </svg>
  );
}
