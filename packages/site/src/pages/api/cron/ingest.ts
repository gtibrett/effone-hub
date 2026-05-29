/**
 * /api/cron/ingest — deprecated alias for /api/cron/revalidate.
 *
 * The full F1DB ingest pipeline now runs in GitHub Actions
 * (`.github/workflows/ingest.yml`) so it isn't bound by Vercel's 60s Hobby
 * function timeout. This endpoint exists only as a legacy alias for manual
 * triggers — it forwards to the revalidate handler, which is the only
 * Vercel-resident piece of the ingest flow (Cache Components tag
 * invalidation must happen inside a Next request scope).
 *
 * See docs/DEPLOY.md "Cron / Ingest" section for the new topology.
 */
import { NextApiRequest, NextApiResponse } from 'next';

import revalidate from './revalidate';

export const config = {
	maxDuration: 10,
	api: { bodyParser: false }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	return revalidate(req, res);
}
