/**
 * /api/cron/ingest — daily F1DB ingest endpoint.
 *
 * Vercel Cron calls this at 06:00 UTC every day (see vercel.json).
 * It is also safe to invoke manually (e.g. after a deployment) for an
 * immediate update.
 *
 * Auth: Vercel Cron automatically sends `Authorization: Bearer <CRON_SECRET>`.
 * Direct callers must supply the same header.
 *
 * Environment variables required:
 *   CRON_SECRET   — shared secret; Vercel sets this automatically on Pro.
 *   POSTGRES_URL  — Neon connection string (postgres://...).
 *   GITHUB_TOKEN  — optional; raises GitHub API rate limit from 60 to 5000/h.
 */

import {Client} from 'pg';
import {NextApiRequest, NextApiResponse} from 'next';
import {getLatestRelease, downloadDump, readDump} from '@/api/ingest/fetchF1DB';
import {applyDumpAndSwap} from '@/api/ingest/applyDump';
import {pickRacesNeedingLapTimes} from '@/api/ingest/pickNewRaces';
import {buildDriverResolver} from '@/api/ingest/resolveDriverId';
import {ingestLapTimesForRace, LapInsertReport} from '@/api/ingest/insertLapTimes';

export const config = {
	maxDuration: 300,
	api: {bodyParser: false}
};

const MAX_RUN_MS            = 4 * 60 * 1000; // 4 minutes — leave 60 s of headroom before the 300 s hard limit
const MIN_BUDGET_PER_RACE_MS = 15_000;        // stop scheduling new races when less than 15 s remains
const MAX_RACES_PER_RUN      = 50;            // hard ceiling regardless of remaining time budget

type IngestResult = {
	status:          'no-op' | 'updated';
	tag?:            string;
	durationMs?:     number;
	lapReports?:     LapInsertReport[];
	racesAttempted?: number;
	racesCompleted?: number;
	racesPending?:   number;
	truncated?:      boolean;
	error?:          string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<IngestResult>) {
	// --- Auth ---
	const cronSecret = process.env.CRON_SECRET;
	if (cronSecret) {
		const authHeader = req.headers['authorization'] ?? '';
		if (authHeader !== `Bearer ${cronSecret}`) {
			res.status(401).json({status: 'no-op', error: 'Unauthorized'});
			return;
		}
	}

	const connectionString = process.env.POSTGRES_URL;
	if (!connectionString) {
		res.status(500).json({status: 'no-op', error: 'POSTGRES_URL not set'});
		return;
	}

	// --- Check latest release ---
	const release = await getLatestRelease();

	// Read current tag from DB.
	const stateClient = new Client({connectionString});
	await stateClient.connect();
	let currentTag: string | null = null;
	try {
		const {rows} = await stateClient.query<{value: string}>(
			`select value from app.ingest_state where key = 'last_release_tag'`
		);
		currentTag = rows[0]?.value ?? null;
	} finally {
		await stateClient.end();
	}

	if (currentTag === release.tag) {
		res.status(200).json({status: 'no-op', tag: release.tag});
		return;
	}

	console.log(`[ingest] new release ${release.tag} (was ${currentTag ?? 'none'}); starting ingest`);

	// --- Download + apply dump ---
	const {sqlPath, cleanup} = await downloadDump(release);
	let durationMs: number;
	try {
		const sql = await readDump(sqlPath);
		({durationMs} = await applyDumpAndSwap(connectionString, sql));
	} finally {
		await cleanup();
	}

	console.log(`[ingest] dump applied in ${durationMs}ms`);

	// --- Lap-times backfill ---
	const startedAt = Date.now();
	const lapClient = new Client({connectionString});
	await lapClient.connect();
	const lapReports: LapInsertReport[] = [];
	let racesAttempted = 0;
	let truncated = false;
	try {
		const races = await pickRacesNeedingLapTimes(lapClient, 2025, MAX_RACES_PER_RUN);
		const resolve = await buildDriverResolver(lapClient);
		for (let i = 0; i < races.length; i++) {
			if (Date.now() - startedAt + MIN_BUDGET_PER_RACE_MS > MAX_RUN_MS) {
				console.log(`[ingest] truncated at race ${i + 1}/${races.length}, returning early`);
				truncated = true;
				break;
			}
			const race = races[i];
			racesAttempted++;
			try {
				const report = await ingestLapTimesForRace(lapClient, resolve, race);
				lapReports.push(report);
				console.log(`[ingest] laps race ${race.raceId} (${race.year}/${race.round}): ${report.rowsInserted} inserted`);
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				// 429 = rate-limited by Jolpica; further requests this run will fail too.
				// Break early and surface as truncated so the next cron picks up.
				if (msg.includes('Jolpica 429') || msg.includes('429')) {
					console.log(`[ingest] Jolpica rate-limited at race ${i + 1}/${races.length}, returning early`);
					truncated = true;
					break;
				}
				console.error(`[ingest] lap fetch failed for race ${race.raceId}:`, err);
			}
		}
	} finally {
		await lapClient.end();
	}
	const racesCompleted = lapReports.length;

	// Query remaining pending races (post-run) for telemetry.
	const pendingClient = new Client({connectionString});
	await pendingClient.connect();
	let racesPending = 0;
	try {
		const pending = await pickRacesNeedingLapTimes(pendingClient);
		racesPending = pending.length;
	} finally {
		await pendingClient.end();
	}

	// --- Update ingest_state ---
	const updateClient = new Client({connectionString});
	await updateClient.connect();
	try {
		await updateClient.query(
			`insert into app.ingest_state (key, value, updated_at)
			 values ('last_release_tag', $1, now())
			 on conflict (key) do update set value = excluded.value, updated_at = excluded.updated_at`,
			[release.tag]
		);
	} finally {
		await updateClient.end();
	}

	console.log(`[ingest] done. tag=${release.tag} dumpMs=${durationMs} lapRaces=${racesCompleted} pending=${racesPending} truncated=${truncated}`);
	res.status(200).json({status: 'updated', tag: release.tag, durationMs, lapReports, racesAttempted, racesCompleted, racesPending, truncated});
}
