# Runtime 400 Inventory — F1DB GraphQL Mismatches

Generated: 2026-05-02. Branch `feature/f1db-migration`. Live schema = local PostGraphile + F1DB v2026.3.0.

## Method
- Extracted all 47 `gql\`...\`` ops from 44 files in `packages/site/src/**/*.{ts,tsx}` (script `/tmp/extract_ops.mjs`).
- POSTed each to `http://localhost:3000/api/graphql` with empty vars.
- Filtered out variable-required errors; kept schema (field/arg/enum) errors only (script `/tmp/validate_ops.mjs`).
- Result: **34 clean, 10 broken (real), 2 fragment-only-skipped, 1 false-positive (cross-template fragment).**

## Root Cause #1: codegen scope bug (highest leverage)

`packages/site/codegen.ts` has `documents: "src/**/*.tsx"` — **misses every `.ts` file**, which is where most hooks/data files live. Codegen-time validation never ran on those queries → 400s only surface at runtime.

**Fix (1 line):** `documents: "src/**/*.{ts,tsx}"` then `yarn codegen`. Will fail loudly on every broken op below. **Do this first** — it converts runtime debugging into compile-time errors and may surface additional broken ops not caught by the empty-vars probe.

## Root Cause #2: `Query.driver/constructor/circuit` arg renamed `id` → `rowId`

PostGraphile v5 + simplify-inflection exposes single-record root queries as `(rowId: String!)`. All hand-rolled `.ts` queries still pass `(id:)`. **8 files affected** (Group A below).

## Root Cause #3: `f1db.constructor` table name collides with JS `Object.prototype.constructor`

Constructor type's season-pivoted relations come back as `functionObjectNativeCodeSeasonEntrantDrivers`, `functionObjectNativeCodeSeasonConstructorStandings`, etc. — PostGraphile inflection bug, the value `Function.prototype.toString(Object)` leaks into field names.

Affected fields lost on `Constructor`:
- `seasonEntrantDrivers`
- `seasonEntrantConstructors`
- `seasonConstructors`
- `seasonConstructorStandings`
- `seasonEntrantChassises`
- `seasonEntrantEngines`
- `seasonEntrantTyreManufacturers`

Other Constructor relations work fine (raceResults, qualifyingResults, antecedents, colors, bio, etc.).

**Two possible fixes** (architectural — pick one before parallel work begins):
- (a) Smart-tag `@name team` on `f1db.constructor` → renames type to `Team` and breaks the prototype collision. Cascades into many type renames downstream.
- (b) File a PostGraphile bug + monkey-patch inflection to skip `constructor` key. Lower blast radius but maintenance burden.

This is a hard blocker for `useConstructorData.ts` and any code reaching constructor → season relations. **Decide before Group D starts.**

## Root Cause #4: Field/enum renames in F1DB schema

| Old | New | Locations |
|-----|-----|-----------|
| `Driver.nationality` | `nationalityCountryId` | DriversQuery |
| `Constructor.nationality` | `countryId` | ConstructorsQuery |
| `Race.results` | `raceResults` | useCircuitDialogData |
| `AppLapTime.timeMillis` | `milliseconds` | useCircuitDialogData |
| `Circuit.racesByYear` | `races` | useCircuitByRef |
| `RaceResultOrderBy.YEAR_ASC` | sort via `RACE_BY_YEAR_ASC` (or remove) | useCareerData |
| `SeasonDriverStanding.constructor` | not exposed; reach via `driver.seasonEntrantDrivers` | useCareerData |
| `SeasonCondition.{ended,hasResults}` | derive client-side (already done in `useSeasons.ts`) | SeasonsQuery |

---

## Inventory: parallelizable work units

Each row = one independent file change. After Root Cause #1 fix, codegen will validate everything; after Root Cause #3 decision, Group D can proceed. Groups A/B/C/E independent of each other.

### Group A — `id:` → `rowId:` mechanical rename (8 files, low risk)

