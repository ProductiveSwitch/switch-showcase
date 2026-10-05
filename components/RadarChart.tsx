"use client";

// Re-drawing of two Anthropic figures on one radar, 22 occupational
// categories in the original clockwise order:
//  - theo: theoretical LLM capability (β, Eloundou et al.) and
//  - obs:  observed AI coverage, both from "Labor market impacts of AI"
//    (5 maart 2026), figuur 2;
//  - robot: "LLM and robot exposure" from "What work can robots do?"
//    (30 september 2026), figuur 6, shown when the robotics toggle is on.
// Values named in the report texts are exact (Computer & math 94.3/33,
// Business & finance 94.3, Management 91.3, Office & admin 90/34.3, Legal 89,
// Architecture & engineering 84.8, Arts & media 83.7; Protective service
// robot 61, Transportation robot ~90, Office & admin robot ~100, Personal
// care robot ~40). The rest is read off the published charts (±2 points).
import { useState } from "react";
import type { Lang } from "@/lib/data";

type Cat = { nl: string; en: string; theo: number; obs: number; robot: number };

const CATS: Cat[] = [
  { nl: "Management", en: "Management", theo: 0.913, obs: 0.14, robot: 0.92 },
  { nl: "Zakelijk & financieel", en: "Business & finance", theo: 0.943, obs: 0.3, robot: 0.97 },
  { nl: "ICT & wiskunde", en: "Computer & math", theo: 0.943, obs: 0.33, robot: 0.98 },
  { nl: "Architectuur & engineering", en: "Architecture & engineering", theo: 0.848, obs: 0.05, robot: 0.93 },
  { nl: "Wetenschap", en: "Science", theo: 0.79, obs: 0.11, robot: 0.91 },
  { nl: "Sociale dienstverlening", en: "Community & social service", theo: 0.51, obs: 0.03, robot: 0.59 },
  { nl: "Juridisch", en: "Legal", theo: 0.89, obs: 0.2, robot: 0.88 },
  { nl: "Onderwijs", en: "Education", theo: 0.62, obs: 0.18, robot: 0.66 },
  { nl: "Kunst, design & media", en: "Arts, design & media", theo: 0.837, obs: 0.19, robot: 0.86 },
  { nl: "Zorgprofessionals", en: "Healthcare practitioners", theo: 0.6, obs: 0.05, robot: 0.7 },
  { nl: "Zorgondersteuning", en: "Healthcare support", theo: 0.28, obs: 0.02, robot: 0.47 },
  { nl: "Beveiliging & veiligheid", en: "Protective service", theo: 0.32, obs: 0.02, robot: 0.61 },
  { nl: "Horeca", en: "Food preparation & serving", theo: 0.16, obs: 0.01, robot: 0.88 },
  { nl: "Schoonmaak & onderhoud", en: "Cleaning & maintenance", theo: 0.17, obs: 0.01, robot: 0.71 },
  { nl: "Persoonlijke verzorging", en: "Personal care & service", theo: 0.18, obs: 0.02, robot: 0.42 },
  { nl: "Verkoop", en: "Sales", theo: 0.63, obs: 0.27, robot: 0.91 },
  { nl: "Kantoor & administratie", en: "Office & admin support", theo: 0.9, obs: 0.343, robot: 0.99 },
  { nl: "Landbouw & visserij", en: "Farming, fishing & forestry", theo: 0.16, obs: 0.01, robot: 0.85 },
  { nl: "Bouw", en: "Construction & extraction", theo: 0.18, obs: 0.01, robot: 0.76 },
  { nl: "Installatie & reparatie", en: "Installation & repair", theo: 0.19, obs: 0.02, robot: 0.53 },
  { nl: "Productie", en: "Production", theo: 0.2, obs: 0.02, robot: 0.89 },
  { nl: "Transport & logistiek", en: "Transportation & moving", theo: 0.13, obs: 0.02, robot: 0.91 },
];

const N = CATS.length;

