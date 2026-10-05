# Switch — Re-training Platform Showcase

## Project Context

**Productive Switch** is re-training that helps people build a second career when their role ends or changes. The live site is a Next.js app (deployed on Vercel at productiveswitch.nl) with two prominent tabs: **Productive Switch** (default, re-training) and **Productive Search** (renamed from Productive Hire on 2026-07-07, then to Productive Search on 2026-07-30; recruitment for senior HR and workforce-transition roles). One brand, both sides of the employment cycle.

The platform will eventually include accounts, video content, scheduling, and payments, but the current phase is the proposition + pitch + lead-capture asset.

### Proposition (current, load-bearing)

- Productive Switch is **not** an outplacement bureau and positions itself beside it. Outplacement is work-to-work; Productive Switch is **work to a new vak, with an employer at the end**. Short, targeted re-training plus a guidance layer (intake by a certified career coach) is the differentiator. The guidance layer is what makes us a transition partner instead of a course broker.
- **Audience / payer: the employer.** All copy addresses the HR decision-maker (and works council) at a reorganisation, who wants their people to land well and must justify the choice internally. Not the learner.
- **Three directions, with accent on 2 and 3** (structural demand + subsidy money + strongest employer link): (1) stay in your own field — the broad funnel, where working with AI is the upskilling, framed as opportunity never fear; (2) social sector (zorg, welzijn, onderwijs); (3) hands-on and technical work.
- **Financing is a sales argument**, three stackable sources: transitiebudget (tax-friendly when spent on re-training), cao/O&O training budgets, and SLIM subsidy (we handle the application; never framed as guaranteed). Shown indicatively, never as a calculator. **Never show our own fee; no bedragen/tarieven on the site.**
- **Employer link = proposition + concierge, not a marketplace.** No placement infra, no job guarantee, no hard SLIM promise.

### Voice

All copy follows the **productive-switch-voice** skill: NL-first with EN toggle (re-expression, not literal translation), informal je/jij, human-first but always concrete, hopeful never fear-based, clear over clever. Anchor "Leren om te blijven leren" used sparingly. **Hard rule: never an em dash** (use comma, period, colon, parentheses, or "en").

### Architecture notes (current, herzien 2026-09-13)

