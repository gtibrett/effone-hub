# F1DB Ingest Design

## Problem

F1DB ships a new Postgres dump after every race weekend. We need to load that dump daily, atomically swap it into place in Neon, apply the `constructor->team` renames, and keep the `app.*` supplementary tables untouched. The ingest must be idempotent and must not leave the database in a half-loaded state.

---

## Architecture Options

### Option A: Vercel Cron + Serverless Function

A Vercel Cron entry calls `/api/cron/ingest` on a schedule. The function downloads the F1DB zip (~5 MB compressed, ~34 MB SQL), streams it into a staging schema via `pg`, and does the atomic swap. PostGraphile picks up the change on the next request (or via `pg_notify`).

**Pros:** Zero new infrastructure; cron and function config live in `vercel.json` alongside the app; CRON_SECRET auth is built into Vercel; Fluid Compute (Pro tier) extends the function timeout to 300 s and bumps memory to 1024 MB.

**Cons:** Hobby tier has a 60 s execution limit — loading a 34 MB SQL blob and applying ~47 statements over Neon may exceed it depending on network latency. Pro tier is required for reliable operation. If the function is killed mid-swap, the next run detects the leftover `f1db_new` schema and drops it before retrying.

### Option B: GitHub Actions + Direct DB Connection

A scheduled workflow (e.g. `on: schedule: - cron: '0 6 * * *'`) runs on the GitHub-hosted runner, connects directly to Neon, applies the dump, and swaps. The runner gets Neon credentials from GitHub secrets.

**Pros:** No timeout pressure; cheap on the free Actions tier; the job can take as long as needed.

**Cons:** Neon connection string must be stored in GitHub secrets (second secrets store to manage); the cron is decoupled from the Vercel deploy lifecycle, so a schema-breaking F1DB release could arrive before the frontend is updated; no easy way to surface the ingest status in the app's own UI or logs.

### Option C: Self-Hosted Runner / Separate Service

A dedicated VM or container runs a Node/Python script on cron. Maximal control over runtime.

**Cons:** Ops burden is disproportionate to the workload. Reject.

---

## Recommendation: Option A (Vercel Cron + Function)

Vercel Pro is already the target deployment tier (the existing GraphQL function uses `maxDuration: 300`). Keeping the ingest co-located with the app means one secrets store, one deploy pipeline, and one place to look when something breaks. Option B is a valid fallback if we ever hit Vercel budget limits.

---

## Swap Protocol

All steps run inside a single Postgres transaction on a dedicated `pg.Client`.

```
1. DROP SCHEMA IF EXISTS f1db_new CASCADE          -- discard any half-applied prior run
2. CREATE SCHEMA f1db_new
3. SET LOCAL search_path TO f1db_new, public
4. <execute dump SQL>                              -- ~47 statements, ~34 MB
5. DO $$ ... ALTER SCHEMA f1db RENAME TO f1db_old;
              ALTER SCHEMA f1db_new RENAME TO f1db;
              DROP SCHEMA f1db_old CASCADE; $$     -- atomic, single DDL block
6. <apply constructor->team renames>               -- see apply_team_rename.sql
7. <recreate app.season_* computed-column fns>     -- dropped by CASCADE above
8. COMMIT
```

PostGraphile watch mode (dev) picks up the swap automatically. In production `grafserv` rebuilds the schema on the next request after detecting a schema change via `pg_listen`. No explicit `NOTIFY` is needed with PostGraphile v5 amber preset in watch mode; for production (watch disabled) the cached schema is rebuilt on process restart or on the next cold start.

---

## Failure Modes and Rollback

| Failure point | Outcome | Recovery |
|---|---|---|
| GitHub API unreachable | Returns early, no-op | Next run retries |
| Zip download fails | Exception before any DB write | Next run retries |
| Dump apply fails mid-way | Transaction rolled back; `f1db_new` dropped at start of next run | Automatic |
| Rename step fails | Transaction rolled back; `f1db` still the original schema | Automatic |
| Function timeout mid-swap | `f1db_new` left as orphan; `f1db` untouched | Dropped at start of next run |
| `last_release_tag` not updated | Next run re-applies same tag | Idempotent: same result, wasted work |

`f1db_old` is only ever present for the microseconds between the two `ALTER SCHEMA` calls inside the same transaction. It cannot be observed by concurrent readers.

---

## Open Questions / TBD

- **Tests:** TBD. Unit tests for `fetchF1DB`, `applyDump`, `swapSchema` helpers would exercise the logic without a real DB.
- **PostGraphile production reload:** Verify that PostGraphile v5 amber preset in production (watch disabled) picks up the new `f1db` schema on the next request without a process restart. If not, add an explicit `pg_notify('postgraphile:watch', '{}')` call after COMMIT.
- **Vercel tier:** Confirm Pro plan is active; Hobby 60 s limit makes this unreliable.
- **F1DB single-inserts asset:** The ingest uses `f1db-sql-postgresql-single-inserts.zip` (one INSERT per row, ~34 MB unpacked). If F1DB ever renames or removes this asset, `fetchF1DB.ts` must be updated.
