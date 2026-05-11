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
