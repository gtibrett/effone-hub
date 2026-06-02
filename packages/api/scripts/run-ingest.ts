/**
 * Standalone F1DB ingest entry-point.
 *
 * Hosted from GitHub Actions (`.github/workflows/ingest.yml`) so the run is
 * not bound by Vercel's 60s Hobby-plan serverless cap. Performs the full
 * pipeline:
 *
 *   1. Compare latest F1DB release tag with `app.ingest_state.last_release_tag`.
 *   2. If new: download dump, `applyDumpAndSwap`, update state.
 *   3. Backfill Jolpica lap-times for any races needing them (no soft budget;
 *      runner has up to 6h).
 *   4. POST `/api/cron/revalidate` on the production deployment so Cache
 *      Components tags are invalidated.
 *
 * Required env:
 *   POSTGRES_URL          — Neon connection string (main branch).
 *   CRON_SECRET           — Bearer token shared with /api/cron/revalidate.
 *   REVALIDATE_URL        — e.g. https://effonehub.com/api/cron/revalidate.
 *                           Optional; defaults to https://effonehub.com/...
 *   MAX_LAP_RACES         — Optional cap on lap-time backfills per run.
 *
 * Run locally: `POSTGRES_URL=... CRON_SECRET=... tsx scripts/run-ingest.ts`.
 */

import {Client} from 'pg';
import {applyDumpAndSwap} from '../src/ingest/applyDump';
import {downloadDump, getLatestRelease, readDump} from '../src/ingest/fetchF1DB';
import {ingestLapTimesForRace, type LapInsertReport} from '../src/ingest/insertLapTimes';
import {pickRacesNeedingLapTimes} from '../src/ingest/pickNewRaces';
import {buildDriverResolver} from '../src/ingest/resolveDriverId';

const REVALIDATE_URL = process.env.REVALIDATE_URL ?? 'https://effonehub.com/api/cron/revalidate';
const MAX_RACES      = Number(process.env.MAX_LAP_RACES ?? '500');

async function main(): Promise<void> {
	const connectionString = process.env.POSTGRES_URL;
	if (!connectionString) throw new Error('POSTGRES_URL not set');

	const cronSecret = process.env.CRON_SECRET;
	if (!cronSecret) {
		console.warn('[ingest] CRON_SECRET not set; revalidate step will be skipped.');
	}

	const release = await getLatestRelease();

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

	const dumpApplied = currentTag !== release.tag;
	let durationMs    = 0;

	if (dumpApplied) {
		console.log(`[ingest] new release ${release.tag} (was ${currentTag ?? 'none'}); starting ingest`);
		const {sqlPath, cleanup} = await downloadDump(release);
		try {
			const sql = await readDump(sqlPath);
			({durationMs} = await applyDumpAndSwap(connectionString, sql));
		} finally {
			await cleanup();
		}
		console.log(`[ingest] dump applied in ${durationMs}ms`);
	} else {
		console.log(`[ingest] release ${release.tag} already loaded — skipping dump apply`);
	}

	// Single long-lived pg Client across many Jolpica round-trips drops
	// silently on Neon when the socket sits idle between fetches. Wrap
	// every race in a connect/end pair (and fail-soft on errors) so a
	// dead socket only kills the one iteration, not the whole run.
	const lapClientOpts = {connectionString, keepAlive: true};
	const lapReports: LapInsertReport[] = [];

	const bootstrapClient = new Client(lapClientOpts);
	await bootstrapClient.connect();
	let races;
	let resolve;
	try {
		races   = await pickRacesNeedingLapTimes(bootstrapClient, 2025, MAX_RACES);
		resolve = await buildDriverResolver(bootstrapClient);
	} finally {
		await bootstrapClient.end();
	}

	for (let i = 0; i < races.length; i++) {
		const race = races[i];
		const lapClient = new Client(lapClientOpts);
		try {
			await lapClient.connect();
			const report = await ingestLapTimesForRace(lapClient, resolve, race);
			lapReports.push(report);
			console.log(`[ingest] laps race ${race.raceId} (${race.year}/${race.round}): ${report.rowsInserted} inserted`);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			if (msg.includes('Jolpica 429') || msg.includes('429')) {
				console.log(`[ingest] Jolpica rate-limited at race ${i + 1}/${races.length}, stopping early`);
				break;
			}
			console.error(`[ingest] lap fetch failed for race ${race.raceId}:`, err);
		} finally {
			await lapClient.end().catch(() => {});
		}
	}

	if (dumpApplied) {
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
	}

	if (cronSecret) {
		console.log(`[ingest] invalidating Cache Components tags via ${REVALIDATE_URL}`);
		const res = await fetch(REVALIDATE_URL, {
			method:  'POST',
			headers: {Authorization: `Bearer ${cronSecret}`}
		});
		if (!res.ok) {
			console.error(`[ingest] revalidate POST returned ${res.status}: ${await res.text()}`);
			process.exitCode = 1;
		}
	}

	console.log(`[ingest] done. tag=${release.tag} dumpApplied=${dumpApplied} lapRaces=${lapReports.length}`);
}

main().catch(err => {
	console.error('[ingest] fatal:', err);
	process.exit(1);
});
