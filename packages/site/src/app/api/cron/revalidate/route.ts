/**
 * POST /api/cron/revalidate — invalidate Cache Components tags.
 *
 * Called by the GitHub Action runner (`.github/workflows/ingest.yml`) after a
 * successful ingest. The runner sends `Authorization: Bearer ${CRON_SECRET}`;
 * we mirror that against the env-var and return 401 on mismatch.
 *
 * `revalidateTag` (not `updateTag`): the ingest changed data out-of-band, so we
 * want background stale-while-revalidate on the next request — there is no
 * read-your-writes need in this fire-and-forget cron.
 */
import { revalidateTag } from 'next/cache';

export const maxDuration = 10;

const CACHE_TAGS = ['seasons', 'current-season', 'drivers', 'teams', 'circuits', 'races'] as const;

type RevalidateResult = {
	status: 'ok' | 'unauthorized' | 'partial';
	revalidated?: string[];
	failed?: Array<{ tag: string; error: string }>;
};

export async function POST(req: Request): Promise<Response> {
	const cronSecret = process.env.CRON_SECRET;
	if (!cronSecret) {
		// Fail closed: no secret configured = cannot authenticate. Never expose
		// revalidateTag to anonymous callers (cache-bust DoS).
		console.error('CRON_SECRET not set — refusing /api/cron/revalidate');
		return Response.json({ status: 'unauthorized' } satisfies RevalidateResult, {
			status: 500
		});
	}
	const authHeader = req.headers.get('authorization') ?? '';
	if (authHeader !== `Bearer ${cronSecret}`) {
		return Response.json({ status: 'unauthorized' } satisfies RevalidateResult, {
			status: 401
		});
	}

	const revalidated: string[] = [];
	const failed: Array<{ tag: string; error: string }> = [];
	for (const tag of CACHE_TAGS) {
		try {
			// 'max' matches the cacheLife profile the data fetchers use; tags only
			// flip on the ~24×/year ingest, so longest-lived revalidation is correct.
			revalidateTag(tag, 'max');
			revalidated.push(tag);
		} catch (err) {
			failed.push({ tag, error: err instanceof Error ? err.message : String(err) });
		}
	}

	return Response.json(
		{
			status: failed.length ? 'partial' : 'ok',
			revalidated,
			...(failed.length ? { failed } : {})
		} satisfies RevalidateResult,
		{ status: failed.length ? 207 : 200 }
	);
}
