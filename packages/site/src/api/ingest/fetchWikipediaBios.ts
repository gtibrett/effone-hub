/**
 * Wikipedia bio ingest for drivers and constructors.
 *
 * Uses the Wikipedia REST API (same endpoint as the existing getSummary helper)
 * to fetch title, extract, description, and thumbnail for each F1DB driver/team.
 *
 * Endpoint: https://en.wikipedia.org/api/rest_v1/page/summary/{title}
 * Rate limit: Wikipedia is generous; we throttle to ~10 req/s to be polite.
 */

import {Client} from 'pg';

const WIKI_BASE        = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const REQ_INTERVAL_MS  = 100; // ~10 req/s
const STALE_DAYS       = 30;  // re-fetch if older than this

type WikiSummary = {
	title:       string;
	description?: string;
	extract:     string;
	thumbnail?:  {source: string; width: number; height: number};
};

let lastRequestAt = 0;

async function throttle(): Promise<void> {
	const elapsed = Date.now() - lastRequestAt;
	if (elapsed < REQ_INTERVAL_MS) {
		await new Promise(r => setTimeout(r, REQ_INTERVAL_MS - elapsed));
	}
	lastRequestAt = Date.now();
}

async function fetchSummary(title: string): Promise<WikiSummary | null> {
	await throttle();
	const encoded = encodeURIComponent(title);
	const url     = `${WIKI_BASE}/${encoded}`;
	let res: Response;
	try {
		res = await fetch(url);
	} catch (err) {
		console.warn(`[wiki] network error for "${title}":`, err);
		return null;
	}
	if (res.status === 404) {
		console.log(`[wiki] 404 for "${title}" — skipping`);
		return null;
	}
	if (!res.ok) {
		console.warn(`[wiki] HTTP ${res.status} for "${title}" — skipping`);
		return null;
	}
	try {
		return (await res.json()) as WikiSummary;
	} catch {
		console.warn(`[wiki] bad JSON for "${title}"`);
		return null;
	}
}

/** Try a list of candidate titles in order; return first hit. */
async function fetchSummaryWithFallbacks(candidates: string[]): Promise<WikiSummary | null> {
	for (const title of candidates) {
		const summary = await fetchSummary(title);
		if (summary) return summary;
	}
	return null;
}

export type BioReport = {
	rowsUpserted: number;
	skipped:      number;
};

export type BioOptions = {
	limit?:       number;  // cap number of rows to process this run
	onlyMissing?: boolean; // default true — skip rows fetched in last STALE_DAYS
};

export type SingleBioResult = {
	status:     'created' | 'updated' | 'fresh' | 'failed';
	updatedAt?: string;
	ttlDays:    number;
	error?:     string;
};

// ---------------------------------------------------------------------------
// Single-row lazy fetch helpers (used by /api/bio/refresh)
// ---------------------------------------------------------------------------

/** Return the max year of the current/past season from f1db. */
async function getCurrentSeasonYear(client: Client): Promise<number> {
	const {rows} = await client.query<{year: number}>(
		`SELECT MAX(year)::int AS year FROM f1db.season WHERE year <= EXTRACT(YEAR FROM now())::int`
	);
	return rows[0]?.year ?? new Date().getFullYear();
}

