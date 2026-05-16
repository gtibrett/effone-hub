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

## Cron / ingest

A full F1DB ingest takes about 4-5 minutes (dump apply ≈45s on Neon + lap-times
backfill 1-3min). Vercel's Hobby plan caps function `maxDuration` at 60s, so the
ingest no longer runs on Vercel cron. Instead it lives in GitHub Actions
(`.github/workflows/ingest.yml`) and runs on `ubuntu-latest` (15-min job
timeout).

F1DB ships ≤1 release per race weekend (~24 races/year), so the workflow is
**manual-only**. After a race finishes (or whenever a new F1DB release is
announced), trigger it via GitHub UI → Actions → "F1DB ingest" → Run workflow.

Flow:

1. **GitHub Action** triggered manually via `workflow_dispatch`.
2. Runner installs deps, executes `yarn tsx scripts/run-ingest.ts`. The script:
   - Compares latest F1DB release tag against `app.ingest_state.last_release_tag`.
   - If new: downloads dump, runs `applyDumpAndSwap` against Neon prod.
   - Backfills Jolpica lap-times for races needing them (no soft budget; runner has up to 6h).
   - Updates `app.ingest_state.last_release_tag` on success.
3. Script then `POST`s `/api/cron/revalidate` on the production deployment with
   `Authorization: Bearer $CRON_SECRET`. The Vercel handler is thin: it calls
   `updateTag(...)` for every coarse Cache Components tag so cached RSC fetchers
   re-run on the next request. (Tag invalidation has to happen inside a Next
   request scope, which is why this one tiny piece stays on Vercel.)

Required GitHub repo secrets:

| Secret           | Source                                  |
|------------------|-----------------------------------------|
| `POSTGRES_URL`   | Same Neon prod URL as Vercel.           |
| `CRON_SECRET`    | Same value as the Vercel env var.       |
| `GITHUB_TOKEN`   | Auto-provided; needs `packages:read`.   |

Optional GitHub repo variable: `REVALIDATE_URL` (defaults to
`https://effonehub.com/api/cron/revalidate`).

To manually trigger: GitHub UI → Actions → "F1DB ingest" → Run workflow. Or
`curl -X POST -H "Authorization: Bearer $CRON_SECRET" https://effonehub.com/api/cron/revalidate`
to invalidate cache tags without running ingest.

If you ever upgrade to Vercel Pro (300s function cap), the original on-Vercel
flow can be restored by re-adding the `crons:` block to `vercel.json`, restoring
the body of `pages/api/cron/ingest.ts` (see git history pre-phase-3-final), and
disabling the GitHub Action.

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

After the first deploy, the GitHub Action cron (see "Cron / ingest" above)
handles every subsequent ingest.

## Smoke tests

After a preview deploy, hit:

```
GET  /api/graphql -d '{"query":"{ __schema { types { name } } }"}'   → 200
GET  /                                                                 → 200
GET  /2026                                                             → 200
GET  /drivers/max-verstappen                                           → 200, body contains thumbnail URL
GET  /constructors/red-bull                                            → 200
```

Manually trigger the GitHub Action once (Actions tab → "F1DB ingest" → Run
workflow) and confirm the job summary shows the expected `no-op` or
`dumpApplied=true` log lines. To verify the Vercel revalidate handler in
isolation: `curl -X POST -H "Authorization: Bearer $CRON_SECRET" https://<url>/api/cron/revalidate`.
