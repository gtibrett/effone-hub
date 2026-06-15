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
