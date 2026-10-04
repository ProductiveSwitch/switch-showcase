"use client";

import { useState } from "react";
import { networkNodes, type Bi, type Lang } from "@/lib/data";

// 2D netwerkconnector: de drie diensten (Search, Advisory, Switch) als hubs in
// het midden, om hen heen de zes partijen die we verbinden. Hover of tik op een
// knoop of hub en de bijbehorende lijnen lichten op, met de toelichting ernaast.
// Puur SVG + React-state, geen library.

const W = 760;
const H = 600;
const CX = W / 2;
const CY = H / 2;
const RX = 290;
const RY = 215;

interface Hub {
  id: string;
  label: string;
  short: Bi;
  body: Bi;
  color: string;
  x: number;
  y: number;
}

const HUBS: Hub[] = [
  {
    id: "search",
    label: "Search",
    short: { nl: "Productive Search", en: "Productive Search" },
    body: {
      nl: "Werving van senior HR-leiders en adviseurs voor transformaties: CHRO's, HR-directeuren, transformatieleads, employee relations en reward.",
      en: "Recruitment of senior HR leaders and advisers for transformations: CHROs, HR directors, transformation leads, employee relations and reward.",
    },
    color: "var(--hire)",
    x: CX + 74,
    y: CY - 52,
  },
  {
    id: "advisory",
    label: "Advisory",
    short: { nl: "Productive Advisory", en: "Productive Advisory" },
    body: {
      nl: "Adviesopdrachten en peer-to-peer sparren voor HR-leiders op employee relations, loontransparantie, AI-implementatie in HR en organisatieontwerp.",
      en: "Advisory work and peer-to-peer sparring for HR leaders on employee relations, pay transparency, AI implementation in HR and organisational design.",
    },
    color: "var(--hire-deep)",
    x: CX - 74,
    y: CY - 52,
  },
  {
    id: "switch",
    label: "Switch",
    short: { nl: "Productive Switch", en: "Productive Switch" },
    body: {
      nl: "Gerichte omscholing van medewerkers van wie de functie verdwijnt: intake door een coach, kort en erkend leren, en een landing bij organisaties met blijvende vraag.",
      en: "Targeted re-training for employees whose role is ending: intake by a coach, short and recognised learning, and a landing at organisations with lasting demand.",
    },
    color: "var(--switch)",
    x: CX,
    y: CY + 66,
  },
];

