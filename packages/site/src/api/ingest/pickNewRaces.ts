import { Client } from 'pg';

export type RaceToFetch = {
	raceId: number;
	year: number;
	round: number;
};

/**
 * Find races that have results in F1DB but no rows in app.lap_times.
 *
 * Constraints:
 *   - Only races with a populated race_result (otherwise lap-times don't exist).
 *   - Only races from `minYear` onward (default 2025) — historical races are
 *     either covered by a one-time backfill or out of scope.
 *
 * Returns the list ordered ascending so a single ingest can backfill multiple
 * races deterministically.
 */
export async function pickRacesNeedingLapTimes(
	client: Client,
	minYear = 2025,
	limit?: number
): Promise<RaceToFetch[]> {
	const params: number[] = [minYear];
	const limitClause = limit !== undefined ? ` limit $2` : '';
	if (limit !== undefined) params.push(limit);
	const { rows } = await client.query<RaceToFetch>(
		`
		select r.id as "raceId", r.year, r.round
		from f1db.race r
		where r.year >= $1
		  and exists (select 1 from f1db.race_result rr where rr.race_id = r.id)
		  and not exists (select 1 from app.lap_times lt where lt.race_id = r.id)
		order by r.year, r.round${limitClause}
	`,
		params
	);
	return rows;
}
