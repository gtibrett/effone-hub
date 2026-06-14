/**
 * POST /api/cron/ingest — deprecated alias for /api/cron/revalidate.
 *
 * The full F1DB ingest pipeline now runs in GitHub Actions
 * (`.github/workflows/ingest.yml`) so it isn't bound by Vercel's function
 * timeout. This endpoint exists only as a legacy alias for manual triggers —
 * it re-exports the revalidate handler, the only Vercel-resident piece of the
 * ingest flow (Cache Components tag invalidation must run in a Next request
 * scope). See docs/DEPLOY.md "Cron / Ingest".
 */
export { maxDuration, POST } from '../revalidate/route';