| File | Op | Other issues in same op |
|------|-----|-----|
| `packages/site/src/components/page/driver/career/useCareerData.ts` | DriverCareer | also: `RaceResultOrderBy.YEAR_ASC`, `SeasonDriverStanding.constructor` (Group E + F) |
| `packages/site/src/components/page/driver/circuits/useCircuitData.ts` | DriverCircuits | none |
| `packages/site/src/components/page/driver/circuits/dialog/useCircuitDialogData.ts` | DriverCircuitDialog | also: `Race.results`, `AppLapTime.timeMillis` (Group F) |
| `packages/site/src/components/page/driver/stats/useDriverStatsData.ts` | DriverStats | none |
| `packages/site/src/hooks/data/useConstructorData.ts` | Constructor | also: `Constructor.seasonEntrantDrivers`/`seasonConstructorStandings` (Group D — blocked) |
| `packages/site/src/hooks/data/useCircuitByRef.ts` | CircuitByRef | also: `Circuit.racesByYear` → `races` (Group F) |
| `packages/site/src/hooks/data/useDriver.ts` | DriverQuery (idx 1) | none — only arg rename needed |
| `packages/site/src/hooks/data/useTeam.ts` | constructorById (idx 1) | none — only arg rename needed (regression I introduced earlier this session) |

### Group B — `Driver.nationality`/`Constructor.nationality` removal (2 files)

| File | Fix |
|------|-----|
| `packages/site/src/components/page/driver/DriversQuery.ts` | swap `nationality` → `nationalityCountryId`; check downstream consumers expect string country code, not full nationality string. May need `Country` join for display. |
| `packages/site/src/components/page/constructor/ConstructorsQuery.ts` | swap `nationality` → `countryId`; same downstream concern. |

### Group C — `SeasonsQuery` filter args (1 file)

| File | Fix |
|------|-----|
| `packages/site/src/components/page/season/SeasonsQuery.ts` | `condition: { hasResults, ended }` is invalid. Either drop filter and post-process client-side (matches `useSeasons.ts` pattern), or remove condition entirely. |

### Group D — Constructor inflection (BLOCKED on Root Cause #3 decision)

| File | Fix (depends on chosen path) |
|------|-----|
| `packages/site/src/hooks/data/useConstructorData.ts` | Once `f1db.constructor` is renamed to `Team` (option a), update query to `team(rowId:)` + use `Team.seasonEntrantDrivers`/`seasonConstructorStandings`. Otherwise, work around via root-level `seasonEntrantDrivers(condition: {constructorId:})` queries. |

### Group E — RaceResult orderBy enum (1 file)

| File | Fix |
|------|-----|
| `packages/site/src/components/page/driver/career/useCareerData.ts` | `RaceResultOrderBy.YEAR_ASC` doesn't exist (RaceResult has no direct year col). Try `RACE_BY_YEAR_ASC` (PostGraphile composite ordering through FK). Otherwise sort client-side. |

### Group F — Misc field renames (covered inline in Group A files)

- `Race.results` → `raceResults` (useCircuitDialogData)
- `AppLapTime.timeMillis` → `milliseconds` (useCircuitDialogData)
- `Circuit.racesByYear` → `races` (useCircuitByRef)
- `SeasonDriverStanding.constructor` → not exposed; rewrite query to fetch via `driver.seasonEntrantDrivers(condition: {year:}) { constructor }` (useCareerData)

---

## Subagent assignment proposal

Spawn one subagent per group (5 spawns), each with:
- Pointer to this inventory + the specific files in their group
- Instruction to: read file, edit query/op, re-run validator script for that op against `http://localhost:3000/api/graphql`, confirm 0 schema errors, return diff.
- Forbidden: touching files outside their group's table.

Order:
1. **First (serial, by main thread):** fix codegen scope (Root Cause #1), re-codegen, capture any additional errors → may expand inventory.
2. **Decide Root Cause #3** path (a or b) — affects Group D scope.
3. **Parallel:** Groups A, B, C, E spawned together. Group D blocked until step 2.
4. **Serial after parallel:** typecheck (`rtk tsc --noEmit`), then hit dev server pages to confirm 200s.

## Out-of-scope follow-ups noted during investigation

- 2 fragment-only `gql\`\`` blocks were skipped (not validatable in isolation): index 0 of `useDriver.ts` (`DriverFields`), index 0 of `useTeam.ts` (`ConstructorFields`). They get validated indirectly via the queries that include them.
- `useApolloClient.ts` `lastRaceQuery` already migrated.
- 17 of 47 ops live in `.tsx` files where codegen DOES validate — those should already be schema-clean (and the validator confirms 34 clean overall, consistent with that).

---

## Files to commit when done

The inventory itself + (after Root Cause #1 fix) `codegen.ts` change should land before parallel work starts.
