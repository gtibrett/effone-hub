/**
 * Contract test: every cached accessor in cached-data.ts must be invalidatable
 * by the ingest cron. The revalidate route only fires the broad tags in
 * INGEST_CACHE_TAGS, so a cacheTag() call without at least one broad tag means
 * that entry silently survives ingests until cacheLife expiry — invisible to
 * tsc, jest units, and next build. Source-level scan keeps the check free of
 * next/cache + Apollo runtime mocking.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { INGEST_CACHE_TAGS } from './cache-tags';

const stripComments = (source: string): string =>
	source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

describe('cached-data.ts ingest invalidation contract', () => {
	const source = stripComments(readFileSync(join(__dirname, 'cached-data.ts'), 'utf8'));

	const useCacheCount = (source.match(/'use cache'/g) ?? []).length;
	const cacheTagCalls = [...source.matchAll(/cacheTag\(([^)]*)\)/g)].map(m => m[1]);

	test('file contains cached accessors', () => {
		expect(useCacheCount).toBeGreaterThan(0);
	});

	test("every 'use cache' function declares exactly one cacheTag call", () => {
		expect(cacheTagCalls).toHaveLength(useCacheCount);
	});

	test('every cacheTag call includes at least one ingest-revalidated broad tag', () => {
		const broadTags = new Set<string>(INGEST_CACHE_TAGS);
		const orphans = cacheTagCalls.filter(args => {
			const literals = [...args.matchAll(/'([^']+)'/g)].map(m => m[1]);
			return !literals.some(tag => broadTags.has(tag));
		});
		expect(orphans).toEqual([]);
	});
});
