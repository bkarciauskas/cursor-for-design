# Figma pre-flight

The demo needs a Figma file in a specific starting state. Do this **before** you
present — it is setup, not part of the show.

Demo file: <https://www.figma.com/design/sS7qxQ4YCFUcsC4Anuyq26>
(`fileKey` = `sS7qxQ4YCFUcsC4Anuyq26`)

## Status

Pre-flight is done (Full seat). The file has:

- **Loop** variable collection — Light mode only (24 colour + radius tokens)
- **Product** page with a single **Insights** frame (`node-id=3-27`)
- App wired via `src/lib/demo-config.ts`

Do **not** add a Dark mode or a Dashboard frame before presenting — those are
created live in Acts 1–2.

If you ever need to rebuild from scratch (corrupt file, wrong modes), ask Cursor
to **redo the preflight** — it needs a Full or Dev Figma seat.

## Frames must survive a mode switch

Figma creates every frame with an opaque white fill. Against the near-white
Light background that is invisible, so a frame can look perfect in Light while
carrying dozens of hard-white rectangles that stay white in Dark and hide the
text on top of them. The Insights frame shipped this way and has been fixed.

`.cursor/rules/figma-frame-fills.mdc` tells any agent working in this file to
clear layout-only fills and bind the rest to the **Loop** collection. After
anything rebuilds or edits a frame, verify with `figma/audit-frame-fills.js`
(paste it into the Figma MCP `use_figma` tool) — it should report zero
offenders, and setting `FIX = true` repairs them in place.

---

## Step 2 — Wire the link (already done)

```ts
// src/lib/demo-config.ts
insightsNodeUrl: "https://www.figma.com/design/sS7qxQ4YCFUcsC4Anuyq26?node-id=3-27"
```

## Step 3 — Confirm the starting state

- The Figma file has a **Loop** collection with **one** mode (Light).
- The **Product** page has one frame, `Insights`.
- No Dashboard frame exists yet — Act 1 creates it.
- `/insights` in the running app still shows the placeholder.

## Resetting between runs

After a run, restore the starting state with:

```bash
git checkout src/app/insights/page.tsx
# or, if you have not committed yet:
cp figma/insights-placeholder.tsx src/app/insights/page.tsx
```

In Figma, delete the `Dashboard — from code` frame and the `Dark` mode that the
demo added, so the next run starts clean.
