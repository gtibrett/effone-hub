/**
 * GET /api/bio/refresh?type=driver|team&id=<slug>
 *
 * Lazy-loads a Wikipedia bio for a single driver or team.
 * TTL is 30 days for current-season participants, 365 days otherwise.
 * Returns JSON: { status, updatedAt?, ttlDays, error? }
 *
 * Cache-Control: public, max-age=60  — back-to-back browser calls within 1 min
 * won't hammer the DB or Wikipedia.
 */

import {Client} from 'pg';
import {NextApiRequest, NextApiResponse} from 'next';
import {
	fetchAndUpsertDriverBio,
	fetchAndUpsertConstructorBio,
	SingleBioResult,
} from '@/api/ingest/fetchWikipediaBios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SingleBioResult>
) {
	const {type, id} = req.query;

	if (typeof type !== 'string' || (type !== 'driver' && type !== 'team')) {
		res.status(400).json({status: 'failed', ttlDays: 0, error: 'type must be "driver" or "team"'});
		return;
	}
	if (typeof id !== 'string' || !id) {
		res.status(400).json({status: 'failed', ttlDays: 0, error: 'id is required'});
		return;
	}

	const connectionString = process.env.POSTGRES_URL;
	if (!connectionString) {
		res.status(500).json({status: 'failed', ttlDays: 0, error: 'POSTGRES_URL not set'});
		return;
	}

	const client = new Client({connectionString});
	await client.connect();

	let result: SingleBioResult;
	try {
		result = type === 'driver'
			? await fetchAndUpsertDriverBio(client, id)
			: await fetchAndUpsertConstructorBio(client, id);
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error(`[bio/refresh] error for ${type}/${id}:`, err);
		result = {status: 'failed', ttlDays: 0, error: msg};
	} finally {
		await client.end();
	}

	res.setHeader('Cache-Control', 'public, max-age=60');
	res.status(result.status === 'failed' ? 500 : 200).json(result);
}