/** Fetch and upsert the Wikipedia bio for a single driver. Returns the result status. */
export async function fetchAndUpsertDriverBio(
	client: Client,
	driverId: string
): Promise<SingleBioResult> {
	// Determine TTL based on whether driver is in the current season.
	const currentYear = await getCurrentSeasonYear(client);
	const {rows: seasonRows} = await client.query<{cnt: string}>(
		`SELECT COUNT(*)::text AS cnt
		 FROM f1db.season_entrant_driver
		 WHERE year = $1 AND driver_id = $2`,
		[currentYear, driverId]
	);
	const isCurrentSeason = parseInt(seasonRows[0]?.cnt ?? '0', 10) > 0;
	const ttlDays = isCurrentSeason ? 30 : 365;

	// Check existing row.
	const {rows: existing} = await client.query<{updated_at: Date}>(
		`SELECT updated_at FROM app.driver_bios WHERE driver_id = $1`,
		[driverId]
	);
	if (existing.length > 0) {
		const ageMs = Date.now() - existing[0].updated_at.getTime();
		if (ageMs < ttlDays * 24 * 60 * 60 * 1000) {
			return {status: 'fresh', updatedAt: existing[0].updated_at.toISOString(), ttlDays};
		}
	}

	// Look up driver name for Wikipedia search.
	const {rows: driverRows} = await client.query<{first_name: string; last_name: string}>(
		`SELECT first_name, last_name FROM f1db.driver WHERE id = $1`,
		[driverId]
	);
	if (driverRows.length === 0) {
		return {status: 'failed', ttlDays, error: `Driver "${driverId}" not found`};
	}
	const {first_name, last_name} = driverRows[0];
	const fullName = `${first_name} ${last_name}`;
	const candidates = [`${fullName} (racing driver)`, fullName];
	const summary = await fetchSummaryWithFallbacks(candidates);
	if (!summary) {
		return {status: 'failed', ttlDays, error: `No Wikipedia page found for "${fullName}"`};
	}

	const isNew = existing.length === 0;
	await client.query(
		`INSERT INTO app.driver_bios (driver_id, description, title, extract, thumbnail_url, source, updated_at)
		 VALUES ($1, $2, $3, $4, $5, 'wikipedia', now())
		 ON CONFLICT (driver_id) DO UPDATE SET
		   description   = EXCLUDED.description,
		   title         = EXCLUDED.title,
		   extract       = EXCLUDED.extract,
		   thumbnail_url = EXCLUDED.thumbnail_url,
		   source        = EXCLUDED.source,
		   updated_at    = EXCLUDED.updated_at`,
		[driverId, summary.description ?? null, summary.title, summary.extract, summary.thumbnail?.source ?? null]
	);

	const {rows: updated} = await client.query<{updated_at: Date}>(
		`SELECT updated_at FROM app.driver_bios WHERE driver_id = $1`,
		[driverId]
	);
	return {
		status:    isNew ? 'created' : 'updated',
		updatedAt: updated[0]?.updated_at.toISOString(),
		ttlDays,
	};
}

/** Fetch and upsert the Wikipedia bio for a single team/constructor. Returns the result status. */
export async function fetchAndUpsertConstructorBio(
	client: Client,
	teamId: string
): Promise<SingleBioResult> {
	const currentYear = await getCurrentSeasonYear(client);
	const {rows: seasonRows} = await client.query<{cnt: string}>(
		`SELECT COUNT(*)::text AS cnt
		 FROM f1db.season_entrant_team
		 WHERE year = $1 AND team_id = $2`,
		[currentYear, teamId]
	);
	const isCurrentSeason = parseInt(seasonRows[0]?.cnt ?? '0', 10) > 0;
	const ttlDays = isCurrentSeason ? 30 : 365;

	const {rows: existing} = await client.query<{updated_at: Date}>(
		`SELECT updated_at FROM app.constructor_bios WHERE team_id = $1`,
		[teamId]
	);
	if (existing.length > 0) {
		const ageMs = Date.now() - existing[0].updated_at.getTime();
		if (ageMs < ttlDays * 24 * 60 * 60 * 1000) {
			return {status: 'fresh', updatedAt: existing[0].updated_at.toISOString(), ttlDays};
		}
	}

	const {rows: teamRows} = await client.query<{name: string}>(
		`SELECT name FROM f1db.team WHERE id = $1`,
		[teamId]
	);
	if (teamRows.length === 0) {
		return {status: 'failed', ttlDays, error: `Team "${teamId}" not found`};
	}
	const {name} = teamRows[0];
	const candidates = [
		`${name} (Formula One team)`,
		`${name} Formula One`,
		name,
	];
	const summary = await fetchSummaryWithFallbacks(candidates);
	if (!summary) {
		return {status: 'failed', ttlDays, error: `No Wikipedia page found for "${name}"`};
	}

	const isNew = existing.length === 0;
	await client.query(
		`INSERT INTO app.constructor_bios (team_id, description, title, extract, thumbnail_url, source, updated_at)
		 VALUES ($1, $2, $3, $4, $5, 'wikipedia', now())
		 ON CONFLICT (team_id) DO UPDATE SET
		   description   = EXCLUDED.description,
		   title         = EXCLUDED.title,
		   extract       = EXCLUDED.extract,
		   thumbnail_url = EXCLUDED.thumbnail_url,
		   source        = EXCLUDED.source,
		   updated_at    = EXCLUDED.updated_at`,
		[teamId, summary.description ?? null, summary.title, summary.extract, summary.thumbnail?.source ?? null]
	);

	const {rows: updated} = await client.query<{updated_at: Date}>(
		`SELECT updated_at FROM app.constructor_bios WHERE team_id = $1`,
		[teamId]
	);
	return {
		status:    isNew ? 'created' : 'updated',
		updatedAt: updated[0]?.updated_at.toISOString(),
		ttlDays,
	};
}

