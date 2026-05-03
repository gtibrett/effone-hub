import {Client} from 'pg';
import {fetchAllLaps, parseTimeToMillis} from './fetchJolpicaLaps';
import {DriverResolver} from './resolveDriverId';

export type LapInsertReport = {
	raceId:        number;
	year:          number;
	round:         number;
	rowsInserted:  number;
	rowsSkipped:   number;
	skippedDriverIds: string[]; // unresolved Ergast refs
};

/**
 * Fetch every lap timing for one race from Jolpica and bulk-insert into
 * app.lap_times. Idempotent: ON CONFLICT DO NOTHING means a re-run is safe.
 */
export async function ingestLapTimesForRace(
	client:   Client,
	resolve:  DriverResolver,
	race:     {raceId: number; year: number; round: number}
): Promise<LapInsertReport> {
	const laps = await fetchAllLaps(race.year, race.round);
	const skippedSet = new Set<string>();
	const params: unknown[] = [];
	const tuples: string[] = [];

	for (const lap of laps) {
		for (const t of lap.timings) {
			const driverId = await resolve(t.driverId);
			if (!driverId) {
				skippedSet.add(t.driverId);
				continue;
			}
			const idx = params.length;
			params.push(race.raceId, driverId, lap.lap, parseInt(t.position, 10), t.time, parseTimeToMillis(t.time));
			tuples.push(`($${idx + 1},$${idx + 2},$${idx + 3},$${idx + 4},$${idx + 5},$${idx + 6})`);
		}
	}

	if (tuples.length === 0) {
		return {raceId: race.raceId, year: race.year, round: race.round, rowsInserted: 0, rowsSkipped: skippedSet.size, skippedDriverIds: [...skippedSet]};
	}

	// Batch in chunks to keep statement size reasonable. ~70 laps × 20 drivers = 1400 rows;
	// at 6 params each = 8400 params; PG has a 65535 param limit per query, so we chunk
	// at 1000 rows just to be safe.
	const CHUNK = 1000;
	let inserted = 0;
	for (let i = 0; i < tuples.length; i += CHUNK) {
		const chunkTuples = tuples.slice(i, i + CHUNK);
		const chunkParams = params.slice(i * 6, (i + CHUNK) * 6);
		// Re-number placeholders for the chunk.
		const renumbered = chunkTuples
			.map((_, n) => {
				const base = n * 6;
				return `($${base + 1},$${base + 2},$${base + 3},$${base + 4},$${base + 5},$${base + 6})`;
			})
			.join(',');
		const result = await client.query(
			`insert into app.lap_times (race_id, driver_id, lap, position, time_text, milliseconds)
			 values ${renumbered}
			 on conflict (race_id, driver_id, lap) do nothing`,
			chunkParams
		);
		inserted += result.rowCount ?? 0;
	}

	return {
		raceId:           race.raceId,
		year:             race.year,
		round:            race.round,
		rowsInserted:     inserted,
		rowsSkipped:      skippedSet.size,
		skippedDriverIds: [...skippedSet]
	};
}
