/**
 * Broad cache tags fired by POST /api/cron/revalidate after each F1DB ingest
 * (~24×/year). This is the ONLY invalidation path for Cache Components data:
 * every cached accessor in `cached-data.ts` must include at least one of these
 * in its cacheTag() call or its entries survive ingests until cacheLife expiry.
 * Enforced by `cache-tags.test.ts`.
 */
export const INGEST_CACHE_TAGS = [
	'seasons',
	'current-season',
	'drivers',
	'teams',
	'circuits',
	'races'
] as const;

export type IngestCacheTag = (typeof INGEST_CACHE_TAGS)[number];
