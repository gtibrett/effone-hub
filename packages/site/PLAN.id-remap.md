# PLAN — Remap `rowId → id`, drop Node, Apollo keyFields

## Goal
Human-readable PK becomes the canonical GraphQL `id` on single-PK entity types
(`Driver.id = 'max-verstappen'`). Drop the Relay Node interface (opaque ID,
unused by app). Compound types carry NO server `id` (Option A) — Apollo
normalizes them via `typePolicies.keyFields`. FK/condition querying already
works on slugs — no DB change.

## Decisions (locked)
- Single-PK remap `rowId → id`: 12 types.
- Race: NOT remapped — compound, Apollo key `[year, round]`. Keeps `rowId: Int!`.
- Option A: no opaque ids anywhere; Apollo keyFields for every compound type.

## Single-PK remap set (12)
Driver, Team, Circuit, Engine, EngineManufacturer, Chassis, Entrant,
GrandPrix, Country, Continent, TyreManufacturer, CircuitLayout
→ each `rowId: String!` becomes `id: String!`; accessor arg `driver(rowId:)`→
`driver(id:)`; `XCondition.rowId`→`XCondition.id`.

## Apollo keyFields (Option A — compound + Race)
| Type | keyFields |
|---|---|
| Race | year, round |
| Season | year |
| RaceResult | raceId, driverId |
| QualifyingResult | raceId, driverId |
| SprintRaceResult | raceId, driverId |
| SprintQualifyingResult | raceId, driverId |
| StartingGridPosition | raceId, driverId |
| SprintStartingGridPosition | raceId, driverId |
| FastestLap | raceId, driverId |
| DriverOfTheDayResult | raceId, driverId |
| RaceDriverStanding | raceId, driverId |
| RaceTeamStanding | raceId, teamId |
| PitStop | raceId, driverId, stop |
| AppLapTime | raceId, driverId, lap |
| SeasonDriverStanding | year, driverId |
| SeasonTeamStanding | year, teamId |
| SeasonEntrantDriver | year, driverId, teamId |
| AppTeamHistory | teamId, antecedentTeamId, startYear |
| AppTeamColor | teamId |
| AppDriverBio | driverId |
| AppConstructorBio | teamId |

The 12 entity types get `keyFields: ['id']` (default — can omit; listed for clarity).

## Phases
1. **Linchpin** — graphile.config: `disablePlugins:[Node...]` + `_attributeName`
   inflection replace to surface single-`id`-PK columns as `id`. Regen schema,
   assert `Driver.id: String!` + no `id: ID!` + Race still int. (empirical loop)
2. **Codegen** — `pnpm codegen`. Expect failures on `rowId`/`nodeId` selections.
3. **Query sweep** — codegen-error-driven: `rowId`→`id` in query selections +
   accessor args + conditions for the 12; leave Race.rowId; remove any `nodeId`.
4. **tsc sweep** — tsc-error-driven: `.rowId`→`.id` on the 12 entity types in
   hooks/components; Race `.rowId` stays.
5. **Apollo typePolicies** — add keyFields map above to InMemoryCache.
6. **Verify** — tsc, jest, build (93 pages), dev console: no merge warnings,
   pages render real data.

## Safety
- tsc + codegen validation errors enumerate every site needing change — no blind sed.
- App never uses `nodeId`/`node(id:)` (grep = 0) → Node drop is behaviorally safe.
- Reverses last turn's "id everywhere" cache fix; replaced by keyFields (cleaner).

## Risk
- Inflection override is the linchpin — prove empirically before sweeping.
- `@apollo/client-integration-nextjs` SSR relies on normalized cache; keyFields
  must cover every cached type or merge warnings return.
