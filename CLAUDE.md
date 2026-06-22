# Switch — Re-training Platform Showcase

## Project Context

**Switch** is a re-training platform that helps people transition careers when they lose their jobs. This is the public showcase site — a landing page that speaks to HR buyers and prospective learners, showing three career pathways (stay in domain, into social work, into hands-on work) through a curated + open marketplace model.

The platform will eventually include accounts, video content, scheduling, and payments, but Phase 0 is the visual foundation and pitch asset.

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
