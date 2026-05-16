# Effonehub → F1DB GraphQL field migration cheat sheet

The site's frontend queries (`packages/site/src/**/*.{ts,tsx,graphql}`) were
written against the Ergast-shaped `effonehub` schema. Phase 2a (commit
`9b552ab`) and the following commit ported the backend to PostGraphile v5
serving F1DB. **The frontend has not been ported yet** — `yarn codegen`
reports ~40 field mismatches.

This document captures the field-by-field mapping so the rewrite can proceed
without re-discovery.

## Backend state (already done)

- Schemas exposed via PostGraphile: `f1db` (replaced atomically each ingest)
  and `app` (persistent across ingests; lap_times, circuit_descriptions,
  team_colors, team_history, ingest_state).
- PostGraphile preset: `packages/site/graphile.config.ts` (Amber preset +
  `@graphile/simplify-inflection` + `F1dbSmartTags` plugin).
- Cross-schema and view-level FK relations declared in
  `packages/site/src/api/postgraphile/F1dbSmartTags.ts`. PostGraphile sees
  `Race.lapTimes`, `Race.raceResults`, `Race.qualifyingResults`,
  `Race.pitStops`, `Race.fastestLaps`, `Race.sprintRaceResults`,
  `Race.sprintQualifyingResults`, `Race.startingGridPositions`,
  `Race.sprintStartingGridPositions`, `Race.driverOfTheDayResults`,
  `Driver.lapTimes`, `Constructor.colors`, `Constructor.antecedents`,
  `Circuit.description` etc.
- `Season.ended` and `Season.hasResults` exposed as computed columns via SQL
  functions in `app` schema. The ingest function recreates them after each
  swap (`packages/site/src/api/ingest/applyDump.ts`).

## Type / field renames

### Top-level Query
| Old (Ergast)                 | New (F1DB) |
|------------------------------|------------|
| `seasons`                    | `seasons` *(unchanged)* |
| `season(year:)`              | `season(year:)` *(now also supports `nodeId:`)* |
| `races`                      | `races` |
| `drivers` / `driver(driverRef:)` | `drivers` / `driver(id:)` *(string id replaces snake_case ref)* |
| `teams` / `teamByConstructorRef:` | `constructors` / `constructor(id:)` |
| `circuits` / `circuitByCircuitRef:` | `circuits` / `circuit(id:)` |
| `driverStandingsBySeasons`   | `seasonDriverStandings` *(native F1DB)* |
| `finalTeamStandingsByYears`  | `seasonConstructorStandings` *(native F1DB)* |
| `nextRaceBySeason`           | gone — derive client-side: `season.racesByYear(condition: {…}, orderBy: ROUND_ASC)` filtered by `date >= today` |

### Season
| Old | New |
|-----|-----|
| `Season.year`                | `Season.year` |
| `Season.url`                 | gone (no F1DB equivalent) |
| `Season.ended`               | `Season.ended` *(computed column, app.season_ended)* |
| `Season.hasResults`          | `Season.hasResults` *(computed column, app.season_has_results)* |
| `Season.racesByYear`         | `Season.racesByYear` |

### Race
| Old | New |
|-----|-----|
| `Race.raceId` (int)          | `Race.rowId` (int) — also `Race.id` (Relay node id) |
| `Race.name`                  | `Race.officialName` *(or derive a short name from `Race.grandPrixId`)* |
| `Race.year`, `round`, `date`, `time` | unchanged |
| `Race.url`                   | gone |
| `Race.fp1_date`, `fp1_time`  | `Race.freePractice1Date`, `Race.freePractice1Time` *(plus FP2/3/4)* |
| `Race.quali_date`, `quali_time` | `Race.qualifyingDate`, `Race.qualifyingTime` |
| `Race.sprint_date`, `sprint_time` | `Race.sprintRaceDate`, `Race.sprintRaceTime` |
| `Race.circuit`               | `Race.circuit` *(via FK)* |
| `Race.results`               | `Race.raceResults` |
| `Race.qualifyings`           | `Race.qualifyingResults` |
| `Race.sprintResults`         | `Race.sprintRaceResults` |
| `Race.pitStops`              | `Race.pitStops` |
| `Race.lapTimes`              | `Race.lapTimes` *(cross-schema → AppLapTime)* |
| `Race.driverStandings`       | `Race.raceDriverStandings` |
| `Race.teamStandings`         | `Race.raceConstructorStandings` |
| `Race.fastestLap` (single)   | `Race.fastestLaps(first:1)` *(view; pick rank=1)* |

