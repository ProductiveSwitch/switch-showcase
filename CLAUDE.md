# Switch — Re-training Platform Showcase

## Project Context

**Productive Switch** is re-training that helps people build a second career when their role ends or changes. The live site is a Next.js app (deployed on Vercel at productiveswitch.nl) with two prominent tabs: **Productive Switch** (default, re-training) and **Productive Restructure** (renamed from Productive Hire on 2026-07-07; recruitment for senior HR and workforce-transition roles). One brand, both sides of the employment cycle.

The platform will eventually include accounts, video content, scheduling, and payments, but the current phase is the proposition + pitch + lead-capture asset.

### Proposition (current, load-bearing)

- Productive Switch is **not** an outplacement bureau and positions itself beside it. Outplacement is work-to-work; Productive Switch is **work to a new vak, with an employer at the end**. Short, targeted re-training plus a guidance layer (intake by a certified career coach) is the differentiator. The guidance layer is what makes us a transition partner instead of a course broker.
- **Audience / payer: the employer.** All copy addresses the HR decision-maker (and works council) at a reorganisation, who wants their people to land well and must justify the choice internally. Not the learner.
- **Three directions, with accent on 2 and 3** (structural demand + subsidy money + strongest employer link): (1) stay in your own field — the broad funnel, where working with AI is the upskilling, framed as opportunity never fear; (2) social sector (zorg, welzijn, onderwijs); (3) hands-on and technical work.
- **Financing is a sales argument**, three stackable sources: transitiebudget (tax-friendly when spent on re-training), cao/O&O training budgets, and SLIM subsidy (we handle the application; never framed as guaranteed). Shown indicatively, never as a calculator. **Never show our own fee; no bedragen/tarieven on the site.**
- **Employer link = proposition + concierge, not a marketplace.** No placement infra, no job guarantee, no hard SLIM promise.

### Voice

All copy follows the **productive-switch-voice** skill: NL-first with EN toggle (re-expression, not literal translation), informal je/jij, human-first but always concrete, hopeful never fear-based, clear over clever. Anchor "Leren om te blijven leren" used sparingly. **Hard rule: never an em dash** (use comma, period, colon, parentheses, or "en").

### Architecture notes (current, restructured 2026-07-07 into real routes)