- Real routes with a shared fixed nav. Routes: `/` (HomePage: brand-level landing, hero H1 "Werving voor senior HR-transformaties, en omscholing via gerichte outplacementtrajecten." with the netwerk-intro lede, two service buttons, interactive radar right, then the `NetworkConnector` section, two service cards, a dark "Waarom nu" band and a contact band; the partner ticker was removed 2026-09-13 because no partnerships exist yet), `/productive-switch` (ProductiveSwitchPage: full-bleed teal hero like the Search page, with the three directions as a side card; then `#how` with five steps (start online, intake, loopbaancoach, omscholing, lijn naar werkgevers; copy by Douwe 2026-10-05) ABOVE the pillars, subsidies teaser, testimonial, visie split, vision line, `#contact` band, opleider band; nav tab "Productive Switch" and "Hoe het werkt" point here), `/productive-search` (Productive Search: full-bleed blue hero without photo, "Wat er op HR afkomt" shifts, role types grid, vacancies (the Advisory band was removed 2026-10-05; `advisoryItems` still exists in data but is unused), testimonial, contact; a permanent redirect from `/restructure` lives in `next.config.ts`), `/blog` (BlogPage: list with date, title, teaser and "Lees meer") and `/blog/[slug]` (BlogPost, static params from `lib/posts.ts`; first post "Omscholing is belangrijker dan ooit", added 2026-10-05; add posts to the array), `/contact` (ContactPage, added 2026-10-05: forest hero + five entry tiles (reorganisatie, vacature, deelnemer, loopbaancoach, opleider) + CV upload; each tile opens `IntakeForm` with `initialWho`/`initialGoal` preset; `?rol=hr|vacature|deelnemer|coach|opleider` opens it directly. Every "Kom in contact", "Plan een intake", "Bespreek je vacature" and the nav Contact button link here; the per-page contact bands only link, they hold no forms anymore), `/deelnemers` (green hero with an account card: "Account aanmaken" sends a sign-up mail via the contact route, "Inloggen" shows a "in voorbereiding" notice because there is no account system yet; added 2026-10-05), `/opleiders`, `/subsidies`, `/richtingen/[slug]` (`techniek`=01, `sociaal`=02, `eigen-vak`=03), `/vision` ("De visie": forest full-bleed hero with "Op deze pagina" side card and a single "Blogs" button; order: three convictions (rewritten by Douwe 2026-10-05), anchor band, blog list (same cards as /blog), contact band (the fallback-sentence block was removed 2026-10-05); the old `vision.module.css` is gone, it uses the shared classes).
- `app/layout.tsx` wraps everything in `LangProvider` (NL/EN, persisted as `ps-lang`) + shared `Nav` + `Footer`. Nav tabs since 2026-10-05: Productive Switch, Productive Search, Voor deelnemers, De visie (Voor opleiders, Hoe het werkt and Subsidies were removed from the bar; the pages still exist and are linked from content). Nav gets `nav--ondark` (white text) on `/productive-search`, `/productive-switch`, `/vision` and `/deelnemers` until scrolled, because those heroes are solid colour bands. Burger breakpoint 1240px. `html` carries `data-scroll-behavior="smooth"`; `components/useHashScroll.ts` + a nav click handler cover anchor scrolling across routes.
- `components/NetworkConnector.tsx` — 2D "netwerkconnector" on the homepage: two hubs in the middle (Productive Search, Productive Switch; merged from three on 2026-10-05), six nodes from `networkNodes` in `lib/data.ts` (HR-leiders, senior HR-kandidaten, coaches, opleiders, organisaties met blijvende vraag, medewerkers; each node lists its `hubs` and `links`, HR-leiders link to medewerkers); hover/click lights the links and swaps the text panel. Pure SVG + React state. Built from the brief; Douwe's own Claude Design file ("Netwerkconnector 2D", claude.ai/design share link) could not be opened from Code, so compare and align when he shares an export.
- `components/RadarChart.tsx` — one-to-one re-drawing of figure 2 in Anthropic, "Labor market impacts of AI" (5 maart 2026): 22 categories in the original order, theoretical vs observed AI coverage. Seven values are exact from the report text, the rest read off the chart (±2 pts); source line under the legend. The `figure` variant is interactive (hover/tap a sector shows the percentages) and has a toggle that adds the orange "LLM and robot exposure" series from Anthropic, "What work can robots do?" (30 sept 2026, figure 6), read off the chart.
- Homepage/Switch photos live in `public/photos/` (three richting photos + visie.jpg). The Unsplash placeholder on the Search page is gone.
- `lib/data.ts` also holds `hrShifts`, `roleTypes`, `advisoryItems` (Search content) and `networkNodes`. `partners` still exists but is no longer rendered anywhere.
- `lib/courses.ts` — the full course catalogue transcribed from the internal marktverkenning Excel (juli 2026): ~85 courses across three `richting` values `techniek` | `sociaal` | `domein`, with normalized filter fields (veld, aanbieder, duur + duurCat, binnen-1-maand ja/deels/nee, vorm, prijs + prijsCat, erkenning, url). The `domein` set (added 2026-07-08 from the Excel's "AI-trainingen kantoor" sheet) is AI-bijscholing per vakgebied: velden ai-basis, support, marketing, communicatie, finance, hr, juridisch. Prices are third-party provider prices, always labeled indicatief/ex btw (our own fee still never appears). `components/CoursesPage.tsx` maps slug `eigen-vak`→richting `domein` and now renders the same left filter sidebar (veld, aanbieder, duur, binnen 1 maand, vorm, prijs) + card grid for all three richtingen, plus a `richting-switch` pill nav (jump between catalogues) and, for `eigen-vak` only, a compact radar intro figure ("Bijscholen in je eigen vak") above the grid. Don't put `.reveal` on the tall courses section: the 0.12 IntersectionObserver threshold can never be reached by elements much taller than the viewport.
- `components/RadarChart.tsx` — stylised re-drawing of the Anthropic Economic Index radar (theoretical vs observed AI usage). In the hero it carries the title "Potentiële en huidige waargenomen toepassing van AI per beroepscategorie" (per 2026-07-07 request; the "naar de Anthropic Economic Index" caption was removed there, the source credit lives on in the eigen-vak figure caption).
- `lib/data.ts` — bilingual placeholder data (destinations now carry `slug`). `partners` carries official logo files from `public/logos/` (UvA, Erasmus, Leiden, HvA, Nyenrode; LOI renders as a red wordmark because no free logo file exists). No partnership agreements exist yet; the ticker caption says "onder andere" on purpose.
- `components/Forms.tsx` — intake (multi-step), koffie, opleider modals + shared `CvModal` (mailto, Productive Search). `app/api/contact/route.ts` — serverless mail route (Resend if `RESEND_API_KEY` + `CONTACT_FROM` set, else 503 → client mailto fallback to info@productiveswitch.nl). `app/vision/page.tsx` — bilingual vision page (content = "Productive Switch - Visie.docx", juli 2026: missie, drie overtuigingen, anker, terugval-zin; the internal "wat we bewust niet claimen" section is deliberately not published). All global CSS lives in `app/globals.css`.
- Animations are CSS + IntersectionObserver only (reveal/stagger via `useReveal()` per page, tickerMove marquee, slowZoom, bounceSlow); no GSAP or framer-motion, prefers-reduced-motion respected everywhere.
- **CTA hierarchy:** werkgevers-intake primary, koffie warm second, opleiders-ingang a distinct third (supply side, never overshadowing the employer CTA).
- Social links are guesses (linkedin.com/company/productiveswitch, instagram.com/productiveswitch); swap in the real handles once they exist.
- node/npm not on default PATH: `export PATH="/opt/homebrew/bin:$PATH"`.

## Design Language

### Aesthetic (herzien 2026-09-13)
- The cream-paper + Fraunces-serif + blurred gradient blobs + pastel fills look was dropped on 2026-09-13 because it read as a generic AI-generated site. Do not bring those back.
- **Tone**: confident, flat, editorial. Neutral off-white canvas, near-black ink, solid colour blocks (blue, teal, black) for bands and cards, hard 1px lines, modest corner radius (12px cards, 20px large cards, 8px buttons). Reference: `Design inspo/` screenshot (flat colour cards, geometric sans).
- **Restraint**: whitespace and hierarchy do the work. No blur blobs, no floating photos, no gradient backgrounds, no pastel tints as section backgrounds.
- **Motion**: CSS-only reveals and hover lifts; the two interactive figures (radar, netwerkconnector) respond to hover/tap. prefers-reduced-motion respected.

### Colour System (herzien 2026-10-04)
Naar vier Behance-referenties die Douwe aandroeg (Northline recruitment, NexHiro SaaS, SpinePro training, Wanglow): diep bosgroen als donkere basis, mint als accent, warmgrijze neutralen, één gedempt marineblauw voor Search. Defined as CSS variables in `app/globals.css`:

```
--paper: #EEEFEA        (page background, warm grey)
--paper-2: #F8F8F5      (cards, hero surface)
--ink: #152523          (text only, never as a fill)
--ink-soft: #55615D
--line: #D6D9D2

--forest: #1E3A35       (all dark bands, primary buttons, netwerk hubs; --navy aliases to it)
--mint: #A9D9B3         (accent on dark: eyebrows, links, btn-light)
--mint-deep: #3E8A6A    (eyebrows on light)
--switch: #2F7A6A       (Productive Switch jungle green)
--hire: #24456F         (Productive Search muted navy; --hire-deep #18324F)
--col-tech: #D9A43B     (trades ochre; --col-tech-deep for text on light)
--col-social: #C9644A   (social sector terracotta)
--radar-theo / --radar-obs: #2F6FB5 / #D8503F (radar only)
```

No pure black, no pure white surfaces, no pastel section backgrounds, no gradients. Per service page the accent is consistent: everything on `/productive-switch` (`.switch-page`) is green (`--switch`, dark bands `--switch-deep`), everything on `/productive-search` (`.hire`) is blue (`--hire`, dark bands `--hire-deep`); the homepage keeps forest for its dark bands. Overrides live at the end of `globals.css`.

### Typography
- **Display (headings)**: Poppins (geometric, after the Northline reference), weights 400–700, letter-spacing -0.02em. Hero H1 is weight 500 so it does not shout.
- **Body (copy, labels)**: Inter.
- Both via `next/font/google` in `app/layout.tsx` (variables `--font-poppins`, `--font-inter`). Douwe chose this "Northline" set on 2026-10-05 from four Behance-based palette/font variants (NexHiro, SpinePro, Wanglow were the others; removed).

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
- `btn-ink` (black) is the primary CTA on light surfaces; `btn-light` (white) on dark or blue bands.
- `btn-ghost` (ink border) secondary on light; `btn-ghost-light` (white border) on dark.
- border-radius 8px, no pills. Hover: 1px lift.

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
- **Animations**: CSS + IntersectionObserver only (no GSAP/framer-motion)
- **Icons**: lucide-react (Compass, Heart, Wrench, Users, BadgeCheck, Star, etc.)
- **Fonts**: Google Fonts via next/font (Outfit, Archivo)

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

## Taskboard (taken.samba-mate.com)

The Productive Switch to-do list lives on the shared online taskboard at https://taken.samba-mate.com/board.html. **This project's board is `productiveswitch`** (Douwe only; Rory can't see it). When the user asks to add, complete, move, or list tasks, use the helper script:

```bash
~/.claude/scripts/taskboard.sh get productiveswitch                       # read the board
~/.claude/scripts/taskboard.sh add productiveswitch "Titel" \
    --cat website --wie douwe [--urgent] [--section "In progress"] \
    [--note "vrije tekst"] [--int YYYY-MM-DD] [--def YYYY-MM-DD]          # quick add
~/.claude/scripts/taskboard.sh post productiveswitch <file>               # replace whole board
```

- Auth: bearer token in `~/.config/samba-taskboard/token`. If the script says "no token", ask the user to paste the `API_TOKEN` from Vercel (samba-taskboard project → Settings → Environment Variables) into that file.
- The API is **whole-board read-modify-write** (TASKS.md markdown). For anything beyond a quick add: `get` into a temp file, edit the markdown, `post` it back. Never post a partial document; the script refuses posts that halve the task count unless `--force`.
- Format: `- [ ] **Titel** {cat:…; wie:…; urgent; int:YYYY-MM-DD; def:YYYY-MM-DD; claude} :: notitie` under one of `## Upcoming`, `## To start`, `## In progress`, `## Almost finished`, `## Awaiting response`, `## History`. Sub-taken zijn ingesprongen `  - [ ] …` regels eronder. `int:` = streefdatum, `def:` = harde deadline. Tag `claude` marks tasks Claude added or can help with.
- Completing a task = move its line (plus sub-lines) to `## History`, flip to `[x]`, and add `done:YYYY-MM-DD` inside the `{…}`.
- Common values: `cat:` productie, boekhouding, website, marketing, investeringen, compliance, anders; `wie:` douwe, rory, allebei.
- New and completed tasks trigger a Telegram ping (productiveswitch board → Douwe's private chat only), so don't post test noise to the live board.