### RaceResult / RaceResult-like view fields
| Old (results table)          | New (race_result view) |
|------------------------------|------------------------|
| `Result.resultId`            | use `(raceId, positionDisplayOrder)` composite — no synthetic id |
| `Result.grid`                | `RaceResult.gridPositionNumber` *(or join `startingGridPositions`)* |
| `Result.position` / `positionText` | `RaceResult.positionNumber` / `positionText` |
| `Result.points`              | `RaceResult.points` |
| `Result.laps`                | `RaceResult.laps` |
| `Result.time` / `milliseconds` | `RaceResult.time` / `RaceResult.timeMillis` |
| `Result.fastestLap` (lap number) | join `Race.fastestLaps` filtered to driver |
| `Result.fastestLapTime`      | `FastestLap.time` (joined) |
| `Result.fastestLapSpeed`     | gone (not in F1DB) |
| `Result.statusId` → `status.status` text | `RaceResult.reasonRetired` *(text directly)* |

### Qualifying / FastestLap / PitStop
- `qualifying.q1/q2/q3` → `QualifyingResult.q1/q2/q3` (and `q1Millis`, etc.)
- `pitStops.duration` (ms) → `PitStop.timeMillis`; pretty form is `PitStop.time`
- `pitStops.lap` → `PitStop.lap`
- `pitStops.stop` → `PitStop.stop`

### Driver
| Old | New |
|-----|-----|
| `Driver.driverId` (int) / `driverRef` (snake_case) | `Driver.id` (kebab-case slug) |
| `Driver.forename` / `surname` | `Driver.firstName` / `Driver.lastName` |
| `Driver.fullName` (computed) | `Driver.fullName` *(native column)* |
| `Driver.code`                | `Driver.abbreviation` |
| `Driver.number` (active number) | `Driver.permanentNumber` |
| `Driver.dob`                 | `Driver.dateOfBirth` |
| `Driver.nationality`         | `Driver.nationalityCountryId` *(string id; join to Country for label)* |
| `Driver.url`                 | gone |
| `Driver.bio` *(Wikipedia)*   | gone — needs a v5 `extendSchema` plugin (helpers in `src/api/postgraphile/wikipedia/` are still present but the Driver/ConstructorBioPlugin glue was deleted in `9b552ab`; rewrite using `extendSchema` from `postgraphile/utils`) |
| `Driver.teamsByYear`         | derive via `Driver.seasonEntrantDrivers(condition: {year})` → walk to `seasonEntrantConstructor.constructor` |
| `Driver.currentTeam`         | derive via `Driver.seasonEntrantDrivers(orderBy: YEAR_DESC, first: 1)` → similar |

### Constructor (= Team)
| Old | New |
|-----|-----|
| `Team.teamId` (int) / `constructorRef` (slug) | `Constructor.id` |
| `Team.name`, `nationality`, `url` | `Constructor.name`, `Constructor.countryId`, gone |
| `Team.colors {primary,secondary,logo}` | `Constructor.colors {primaryHex, secondaryHex, logo}` *(via app.team_colors smart-tag FK)* |
| `Team.bio`                   | rewrite as `extendSchema` plugin |
| `Team.history` *(custom view)* | `Constructor.antecedents` *(via app.team_history smart-tag FK)* + F1DB's native `Constructor.constructorChronology` for recent inflections |

### Circuit
| Old | New |
|-----|-----|
| `Circuit.circuitId` (int) / `circuitRef` (slug) | `Circuit.id` |
| `Circuit.name`               | `Circuit.fullName` *(or `Circuit.shortName` if exposed)* |
| `Circuit.location`           | `Circuit.placeName` |
| `Circuit.country`            | `Circuit.countryId` |
| `Circuit.lat` / `lng` / `alt` | `Circuit.latitude` / `Circuit.longitude` / unset |
| `Circuit.description`        | `Circuit.description.description` *(via app.circuit_descriptions smart-tag FK; one extra field hop)* |
| `Circuit.url`                | gone |

### LapTimes (now app schema)
The `app.lap_times` table lives in our app schema and is populated by the
ingest function from Jolpica `/laps` per race. PostGraphile inflects this
to type `AppLapTime` with fields `raceId`, `driverId`, `lap`, `position`,
`time`, `timeMillis`. Connection name on Race/Driver is `lapTimes`.

