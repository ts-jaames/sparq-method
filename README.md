# Evidence-Driven Delivery

An interactive specification for evidence-driven delivery — replacing calendar-driven commitment with evidence-gated promotion.

## Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

Static output lands in `dist/` — deployable to GitHub Pages, Vercel, Netlify, or any static host.

## Structure

Astro-powered microsite with 8 navigable pages, a persistent sidebar, command palette (Cmd+K), and interactive visualizations.

```
src/
├── layouts/BaseLayout.astro        # Shared shell: sidebar + content area
├── components/
│   ├── Sidebar.astro               # Persistent nav with section groups
│   ├── CommandPalette.astro        # Cmd+K search across pages and glossary
│   ├── PageNav.astro               # Prev/Next page navigation
│   ├── FunnelDiagram.astro         # Fig 1B — animated funnel with canvas particles
│   └── GlossaryTooltip.astro       # Inline glossary term hover
├── styles/global.css               # Extracted and extended from original design
└── pages/
    ├── index.astro                 # Overview / landing
    ├── philosophy.astro            # The Shift (Fig 1A, 1B)
    ├── model/
    │   ├── operating-model.astro   # Operating Model (Fig 2A, 2B)
    │   └── applied-flow.astro      # Applied Flow (Fig 3)
    ├── practice/
    │   ├── backlogs.astro          # Dual Backlogs (Fig 4)
    │   ├── engagement.astro        # Engagement Shape (Fig 4A, 4B) — interactive toggles
    │   └── implementation.astro    # Jira Implementation (Fig 5A, 5B)
    └── reference.astro             # Glossary + Operational Constraints
```

The original `index.html` is preserved in the repo root for reference.
