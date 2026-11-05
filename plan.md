# LearnMesh implementation plan

## Scope
Build a responsive academic intelligence dashboard for student and faculty demo profiles. The interface must keep the nine AI agents directly visible in a dedicated sidebar section, with only Tutor Agent using chat. Other agents use structured workspaces with context controls, evidence, workflow states, charts, tables, and action areas.

## Design direction
**Design movement:** Calm enterprise intelligence dashboard inspired by modern sustainability control rooms and premium academic software.

**Core principles:** 1) persistent navigation for fast context switching, 2) evidence before automation, 3) soft cards and restrained density, 4) clear role and academic context at all times.

**Color philosophy:** A deep charcoal sidebar anchors trust and focus. Warm off-white surfaces keep long study sessions comfortable. Sage, lime, and moss accents indicate momentum, mastery, and active AI states without feeling overly technical.

**Layout paradigm:** A fixed navigation rail paired with an airy, asymmetric content canvas. Overview cards and workspaces use stacked panels, intentional whitespace, and a few wide visual anchors rather than a rigid equal-grid admin layout.

**Signature elements:** Sage status dots, rounded evidence chips, and a subtle node-link “mesh” motif that appears in the logo, hero visualization, and knowledge graph.

**Interaction philosophy:** Navigation is explicit and low-friction. Buttons change local state, filters update displayed content, and every AI result exposes the evidence behind it.

**Animation:** Use short opacity/translate transitions on route changes, hover lift only on actionable cards, and slow pulsing for monitoring indicators. Avoid distracting motion in analytics or reading surfaces.

**Typography system:** Use a clean system sans stack with strong, compact headings and generous body line-height. Kicker labels are uppercase with letter spacing; page titles are large and calm; numeric metrics are bold but never oversized.

**Brand essence:** LearnMesh is the academic intelligence layer that connects a student’s learning evidence to their next best action. Personality: calm, evidence-led, encouraging.

**Brand voice:** Headlines should be precise and supportive: “Your learning signal is getting stronger.” CTAs should be direct: “Open learning roadmap” and “Run coordination.”

**Wordmark & logo:** A circular mesh mark made of three linked nodes beside the LearnMesh wordmark.

**Signature brand color:** Moss lime `#9CCB45`.

## Implementation approach
- Use the existing React + Vite + Wouter starter.
- Keep demo data local for this first product pass; actions update local component state and show deterministic feedback.
- Use a shared `AppShell` with sidebar, topbar, role switcher, route title, and a responsive drawer on small screens.
- Define agent metadata once and render all agents as independent direct links.
- Render dedicated page components for dashboard, portal modules, and each agent workspace. Agent pages share visual primitives but have distinct controls and layouts.
- Add a static `/manus-routes.json` manifest matching every implemented client route.
- Keep the managed server/database configuration intact for future persistence and AI service integration.

## Project structure
- `client/src/App.tsx`: route switch and provider shell.
- `client/src/pages/Home.tsx`: dashboard shell, navigation metadata, demo data, and page/workspace components.
- `client/src/index.css`: LearnMesh design tokens, responsive shell, card, chart, graph, table, and state styling.
- `public/manus-routes.json`: route declarations for Preview and published routing inspection.
- `plan.md`: implementation and design decisions.
- `TODO.md`: product outcomes and acceptance criteria.
