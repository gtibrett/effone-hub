# PLAN — Split GraphQL API into standalone Fastify + PostGraphile (Vercel Fluid)

**Status:** queued for next big phase. Not started.
**Goal:** Move PostGraphile out of the Next site into its own always-on
Fastify service. Isolates the heavy schema build (root-cause fix for the dev
OOM class), and because the API is reachable during the site's `next build`,
**deletes the in-process grafast layer entirely** — site becomes a pure HTTP
GraphQL consumer with one Apollo client.

## Why
- PostGraphile schema build is memory-heavy; living inside Next dev/build is
  what caused SIGKILL 137 (fixed for now via a globalThis singleton, but the
  hog still rides in-process).
- In-process grafast (`server-graphql.ts`) only exists because `/api/graphql`
  isn't reachable at build time. A separate always-on API removes that reason.
- Independent deploy/scale; cleaner codegen workflow; lighter site build.

## Target shape
```
packages/
  api/      NEW — Fastify + PostGraphile (grafserv), own Vercel project, Fluid Compute
  site/     Next app — pure GraphQL consumer over HTTP
  database/ unchanged
```

## Hosting: Vercel Fluid Compute (critical)
PostGraphile wants a persistent process + warm pg pool. Do NOT use
one-request-per-instance serverless (schema rebuild per cold start = the same
memory cost, repeated). Fluid Compute reuses instances across requests, so the
schema build amortizes. Configure the api project for Fluid (default on Vercel
now) + a warm pg pool sized for pooled connections (Neon pooler URL).

## Phase A — scaffold packages/api
- New workspace package `@gtibrett/effone-hub-api` (add to pnpm-workspace.yaml).
- Fastify + `postgraphile` + `postgraphile/grafserv/fastify` (v5 adapter).
- MOVE from site (these are server-only, no JSX):
  - `src/api/postgraphile/F1dbSmartTags.ts`
  - `src/api/postgraphile/wikipedia/WikipediaBioPlugin.ts`
  - `graphile.config.ts` (the IdRemapPlugin, disablePlugins, defaultBehavior,
    pgOmitListSuffix, exportSchemaSDLPath all come along)
  - `src/api/ingest/*` (raw-pg ingest) — decide: API service owns writes, or
    keep as the site's cron. Leaning: move to api (co-locate DB writes), expose
    a protected `/cron/ingest` route; site cron just pings it. Revisit.
- DELETE from site after move:
  - `src/pages/api/graphql.ts`, `graphql/stream.ts`, `graphiql.ts`,
    `ruru-static/[...path].ts`
  - `src/api/postgraphile/postgraphileMiddleware.ts`
- Fastify server: mount grafserv at `/graphql` (+ optional graphiql gated by
  env). Healthcheck route. CORS allowlist = site origins (prod + preview).
- Keep `exportSchemaSDLPath` writing `schema.graphql` into the api package for
  codegen consumption (NOT into a Next-watched tree — was a dev-loop hazard).

## Phase B — simplify the site (the payoff)
- DELETE `src/app/lib/server-graphql.ts` (in-process grafast — gone).
- Collapse the two Apollo clients back to ONE:
  - `apollo-make-client.ts` (browser) + `apollo-rsc.ts` (server) both just use
    `HttpLink` → `NEXT_PUBLIC_GRAPHQL_API_URL` (the api service URL).
  - Server-side fetch needs the absolute API URL (env) + the Vercel SSO
    preview-bypass header returns (api preview deployments are SSO-gated) —
    reinstate the `x-vercel-protection-bypass` custom fetch wrapper we removed.
  - Keep the `typePolicies` keyFields (apollo-type-policies.ts) on the BROWSER
    cache. Server cache can stay plain (one-shot reads) — same split as today,
    minus the grafast link.
- Remove postgraphile + pg + grafast + graphile-* from site deps + the
  `serverExternalPackages`/webpack-externals block in next.config.mjs. Site
  build no longer bundles any of it.
- `generateStaticParams`/`generateMetadata`/RSC now hit the always-on API over
  HTTP at build (it's a separate running deployment) → 93-page SSG still works,
  no in-process path needed.

## Phase C — codegen + env wiring
- codegen `schema:` → point at the api package's emitted `schema.graphql` (or
  the live api `/graphql` introspection URL via CODEGEN_SCHEMA_URL).
- Env:
  - api: `POSTGRES_URL` (Neon pooler), `POSTGRES_SCHEMA=f1db,app`, graphiql flag.
  - site: `NEXT_PUBLIC_GRAPHQL_API_URL=https://<api>.vercel.app/graphql`,
    `VERCEL_AUTOMATION_BYPASS_SECRET` for preview server-fetch.
- Two Vercel projects from one monorepo (root dir per project). Document the
  link/deploy order.

## Phase D — local dev
- `pnpm dev` runs BOTH: api (fastify watch) + site (next dev), e.g. via a root
  script (`concurrently` or `pnpm -r --parallel dev`).
- Site dev points at `http://localhost:<api-port>/graphql`.
- Confirms the site dev process no longer carries postgraphile → memory drop.

## Open decisions (resolve at kickoff)
1. Ingest/cron: move to api or keep in site pinging api? (lean: api owns writes)
2. API port + local URL convention.
3. Schema source for codegen: emitted file vs live introspection.
4. Auth between site↔api beyond Vercel preview bypass (public read API? IP
   allowlist? none for now — read-only F1 data).
5. Does dropping `serverExternalPackages` let site move fully to Turbopack dev
   (no more webpack-only externals)? If yes, Turbopack becomes viable → another
   big memory/speed win. Check after Phase B.

## Verification (per phase)
- A: api boots, `/graphql` introspects, sample query returns data.
- B: site tsc + jest + `next build` → 93 pages, hitting the live api; no
  postgraphile in site bundle (grep deps).
- C: codegen green against api schema.
- D: `pnpm dev` both up; site dev RSS materially lower than today.

## Risk / notes
- Network hop site→api: mitigated by `cacheLife('max')` (≈all reads cached).
- Fluid cold start still builds schema once per fresh instance — acceptable,
  amortized by instance reuse. Keep the globalThis singleton pattern in the
  api process too.
- This SUBSUMES the ISR question: once api is always-on, in-process grafast is
  gone regardless of SSG vs ISR. Decide SSG/ISR purely on first-paint UX after.
