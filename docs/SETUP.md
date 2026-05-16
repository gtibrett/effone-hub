# effone-hub — setup & deployment runbook

Living document. Update as the Vercel project evolves.

## Local dev

- **Node ≥ 22** (PostGraphile v5 requirement). `nvm use 24` before any `yarn dev`/`yarn codegen`.
- Schema state in dev Neon: `effonehub` (legacy Ergast) + `f1db` (replaced atomically by ingest) + `app` (our supplementary tables) all coexist. The site reads `POSTGRES_SCHEMA` (comma-separated) at startup.
- Start: `cd packages/site && yarn dev` → http://localhost:3000
- GraphQL playground: set `ENABLE_GRAPHIQL=true` in `packages/site/.env.development.local`, then visit `/api/graphiql`.

## Vercel project

Production currently runs off branch `feature/monorepo`. The F1DB migration work is on `feature/f1db-migration`.

### Required environment variables

Set on the Vercel project (Production + Preview + Development).

| Var                          | Source                                                                 | Required for                       |
|------------------------------|------------------------------------------------------------------------|------------------------------------|
| `POSTGRES_URL`               | Neon integration (pooled URL — `*-pooler.*.neon.tech`)                 | site reads (PostGraphile)          |
| `POSTGRES_URL_NON_POOLING`   | Neon integration (direct URL — `*.neon.tech` without `-pooler`)        | ingest cron (long-running TX, DDL) |
| `POSTGRES_SCHEMA`            | Manual: `effonehub` *(today)* → flip to `f1db,app` after frontend cutover | PostGraphile schema selection      |
| `CRON_SECRET`                | Manual: any random ≥ 32-byte string                                    | bearer auth on `/api/cron/ingest`  |
| `ENABLE_GRAPHIQL`            | Manual: `false` in prod, optional `true` in dev                        | exposes `/api/graphiql`            |
| `EFFONE_MODE`                | Manual: `production` in prod, `dev` elsewhere                          | error verbosity                    |
| `NEXT_PUBLIC_GRAPHQL_API_URL`| Manual: e.g. `https://<host>/api/graphql`                              | Apollo client transport            |

To pull the current set into a local file:
```bash
vercel env pull packages/site/.env.local
```

### Cron job

`vercel.json` declares one cron: `/api/cron/ingest` daily at 06:00 UTC. Vercel automatically attaches `Authorization: Bearer ${CRON_SECRET}` to scheduled invocations. Manual trigger:
```bash
curl -X POST https://<host>/api/cron/ingest \
  -H "Authorization: Bearer $CRON_SECRET"

# Useful query params:
#   ?force=1   re-apply the dump even if F1DB tag hasn't changed
#   ?dryRun=1  inspect the latest release without applying
```

The cron function:
- pulls `f1db-sql-postgresql-single-inserts.zip` from the latest GitHub `f1db/f1db` release,
- streams the SQL into a fresh `f1db_new` schema,
- atomically swaps `f1db_new` → `f1db` (drops the old one),
- recreates `app.season_ended` / `app.season_has_results` (cascade-dropped by the swap),
- fetches Jolpica `/laps` for any race that has results in `f1db.race_result` but no rows in `app.lap_times` yet.

Memory: 1024 MB. maxDuration: 300 s (typical run ≈ 30 s).

## Database

- **Provider:** Neon (Vercel Marketplace).
- **Schemas:**
  - `effonehub` — legacy Ergast snapshot (1950–2024). Read-only. Will be dropped after frontend cutover; until then it's the live schema for prod.
  - `f1db` — F1DB native schema. **Owned by the cron**; do not edit by hand. The whole schema gets replaced on every ingest.
  - `app` — owned by us. Migrations live in `packages/database/migrations/`. Holds `lap_times`, `circuit_descriptions`, `team_colors`, `team_history`, `ingest_state`, plus computed-column functions on `f1db` types.

### Bootstrapping a fresh Neon branch

```bash
psql $NEON_BRANCH_URL -f packages/database/migrations/2026_app_schema.sql
# Then trigger the cron (or hit it locally) to populate f1db.
# Then, if you want the supplementary content seeded from the existing prod data:
psql $NEON_BRANCH_URL -f packages/database/migrations/2026_app_seed_from_effonehub.sql
```

## Cutover plan (post frontend rewrite)

1. Land the frontend rewrite (the 40-codegen-error file list in `docs/f1db-migration-cheatsheet.md`).
2. `vercel env add POSTGRES_SCHEMA` → `f1db,app` in Preview, push, walk every page.
3. Promote: set `POSTGRES_SCHEMA=f1db,app` in Production.
4. Schedule a one-time agent in ~2 weeks to drop the legacy `effonehub` schema:
   ```sql
   DROP SCHEMA effonehub CASCADE;
   ```

## Attribution required

- F1DB is CC-BY-4.0 → add a credit line on `/about`.
- Jolpica is Apache-2.0; courtesy credit on `/about`.
