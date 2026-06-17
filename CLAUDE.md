# effone-hub

Formula One stats hub. pnpm monorepo (`pnpm@11`, Node 24).

## Packages
- `packages/site` — Next.js 16 (App Router, React 19). Apollo Client 4, MUI v9 + charts. See [`packages/site/CLAUDE.md`](packages/site/CLAUDE.md) for site commands + gotchas.
- `packages/api` — PostGraphile 5 + Fastify GraphQL server over F1DB Postgres. Emits `schema.graphql` consumed by the site's codegen. See [`packages/api/CLAUDE.md`](packages/api/CLAUDE.md).
- `packages/database` — Dockerized Postgres seeded from F1DB (`docker-compose.yaml`). **Local only.** Production data is **Neon Postgres**; build-time prerender hits Neon, so prerender scope is capped to limit egress (see site `generateStaticParams`). See [`packages/database/CLAUDE.md`](packages/database/CLAUDE.md).

## Commands
```bash
pnpm db:start    # Postgres via Docker — REQUIRED before api/site
pnpm dev         # api + site in parallel
pnpm lint        # biome check  (lint:fix to autofix)
pnpm site:build  # next build (webpack)
```

## Git
- Default branch is `develop` — branch from it and open PRs into it, **not** `main`.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