- Real routes with a shared fixed nav; the old single `Site.tsx` with a brand-toggle is gone (it had a panel-switch bug and no deep links). Routes: `/` (HomePage, hero H1 "Omscholing & herplaatsing van personeel"; the "Voor HR bij reorganisatie" eyebrow was removed 2026-07-08 and the H1 sits flush at the top; a "Kom in contact" hero button opens the intake modal), `/restructure` (Productive Restructure, formerly Hire), `/deelnemers` (Voor deelnemers, learner-facing overview of the 3 opleidingsvelden, added 2026-07-08), `/opleiders` (Voor opleiders, inline `OpleiderIntake` intake page with the key supply-side questions, added 2026-07-08), `/subsidies` ("Wat het de werkgever kost": financing fan + regelingen-overzicht naar rijksoverheid.nl LLO en business.gov.nl, stand juli 2026; renamed from /pricing on 2026-07-07), `/richtingen/[slug]` (course catalogue per richting: `techniek`=01, `sociaal`=02, `eigen-vak`=03; pillars renumbered/reordered 2026-07-08 so eigen-vak is last), `/vision`.
- `app/layout.tsx` wraps everything in `LangProvider` (NL/EN in React context, persisted to localStorage as `ps-lang`) + shared `Nav` + `Footer`. Nav tabs (7, all kept in the bar per 2026-07-08 request): Productive Switch, Productive Restructure, Voor deelnemers, Voor opleiders, Hoe het werkt (`/#how` anchor), Subsidies, Onze visie, NL-EN toggle; right: Upload CV (CV mailto modal) + Contact. Nav font/spacing were tightened to fit 7 tabs and the burger breakpoint moved from 1150px to 1240px. Desktop socials live in the mobile menu. `html` carries `data-scroll-behavior="smooth"`; `components/useHashScroll.ts` + a nav click handler cover anchor scrolling across routes.
- Homepage photos live in `public/photos/` (richting-eigen-vak.webp, richting-techniek.jpg, richting-sociaal.jpg for the three pillars; visie.jpg for the visie split), supplied by Douwe on 2026-07-07; the Unsplash placeholders are gone from the homepage (the restructure-hero still uses one).
- `lib/courses.ts` — the full course catalogue transcribed from the internal marktverkenning Excel (juli 2026): ~85 courses across three `richting` values `techniek` | `sociaal` | `domein`, with normalized filter fields (veld, aanbieder, duur + duurCat, binnen-1-maand ja/deels/nee, vorm, prijs + prijsCat, erkenning, url). The `domein` set (added 2026-07-08 from the Excel's "AI-trainingen kantoor" sheet) is AI-bijscholing per vakgebied: velden ai-basis, support, marketing, communicatie, finance, hr, juridisch. Prices are third-party provider prices, always labeled indicatief/ex btw (our own fee still never appears). `components/CoursesPage.tsx` maps slug `eigen-vak`→richting `domein` and now renders the same left filter sidebar (veld, aanbieder, duur, binnen 1 maand, vorm, prijs) + card grid for all three richtingen, plus a `richting-switch` pill nav (jump between catalogues) and, for `eigen-vak` only, a compact radar intro figure ("Bijscholen in je eigen vak") above the grid. Don't put `.reveal` on the tall courses section: the 0.12 IntersectionObserver threshold can never be reached by elements much taller than the viewport.
- `components/RadarChart.tsx` — stylised re-drawing of the Anthropic Economic Index radar (theoretical vs observed AI usage). In the hero it carries the title "Potentiële en huidige waargenomen toepassing van AI per beroepscategorie" (per 2026-07-07 request; the "naar de Anthropic Economic Index" caption was removed there, the source credit lives on in the eigen-vak figure caption).
- `lib/data.ts` — bilingual placeholder data (destinations now carry `slug`). `partners` carries official logo files from `public/logos/` (UvA, Erasmus, Leiden, HvA, Nyenrode; LOI renders as a red wordmark because no free logo file exists). No partnership agreements exist yet; the ticker caption says "onder andere" on purpose.
- `components/Forms.tsx` — intake (multi-step), koffie, opleider modals + shared `CvModal` (mailto, Productive Restructure). `app/api/contact/route.ts` — serverless mail route (Resend if `RESEND_API_KEY` + `CONTACT_FROM` set, else 503 → client mailto fallback to info@productiveswitch.nl). `app/vision/page.tsx` — bilingual vision page (content = "Productive Switch - Visie.docx", juli 2026: missie, drie overtuigingen, anker, terugval-zin; the internal "wat we bewust niet claimen" section is deliberately not published). All global CSS lives in `app/globals.css`.
- Animations are CSS + IntersectionObserver only (reveal/stagger via `useReveal()` per page, tickerMove marquee, slowZoom, bounceSlow); no GSAP or framer-motion, prefers-reduced-motion respected everywhere.
- **CTA hierarchy:** werkgevers-intake primary, koffie warm second, opleiders-ingang a distinct third (supply side, never overshadowing the employer CTA).
- Social links are guesses (linkedin.com/company/productiveswitch, instagram.com/productiveswitch); swap in the real handles once they exist.
- node/npm not on default PATH: `export PATH="/opt/homebrew/bin:$PATH"`.

## Design Language

### Aesthetic
- **Tone**: Editorial, human, trustworthy. Think magazine spread, not corporate SaaS.
- **Warmth**: Paper/cream backgrounds, deep ink text, intentional colour accents per pathway.
- **Restraint**: Generous whitespace, clear hierarchy, no clutter. Elegance > maximalism.
- **Motion**: Subtle, purposeful. Staggered page load reveals, hover lifts, smooth transitions. No gratuitous animation.

### Colour System
Warm paper/ink base with the infographic accent palette (decided 2026-07-04: accents on the editorial base, never a full palette swap). Use these as CSS variables throughout (defined in `app/globals.css`):

```
--paper: #F6F1E8        (backgrounds, neutral canvas)
--paper-2: #FBF8F2      (cards, surfaces)
--ink: #211C16          (primary text)
--ink-soft: #5A5246     (secondary text)
--line: #E4DBCB         (borders, dividers)

--switch: #1E8CA3       (Switch brand teal; also pathway 01)
--hire: #2B4C8C         (Hire brand blue)

--col-domain: #1E8CA3   (01 own field, teal)
--col-tech: #DB9A00     (02 trades, yellow; use --col-tech-deep #A87400 for text on light)
--col-social: #C2452D   (03 social sector, red/orange)
--navy: #3A4458         (dark bands, 4th step accent)
```

Fan-section gradients: red #C22558→#E8622C, yellow #F2B200→#DB9A00, teal #2AA5BD→#15808F. On the yellow card text is ink, not white.

### Typography
- **Display (headings)**: Fraunces (serif), weights 400–600. Generous letter-spacing, line-height 1.15 for clarity.
- **Body (copy, labels)**: Archivo (sans-serif), weights 400–600. Smaller, tighter line-height (1.4–1.6).
- **All fonts** imported from Google Fonts — no local files.

### Component Patterns

**Tiles**:
- Rounded corners (18px), subtle borders, lifting hover effect.
- Curated tiles: coloured 4px top bar, verification badges, certification labels.
- Open tiles: community vibes, maker avatars (circle), star ratings.

**Cards within tiles**:
- Institution avatars (initials in squares), maker avatars (initials in circles).
- Badges: small, pill-shaped, use the pathway colour + soft background.
- Metadata: always right-aligned, muted colour.

**Buttons**:
- Primary (dark ink on paper): strong CTA.
- Ghost (border only): secondary action.
- Rounded (border-radius 999px).
- Smooth hover: lift 2px, slight shadow.

**Grid**:
- 3-column on desktop, 1-column on mobile.
- Consistent 16px gap between tiles.
- Max container width: 1120px, padding: 0 24px.

## Content Model

### Showcase Grid Structure
- **Two rows**: "Curated" (accredited institutions + top professional content) and "Open" (community makers).
- **Three columns**: Stay in domain, Into social work, Into hands-on work.
- Each column has a unique icon (Compass, Heart, Wrench) and colour.

### Curated Tile
Shows 2 featured programmes per pathway:
- Institution name/logo (as initials avatar)
- Course title
- Certification/accreditation badge (e.g., "Erkend diploma", "Diplomagericht")
- Duration (weeks)

### Open Tile
Shows 2 top maker courses per pathway:
- Maker name + initials avatar
- Course title
- Star rating + review count
- Total counts: "X makers · Y modules" in header

### Data Is Placeholder
All course names, institutions, maker names, and review counts are placeholders. They swap out; the structure stays.

## Architecture

### File Organization
- `app/page.tsx` — Main landing page component (header, hero, showcase grid)
- `app/layout.tsx` — Root layout (fonts, globals, design tokens)
- `app/globals.css` — CSS variables, global resets, utility classes
- `components/` — Reusable tile components, header, hero sections
- `lib/data.ts` — Placeholder data exports (easy to swap for real data later)

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + CSS variables for design tokens
- **Animations**: CSS + (optional) Framer Motion for more complex sequences
- **Icons**: lucide-react (Compass, Heart, Wrench, Users, BadgeCheck, Star, etc.)
- **Fonts**: Google Fonts API (Fraunces, Archivo)

## Development Principles

1. **Component-first**: Break tiles, buttons, headers into reusable pieces. Avoid one-off inline styles.
2. **CSS variables for theming**: Never hardcode colours. Use `var(--col-social)` so swapping entire colour schemes is one edit.
3. **Accessibility**: Semantic HTML, sufficient contrast, keyboard navigation on interactive elements.
4. **Mobile-first CSS**: Write mobile styles first, then enhance with media queries for desktop.
5. **Placeholder-ready**: All text and data comes from `lib/data.ts`. Swapping real data later requires zero code changes.

## Copy & Tone

- **Hero headline**: Direct, hopeful. Speak to the person who just lost a job: "When a role ends, a career doesn't have to."
- **Section labels**: Authoritative but warm. "Gecureerd" (curated), "Open makersmarkt" (open maker market).
- **Descriptions**: Conversational, concrete. Not buzzwords. "Care, education and community — work that puts people first."
- **Buttons**: Action-oriented. "Book a walkthrough", "Explore the paths".

## Known Future Work

- Phase 1: Add account creation, gated content, video player mocks
- Phase 2: Real backend (auth, database, Stripe), actual video hosting
- Phase 3: Two-sided marketplace (trainers + companies + candidates)

For now: focus on the showcase as a sales asset and foundation. Every pixel counts.

## Questions for Product Decisions

1. **Promotion path**: How does a strong open/community course move to "curated"? Should this be visible in the UI?
2. **Filtering**: Should users be able to filter by duration, level, or topic on the showcase, or is the 3×2 grid the only entry point?
3. **Logged-in state**: What should the authenticated experience look like? Saved courses? Recommendations? Progress tracking?

Document these as they're decided, so future Claude Code sessions stay aligned.
