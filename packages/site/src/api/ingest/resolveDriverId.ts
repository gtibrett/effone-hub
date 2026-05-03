import {Client} from 'pg';

/**
 * Build an Ergast-style driverRef -> F1DB driver.id resolver against a live
 * Postgres connection. F1DB uses kebab-cased full names ("lewis-hamilton")
 * while Ergast/Jolpica typically uses surname-only ("hamilton") or
 * disambiguated ("dick_rathmann"). Direct replace('_','-') matches <5% of
 * active drivers, so we fall back to suffix and surname matching.
 *
 * When race context (year) is provided, ambiguous suffix/surname hits are
 * narrowed to drivers who actually raced in that season, eliminating false
 * positives like arthur-leclerc when resolving "leclerc" in a 2025 F1 race.
 *
 * Returns null when no F1DB driver is found; caller should skip the row.
 */
export type RaceContext = {year: number; round?: number};
export type DriverResolver = (ergastRef: string, race?: RaceContext) => Promise<string | null>;

export async function buildDriverResolver(client: Client): Promise<DriverResolver> {
	const cache = new Map<string, string | null>();

	// Pre-load f1db.driver ids and last names. ~1k rows, trivial.
	const {rows} = await client.query<{id: string; last_name: string}>(
		'select id, last_name from f1db.driver'
	);
	const byId = new Map(rows.map(r => [r.id, r.id]));
	const bySuffix = new Map<string, string[]>(); // last segment after final '-' -> ids
	const byLastNameLower = new Map<string, string[]>(); // lower(last_name) -> ids

	// Strip generational suffixes ("Jr.", "Sr.", "II", "III") so e.g.
	// `byLastNameLower.get('sainz')` matches the driver whose last_name is
	// "Sainz Jr.". Without this the suffix forces a separate bucket.
	const normalizeLastName = (ln: string): string =>
		ln.toLowerCase().replace(/\s+(jr\.?|sr\.?|i{2,3}|iv)$/i, '').trim();

	for (const r of rows) {
		const tail = r.id.slice(r.id.lastIndexOf('-') + 1);
		(bySuffix.get(tail) ?? bySuffix.set(tail, []).get(tail)!).push(r.id);
		const ln = normalizeLastName(r.last_name);
		(byLastNameLower.get(ln) ?? byLastNameLower.set(ln, []).get(ln)!).push(r.id);
	}

	// Pre-load (year, driver_id) -> race count from race_result via race join.
	// Used to break suffix/lastname ties when multiple drivers raced the same
	// season (e.g. Charles + Arthur Leclerc both entered 2025 entrant rolls,
	// but only Charles actually raced).
	const {rows: rcRows} = await client.query<{year: number; driver_id: string; race_count: string}>(
		`select r.year, rr.driver_id, count(*)::text as race_count
		   from f1db.race_result rr
		   join f1db.race r on r.id = rr.race_id
		  group by r.year, rr.driver_id`
	);
	const raceCount = new Map<string, number>(); // key: `${year}|${driver_id}`
	for (const r of rcRows) raceCount.set(`${r.year}|${r.driver_id}`, parseInt(r.race_count, 10));

	function pickByRaceCount(ids: string[], year: number): string | null {
		let best: string | null = null;
		let bestCount = 0;
		for (const id of ids) {
			const c = raceCount.get(`${year}|${id}`) ?? 0;
			if (c > bestCount) { best = id; bestCount = c; }
			else if (c === bestCount && c > 0) { best = null; } // genuine tie -> give up
		}
		return bestCount > 0 ? best : null;
	}

	// Pre-load year -> Set<driverId> from season_entrant_driver for year-scoped disambiguation.
	const {rows: sedRows} = await client.query<{year: number; driver_id: string}>(
		'select year, driver_id from f1db.season_entrant_driver'
	);
	const byYear = new Map<number, Set<string>>();
	for (const r of sedRows) {
		if (!byYear.has(r.year)) byYear.set(r.year, new Set());
		byYear.get(r.year)!.add(r.driver_id);
	}

	function filterToYear(ids: string[], year: number): string[] {
		const active = byYear.get(year);
		if (!active) return [];
		return ids.filter(id => active.has(id));
	}

	return async function resolve(ergastRef: string, race?: RaceContext): Promise<string | null> {
		const key = `${race?.year ?? 'any'}|${ergastRef.trim().toLowerCase()}`;
		if (cache.has(key)) return cache.get(key)!;

		const dashed = ergastRef.trim().toLowerCase().replace(/_/g, '-');

		// a. direct hit
		if (byId.has(dashed)) {
			cache.set(key, dashed);
			return dashed;
		}

		// b. suffix hit restricted to race.year if provided
		const suffixHits = bySuffix.get(dashed) ?? [];
		if (race?.year !== undefined) {
			const yearFiltered = filterToYear(suffixHits, race.year);
			if (yearFiltered.length === 1) {
				cache.set(key, yearFiltered[0]);
				return yearFiltered[0];
			}
			// Multiple year-active candidates: tie-break by race count in that year.
			if (yearFiltered.length > 1) {
				const byCount = pickByRaceCount(yearFiltered, race.year);
				if (byCount) { cache.set(key, byCount); return byCount; }
			}
		}

		// c. suffix hit unrestricted
		if (suffixHits.length === 1) {
			cache.set(key, suffixHits[0]);
			return suffixHits[0];
		}

		// d. last-name match restricted to race.year if provided
		const lnKey = ergastRef.trim().toLowerCase().replace(/_/g, ' ');
		const lnHits = byLastNameLower.get(lnKey) ?? [];
		if (race?.year !== undefined) {
			const yearFiltered = filterToYear(lnHits, race.year);
			if (yearFiltered.length === 1) {
				cache.set(key, yearFiltered[0]);
				return yearFiltered[0];
			}
			if (yearFiltered.length > 1) {
				const byCount = pickByRaceCount(yearFiltered, race.year);
				if (byCount) { cache.set(key, byCount); return byCount; }
			}
		}

		// e. last-name match unrestricted
		if (lnHits.length === 1) {
			cache.set(key, lnHits[0]);
			return lnHits[0];
		}

		cache.set(key, null);
		return null;
	};
}
