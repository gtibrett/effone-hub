/**
 * Direct Postgres queries for `generateStaticParams` calls.
 *
 * At Next 16 build time, RSC fetchers in cached-data.ts cannot reach the
 * GraphQL endpoint (the Next server is not running yet). Cache Components
 * also requires every `generateStaticParams` to return at least one entry,
 * so we bypass GraphQL and hit Postgres directly for the small set of
 * row-id lists needed by static-param generation.
 *
 * Runs once per build per route. Connection is opened + closed per call.
 *
 * Returns a safe non-empty fallback array on error so the build still
 * satisfies the Cache Components validator. Unknown paths fall through
 * to runtime cached fetchers in cached-data.ts.
 */
import {Client} from 'pg';

async function queryRow<T = Record<string, unknown>>(sql: string, params: any[] = []): Promise<T | null> {
	const connectionString = process.env.POSTGRES_URL;
	if (!connectionString) return null;
	const client = new Client({connectionString});
	try {
		await client.connect();
		const {rows} = await client.query(sql, params);
		return (rows[0] as T) ?? null;
	} catch (err) {
		console.warn('[build-pg] queryRow failed:', err);
		return null;
	} finally {
		try { await client.end(); } catch {}
	}
}

async function queryColumn<T = string>(sql: string, fallback: T[]): Promise<T[]> {
	const connectionString = process.env.POSTGRES_URL;
	if (!connectionString) {
		console.warn('[build-pg] POSTGRES_URL not set, using fallback');
		return fallback;
	}
	const client = new Client({connectionString});
	try {
		await client.connect();
		const {rows} = await client.query(sql);
		const out = rows.map(r => Object.values(r)[0] as T).filter(Boolean);
		return out.length > 0 ? out : fallback;
	} catch (err) {
		console.warn('[build-pg] query failed, using fallback:', err);
		return fallback;
	} finally {
		try { await client.end(); } catch {}
	}
}

export async function buildSeasonYears(): Promise<string[]> {
	const rows = await queryColumn<number>(
		`SELECT year FROM f1db.season ORDER BY year DESC`,
		[new Date().getFullYear()]
	);
	return rows.map(String);
}

export async function buildDriverRowIds(): Promise<string[]> {
	return await queryColumn<string>(
		`SELECT id FROM f1db.driver ORDER BY id`,
		['max-verstappen']
	);
}

export async function buildTeamRowIds(): Promise<string[]> {
	return await queryColumn<string>(
		`SELECT id FROM f1db.team ORDER BY id`,
		['red-bull']
	);
}

export async function buildCircuitRowIds(): Promise<string[]> {
	return await queryColumn<string>(
		`SELECT id FROM f1db.circuit ORDER BY id`,
		['monza']
	);
}

// ---------------------------------------------------------------------------
// Per-row lookups (used by generateMetadata at build time)
// ---------------------------------------------------------------------------

export async function buildDriverName(rowId: string): Promise<{firstName: string; lastName: string} | null> {
	return await queryRow<{firstName: string; lastName: string}>(
		`SELECT first_name AS "firstName", last_name AS "lastName" FROM f1db.driver WHERE id = $1`,
		[rowId]
	);
}

export async function buildTeamName(rowId: string): Promise<{name: string} | null> {
	return await queryRow<{name: string}>(
		`SELECT name FROM f1db.team WHERE id = $1`,
		[rowId]
	);
}

export async function buildRaceName(season: number, round: number): Promise<{officialName: string} | null> {
	return await queryRow<{officialName: string}>(
		`SELECT official_name AS "officialName" FROM f1db.race WHERE year = $1 AND round = $2`,
		[season, round]
	);
}

export async function buildCircuitName(rowId: string): Promise<{fullName: string} | null> {
	return await queryRow<{fullName: string}>(
		`SELECT full_name AS "fullName" FROM f1db.circuit WHERE id = $1`,
		[rowId]
	);
}

// ---------------------------------------------------------------------------
// Full row fetchers (used by RSC page bodies; mirror DriverContent / ConstructorContent's prop shape)
// ---------------------------------------------------------------------------

export type BuildDriverRow = {
	__typename:           'Driver';
	id:                   string;
	rowId:                string;
	firstName:            string;
	lastName:             string;
	abbreviation:         string | null;
	permanentNumber:      string | null;
	nationalityCountryId: string | null;
	dateOfBirth:          string | null;
	bio?:                 null;
	seasonEntrantDrivers: {nodes: Array<{id: string; year: number; team: {id: string; rowId: string; colors?: {id: string; primaryHex: string | null} | null} | null}>};
	teamsByYear:          {nodes: Array<{id: string; year: number; team: {id: string; rowId: string; colors?: {id: string; primaryHex: string | null} | null} | null}>};
};

