# Switch — Re-training Platform Showcase

## Project Context

**Productive Switch** is re-training that helps people build a second career when their role ends or changes. The live site is a Next.js app (deployed on Vercel at productiveswitch.nl) with two prominent tabs: **Productive Switch** (default, re-training) and **Productive Hire** (recruitment for senior HR roles). One brand, both sides of the employment cycle.

The platform will eventually include accounts, video content, scheduling, and payments, but the current phase is the proposition + pitch + lead-capture asset.

### Proposition (current, load-bearing)

- Productive Switch is **not** an outplacement bureau and positions itself beside it. Outplacement is work-to-work; Productive Switch is **work to a new vak, with an employer at the end**. Short, targeted re-training plus a guidance layer (intake by a certified career coach) is the differentiator. The guidance layer is what makes us a transition partner instead of a course broker.
- **Audience / payer: the employer.** All copy addresses the HR decision-maker (and works council) at a reorganisation, who wants their people to land well and must justify the choice internally. Not the learner.
- **Three directions, with accent on 2 and 3** (structural demand + subsidy money + strongest employer link): (1) stay in your own field — the broad funnel, where working with AI is the upskilling, framed as opportunity never fear; (2) social sector (zorg, welzijn, onderwijs); (3) hands-on and technical work.
- **Financing is a sales argument**, three stackable sources: transitiebudget (tax-friendly when spent on re-training), cao/O&O training budgets, and SLIM subsidy (we handle the application; never framed as guaranteed). Shown indicatively, never as a calculator. **Never show our own fee; no bedragen/tarieven on the site.**
- **Employer link = proposition + concierge, not a marketplace.** No placement infra, no job guarantee, no hard SLIM promise.

### Voice

All copy follows the **productive-switch-voice** skill: NL-first with EN toggle (re-expression, not literal translation), informal je/jij, human-first but always concrete, hopeful never fear-based, clear over clever. Anchor "Leren om te blijven leren" used sparingly. **Hard rule: never an em dash** (use comma, period, colon, parentheses, or "en").

### Architecture notes (current)

- `components/Site.tsx` — the whole client app (brand tabs, lang toggle, destinations, how-it-works, financing, vacancies, testimonials, logo wall, CTA modals). `lib/data.ts` — all bilingual placeholder data + structured content. `components/Forms.tsx` — intake (multi-step), koffie, opleider modals. `app/api/contact/route.ts` — serverless mail route (Resend if `RESEND_API_KEY` + `CONTACT_FROM` set, else 503 → client mailto fallback to info@productiveswitch.nl). `app/vision/page.tsx` — vision page (CSS module). All prototype CSS lives in `app/globals.css`.
- **CTA hierarchy:** werkgevers-intake primary, koffie warm second, opleiders-ingang a distinct third (supply side, never overshadowing the employer CTA).
- node/npm not on default PATH: `export PATH="/opt/homebrew/bin:$PATH"`.

## Design Language

### Aesthetic
- **Tone**: Editorial, human, trustworthy. Think magazine spread, not corporate SaaS.
- **Warmth**: Paper/cream backgrounds, deep ink text, intentional colour accents per pathway.
- **Restraint**: Generous whitespace, clear hierarchy, no clutter. Elegance > maximalism.
- **Motion**: Subtle, purposeful. Staggered page load reveals, hover lifts, smooth transitions. No gratuitous animation.

### Colour System
Use these as CSS variables throughout:

```
--paper: #FAF6EE       (backgrounds, neutral canvas)
--panel: #FFFFFF       (cards, surfaces)
--ink: #1B1A17         (primary text, highest contrast)
--muted: #6E675C       (secondary text, labels, metadata)
--line: #E7DFD0        (borders, dividers)

--col-domain: #2D5A6B  (domain/skills pathway)
--col-domain-soft: #EAF0F2

--col-social: #BC5B38  (social work pathway)
--col-social-soft: #F7E9E0

--col-physical: #3E6B47 (hands-on work pathway)
--col-physical-soft: #E7EFE8
```

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