function pt(cx: number, cy: number, r: number, i: number): [number, number] {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function poly(cx: number, cy: number, R: number, key: "theo" | "obs" | "robot"): string {
  return CATS.map((c, i) =>
    pt(cx, cy, c[key] * R, i)
      .map((v) => v.toFixed(1))
      .join(",")
  ).join(" ");
}

export function RadarChart({ variant, lang = "nl" }: { variant: "bg" | "figure"; lang?: Lang }) {
  const [hover, setHover] = useState<number | null>(null);
  const [robots, setRobots] = useState(false);
  const figure = variant === "figure";
  const size = figure ? 980 : 660;
  const cx = size / 2;
  const cy = size / 2;
  const R = figure ? 300 : 310;
  const rings = [0.2, 0.4, 0.6, 0.8, 1];
  const cat = hover !== null ? CATS[hover] : null;
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  const nl = lang === "nl";

  return (
    <div className={figure ? "radar-wrap" : undefined}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={figure ? "radar-figure" : "radar-bg"}
        role={figure ? "img" : "presentation"}
        aria-hidden={variant === "bg" ? true : undefined}
        aria-label={
          figure
            ? nl
              ? "Radargrafiek: theoretische AI-dekking, waargenomen AI-dekking en optioneel blootstelling aan AI en robots, per beroepscategorie, naar Anthropic (2026)."
              : "Radar chart: theoretical AI coverage, observed AI coverage and optionally LLM and robot exposure per occupational category, after Anthropic (2026)."
            : undefined
        }
        onMouseLeave={() => setHover(null)}
      >
        {figure && <circle cx={cx} cy={cy} r={R} fill="var(--radar-bg)" />}
        {rings.map((f) => (
          <circle key={f} cx={cx} cy={cy} r={R * f} fill="none" stroke="var(--line)" strokeWidth={f === 1 ? 1.4 : 1} />
        ))}
        {CATS.map((_, i) => {
          const [x, y] = pt(cx, cy, R, i);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={hover === i ? "var(--ink-soft)" : "var(--line)"}
              strokeWidth={1}
            />
          );
        })}
        {figure &&
          rings.map((f) => {
            const a = (-3 * Math.PI) / 4;
            const x = cx + R * f * Math.cos(a) + 6;
            const y = cy + R * f * Math.sin(a) - 4;
            return (
              <text key={`rl-${f}`} x={x} y={y} fontSize="11" fill="var(--ink-soft)" fontFamily="var(--font-body)">
                {Math.round(f * 100)}%
              </text>
            );
          })}
        {figure && robots && (
          <polygon
            points={poly(cx, cy, R, "robot")}
            fill="var(--radar-robot)"
            fillOpacity={0.18}
            stroke="var(--radar-robot)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}
        <polygon
          points={poly(cx, cy, R, "theo")}
          fill="var(--radar-theo)"
          fillOpacity={figure ? 0.3 : 0.14}
          stroke="var(--radar-theo)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points={poly(cx, cy, R, "obs")}
          fill="var(--radar-obs)"
          fillOpacity={figure ? 0.45 : 0.18}
          stroke="var(--radar-obs)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {figure &&
          CATS.map((c, i) => {
            const [tx, ty] = pt(cx, cy, c.theo * R, i);
            const [ox, oy] = pt(cx, cy, c.obs * R, i);
            const [rx, ry] = pt(cx, cy, c.robot * R, i);
            const on = hover === i;
            const s = on ? 5 : 3.5;
            return (
              <g key={`pts-${i}`} className="radar-pts">
                {robots && <circle cx={rx} cy={ry} r={on ? 6.5 : 4.5} fill="var(--radar-robot)" />}
                <circle cx={tx} cy={ty} r={on ? 6.5 : 4.5} fill="var(--radar-theo)" />
                <rect x={ox - s} y={oy - s} width={s * 2} height={s * 2} fill="var(--radar-obs)" />
              </g>
            );
          })}
        {figure &&
          CATS.map((c, i) => {
            const [x, y] = pt(cx, cy, R + 18, i);
            const anchor = Math.abs(x - cx) < 14 ? "middle" : x > cx ? "start" : "end";
            const on = hover === i;
            return (
              <text
                key={c.en}
                x={x.toFixed(1)}
                y={(y + 4.5).toFixed(1)}
                textAnchor={anchor}
                fontSize="14"
                fontWeight={500}
                fontFamily="var(--font-body)"
                fill={on ? "var(--ink)" : "var(--ink-soft)"}
                style={{ cursor: "default" }}
                onMouseEnter={() => setHover(i)}
                onClick={() => setHover(on ? null : i)}
              >
                {nl ? c.nl : c.en}
              </text>
            );
          })}
        {/* invisible wedges so hovering anywhere in a sector selects it */}
        {figure &&
          CATS.map((_, i) => {
            const [x1, y1] = pt(cx, cy, R + 44, i - 0.5);
            const [x2, y2] = pt(cx, cy, R + 44, i + 0.5);
            return (
              <path
                key={`wedge-${i}`}
                d={`M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${R + 44},${R + 44} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onClick={() => setHover(hover === i ? null : i)}
              />
            );
          })}
      </svg>
      {figure && (
        <>
          <div className="radar-readout" aria-live="polite">
            {cat ? (
              <>
                <strong>{nl ? cat.nl : cat.en}</strong>
                <span>
                  <i className="radar-swatch theo" /> {pct(cat.theo)} {nl ? "theoretisch" : "theoretical"}
                </span>
                <span>
                  <i className="radar-swatch obs" /> {pct(cat.obs)} {nl ? "waargenomen" : "observed"}
                </span>
                {robots && (
                  <span>
                    <i className="radar-swatch robot" /> {pct(cat.robot)} {nl ? "incl. robots" : "incl. robots"}
                  </span>
                )}
              </>
            ) : (
              <span className="radar-hint">
                {nl ? "Beweeg over een beroepsgroep voor de cijfers." : "Hover over an occupation for the figures."}
              </span>
            )}
          </div>
          <div className="radar-toggle-row">
            <button
              type="button"
              className={`radar-toggle${robots ? " on" : ""}`}
              aria-pressed={robots}
              onClick={() => setRobots(!robots)}
            >
              <i aria-hidden="true" />
              {nl ? "Toon ook robotica (AI en robots samen)" : "Also show robotics (LLMs and robots combined)"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