export async function buildDriverFull(rowId: string): Promise<BuildDriverRow | null> {
	const connectionString = process.env.POSTGRES_URL;
	if (!connectionString) return null;
	const client = new Client({connectionString});
	try {
		await client.connect();
		const {rows} = await client.query<{
			id: string; first_name: string; last_name: string; abbreviation: string | null;
			permanent_number: string | null; nationality_country_id: string | null; date_of_birth: string | null;
		}>(
			`SELECT id, first_name, last_name, abbreviation, permanent_number, nationality_country_id, date_of_birth::text AS date_of_birth
			   FROM f1db.driver WHERE id = $1`,
			[rowId]
		);
		const r = rows[0];
		if (!r) return null;

		const {rows: teamRows} = await client.query<{year: number; team_id: string; primary_hex: string | null}>(
			`SELECT sed.year, sed.team_id, tc.primary_hex
			   FROM f1db.season_entrant_driver sed
			   LEFT JOIN app.team_colors tc ON tc.team_id = sed.team_id
			   WHERE sed.driver_id = $1
			   GROUP BY sed.year, sed.team_id, tc.primary_hex
			   ORDER BY sed.year DESC`,
			[rowId]
		);
		const buildTeamNode = (t: typeof teamRows[number]) => ({
			__typename: 'SeasonEntrantDriver' as const,
			id:         `pg:${rowId}:${t.year}:${t.team_id}`,
			year:       t.year,
			team:       t.team_id ? {
				__typename: 'Team' as const,
				id:         `pg:team:${t.team_id}`,
				rowId:      t.team_id,
				colors:     t.primary_hex ? {__typename: 'AppTeamColor' as const, id: `pg:tc:${t.team_id}`, primaryHex: t.primary_hex} : null
			} : null
		});
		const seasons = teamRows.map(buildTeamNode);

		return {
			__typename:           'Driver',
			id:                   `pg:driver:${r.id}`,
			rowId:                r.id,
			firstName:            r.first_name,
			lastName:             r.last_name,
			abbreviation:         r.abbreviation,
			permanentNumber:      r.permanent_number,
			nationalityCountryId: r.nationality_country_id,
			dateOfBirth:          r.date_of_birth,
			bio:                  null,
			seasonEntrantDrivers: {nodes: seasons.slice(0, 1)},
			teamsByYear:          {nodes: seasons}
		} as BuildDriverRow;
	} catch (err) {
		console.warn('[build-pg] buildDriverFull failed:', err);
		return null;
	} finally {
		try { await client.end(); } catch {}
	}
}

export type BuildTeamRow = {
	__typename: 'Team';
	id:         string;
	rowId:      string;
	name:       string | null;
	countryId:  string | null;
	colors?:    {primaryHex?: string | null} | null;
};

export async function buildTeamFull(rowId: string): Promise<BuildTeamRow | null> {
	return await queryRow<BuildTeamRow>(
		`SELECT 'Team'::text                  AS "__typename",
		         'pg:team:' || t.id           AS id,
		         t.id                         AS "rowId",
		         t.name,
		         t.country_id                 AS "countryId",
		         CASE WHEN tc.primary_hex IS NOT NULL
		              THEN jsonb_build_object('primaryHex', tc.primary_hex)
		              ELSE NULL
		         END                          AS colors
		   FROM f1db.team t
		   LEFT JOIN app.team_colors tc ON tc.team_id = t.id
		  WHERE t.id = $1`,
		[rowId]
	);
}

export async function buildRaceSlugs(): Promise<{season: string; round: string}[]> {
	const connectionString = process.env.POSTGRES_URL;
	const fallback = [{season: String(new Date().getFullYear()), round: '1'}];
	if (!connectionString) return fallback;
	const client = new Client({connectionString});
	try {
		await client.connect();
		const {rows} = await client.query<{year: number; round: number}>(
			`SELECT year, round FROM f1db.race WHERE year IS NOT NULL AND round IS NOT NULL ORDER BY year DESC, round DESC`
		);
		const out = rows.map(r => ({season: String(r.year), round: String(r.round)}));
		return out.length > 0 ? out : fallback;
	} catch (err) {
		console.warn('[build-pg] race slugs failed, using fallback:', err);
		return fallback;
	} finally {
		try { await client.end(); } catch {}
	}
}
