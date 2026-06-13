# PLAN: Pure SSR w/ Prerender + Cache — Agent Workflow

## Context

effOne Hub (Next 16, App Router, `cacheComponents: true`) is ~70% of the way to the goal:
all pages fully prerendered or server-cached, invalidated only by the ~24×/year F1DB ingest,
browsers downloading zero GraphQL. The remaining work is mechanical enough to delegate to
Sonnet-tier agents, with the main thread (Fable/Opus) acting as advisor: writes per-phase
specs, reviews diffs between phases, arbitrates escalations.

Data facts that make this safe: read-only data, no personalization, no mutations,
tag-invalidation already wired (`ingest.yml` → `POST /api/cron/revalidate` → cache tags).

Charts note: Nivo → `@mui/x-charts` migration already merged (PR #47). Chart components
stay client components fed by props; no chart work in this plan beyond test-config cleanup.

## Target architecture

- Every GraphQL query lives in `packages/site/src/app/lib/cached-data.ts`
  (`'use cache'` + `cacheLife` + `cacheTag`), fetched in RSC, passed to client
  components as props.
- Browser Apollo client deleted (ApolloWrapper, apollo-make-client, apollo-type-policies,
  all `useQuery`/`useSuspenseQuery` call sites).
- Root `<Suspense>` in `Providers.tsx` removed; date-dependent widgets get narrow
  per-widget boundaries → large prerendered static shell (PPR behavior of cacheComponents).
- Revalidate endpoint migrated `pages/api/cron/revalidate.ts` →
  `app/api/cron/revalidate/route.ts`, `updateTag` → `revalidateTag(tag, 'max')`.
- `generateStaticParams` for `/[season]` expanded to all seasons (~75); other dynamic
  routes stay current-season + on-demand `cacheLife('max')`.

## Revised phasing (post Phase 0 inventory — 2026-06-13)

Phase 0 ran clean (tsc+jest green, 39 tests, no pre-existing failures). Inventory found
**40+ browser query sites** and a linchpin: a global client `AppStateProvider` deriving
`currentSeason`/`seasonToShow`/`lastSeason` from a client `SeasonsListQuery` +
`new Date().getFullYear()`, gated behind a `<Backdrop>` loader. Most "date reads" are
**pure ms→duration formatting** (safe, keep client); genuine wall-clock reads are ~5,
clustered in season-derivation + race-weekend countdown. Shared cross-entity hooks
(`useDriver`, `useTeam`, `SeasonMenu`, `useSeasons`) are the escalation risks.

Branch renamed `feature/nextjs-full-ssr`, rebased on origin/main (incl. PR #48).

Refined phase order (dependency-driven):

- **A — Server-source season state.** `getAppSeasonState()` in cached-data; seed
  `AppStateProvider` via prop chain layout→Providers→Layout. Kills global client query +
  #1 wall-clock read + Backdrop gate. *(in progress)*
- **B — List pages → RSC+props** (`/drivers`,`/constructors`,`/circuits`,`/seasons`) +
  `SeasonMenu` server-seeded.
- **C — Detail pages → props**, sub-phased per entity (C1 driver, C2 constructor,
  C3 circuit, C4 season, C5 race/round). Stat micro-components (each currently fires its
  own query) consolidate into one server fetcher per page. Shared `useDriver`/`useTeam`
  → one shared server fetcher, props to avatars/bylines/statcards (advisor owns this).
- **D — Race-weekend countdown:** genuine wall-clock; keep client, isolate in own Suspense.
- **E — Remove root Suspense; finalize static shell.**
- **F — Delete browser Apollo** (ApolloWrapper, make-client, type-policies; keep apollo-rsc).
- **G — Revalidate route → app/api + `revalidateTag`; prerender all seasons.**
- **H — Cleanups:** jest `transformIgnorePatterns` (drop @nivo/react-spring), CI Node 22→24,
  dead hooks.

Tailwind stays (out of scope, per user).

## Orchestration model

- **Advisor (main thread, Fable/Opus):** authors each phase's Workflow script + task
  specs, reviews structured agent outputs between phases, runs/reads verification,
  decides escalations. Never does bulk edits itself.
- **Workers (Sonnet via Workflow `agent()` with `model: 'sonnet'`):** one agent per
  bounded task; each prompt self-contained (file list, recipe, done-criteria, return
  schema). Agents that mutate files in parallel within a phase use
  `isolation: 'worktree'` only where file overlap is possible; phases below are
  partitioned so overlap is rare.
- **One Workflow invocation per phase** (not one giant script): advisor stays in the
  loop between phases; failed phase can be resumed via `resumeFromRunId`.
- **Escalation rule (in every worker prompt):** if the recipe doesn't fit (unexpected
  cross-file coupling, hook used in >1 surface, type breakage beyond the listed files),
  STOP, return `{blocked: true, reason, files}` — do not improvise. Advisor resolves,
  re-dispatches.
- **Verification gate after every phase:** `pnpm --filter @gtibrett/effone-hub-site
  typecheck`-equivalent (tsc), `pnpm site:test`, and at the end full `next build --webpack`
  + preview smoke. Sonnet test-runner agent executes; advisor reads summary.

Worker return schema (all phases):

```json
{
  "task": "string",
  "filesChanged": ["path"],
  "deleted": ["path"],
  "blocked": false,
  "reason": null,
  "notes": "string"
}
```

## Phases

### Phase 0 — Baseline + inventory (parallel, read-only, sonnet)

1. **Baseline check:** run tsc + jest on clean tree; record pass state. Anything
   already red gets flagged before migration starts.
2. **Client-query inventory:** enumerate every `useQuery`/`useSuspenseQuery` call site,
   the query/fragment each uses, and which page route renders it. Output: table
   `{component, hook, queryName, route, propsAlreadyAvailable?}`. This table drives
   Phase 2/3 task partitioning — advisor reviews it before dispatching.
3. **Date-read inventory:** every `new Date()` / `Date.now()` in client components and
   what UI depends on it (race-weekend banner, upcoming-race logic, `ClientOnly` uses).
   Drives Phase 1 boundary placement.

Gate: advisor reviews inventories, finalizes Phase 1–3 task lists.

### Phase 1 — Static shell: root Suspense removal (single sonnet agent, advisor-spec'd)

Spec (advisor writes exact boundary plan from Phase 0 date inventory; recipe):

- `src/app/Providers.tsx`: remove the root `<Suspense>` wrapping `<Layout>`.
- For each date-dependent widget from inventory: wrap that widget (not its page) in its
  own `<Suspense fallback={...skeleton/null}>` at the nearest sensible parent, or keep
  existing `ClientOnly` where the widget is purely cosmetic.
- Must NOT change MUI/Apollo provider nesting otherwise.

Gate: build must succeed with cacheComponents validation (this is the phase most likely
to surface "uncached data access" errors — advisor triages each error message, amends
spec, resume workflow).

### Phase 2 — List pages → RSC fetch + props (parallel, one sonnet agent per route)

Routes: `/drivers`, `/constructors`, `/circuits`, `/seasons`.

Recipe (same for all four; advisor fills per-route query names from Phase 0 inventory):

1. Add/extend a fetcher in `cached-data.ts`: `'use cache'`, `cacheLife('max')`,
   `cacheTag('<entity>s')`, returning the full list the client component needs.
   Reuse existing query documents (`src/data/query/*.graphql` / gql tags); move them
   server-side, do not rewrite them.
2. `page.tsx` (RSC): `const rows = await get<Entities>()`; pass as prop.
3. List/filter client component: delete `useSuspenseQuery`, accept `rows` prop,
   keep all filter/sort/DataGrid state logic untouched.
4. Remove now-unused `<Suspense>`+skeleton around the list if it only existed for the
   query (page is now in the static shell).

Constraint: do not touch `cached-data.ts` concurrently — agents append via separate
well-named functions; advisor merges if conflicts (or run the four agents
`isolation: 'worktree'` and advisor cherry-picks — decide at dispatch time based on
expected `cached-data.ts` overlap; default: sequential pipeline for the
`cached-data.ts` edit step, parallel for the rest).

Gate: tsc + jest + advisor diff review (cavecrew-reviewer style pass acceptable).

### Phase 3 — Detail content components → props (parallel, one sonnet agent per entity)

Components: `DriverContent`, `ConstructorContent`, `CircuitContent`, `SeasonContent`
(`RoundContent` already follows the pattern — it is the reference implementation; every
worker prompt links to `app/[season]/[round]/page.tsx` + `RoundContent` as the model).

Recipe per entity:

1. From Phase 0 inventory, collect every query the content component (and its child
   hooks, e.g. `hooks/data/useDriver.ts`) fires client-side.
2. Consolidate into one server fetcher per page in `cached-data.ts` (entity-scoped
   `cacheTag`, `cacheLife('max')`), mirroring `getRaceFullData`.
3. `page.tsx`: `Promise.all` metadata + full-data fetch (existing pattern), pass
   `prefetched<Entity>Data` prop.
4. Content component + descendants: replace hook reads with prop drilling/context as
   the component tree needs; delete the data hooks that become empty.
5. Charts/DataGrids stay client; they only change where data arrives from.

Gate: tsc + jest + advisor review. This is the highest-judgment phase — expect
escalations where a hook is shared across entities; advisor owns the shared-hook
resolution (likely: one shared server fetcher, multiple props).

### Phase 4 — Delete browser Apollo (single sonnet agent, sequential, after 2+3 green)

1. Confirm zero remaining `useQuery`/`useSuspenseQuery`/`useReadQuery` in `src/`
   (grep gate — if any remain, blocked-escalate; phases 2/3 missed something).
2. Delete: `app/ApolloWrapper.tsx`, `app/lib/apollo-make-client.ts`,
   `app/lib/apollo-type-policies.ts`; remove `ApolloWrapper` from `Providers.tsx`.
3. Keep: `app/lib/apollo-rsc.ts` (server client), codegen, `.graphql` documents.
4. `pnpm` prune check: `@apollo/client-integration-nextjs` likely still needed for
   `registerApolloClient` in apollo-rsc — verify import source before removing any dep;
   if apollo-rsc imports from it, keep dep, note for future slim-down.

Gate: full build + bundle check (advisor eyeballs first-load JS drop in build output).

### Phase 5 — Revalidation + prerender coverage (two sonnet agents, parallel)

A. Migrate `src/pages/api/cron/revalidate.ts` → `src/app/api/cron/revalidate/route.ts`:
   same `CRON_SECRET` bearer check (security-sensitive — preserve exact auth semantics,
   401 on mismatch, no logging of the secret), `updateTag(tag)` → `revalidateTag(tag,
   'max')` per Next 16 route-handler API. Delete `pages/` dir if then empty. Confirm
   ingest workflow's `REVALIDATE_URL` path unchanged (`/api/cron/revalidate` — App Router
   route keeps same public path; verify).
