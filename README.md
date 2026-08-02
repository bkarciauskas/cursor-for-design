# Loop — a Cursor for Design demo app

A small, realistic product used to demonstrate the **Figma → Cursor → Figma**
workflow to a design audience. Loop is a fictional design-review tool. It is
deliberately ordinary: a token layer, a handful of primitives, and four screens.
That ordinariness is the point — it stands in for the audience's own codebase.

The app ships with a presenter mode at [`/demo`](http://localhost:3000/demo)
containing the run of show, the exact prompts to paste, and what the audience
should see at each beat.

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

**Before presenting, do the [Figma pre-flight](figma/README.md).** It also
covers the Figma seat requirement, which is the most common way this demo
fails.

## The screens

| Route       | Role in the demo                                                        |
| ----------- | ----------------------------------------------------------------------- |
| `/`         | Dashboard. The screen pushed *into* Figma in Act 1.                      |
| `/reviews`  | A dense table view. Useful as a second push target if asked.             |
| `/library`  | The design system: tokens, primitives, Code Connect status.              |
| `/insights` | Deliberately unbuilt. The target of the Figma → Cursor act.              |
| `/demo`     | Presenter notes. Not part of the fictional product.                      |

## How the demo is wired

**Tokens.** Every colour, radius, and type value lives in the `@theme` block of
`src/app/globals.css`, with dark-mode overrides in the `.dark` block directly
below. Nothing else in the app contains a raw hex value. This is what makes the
token round-trip to Figma variables legible — the token list is short, named,
and in one file.

**Primitives.** `src/components/ui` holds Button, Badge, Card, Avatar,
StatCard, Progress and TrendChart. Screens are assembled from these, so when
Cursor implements the Insights design it has real components to reuse rather
than generating one-off markup.

**The unbuilt screen.** `/insights` renders a placeholder that names itself as
the demo's starting point and carries a copy-paste prompt. `figma/insights-spec.md`
is the full design spec, which doubles as the acceptance criteria — if the
implementation introduces a new hex value, the demo has gone wrong.

**Figma links.** `src/lib/demo-config.ts` holds the file and frame URLs. The
`/insights` and `/demo` pages read from it, so there is one place to update when
the Figma file is regenerated.

## Resetting between runs

The reset relies on git, so make the initial commit before your first run:

```bash
git add -A && git commit -m "Initial commit"
```

Afterwards, restoring the placeholder is one command:

```bash
git checkout src/app/insights/page.tsx
```

In Figma, delete the `Dashboard — from code` frame and the `Dark` variable mode
the demo added. The demo script's progress checkboxes reset from the button on
`/demo`.

## Scripts

| Command                     | What it does                                        |
| --------------------------- | --------------------------------------------------- |
| `npm run dev`               | Dev server on port 3000                             |
| `npm run build`             | Production build                                    |
| `npm run lint`              | ESLint                                              |
| `node scripts/shots.mjs`    | Screenshots every route in both themes to `shots/`  |

`scripts/shots.mjs` and `scripts/console-check.mjs` are development aids for
verifying the app renders cleanly. They need the dev server running.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, lucide-react.
