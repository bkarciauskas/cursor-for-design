# Insights screen — design spec

This is the screen that exists in Figma but not in code. It is the target of the
Figma → Cursor act of the demo.

Every value below is a token from `src/app/globals.css` or a component from
`src/components/ui`. Nothing here needs a new primitive — that is the point. If
the implementation introduces a raw hex value, the demo has gone wrong.

## Frame

- Name: `Insights`
- Width 1440, height hugs content, fill `color/bg`
- Content column max width 1152, centred, padding 24px horizontal / 28px vertical
- Font: Geist for UI text, Geist Mono for numeric and token labels
- Vertical gap between sections: 28px

## 1. Page header

Uses the existing `PageHeader` component.

- Eyebrow: `ANALYTICS` — 12px, semibold, `color/accent`, uppercase, 0.12em tracking
- Title: `Insights` — `text-title` (22px, semibold)
- Description: `Design-system health and review velocity over time.`
- Actions, right aligned: `Last 90 days` (Button, secondary) and `Export`
  (Button, secondary)

## 2. Stat row

Four `StatCard` components in a 4-column grid, 16px gap.

| Label                  | Value      | Delta         | Arrow | Sentiment | Hint                       |
| ---------------------- | ---------- | ------------- | ----- | --------- | -------------------------- |
| Design coverage        | `78%`      | `+9pt`        | up    | positive  | Across 1,455 instances     |
| Handoff to merge       | `3.2 days` | `38% faster`  | down  | positive  | Median across all projects |
| Detached instances     | `42`       | `+11`         | up    | negative  | Highest in Payments        |
| Token violations       | `7`        | `-15`         | down  | positive  | Down from 22 last quarter  |

## 3. Two-column row

3-column grid, 16px gap.

### 3a. Review velocity (spans 2 columns)

- `Card` with `CardHeader`
  - Title: `Review velocity`
  - Description: `Median hours from first comment to approval.`
  - Action: `Badge` tone accent, text `2026`
- Body: `TrendChart` with 12 bars, labels `J F M A M J J A S O N D`
- Data: `34, 31, 29, 30, 26, 24, 22, 19, 17, 14, 12, 9`
- Final bar uses `color/accent`; the rest use `color/card-04`

Note the series descends — velocity improving. Do not reuse the dashboard series.

### 3b. Coverage by project (1 column)

- `Card`, title `Coverage by project`, description `Share of screens built from
  the library.`
- Body: four rows, each a label, a right-aligned mono percentage, and a
  `Progress` bar

| Project   | Coverage | Progress tone |
| --------- | -------- | ------------- |
| Core      | 94%      | success       |
| Payments  | 81%      | success       |
| Growth    | 63%      | warning       |
| Analytics | 47%      | warning       |

## 4. Design system drift (full width)

- `Card` with `CardHeader`
  - Title: `Design system drift`
  - Description: `Components whose instances have diverged from the library.`
- A table with columns: `Component`, `Instances`, `Detached`, `Drift`, `Status`
- Column headers: 11px semibold, uppercase, 0.1em tracking, `text-subtle`,
  header row fill `color/card-01`, bottom border `color/border`
- Rows separated by 1px `color/border`

| Component  | Instances | Detached | Drift | Status               |
| ---------- | --------- | -------- | ----- | -------------------- |
| Button     | 486       | 4        | 0.8%  | Healthy (success)    |
| Badge      | 312       | 9        | 2.9%  | Healthy (success)    |
| Card       | 208       | 12       | 5.8%  | Watch (warning)      |
| Avatar     | 190       | 3        | 1.6%  | Healthy (success)    |
| Table row  | 154       | 21       | 13.6% | Drifting (danger)    |
| StatCard   | 64        | 8        | 12.5% | Drifting (danger)    |

`Component` cells show `Loop / <name>` with the `Loop / ` prefix in
`text-subtle`. `Drift` is mono and tabular. `Status` is a `Badge` with a dot.

## 5. Contributors strip (full width)

- `Card`, title `Most active reviewers`, description `Last 90 days.`
- Body: a horizontal row of four items, evenly spaced, each with an `Avatar`
  (size md), a name, and a mono count

| Person     | Reviews |
| ---------- | ------- |
| Mara Ellis | 64      |
| Dev Shah   | 51      |
| Ines Kova  | 47      |
| Tom Byrne  | 38      |

## Dark mode

The frame must read correctly in both variable modes. Once the demo adds the
Dark mode in Act 2, switching the frame to Dark should require no manual
recolouring — every fill is bound to a `Loop` variable, not a raw hex.
