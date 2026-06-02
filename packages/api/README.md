# @gtibrett/effone-hub-api

Standalone GraphQL API for effone-hub — Fastify + PostGraphile v5 (grafserv),
read-only over the F1DB Postgres schema. Split out of the Next site so the
heavy schema build lives in its own always-on process (Vercel Fluid), and the
site is a pure HTTP GraphQL consumer.

## Endpoints

- `POST /graphql` — the GraphQL API (read-only; mutation plugins disabled).
- `GET /health` — liveness. Answers only after the schema builds + the
  required root fields assert, so a 200 means DB + schema + env are all good.
- `GET /graphiql` — GraphiQL UI, gated by `ENABLE_GRAPHIQL=true`.

## Env

| Var | Required | Notes |
|-----|----------|-------|
| `POSTGRES_URL` | yes | Neon **pooler** URL (Fluid = many short-lived conns). |
| `POSTGRES_SCHEMA` | no | Comma-separated. Defaults to `f1db,app`. |
| `PORT` | no | Local listen port. Defaults to `4000`. Ignored on Vercel. |
| `ENABLE_GRAPHIQL` | no | `true` to expose `/graphiql`. |

Local dev reads `packages/api/.env` (gitignored). See `.env.example`.

## Scripts

- `pnpm dev` — `tsx watch src/server.ts`.
- `pnpm start` — `tsx src/server.ts`.
- `pnpm typecheck` — `tsc --noEmit`.
- `pnpm ingest` — run the F1DB ingest (`scripts/run-ingest.ts`); also driven by
  `.github/workflows/ingest.yml`.

## Deploy

Vercel zero-config Fastify (entrypoint `src/server.ts`, Node ESM → relative
imports use explicit `.js`). One Fluid Function; the schema builds once per
instance and is reused. Project Root Directory = `packages/api`.

The committed `schema.graphql` (emitted via `exportSchemaSDLPath` in dev) is the
source the site's GraphQL codegen reads (`../api/schema.graphql`).