// ---------------------------------------------------------------------------
// Drivers
// ---------------------------------------------------------------------------

type DriverRow = {
	id:         string;
	first_name: string;
	last_name:  string;
};

export async function fetchAllDriverBios(
	client: Client,
	{limit, onlyMissing = true}: BioOptions = {}
): Promise<BioReport> {
	// Build set of already-fresh driver IDs when onlyMissing is requested.
	let freshIds = new Set<string>();
	if (onlyMissing) {
		const {rows} = await client.query<{driver_id: string}>(
			`SELECT driver_id FROM app.driver_bios WHERE updated_at > now() - interval '${STALE_DAYS} days'`
		);
		freshIds = new Set(rows.map(r => r.driver_id));
	}

	const {rows: drivers} = await client.query<DriverRow>(
		`SELECT id, first_name, last_name FROM f1db.driver ORDER BY id`
	);

	let rowsUpserted = 0;
	let skipped      = 0;

	for (const driver of drivers) {
		if (limit !== undefined && rowsUpserted + skipped >= limit) break;

		if (freshIds.has(driver.id)) {
			skipped++;
			continue;
		}

		const fullName    = `${driver.first_name} ${driver.last_name}`;
		const candidates  = [
			`${fullName} (racing driver)`,
			fullName,
		];

		const summary = await fetchSummaryWithFallbacks(candidates);
		if (!summary) {
			console.log(`[wiki] driver "${driver.id}" (${fullName}) — no Wikipedia page found, skipping`);
			skipped++;
			continue;
		}

		await client.query(
			`INSERT INTO app.driver_bios (driver_id, description, title, extract, thumbnail_url, source, updated_at)
			 VALUES ($1, $2, $3, $4, $5, 'wikipedia', now())
			 ON CONFLICT (driver_id) DO UPDATE SET
			   description   = EXCLUDED.description,
			   title         = EXCLUDED.title,
			   extract       = EXCLUDED.extract,
			   thumbnail_url = EXCLUDED.thumbnail_url,
			   source        = EXCLUDED.source,
			   updated_at    = EXCLUDED.updated_at`,
			[driver.id, summary.description ?? null, summary.title, summary.extract, summary.thumbnail?.source ?? null]
		);
		rowsUpserted++;
		console.log(`[wiki] driver "${driver.id}" → "${summary.title}" upserted`);
	}

	return {rowsUpserted, skipped};
}

// ---------------------------------------------------------------------------
// Constructors / Teams
// ---------------------------------------------------------------------------

type TeamRow = {
	id:   string;
	name: string;
};

export async function fetchAllConstructorBios(
	client: Client,
	{limit, onlyMissing = true}: BioOptions = {}
): Promise<BioReport> {
	let freshIds = new Set<string>();
	if (onlyMissing) {
		const {rows} = await client.query<{team_id: string}>(
			`SELECT team_id FROM app.constructor_bios WHERE updated_at > now() - interval '${STALE_DAYS} days'`
		);
		freshIds = new Set(rows.map(r => r.team_id));
	}

	const {rows: teams} = await client.query<TeamRow>(
		`SELECT id, name FROM f1db.team ORDER BY id`
	);

	let rowsUpserted = 0;
	let skipped      = 0;

	for (const team of teams) {
		if (limit !== undefined && rowsUpserted + skipped >= limit) break;

		if (freshIds.has(team.id)) {
			skipped++;
			continue;
		}

		const candidates = [
			`${team.name} (Formula One team)`,
			`${team.name} Formula One`,
			team.name,
		];

		const summary = await fetchSummaryWithFallbacks(candidates);
		if (!summary) {
			console.log(`[wiki] team "${team.id}" (${team.name}) — no Wikipedia page found, skipping`);
			skipped++;
			continue;
		}

		await client.query(
			`INSERT INTO app.constructor_bios (team_id, description, title, extract, thumbnail_url, source, updated_at)
			 VALUES ($1, $2, $3, $4, $5, 'wikipedia', now())
			 ON CONFLICT (team_id) DO UPDATE SET
			   description   = EXCLUDED.description,
			   title         = EXCLUDED.title,
			   extract       = EXCLUDED.extract,
			   thumbnail_url = EXCLUDED.thumbnail_url,
			   source        = EXCLUDED.source,
			   updated_at    = EXCLUDED.updated_at`,
			[team.id, summary.description ?? null, summary.title, summary.extract, summary.thumbnail?.source ?? null]
		);
		rowsUpserted++;
		console.log(`[wiki] team "${team.id}" → "${summary.title}" upserted`);
	}

	return {rowsUpserted, skipped};
}
