import {NextResponse} from 'next/server';
import {Client} from 'pg';
import {applyDumpAndSwap} from '@/api/ingest/applyDump';
import {downloadDump, getLatestRelease, readDump} from '@/api/ingest/fetchF1DB';
import {ingestLapTimesForRace, LapInsertReport} from '@/api/ingest/insertLapTimes';
import {pickRacesNeedingLapTimes} from '@/api/ingest/pickNewRaces';
import {buildDriverResolver} from '@/api/ingest/resolveDriverId';

export const dynamic     = 'force-dynamic';
export const runtime     = 'nodejs';
export const maxDuration = 300;

function getDirectConnectionString(): string {
	const url = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
	if (!url) throw new Error('POSTGRES_URL_NON_POOLING or POSTGRES_URL is required');
	return url;
}

function authorize(req: Request): boolean {
	const expected = process.env.CRON_SECRET;
	if (!expected) return false;
	return req.headers.get('authorization') === `Bearer ${expected}`;
}

async function readIngestState(client: Client, key: string): Promise<string | null> {
	const {rows} = await client.query<{value: string | null}>(
		'select value from app.ingest_state where key = $1',
		[key]
	);
	return rows[0]?.value ?? null;
}

async function writeIngestState(client: Client, key: string, value: string): Promise<void> {
	await client.query(
		`insert into app.ingest_state (key, value, updated_at)
		 values ($1, $2, now())
		 on conflict (key) do update set value = excluded.value, updated_at = now()`,
		[key, value]
	);
}

async function runIngest(req: Request): Promise<NextResponse> {
	if (!authorize(req)) {
		return NextResponse.json({error: 'unauthorized'}, {status: 401});
	}
	const url = new URL(req.url);
	const force = url.searchParams.get('force') === '1';
	const dryRun = url.searchParams.get('dryRun') === '1';

	const connStr = getDirectConnectionString();
	const startedAt = Date.now();
	const summary = {
		startedAt:        new Date(startedAt).toISOString(),
		release:          null as string | null,
		previousRelease:  null as string | null,
		dumpApplied:      false,
		dumpDurationMs:   0,
		lapTimes:         [] as LapInsertReport[],
		errors:           [] as string[]
	};

	try {
		const release = await getLatestRelease();
		summary.release = release.tag;

		const stateClient = new Client({connectionString: connStr});
		await stateClient.connect();
		try {
			summary.previousRelease = await readIngestState(stateClient, 'last_release_tag');
		} finally {
			await stateClient.end();
		}

		const tagAdvanced = summary.previousRelease !== release.tag;
		if (!tagAdvanced && !force) {
			return NextResponse.json({...summary, message: 'no new release; nothing to do'});
		}
		if (dryRun) {
			return NextResponse.json({...summary, message: `dry run; would apply ${release.tag}`});
		}

		if (tagAdvanced || force) {
			const {sqlPath, cleanup} = await downloadDump(release);
			try {
				const sql = await readDump(sqlPath);
				const {durationMs} = await applyDumpAndSwap(connStr, sql);
				summary.dumpApplied   = true;
				summary.dumpDurationMs = durationMs;
			} finally {
				await cleanup();
			}
		}

		const lapClient = new Client({connectionString: connStr});
		await lapClient.connect();
		try {
			const races = await pickRacesNeedingLapTimes(lapClient);
			if (races.length > 0) {
				const resolve = await buildDriverResolver(lapClient);
				for (const race of races) {
					try {
						const report = await ingestLapTimesForRace(lapClient, resolve, race);
						summary.lapTimes.push(report);
					} catch (err) {
						summary.errors.push(`lap fetch ${race.year} R${race.round}: ${(err as Error).message}`);
					}
				}
			}
			if (summary.dumpApplied) {
				await writeIngestState(lapClient, 'last_release_tag', release.tag);
			}
		} finally {
			await lapClient.end();
		}

		return NextResponse.json({...summary, durationMs: Date.now() - startedAt});
	} catch (err) {
		summary.errors.push((err as Error).message);
		return NextResponse.json({...summary, durationMs: Date.now() - startedAt}, {status: 500});
	}
}

// Vercel Cron sends GET with the bearer token. POST is also supported for
// manual triggers / curl.
export const GET  = runIngest;
export const POST = runIngest;
