# effone-hub-api

PostGraphile 5 (Amber preset) + Fastify 5 GraphQL server over the F1DB Postgres. ESM, Node 24, run via `tsx`. Read-only public data API; emits `schema.graphql` consumed by the site's codegen.

See repo-root `CLAUDE.md` for the monorepo overview.

## Commands
```bash
pnpm dev         # tsx watch src/server.ts  (root: pnpm api:dev)
pnpm start       # tsx src/server.ts
pnpm typecheck   # tsc
pnpm ingest      # tsx scripts/run-ingest.ts — pull new F1DB data (raw pg writes)
```

## Endpoints & env
GraphQL `/graphql` (SSE `/graphql/stream`), health `/health`, GraphiQL `/graphiql` when `ENABLE_GRAPHIQL=true`. Listens on `PORT` (default 4000); site dev points `NEXT_PUBLIC_GRAPHQL_API_URL` here.

Env (`.env`, see `.env.example`): `POSTGRES_URL` (required — local = docker DB `postgres://postgres:effonehub@localhost:5432/postgres`, prod = Neon pooled URL), `POSTGRES_SCHEMA` (default `f1db,app`), `PORT`, `ENABLE_GRAPHIQL`.

## Gotchas
- **`schema.graphql` emits at schema-build time, non-prod only** (`exportSchemaSDLPath`, skipped when `NODE_ENV=production` — disk is ephemeral there). Committed in this package; site codegen reads `../api/schema.graphql`. After any schema/config change, boot the API (`dev`/`start`) to regen — `grafserv.watch:false`, no live rebuild.
- **Read-only by design.** Amber preset's ~165 auto-mutations are disabled (`PgMutationCreatePlugin`/`PgMutationUpdateDeletePlugin`/`PgMutationPayloadEdgePlugin`). Endpoint is unauthenticated against a full-privilege role — don't re-enable mutations. Ingest writes go through raw `pg`, never GraphQL.
- **Boot asserts the schema is populated.** Missing root fields (`seasons/drivers/teams/circuits`) → fail-fast (wrong `POSTGRES_SCHEMA`), not a silent blank site.
- **`id` inflection remap** (`IdRemapPlugin`): single-column `id` PKs surface as GraphQL `id`, EXCEPT `race` — synthetic int PK, identified by compound `(year, round)`, keeps `rowId`. Mirrors the site's Apollo `keyFields`.
- **Schema built once per process** (pinned to `globalThis`) for Vercel Fluid instance reuse + `tsx watch` re-eval safety.
