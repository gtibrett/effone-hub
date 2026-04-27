/**
 * Jolpica-F1 (the Ergast successor) /laps endpoint fetcher.
 *
 * Endpoint: https://api.jolpi.ca/ergast/f1/{year}/{round}/laps.json
 * Pagination: max limit=100 timings per request (server clamps anything higher).
 * Rate limits: anonymous 4 req/sec, 500 req/hour.
 *
 * Each call returns one race's worth of paginated lap timings.
 */

const BASE = 'https://api.jolpi.ca/ergast/f1';
const MAX_LIMIT = 100;
const REQ_INTERVAL_MS = 260; // ~3.8 req/sec, just under the 4/sec cap

export type JolpicaLapTiming = {
	driverId: string;
	position: string;
	time: string;
};

export type ParsedLap = {
	lap: number;
	timings: JolpicaLapTiming[];
};

let lastRequestAt = 0;

async function throttle(): Promise<void> {
	const elapsed = Date.now() - lastRequestAt;
	if (elapsed < REQ_INTERVAL_MS) {
		await new Promise(r => setTimeout(r, REQ_INTERVAL_MS - elapsed));
	}
	lastRequestAt = Date.now();
}

async function fetchPage(year: number, round: number, offset: number): Promise<{total: number; laps: ParsedLap[]}> {
	await throttle();
	const url = `${BASE}/${year}/${round}/laps.json?limit=${MAX_LIMIT}&offset=${offset}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Jolpica ${res.status} for ${url}`);
	}
	const json = await res.json() as {
		MRData: {
			total: string;
			RaceTable: {Races: Array<{Laps: Array<{number: string; Timings: JolpicaLapTiming[]}>}>};
		};
	};
	const races = json.MRData.RaceTable.Races;
	const laps: ParsedLap[] = races.length === 0 ? [] : races[0].Laps.map(l => ({
		lap:     parseInt(l.number, 10),
		timings: l.Timings
	}));
	return {total: parseInt(json.MRData.total, 10), laps};
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
		const {total: t, laps} = await fetchPage(year, round, offset);
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
		.map(([lap, timings]) => ({lap, timings}));
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
