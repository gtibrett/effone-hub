# Deployment

## Vercel project setup

- **Framework**: Next.js (auto-detected; do not override)
- **Root Directory**: `packages/site`
- **Node version**: 22.x or 24.x (PostGraphile v5 requires `Promise.withResolvers`, which ships in Node 22+).
- **Build command**: leave default (`next build`)
- **Install command**: leave default; Vercel runs `yarn install` against the root workspace.

The root `vercel.json` declares the cron + function settings. There is no
per-package `vercel.json` (an old duplicate at `packages/site/vercel.json`
was removed in phase 3e because Vercel only reads the file at the project
root).

## Required environment variables

All of these must be set in the Vercel project (Settings → Environment Variables):

| Key                              | Scope                          | Notes |
|----------------------------------|--------------------------------|-------|
| `POSTGRES_URL`                   | All environments               | Pooled connection string for the F1DB Postgres instance. Use the Vercel Marketplace (Neon, Supabase, etc.) — Vercel's first-party Postgres is no longer offered. |
| `POSTGRES_SCHEMA`                | All environments               | `f1db,app` — comma-separated list of schemas PostGraphile introspects. |
| `NEXT_PUBLIC_GRAPHQL_API_URL`    | All environments               | `/api/graphql` for relative same-origin requests. |
| `CRON_SECRET`                    | Production (+ Preview optional) | Bearer token Vercel Cron sends. `pages/api/cron/ingest.ts` rejects mismatched headers with 401. Generate via `openssl rand -hex 32`. |
| `FONTAWESOME_PACKAGE_TOKEN`      | All environments (build only)  | If using Pro FontAwesome icons. Stored in `.npmrc` via env interpolation; never commit the token. |
| `NEXT_PUBLIC_GA_TRACKING_ID`     | Production                     | Optional Google Analytics ID. |
| `ENABLE_GRAPHIQL`                | Preview                        | Set to `true` to expose `/api/graphiql` for live schema browsing. Leave unset in production. |

## Cron job

`vercel.json` declares one cron:

```
"/api/cron/ingest" — schedule "0 6 * * *" — UTC 06:00 daily
```

Function settings: `memory=1024`, `maxDuration=300`. The handler:

1. Pulls the latest F1DB release tag.
2. If the tag matches `app.ingest_state.last_release_tag`, exits as `no-op`.
3. Downloads the dump, runs `applyDumpAndSwap` (loads into `f1db_new`, renames atomically, applies the `constructor → team` rename DDL, recreates computed-column functions).
4. Backfills lap times from Jolpica-F1 for races needing them, with a 4-minute soft budget so we leave headroom under the 300s function limit.
5. Calls `updateTag(...)` for every coarse Cache Components tag (`seasons`, `drivers`, `teams`, `circuits`, `races`) so cached RSC fetchers re-run on the next request.

If the function ever takes longer than ~270s, bump `maxDuration` (Pro plan supports up to 900s; Hobby caps lower).

## Database bootstrap

For a brand-new database, run the same migrations the docker entrypoint
uses, in this order:

1. `packages/database/entrypoint/f1db.sql` — base F1DB dump (loaded under `f1db` schema).
2. `packages/database/migrations/apply_team_rename.sql` — `constructor*` → `team*` rename.
3. `packages/database/entrypoint/app_schema.sql` — `app.*` supplementary tables.
4. `packages/database/migrations/2026_team_colors_seed.sql`
5. `packages/database/migrations/2026_circuit_descriptions_seed.sql`
6. `packages/database/migrations/2026_team_history_seed.sql`
7. `packages/database/migrations/2026_corrections.sql`

After the first deploy, the Vercel cron handles every subsequent ingest.

## Smoke tests

After a preview deploy, hit:

```
GET  /api/graphql -d '{"query":"{ __schema { types { name } } }"}'   → 200
GET  /                                                                 → 200
GET  /2026                                                             → 200
GET  /drivers/max-verstappen                                           → 200, body contains thumbnail URL
GET  /constructors/red-bull                                            → 200
```

Manually trigger the cron once with `curl -H "Authorization: Bearer $CRON_SECRET" https://<url>/api/cron/ingest` and confirm the response has `status: "no-op"` (or `"updated"` if a new release shipped).
