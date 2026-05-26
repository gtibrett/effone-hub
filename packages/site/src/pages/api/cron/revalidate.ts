/**
 * /api/cron/revalidate — invalidate Cache Components tags.
 *
 * Called by the GitHub Action runner (`.github/workflows/ingest.yml`) after
 * a successful ingest. The runner sends `Authorization: Bearer ${CRON_SECRET}`;
 * we mirror that against the env-var and return 401 on mismatch.
 *
 * `updateTag` from `next/cache` must run inside a Next request scope, which
 * is why this thin handler stays on Vercel even though the heavy ingest work
 * lives in the GitHub Action.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { updateTag } from 'next/cache';

export const config = {
	maxDuration: 10,
	api: { bodyParser: false }
};

const CACHE_TAGS = ['seasons', 'current-season', 'drivers', 'teams', 'circuits', 'races'] as const;

type RevalidateResult = {
	status: 'ok' | 'unauthorized' | 'partial';
	revalidated?: string[];
	failed?: Array<{ tag: string; error: string }>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RevalidateResult>) {
	const cronSecret = process.env.CRON_SECRET;
	if (cronSecret) {
		const authHeader = req.headers['authorization'] ?? '';
		if (authHeader !== `Bearer ${cronSecret}`) {
			res.status(401).json({ status: 'unauthorized' });
			return;
		}
	}

	const revalidated: string[] = [];
	const failed: Array<{ tag: string; error: string }> = [];
	for (const tag of CACHE_TAGS) {
		try {
			updateTag(tag);
			revalidated.push(tag);
		} catch (err) {
			failed.push({ tag, error: err instanceof Error ? err.message : String(err) });
		}
	}

	res.status(failed.length ? 207 : 200).json({
		status: failed.length ? 'partial' : 'ok',
		revalidated,
		...(failed.length ? { failed } : {})
	});
}
