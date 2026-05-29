/**
 * Jolpica-F1 (the Ergast successor) /laps endpoint fetcher.
 *
 * Endpoint: https://api.jolpi.ca/ergast/f1/{year}/{round}/laps.json
 * Pagination: max limit=100 timings per request (server clamps anything higher).
 *
 * Rate limits (per https://github.com/jolpica/jolpica-f1/blob/main/docs/rate_limits.md):
 *   - 4 requests/second burst (anonymous)
 *   - 500 requests/hour sustained (anonymous)
 *
 * Throttle strategy:
 *   1. Burst gate: ≥260 ms between any two requests (~3.85 req/sec, leaves
 *      headroom under the 4/sec cap for clock drift).
 *   2. Sliding-window hour gate: keep timestamps of the last 500 requests; if
 *      the window is full, sleep until the oldest entry ages out. This avoids
 *      hammering the cap and then 429-stopping the run after ~100 reqs.
 *
 * 429 safety net: even with both gates, if Jolpica hands us a 429 (rate-limit
 * adjusted server-side, clock skew, etc.) we honor `Retry-After` once before
 * propagating — the caller's outer loop converts a propagated 429 into a
 * clean early stop.
 */

const BASE = 'https://api.jolpi.ca/ergast/f1';
const MAX_LIMIT = 100;
const BURST_MS = 260; // ~3.85 req/sec, just under the 4/sec cap
const HOUR_MS = 3_600_000;
const HOUR_CAP = 500;
const MAX_BACKOFF_S = 300; // refuse to sleep more than 5 min on a single 429

export type JolpicaLapTiming = {
	driverId: string;
	position: string;
	time: string;
};

export type ParsedLap = {
	lap: number;
	timings: JolpicaLapTiming[];
};

// Sliding window of recent request timestamps (ms). Older entries are dropped
// every time throttle() is called.
const requestTimestamps: number[] = [];

function sleep(ms: number): Promise<void> {
	return new Promise(r => setTimeout(r, ms));
}

async function throttle(): Promise<void> {
	let now = Date.now();

	// Drop entries that have aged out of the 1h window.
	while (requestTimestamps.length && now - requestTimestamps[0] > HOUR_MS) {
		requestTimestamps.shift();
	}

	// Burst gate.
	const last = requestTimestamps[requestTimestamps.length - 1];
	if (last !== undefined) {
		const sinceLast = now - last;
		if (sinceLast < BURST_MS) await sleep(BURST_MS - sinceLast);
	}

	// Hour gate.
	if (requestTimestamps.length >= HOUR_CAP) {
		const wakeAt = requestTimestamps[0] + HOUR_MS;
		const sleepMs = wakeAt - Date.now();
		if (sleepMs > 0) {
			console.warn(
				`[jolpica] hourly cap (${HOUR_CAP}/hr) reached — sleeping ${Math.ceil(sleepMs / 1000)}s`
			);
			await sleep(sleepMs);
			now = Date.now();
			while (requestTimestamps.length && now - requestTimestamps[0] > HOUR_MS) {
				requestTimestamps.shift();
			}
		}
	}

	requestTimestamps.push(Date.now());
}

async function fetchPage(
	year: number,
	round: number,
	offset: number
): Promise<{ total: number; laps: ParsedLap[] }> {
	const url = `${BASE}/${year}/${round}/laps.json?limit=${MAX_LIMIT}&offset=${offset}`;

	let res: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt++) {
		await throttle();
		res = await fetch(url);

		if (res.status !== 429) break;

		// 429 safety net: honor Retry-After once, then bail.
		const ra = res.headers.get('retry-after') ?? '';
		const seconds = /^\d+$/.test(ra) ? parseInt(ra, 10) : NaN;
		// `Retry-After` can also be an HTTP-date; if it's not a plain integer
		// we treat it as a 60s default rather than parsing the date.
		const backoffS = Number.isFinite(seconds) ? seconds : 60;
		if (backoffS > MAX_BACKOFF_S) {
			throw new Error(
				`Jolpica 429 for ${url} (retry-after ${backoffS}s > ${MAX_BACKOFF_S}s cap)`
			);
		}
		console.warn(
			`[jolpica] 429 for ${url} — honoring Retry-After ${backoffS}s (attempt ${attempt + 1}/2)`
		);
		await sleep(backoffS * 1000);
	}

	if (!res || !res.ok) {
		throw new Error(`Jolpica ${res?.status ?? 'no-response'} for ${url}`);
	}

	const json = (await res.json()) as {
		MRData: {
			total: string;
			RaceTable: {
				Races: Array<{ Laps: Array<{ number: string; Timings: JolpicaLapTiming[] }> }>;
			};
		};
	};
	const races = json.MRData.RaceTable.Races;
	const laps: ParsedLap[] =
		races.length === 0
			? []
			: races[0].Laps.map(l => ({
					lap: parseInt(l.number, 10),
					timings: l.Timings
				}));
	return { total: parseInt(json.MRData.total, 10), laps };
}

/**
 * Fetch every lap timing for a given (year, round). Merges paginated lap
 * fragments — Jolpica may return the same lap split across pages.
 */
export async function fetchAllLaps(year: number, round: number): Promise<ParsedLap[]> {
	const merged = new Map<number, JolpicaLapTiming[]>();
	let offset = 0;
	let total = -1;

	while (total === -1 || offset < total) {
		const { total: t, laps } = await fetchPage(year, round, offset);
		total = t;
		if (laps.length === 0 && offset === 0) return [];
		let returnedTimings = 0;
		for (const lap of laps) {
			const existing = merged.get(lap.lap) ?? [];
			existing.push(...lap.timings);
			merged.set(lap.lap, existing);
			returnedTimings += lap.timings.length;
		}
		if (returnedTimings === 0) break; // safety against infinite loops
		offset += returnedTimings;
	}

	return Array.from(merged.entries())
		.sort((a, b) => a[0] - b[0])
		.map(([lap, timings]) => ({ lap, timings }));
}

/** Convert an Ergast time string like "1:37.284" into milliseconds. */
export function parseTimeToMillis(time: string): number | null {
	if (!time) return null;
	const m = time.match(/^(?:(\d+):)?(\d+)\.(\d+)$/);
	if (!m) return null;
	const minutes = parseInt(m[1] ?? '0', 10);
	const seconds = parseInt(m[2], 10);
	const fractional = m[3].padEnd(3, '0').slice(0, 3);
	return minutes * 60_000 + seconds * 1_000 + parseInt(fractional, 10);
}
