# effone-hub-site

Next.js 16 frontend (App Router, React 19). Apollo Client 4, MUI v9 + `@mui/x-charts`/`x-data-grid`. GraphQL codegen (`client` preset → `src/gql/`).

See repo-root `CLAUDE.md` for the monorepo overview and cross-package commands.

## Commands
```bash
pnpm dev        # next dev --webpack
pnpm codegen    # regen GraphQL types → src/gql/ (also runs on prebuild)
pnpm test       # jest --coverage
pnpm lint       # biome check src  (lint:fix to autofix)
```

## Gotchas
- **Codegen after any GraphQL change.** Schema is `../api/schema.graphql` (or `CODEGEN_SCHEMA_URL`); `prebuild` runs codegen. After editing the schema or any `.graphql` doc, run `pnpm codegen` or `src/gql/` types go stale.
- **Webpack, not Turbopack.** `dev`/`build` pass `--webpack` explicitly — don't drop the flag.
- **Apollo compound keys** (`src/app/lib/apollo-type-policies.ts`): types without a single `id` (Race, RaceResult, season standings, …) are keyed by compound `keyFields`. **A query MUST select every field in a type's `keyFields`** or Apollo can't normalize it and silently drops the object → endless skeletons / blank data ("Cache data may be lost").
- **F1DB points are BigFloat strings** (`"25.00"`). Coerce with `toPoints()` before math or grid sorting.
- **MUI X charts need an explicit band axis carrying `data`** (value axis needs `scaleType: 'linear'`), else `_ is not iterable` / scaleBand crash. Horizontal bars put the band axis on Y.
- **ChartSwitcher mounts only the active chart.** Rendering all + hiding with `display:none` mounts MUI X at width 0 (`ChartsContainer has no width`). Mount only the active one, keyed.
- **`DriverByLine`/`ConstructorByLine` resolve names from `EntityDisplayProvider`, not row data.** A page query that omits driver/team detail fields renders blank names — seed the provider from *every* result set feeding a grid (e.g. the circuit page seeds from `history` + `season`).
- **MUI DataGrid `aria-rowcount` is on the inner `[role="grid"]` (`.MuiDataGrid-main`) and counts the header row** (subtract 1). `.MuiDataGrid-root` has none.
- **Season filters (`SeasonMenu`) are a MUI popup `<Select>`, not native** — Playwright `selectOption()` fails; use the `e2e/fixtures/season-select.ts` `selectSeason` helper. The filtered count is *entrants*, not the standings roster.
- **Only driver-detail `Tabs` pass `urlParam` (`?tab=` survives reload); constructor/circuit/race tabs don't sync the URL.**

## E2E (Playwright)
- `pnpm test:playwright` (specs in `e2e/`, fixtures in `e2e/fixtures/`). Dev server auto-starts/reused on :3000.
- The `playwright-test` MCP uses the **root** `playwright.config.ts` (auto-discovered at the worktree root; needs a `webServer` block). After installing/upgrading `@playwright/test`, **restart Claude Code** or the stale MCP process throws a seed "two different versions of @playwright/test" error.
- Run dev e2e with `--workers=2` (SSR is CPU-bound; more workers → 30s `page.goto` timeouts).
