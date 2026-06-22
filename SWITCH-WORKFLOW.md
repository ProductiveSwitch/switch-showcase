# Switch Design & Development Workflow

A living guide for how to evolve the website from idea through design, code, and deployment using Claude chat, Claude Design, and Claude Code.

## The Three Tools & When to Use Each

### 1. Claude Chat (this interface)
**When to use:** Strategy, brainstorming, thinking through changes before implementing them.

- Discuss design direction and get feedback
- Plan content changes and copy iteration
- Document decisions and reasoning
- Ask for advice on approach before committing to code
- Review competitor/inspiration research
- Workshop copy and messaging

**Output:** Ideas, concepts, and decisions documented so you can hand them to Claude Code or Claude Design.

### 2. Claude Design (canvas.claude.com/design)
**When to use:** Visual iteration — explore multiple directions, tweak spacing/color/layout, refine the look before code.

- Design new pages or sections
- Explore colour palette variations
- Test layout ideas (mobile vs desktop)
- Iterate on the hero, tiles, or other components visually
- Create interactive prototypes to share with stakeholders
- Generate code that Claude Code can then refine further

**Output:** Production-ready HTML/CSS/JavaScript that Claude Code imports or ports into the Next.js project.

**Note:** Claude Design is for *visual exploration*. Once a direction is locked, hand it to Claude Code for production implementation.

### 3. Claude Code (terminal CLI)
**When to use:** Implementation — building, refactoring, deploying. The agent that actually edits your codebase.

- Scaffold new pages and components
- Implement design changes from Claude Design into the Next.js project
- Update CLAUDE.md when the design language evolves
- Refactor and optimize code
- Run tests and build checks
- Push to GitHub and trigger Vercel deployments
- Add new features (accounts, video, payments, etc.)

**Output:** Updated files in your project, committed to Git, deployed to Vercel.

---

## The Full Workflow Loop

### Phase 1: Think (Claude Chat)
Start here when you have a change or new idea.

1. Open this chat interface
2. Describe what you want to change: "I want to soften the social work colour" or "Let's add a FAQ section"
3. Discuss trade-offs, get options, lock a direction
4. Document the decision in the chat

**Output:** A clear brief of what to build.

---

### Phase 2: Design (Claude Design)
For visual changes, explore before coding.

1. Go to https://canvas.claude.com/design (or access from claude.ai sidebar)
2. Upload a screenshot of the current state, or describe what you want to change
3. Ask Claude Design to explore 2–3 directions
4. Use inline comments and adjustment knobs to refine spacing, colour, and layout
5. Once a direction feels right, export as HTML or code

**When to skip:** If it's a small text change or minor tweak, you can go straight to Claude Code.

**Output:** A visual direction locked. Share the link with others for feedback if needed.

---

### Phase 3: Code (Claude Code)
Implement the design into the live Next.js project.

1. In Terminal, from your `switch-showcase` folder, run `claude`
2. Paste a prompt describing the change, referencing the design direction:
   ```
   The social work pathway colour should shift from #BC5B38 to [new colour].
   Update the curated and open tiles, badges, and accents to use the new colour.
   Update CLAUDE.md in the design system section to reflect this change.
   ```
3. Claude Code edits the files, updates CLAUDE.md, and runs checks
4. Once done, run `npm run dev` to verify locally
5. Commit and push:
   ```
   git add .
   git commit -m "Update social work pathway colour"
   git push
   ```

**Output:** Changes live on Vercel within 60–90 seconds of the push.

---

### Phase 4: Deploy
Automatic, but worth understanding.

1. Push to `main` branch on GitHub (step 5 above)
2. Vercel detects the push and rebuilds the site
3. ~60–90 seconds later, your live site at `https://your-domain.nl` reflects the changes
4. Check it's live, then message/screenshot to stakeholders if needed

**Output:** Live changes in production.

---

## Keeping CLAUDE.md in Sync

**CLAUDE.md is the source of truth for design language, architecture, and philosophy.** It lives in your project root and tells Claude Code how to make decisions on future iterations.

### When to update it:
- After any design direction change (colours, fonts, spacing philosophy)
- After any architecture decision (adding new pages, changing how data flows)
- When you finalize copy guidelines or tone changes
- When product decisions are locked (e.g., how curated → open promotion works)