B. `/[season]/page.tsx` `generateStaticParams`: emit all seasons (new
   `getAllSeasonYears()` in cached-data, `cacheTag('seasons')`). Leave other routes
   current-season.

Gate: build prerender output lists all season routes; curl revalidate route 401/200
behavior verified locally.

### Phase 6 — Cleanups (parallel haiku/sonnet, mechanical)

- `jest.config.mjs`: drop `@nivo` + `react-spring` from `transformIgnorePatterns`
  (dead after charts migration); re-run jest.
- `.github/workflows/ingest.yml`: Node 22 → 24 (match `.nvmrc`).
- Delete orphaned data hooks/skeletons left by Phases 2–4 (`knip`-style dead-export
  sweep or grep — advisor decides tool).

### Final verification (advisor-driven)

1. `pnpm site:test`, full `next build --webpack` — inspect route table: expect
   ○/◐ (static/partial-prerender) for all pages, no unexpected ƒ (dynamic).
2. Preview smoke: home, one historical season, one current-season round, drivers list
   filter interaction, one chart page render. No browser GraphQL requests in network
   log (the headline acceptance criterion).
3. `rtk grep` for `useSuspenseQuery|useQuery\(` → zero hits in site src.
4. Single PR off this branch; advisor writes PR body; `/code-review` before open.

## Risks / advisor watch-list

- **cacheComponents validation errors after root-Suspense removal** (Phase 1) — most
  likely failure mode; budget an iterate loop.
- **Payload size as props:** `getRaceFullData`-style consolidated fetchers serialize into
  RSC payload; fine at F1 data scale, but advisor should sanity-check the largest
  (lap-by-lap) page's payload in Phase 3 review.
- **Shared hooks across entities** (Phase 3) — pre-identified as the main escalation
  source; don't let sonnet agents fork shared logic.
- **Apollo dep web** (Phase 4) — apollo-rsc still imports from integration package;
  removal of deps is verify-first.

## Model assignments summary

| Work | Model |
|---|---|
| Phase specs, diff reviews, escalations, final verification | Advisor (main thread) |
| Inventories, route conversions, content-component conversions, route-handler migration | Sonnet |
| transformIgnorePatterns/CI-node mechanical edits | Haiku |
| Test runs | Sonnet (test-runner agent) |