function wrap(s: string, max = 18): string[] {
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

export function NetworkConnector({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<string | null>(null);
  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);

  const pos = Object.fromEntries(
    networkNodes.map((n, i) => {
      const a = (i / networkNodes.length) * Math.PI * 2 - Math.PI / 2;
      return [n.id, { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) }];
    })
  ) as Record<string, { x: number; y: number }>;

  // Node-to-node edges, de-duplicated
  const edges: [string, string][] = [];
  networkNodes.forEach((n) =>
    n.links.forEach((l) => {
      if (!edges.some(([a, b]) => (a === n.id && b === l) || (a === l && b === n.id))) edges.push([n.id, l]);
    })
  );

  const activeNode = networkNodes.find((n) => n.id === active) ?? null;
  const activeHub = HUBS.find((h) => h.id === active) ?? null;

  // Which spokes / edges / nodes / hubs are lit for the current selection
  const spokeLit = (hubId: string, nodeId: string) =>
    !!active && ((!!activeHub && activeHub.id === hubId) || (!!activeNode && activeNode.id === nodeId));
  const spokeDim = (hubId: string, nodeId: string) => !!active && !spokeLit(hubId, nodeId);
  const edgeLit = (a: string, b: string) => !!activeNode && (activeNode.id === a || activeNode.id === b);
  const edgeDim = (a: string, b: string) => !!active && !edgeLit(a, b);
  const nodeDim = (id: string) => {
    if (!active) return false;
    if (activeHub) return !networkNodes.find((n) => n.id === id)?.hubs.includes(activeHub.id);
    if (activeNode) return activeNode.id !== id && !activeNode.links.includes(id);
    return false;
  };
  const hubDim = (id: string) => {
    if (!active) return false;
    if (activeHub) return activeHub.id !== id;
    if (activeNode) return !activeNode.hubs.includes(id);
    return false;
  };

  const panel = activeHub
    ? { tag: activeHub.label, color: activeHub.color, title: t(activeHub.short), body: t(activeHub.body) }
    : activeNode
      ? { tag: t(activeNode.short), color: activeNode.color, title: t(activeNode.label), body: t(activeNode.body) }
      : null;

  return (
    <div className="netc">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="netc-svg"
        role="img"
        aria-label={t({
          nl: "Netwerk: Productive Search, Advisory en Switch verbinden HR-leiders, senior HR-kandidaten, coaches, opleiders, organisaties met blijvende vraag en medewerkers.",
          en: "Network: Productive Search, Advisory and Switch connect HR leaders, senior HR candidates, coaches, training partners, organisations with lasting demand and employees.",
        })}
        onMouseLeave={() => setActive(null)}
      >
        {/* node-to-node edges */}
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            className={`netc-edge${edgeDim(a, b) ? " dim" : ""}${edgeLit(a, b) ? " lit" : ""}`}
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
          />
        ))}
        {/* hub spokes */}
        {networkNodes.map((n) =>
          n.hubs.map((hid) => {
            const h = HUBS.find((x) => x.id === hid)!;
            return (
              <line
                key={`${hid}-${n.id}`}
                className={`netc-spoke${spokeDim(hid, n.id) ? " dim" : ""}${spokeLit(hid, n.id) ? " lit" : ""}`}
                x1={h.x}
                y1={h.y}
                x2={pos[n.id].x}
                y2={pos[n.id].y}
                style={{ stroke: h.color }}
              />
            );
          })
        )}
        {/* hub-to-hub ring: one brand */}
        <polygon className="netc-hubring" points={HUBS.map((h) => `${h.x},${h.y}`).join(" ")} />

        {/* hubs */}
        {HUBS.map((h) => {
          const on = active === h.id;
          return (
            <g
              key={h.id}
              className={`netc-hub${on ? " on" : ""}${hubDim(h.id) ? " dim" : ""}`}
              style={{ "--hc": h.color } as React.CSSProperties}
              onMouseEnter={() => setActive(h.id)}
              onFocus={() => setActive(h.id)}
              onClick={() => setActive(h.id)}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={t(h.short)}
            >
              <circle cx={h.x} cy={h.y} r={44} />
              <text x={h.x} y={h.y - 4} textAnchor="middle" className="netc-hub-a">
                Productive
              </text>
              <text x={h.x} y={h.y + 14} textAnchor="middle" className="netc-hub-b">
                {h.label}
              </text>
            </g>
          );
        })}

        {/* nodes */}
        {networkNodes.map((n) => {
          const p = pos[n.id];
          const lines = wrap(t(n.label));
          const below = p.y >= CY;
          const on = active === n.id;
          return (
            <g
              key={n.id}
              className={`netc-node${on ? " on" : ""}${nodeDim(n.id) ? " dim" : ""}`}
              style={{ "--nc": n.color } as React.CSSProperties}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onClick={() => setActive(n.id)}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={t(n.label)}
            >
              <circle cx={p.x} cy={p.y} r={33} className="netc-dot" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" className="netc-short">
                {t(n.short)}
              </text>
              <text
                x={p.x}
                y={below ? p.y + 56 : p.y - 44 - (lines.length - 1) * 16}
                textAnchor="middle"
                className="netc-label"
              >
                {lines.map((l, i) => (
                  <tspan key={i} x={p.x} dy={i === 0 ? 0 : 16}>
                    {l}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="netc-panel" aria-live="polite">
        {panel ? (
          <>
            <div className="netc-panel-tag" style={{ background: panel.color }}>
              {panel.tag}
            </div>
            <h3>{panel.title}</h3>
            <p>{panel.body}</p>
          </>
        ) : (
          <>
            <div className="netc-panel-tag">{t({ nl: "Het netwerk", en: "The network" })}</div>
            <h3>{t({ nl: "Drie diensten, één netwerk", en: "Three services, one network" })}</h3>
            <p>
              {t({
                nl: "Beweeg over een dienst of een knoop om te zien wie het is en wat die voor je doet. Dezelfde gesprekken met HR-leiders leveren kandidaten op als je aanneemt, advies als je een transformatie leidt, en een zachte landing voor je mensen als je reorganiseert.",
                en: "Hover over a service or a node to see who it is and what they do for you. The same conversations with HR leaders yield candidates when you hire, advice when you lead a transformation, and a soft landing for your people when you restructure.",
              })}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