### How to update it:
In Claude Code, ask:
```
Update CLAUDE.md: Change the paper background from #FAF6EE to [new value].
Add a note that the social work pathway now uses [new colour].
```

Claude Code edits the file, commits, and pushes. Done.

---

## Common Workflows & Examples

### Workflow: "Change a colour across the whole site"

1. **Chat:** "The domain pathway blue (#2D5A6B) feels too corporate. What warmer blue could work?"
2. **Design:** (Optional) Explore 2 new blues in Claude Design, refine one
3. **Code:** Paste this to Claude Code:
   ```
   Change the domain pathway colour from #2D5A6B to [new colour] across:
   - CSS variables in globals.css
   - Tile accents and badges
   - Hover states
   Update CLAUDE.md with the new colour value.
   ```
4. **Deploy:** Push to main, check live

---

### Workflow: "Add a new section to the homepage"

1. **Chat:** "I want to add a 'How it works' section above the showcase grid. What should it show?"
2. **Design:** Create a mockup in Claude Design showing the layout and visual hierarchy
3. **Code:** Ask Claude Code to:
   ```
   Add a new "How it works" section to /app/page.tsx based on this design: [description or link].
   Use the same design tokens and Tailwind config.
   Make it mobile-responsive.
   Update CLAUDE.md if this changes the architecture.
   ```
4. **Deploy:** Push, verify live

---

### Workflow: "Rewrite the hero copy and test it"

1. **Chat:** "The hero headline feels generic. Let's workshop copy that speaks more directly to laid-off HR professionals."
2. **Design:** (Skip — this is pure copy, no visual change)
3. **Code:** Ask Claude Code:
   ```
   Update the hero section in /app/page.tsx:
   - Headline: "[new headline]"
   - Subheading: "[new subheading]"
   - Keep everything else the same.
   ```
4. **Deploy:** Push, share the live link with a few HR contacts for feedback

---

### Workflow: "Prepare for the real platform (Phase 2)"

1. **Chat:** "We're ready to add user accounts. What's the simplest auth flow to start with?"
2. **Design:** (Skip unless adding new UI screens)
3. **Code:** Claude Code can scaffold auth with Clerk, Supabase, or NextAuth + database
4. **Deploy:** New feature lives, phased rollout begins

---

## Tool Comparison at a Glance

| Task | Claude Chat | Claude Design | Claude Code |
|------|---|---|---|
| Brainstorm direction | ✓ | — | — |
| Explore visual options | — | ✓ | — |
| Implement changes | — | — | ✓ |
| Update CLAUDE.md | — | — | ✓ |
| Refactor code | — | — | ✓ |
| Deploy to Vercel | — | — | ✓ |
| Workshop copy | ✓ | — | — |
| Run tests | — | — | ✓ |
| Get feedback | ✓ | ✓ (via link) | — |

---

## The Rhythm (What You'll Actually Do)

**Week 1:** Chat → Design → Code → Deploy (large feature)
**Week 2:** Chat → Code → Deploy (smaller tweaks, no design needed)
**Week 3:** Chat → Design → Code → Deploy (another feature)

You'll spend most time in **Claude Code** (implementation) and **Chat** (thinking). **Claude Design** is for when visual exploration saves time versus just coding it and iterating.

---

## Connecting to GitHub & Vercel

Every workflow ends with the same two commands:

```bash
git add .
git commit -m "Brief description of change"
git push
```

Vercel watches `main` and auto-deploys. Your live site updates within ~90 seconds.

---

## Access Quick Links

- **Claude Chat (strategy & thinking):** https://claude.ai
- **Claude Design (visual iteration):** https://claude.ai/design or side-panel in chat
- **Claude Code (implementation):** Terminal — `claude` command
- **GitHub (source control):** https://github.com/productiveswitch/switch-showcase
- **Vercel (live deployment):** https://vercel.com/projects
- **Live site:** https://your-domain.nl (once custom domain is set up)

---

## Notes for Future Self

- CLAUDE.md is a living document. Update it as the design language and architecture evolve.
- Claude Code is the source of truth for what's actually in the codebase.
- Claude Design is for exploration; Claude Code is for implementation.
- Every push to GitHub triggers a live deployment. Be intentional with commits.
- Feedback loops: Chat → Design → Code → Live → Feedback → Chat. That's the rhythm.
