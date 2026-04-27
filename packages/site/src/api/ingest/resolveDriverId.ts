import {Client} from 'pg';

/**
 * Build an Ergast-style driverRef -> F1DB driver.id resolver against a live
 * Postgres connection. F1DB uses kebab-cased full names ("lewis-hamilton")
 * while Ergast/Jolpica typically uses surname-only ("hamilton") or
 * disambiguated ("dick_rathmann"). Direct replace('_','-') matches <5% of
 * active drivers, so we fall back to suffix and surname matching.
 *
 * Returns null when no F1DB driver is found; caller should skip the row.
 */
export type DriverResolver = (ergastRef: string) => Promise<string | null>;

export async function buildDriverResolver(client: Client): Promise<DriverResolver> {
	const cache = new Map<string, string | null>();

	// Pre-load f1db.driver ids and last names. ~1k rows, trivial.
	const {rows} = await client.query<{id: string; last_name: string}>(
		'select id, last_name from f1db.driver'
	);
	const byId = new Map(rows.map(r => [r.id, r.id]));
	const bySuffix = new Map<string, string[]>(); // last segment after final '-' -> ids
	const byLastNameLower = new Map<string, string[]>(); // lower(last_name) -> ids

	for (const r of rows) {
		const tail = r.id.slice(r.id.lastIndexOf('-') + 1);
		(bySuffix.get(tail) ?? bySuffix.set(tail, []).get(tail)!).push(r.id);
		const ln = r.last_name.toLowerCase();
		(byLastNameLower.get(ln) ?? byLastNameLower.set(ln, []).get(ln)!).push(r.id);
	}

	return async function resolve(ergastRef: string): Promise<string | null> {
		const key = ergastRef.trim().toLowerCase();
		if (cache.has(key)) return cache.get(key)!;

		const dashed = key.replace(/_/g, '-');

		// 1. direct hit
		if (byId.has(dashed)) {
			cache.set(key, dashed);
			return dashed;
		}
		// 2. suffix hit (Ergast ref equals F1DB ref's surname segment, e.g. 'hamilton' -> 'lewis-hamilton')
		const suffixHits = bySuffix.get(dashed) ?? [];
		if (suffixHits.length === 1) {
			cache.set(key, suffixHits[0]);
			return suffixHits[0];
		}
		// 3. exact last-name match (handles compound names like 'de_vries' if last_name in F1DB is 'de Vries')
		const lnHits = byLastNameLower.get(key.replace(/_/g, ' ')) ?? [];
		if (lnHits.length === 1) {
			cache.set(key, lnHits[0]);
			return lnHits[0];
		}

		cache.set(key, null);
		return null;
	};
}
