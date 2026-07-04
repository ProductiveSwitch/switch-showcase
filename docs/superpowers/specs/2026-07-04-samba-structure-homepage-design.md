# Homepage-herstructurering naar SAMBA-opbouw (structuur en animaties, niet stijl)

Datum: 2026-07-04. Status: gebouwd en lokaal geverifieerd.

## Doel

productiveswitch.nl krijgt de sectie-opbouw en animatietaal van samba-mate.com, met behoud van de eigen warme paper/ink-huisstijl en de bestaande propositie (werkgever als koper, drie richtingen, financiering als verkoopargument).

## Besluiten (met de gebruiker afgestemd)

1. **Kleuren**: infographic-kleuren als accenten op de bestaande paper/ink-basis, geen volledige paletswap. Teal = richting 01 en brandkleur Switch, geel = richting 02 (techniek), rood/oranje = richting 03 (sociaal), navy voor donkere vlakken.
2. **Radar-grafiek** (Anthropic Economic Index, theoretical vs observed AI usage): nagetekend als eigen SVG-component, subtiel achter de hero en als leesbaar figuur met NL/EN-labels in het uitklappaneel van richting 01. Bronvermelding in het bijschrift.
3. **Instituten-balk**: officiële logo's (Wikimedia Commons) voor UvA, Erasmus, Leiden, HvA, Nyenrode; LOI als gestileerd rood woordmerk (geen vrij logobestand beschikbaar). Framing: "omscholing bij erkende opleiders, onder andere". Let op: er liggen nog geen samenwerkingsafspraken; risico ligt bij de afzender.

## Sectie-mapping (SAMBA → Productive Switch)

| SAMBA | Productive Switch |
|---|---|
| Fixed navbar met scroll-state | Links: Productive Switch, Productive Hire, Onze visie, NL/EN. Rechts: LinkedIn/Instagram, Upload CV, Contact. Mobiel: hamburger-overlay. |
| Full-viewport hero met slow zoom | Full-viewport hero, radar-SVG als achtergrond met langzame drift, scroll-indicator |
| Ticker "Born in Rio..." | Logo-marquee erkende opleiders (pauzeert op hover) |
| Three pillars | Drie richtingen als foto-pijlerkaarten met kleuroverlay, uitklapbaar naar het bestaande curated/open aanbod |
| Crafted for every moment | "Wat het de werkgever kost" als waaier: centrale cirkel plus drie gekantelde bronkaarten (transitiebudget, cao/O&O, SLIM) |
| Your moments | "Hoe het werkt" als vier ribbon-stapkaarten (nummer-lint, icoon-cirkel, kleur per stap) |
| Origin story | Onze visie als split-sectie (foto met slowZoom + navy tekstvlak), doorklik naar /vision |
| Join the movement | Vision-band: "Je functieomschrijving kan over een half jaar anders zijn..." + Kom in contact |
| Newsletter | Bestaande contact-CTA-band (intake primair, koffie tweede) + opleider-band |

## Techniek

- Animaties blijven CSS + IntersectionObserver (geen GSAP-dependency): bestaande reveal/stagger, nieuwe keyframes tickerMove, slowZoom, radarDrift, bounceSlow. prefers-reduced-motion overal gerespecteerd.
- Nieuw component `components/RadarChart.tsx` (varianten bg/figure), indicatieve waarden.
- `ModalKind` uitgebreid met "cv": mailto-modal voor CV's richting Productive Hire.
- Logo-bestanden in `public/logos/`.
- CTA-hiërarchie ongewijzigd: intake primair, koffie warm tweede, opleider aparte derde.

## Open punten

- Social-handles (LinkedIn/Instagram) zijn aannames: linkedin.com/company/productiveswitch en instagram.com/productiveswitch. Corrigeren zodra de echte profielen bestaan.
- Dest-2 foto (techniek) is nog een codeerscherm-placeholder; een ambachtelijke foto past beter.
- Instituten-logo's: afspraken met de instituten regelen of terugvallen op woordmerken.
