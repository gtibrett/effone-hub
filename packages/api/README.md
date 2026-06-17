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

## CRON_SECRET (ingest → revalidate)

After ingest, `run-ingest.ts` calls `POST /api/cron/revalidate` on the **site**
with `Authorization: Bearer ${CRON_SECRET}`; the site route
(`packages/site/src/app/api/cron/revalidate/route.ts`) returns 401/500 on any
mismatch. So the **same value must match in two places**:

| Where | Role | Set with |
|-------|------|----------|
| GitHub Actions repo secret `CRON_SECRET` | sender (ingest runner) | `gh secret set CRON_SECRET` |
| Vercel **site** project env `CRON_SECRET` | validator | `vercel env add CRON_SECRET <env>` |

It is **not** Vercel-generated and the api runtime never reads it — only the
ingest job does. The GitHub Action targets production (`REVALIDATE_URL` var), so
the site's **Production** value is the one that must match; **Preview** is only
needed if you exercise the route on preview URLs. Both stores are write-only
(Sensitive) — the value can't be read back, so a lost secret must be rotated.

### Rotate

1. Generate a new secret (keep the output for steps 2–3):
   ```bash
   openssl rand -hex 32
   ```
2. Update the sender secret (paste the value when prompted):
   ```bash
   gh secret set CRON_SECRET
   ```
3. Replace it on the Vercel **site** project (Production). Sensitive vars can't
   be edited in place, so remove then re-add:
   ```bash
   vercel env rm CRON_SECRET production --yes --cwd packages/site
   printf '%s' 'NEW_VALUE' | vercel env add CRON_SECRET production --cwd packages/site
   ```
   Preview is optional (only used when testing the route on a preview URL) and
   independent of the value above. Add it from the Vercel dashboard (Settings →
   Environment Variables → Preview) — the CLI's all-branches add is unreliable on
   older versions.
4. **Redeploy the site (production).** Env changes apply only to new
   deployments; the running prod deployment keeps validating the *old* secret
   until redeployed. Redeploy the latest production deployment (dashboard →
   Deployments → ⋯ → Redeploy, or `vercel redeploy <prod-url>`) before the next
   ingest, or the revalidate POST will 401.
5. Verify: trigger the **F1DB ingest** workflow (GitHub → Actions → manual
   dispatch). A green run with no `revalidate POST returned 4xx/5xx` in the logs
   means the new secret matches on both ends.

(For local `pnpm ingest`, set `CRON_SECRET` in `packages/api/.env` too — see
`.env.example`.)

## Deploy

Vercel zero-config Fastify (entrypoint `src/server.ts`, Node ESM → relative
imports use explicit `.js`). One Fluid Function; the schema builds once per
instance and is reused. Project Root Directory = `packages/api`.

The committed `schema.graphql` (emitted via `exportSchemaSDLPath` in dev) is the
source the site's GraphQL codegen reads (`../api/schema.graphql`).
