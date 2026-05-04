import {gql, makeExtendSchemaPlugin} from 'postgraphile/utils';
import {loadOne} from 'postgraphile/grafast';

type Bio = {
	title:        string;
	extract:      string | null;
	thumbnailUrl: string | null;
	sourceUrl:    string;
};

type DriverSpec = {id: string; firstName: string; lastName: string};
type TeamSpec   = {id: string; name: string};

const WIKI_BASE  = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const USER_AGENT = 'effone-hub/1.0 (https://effone-hub.vercel.app; gtibrett@gmail.com)';

// Tiny per-process TTL+max-size cache. Lives for the life of the Node process,
// re-warms on cold start. No deps; one Map for value, one for ordering.
const CACHE_MAX = 5_000;
const CACHE_TTL = 24 * 60 * 60 * 1000;

type Entry = {value: Bio | null; expiresAt: number};
const cache = new Map<string, Entry>();

function cacheGet(key: string): Bio | null | undefined {
	const e = cache.get(key);
	if (!e) return undefined;
	if (e.expiresAt < Date.now()) {
		cache.delete(key);
		return undefined;
	}
	cache.delete(key);
	cache.set(key, e);
	return e.value;
}

function cacheSet(key: string, value: Bio | null): void {
	cache.set(key, {value, expiresAt: Date.now() + CACHE_TTL});
	while (cache.size > CACHE_MAX) {
		const firstKey = cache.keys().next().value;
		if (firstKey === undefined) break;
		cache.delete(firstKey);
	}
}

const driverTitleOverrides: Record<string, string[]> = {
	'oscar-piastri':     ['Oscar Piastri'],
	'lance-stroll':      ['Lance Stroll'],
	'liam-lawson':       ['Liam Lawson'],
	'kimi-antonelli':    ['Andrea Kimi Antonelli', 'Kimi Antonelli'],
	'gabriel-bortoleto': ['Gabriel Bortoleto'],
	'isack-hadjar':      ['Isack Hadjar']
};

const teamTitleOverrides: Record<string, string[]> = {
	'red-bull':     ['Red Bull Racing'],
	'mclaren':      ['McLaren'],
	'ferrari':      ['Scuderia Ferrari'],
	'mercedes':     ['Mercedes-AMG Petronas F1 Team', 'Mercedes-Benz in Formula One'],
	'aston-martin': ['Aston Martin in Formula One'],
	'alpine':       ['Alpine F1 Team'],
	'williams':     ['Williams Racing'],
	'racing-bulls': ['RB (Formula One team)', 'Racing Bulls'],
	'kick-sauber':  ['Sauber Motorsport', 'Sauber (Formula One)'],
	'haas':         ['Haas F1 Team']
};

function driverCandidates(spec: DriverSpec): string[] {
	if (driverTitleOverrides[spec.id]) return driverTitleOverrides[spec.id];
	const full = `${spec.firstName} ${spec.lastName}`.trim();
	return [`${full} (racing driver)`, full];
}

function teamCandidates(spec: TeamSpec): string[] {
	if (teamTitleOverrides[spec.id]) return teamTitleOverrides[spec.id];
	return [`${spec.name} (Formula One team)`, `${spec.name} Formula One`, spec.name];
}

async function fetchSummary(title: string): Promise<Bio | null> {
	const url = `${WIKI_BASE}/${encodeURIComponent(title.replace(/\s+/g, '_'))}`;
	let res: Response;
	try {
		res = await fetch(url, {headers: {'User-Agent': USER_AGENT, Accept: 'application/json'}});
	} catch {
		return null;
	}
	if (!res.ok) return null;
	let data: any;
	try {
		data = await res.json();
	} catch {
		return null;
	}
	if (data.type === 'disambiguation') return null;
	return {
		title:        data.title ?? title,
		extract:      data.extract ?? null,
		thumbnailUrl: data.thumbnail?.source ?? null,
		sourceUrl:    data.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`
	};
}

async function resolveOne(cacheKey: string, candidates: string[]): Promise<Bio | null> {
	const cached = cacheGet(cacheKey);
	if (cached !== undefined) return cached;
	for (const title of candidates) {
		const bio = await fetchSummary(title);
		if (bio) {
			cacheSet(cacheKey, bio);
			return bio;
		}
	}
	cacheSet(cacheKey, null);
	return null;
}

async function loadDriverBios(specs: readonly any[]): Promise<ReadonlyArray<Bio | null>> {
	const dedup = new Map<string, Promise<Bio | null>>();
	return Promise.all(specs.map(s => {
		const spec: DriverSpec = {id: String(s.id), firstName: String(s.firstName ?? ''), lastName: String(s.lastName ?? '')};
		const key = `driver:${spec.id}`;
		let p = dedup.get(key);
		if (!p) {
			p = resolveOne(key, driverCandidates(spec));
			dedup.set(key, p);
		}
		return p;
	}));
}

async function loadTeamBios(specs: readonly any[]): Promise<ReadonlyArray<Bio | null>> {
	const dedup = new Map<string, Promise<Bio | null>>();
	return Promise.all(specs.map(s => {
		const spec: TeamSpec = {id: String(s.id), name: String(s.name ?? '')};
		const key = `team:${spec.id}`;
		let p = dedup.get(key);
		if (!p) {
			p = resolveOne(key, teamCandidates(spec));
			dedup.set(key, p);
		}
		return p;
	}));
}

const WikipediaBioPlugin = makeExtendSchemaPlugin({
	typeDefs: gql`
		type WikipediaBio {
			title:        String!
			extract:      String
			thumbnailUrl: String
			sourceUrl:    String!
		}
		extend type Driver { bio: WikipediaBio }
		extend type Team   { bio: WikipediaBio }
	`,
	plans: {
		Driver: {
			bio($driver: any) {
				return loadOne(
					{
						id:        $driver.get('id'),
						firstName: $driver.get('first_name'),
						lastName:  $driver.get('last_name')
					},
					loadDriverBios
				);
			}
		},
		Team: {
			bio($team: any) {
				return loadOne(
					{
						id:   $team.get('id'),
						name: $team.get('name')
					},
					loadTeamBios
				);
			}
		}
	}
});

export default WikipediaBioPlugin;