## Removed concepts (no F1DB equivalent — handle in JS)

- `seasonsStatus` view, `nextRaceBySeason` view, `driverCurrentTeam` view,
  `driverTeams` view, `driverStandingsBySeason` view, `lapTimesWithStart`
  view: gone. Either query directly off the F1DB native tables/views or add
  new computed columns in `app` schema as needed.
- Custom GraphQL filters (the old `SeasonFilterDecoratorPlugin` adding `year`
  to results/standings): no longer needed because F1DB already exposes `year`
  directly on `RaceDriverStanding` etc. via the `Race.year` join.

## Bio plugins (DriverBioPlugin / ConstructorBioPlugin)

These were deleted in commit `9b552ab` because their v4 `makeExtendSchemaPlugin`
API is gone. The Wikipedia helpers in
`packages/site/src/api/postgraphile/wikipedia/` (`getCanonicalId`,
`getSummary`, `WikipediaSummary`) are still present.

To revive in v5:
```ts
import { extendSchema, gql } from 'postgraphile/utils';
import { getSummary, getCanonicalId } from './wikipedia';

export default extendSchema((build) => ({
  typeDefs: gql`
    type BioImage { source: String, width: Int, height: Int }
    type DriverBio { title: String, thumbnail: BioImage, description: String, extract: String }
    extend type Driver {
      bio: DriverBio
    }
  `,
  plans: {
    Driver: {
      bio($driver) {
        // … grafast plan that uses loadOne with getCanonicalId/getSummary.
        // Note F1DB doesn't expose driver.url — derive a Wikipedia slug from
        // Driver.fullName or similar.
      }
    }
  }
}));
```

The Driver type has no `url` column in F1DB. Either store Wikipedia URLs in a
new `app.driver_wiki_urls` table, or compute the slug from
`Driver.fullName`/`Driver.firstName` + `Driver.lastName`.

## Files needing rewrite (40 codegen errors)

```
src/components/app/SeasonMenu.tsx
src/components/page/circuits/CircuitsQuery.ts
src/components/page/constructor/ConstructorsQuery.ts
src/components/page/constructor/stats/{DriverPodiums,DriverPoints,DriverQualifying}.tsx
src/components/page/driver/DriversQuery.ts
src/components/page/driver/career/useCareerData.ts
src/components/page/driver/circuits/{useCircuitData,dialog/useCircuitDialogData}.ts
src/components/page/driver/season/useSeasonData.ts
src/components/page/driver/stats/useDriverStatsData.ts
src/components/page/race/Qualifying.tsx
src/components/page/race/lapByLap/useLapByLapChartData.ts
src/components/page/race/pitStops/PitStops.tsx
src/components/page/race/stats/{FastestLap,LapLeader,Pole,PositionsGained}.tsx
src/components/page/raceWeekend/useNextRaceData.ts
src/components/page/season/SeasonsQuery.ts
src/components/page/season/standings/constructors/useConstructorsStandingsData.ts
src/components/page/season/standings/drivers/useDriversStandingsData.ts
src/components/page/season/stats/{ConstructorChampion,DNFs,DriverChampion,FastestLap,LapLeader,Poles,PositionsGained,SprintWins,Wins}.tsx
src/components/page/season/useScheduleData.ts
src/data/query/season.graphql
src/hooks/data/{useCircuitByRef,useConstructorData,useDriver,useRace,useTeam}.ts
src/hooks/useSeasons.ts
src/pages/[season]/[round].tsx
src/pages/circuits/[circuitRef].tsx
src/pages/constructors/[teamRef].tsx
src/pages/index.tsx
```

`yarn codegen` from `packages/site` lists every error with file + line.

## Quick smoke test (works today against dev Neon)

```graphql
{
  race(rowId: 1152) {
    officialName
    year round
    circuit { id fullName description { description } }
    raceResults(first: 3) { nodes { positionNumber driverId points timeMillis } }
    qualifyingResults(first: 3) { nodes { positionNumber driverId q1 q2 q3 } }
    pitStops(first: 3) { nodes { driverId stop lap timeMillis } }
    fastestLaps(first: 1) { nodes { driverId lap time } }
    lapTimes(first: 3) { nodes { driverId lap timeMillis } }
  }
  seasons(orderBy: YEAR_DESC, first: 3) { nodes { year ended hasResults } }
}
```

Run via `yarn dev` (Node ≥ 22 required) then POST to `/api/graphql`.
