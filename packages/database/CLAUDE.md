# effone-hub-graph-db

Dockerized Postgres 17 seeded from the F1DB native dump. **Local-only** data source for api/site (prod uses Neon). Package `@gtibrett/effone-hub-graph-db`.

See repo-root `CLAUDE.md` for the monorepo overview.

## Commands
```bash
pnpm build   # docker compose build
pnpm start   # docker compose up -d   (root: pnpm db:start)
pnpm stop    # docker compose down    (root: pnpm db:stop)
```
Connection: `postgres://postgres:effonehub@localhost:5432/postgres` (port 5432).

## Seed
`entrypoint/init.sh` → `/docker-entrypoint-initdb.d/00_init.sh` runs **once on an empty data volume** (Postgres initdb convention): creates schemas `f1db` + `app`, loads `f1db.sql` into `f1db`, applies the constructor→team rename, then `app_schema.sql` + app seeds (team colors, circuit descriptions, team history, corrections). Two schemas — `f1db` (upstream data) + `app` (overrides/extras) — both introspected by the API via `POSTGRES_SCHEMA=f1db,app`.

## Gotchas
- **Seed runs only on a fresh volume.** Edits to `init.sh` / `migrations/*.sql` don't apply to an existing DB. Re-seed = drop the named volume: `pnpm stop && docker volume rm effone-hub-graph-data && pnpm start`. (The dump sits outside `docker-entrypoint-initdb.d` so the image's auto-runner won't load it into `public`.)
- **`constructor*` → `team*` rename** (`migrations/apply_team_rename.sql`) is a PostGraphile inflection workaround, shared with the Vercel ingest function — don't duplicate the logic. It's why the API/site speak "team", not "constructor".
