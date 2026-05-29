/**
 * Cached RSC data accessors.
 *
 * Each function is wrapped with `use cache` (Next.js 16 Cache Components)
 * + `cacheTag` so the daily ingest job can call `updateTag` to invalidate
 * the relevant slice when new data lands. See `pages/api/cron/ingest.ts`
 * for the invalidation side.
 *
 * NO try/catch around the queries: a thrown error must propagate so Next does
 * NOT cache it. Catching and returning a degraded fallback ([]/null/{}) under
 * `cacheLife('max')` would pin the degraded value until the next ingest tag
 * fires — a transient DB blip → permanently blank page. A *successful* query
 * that legitimately returns empty still returns the empty value (and that IS
 * safe to cache). Errors fail loud (build/SSR) instead.
 */

import { cacheLife, cacheTag } from 'next/cache';
import { gql } from '@apollo/client';

import ConstructorsQuery from '@/components/page/constructor/ConstructorsQuery';
import DriversQuery from '@/components/page/driver/DriversQuery';
import { PastSeasonsQuery, SingleSeasonQuery } from '@/data/query/season.graphql';
import { Circuit, Driver as DriverT, Race } from '@/gql/graphql';
import { DriverQuery } from '@/hooks/data/useDriver';

import { getClient } from './apollo-rsc';

const CurrentSeasonQuery = gql`
	query CurrentSeasonQuery {
		seasons(orderBy: YEAR_DESC, first: 1) {
			year
		}
	}
`;

// Current-season narrows for generateStaticParams. One nested query per entity
// keeps the SSG set to home + current season; older slugs render on-demand and
// cache via cacheLife('max').

const CurrentSeasonRaceParamsQuery = gql`
	query CurrentSeasonRaceParamsQuery {
		seasons(orderBy: YEAR_DESC, first: 1) {
			year
			racesByYear(orderBy: ROUND_ASC) {
				round
			}
		}
	}
`;

const CurrentSeasonDriverIdsQuery = gql`
	query CurrentSeasonDriverIdsQuery {
		seasons(orderBy: YEAR_DESC, first: 1) {
			seasonDriverStandingsByYear {
				driverId
			}
		}
	}
`;

const CurrentSeasonTeamIdsQuery = gql`
	query CurrentSeasonTeamIdsQuery {
		seasons(orderBy: YEAR_DESC, first: 1) {
			seasonTeamStandingsByYear {
				teamId
			}
		}
	}
`;

const CurrentSeasonCircuitIdsQuery = gql`
	query CurrentSeasonCircuitIdsQuery {
		seasons(orderBy: YEAR_DESC, first: 1) {
			racesByYear {
				circuitId
			}
		}
	}
`;

const CircuitLookupQuery = gql`
	query CircuitLookupQuery($ref: String!) {
		circuit(id: $ref) {
			id
			fullName
		}
	}
`;

const AllCircuitsQuery = gql`
	query AllCircuitsQuery {
		circuits {
			id
		}
	}
`;

const RaceLookupQuery = gql`
	query RaceLookupQuery($season: Int!, $round: Int!) {
		races(condition: {year: $season, round: $round}) {
			rowId
			year
			round
			officialName
			date
			circuit {
				id
				fullName
				placeName
				countryId
				latitude
				longitude
				description {
					description
				}
			}
		}
	}
`;

const AllRacesQuery = gql`
	query AllRacesQuery {
		races {
			rowId
			year
			round
		}
	}
`;

export type TeamRecord = {
	id: string;
	name?: string | null;
	countryId?: string | null;
	country?: { alpha2Code?: string | null; name?: string | null } | null;
	colors?: { primaryHex?: string | null } | null;
};

export const ConstructorDataQuery = gql`
	query ConstructorPageStaticQuery($constructorRef: String!) {
		teams(condition: {id: $constructorRef}) {
			id
			name
			countryId
			country {
				id
				alpha2Code
				name
			}
			colors {
				teamId
				primaryHex
			}
		}
	}
`;

// ---------------------------------------------------------------------------
// Seasons
// ---------------------------------------------------------------------------

export async function getCurrentSeason(): Promise<{ year: number }> {
	'use cache';
	cacheLife('hours');
	cacheTag('seasons', 'current-season');
	const { data } = await getClient().query<{ seasons: { year: number }[] }>({
		query: CurrentSeasonQuery
	});
	const [current] = data?.seasons ?? [];
	// Empty here means the DB has no seasons at all — fail loud rather than guess
	// a calendar year (which need not equal the latest season with a race).
	if (!current) throw new Error('CurrentSeasonQuery returned no seasons');
	return current;
}

export async function getPastSeasonYears(): Promise<string[]> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons');
	const { data } = await getClient().query<{ seasons: { year: number }[] }>({
		query: PastSeasonsQuery
	});
	return data?.seasons.map(s => s.year.toString()) ?? [];
}

export async function getSeason(year: number): Promise<{ year: number }> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons', `season:${year}`);
	const { data } = await getClient().query<{ season: { year: number } }>({
		query: SingleSeasonQuery,
		variables: { season: year }
	});
	// `{ year }` stub on a legit-missing season is fine (the year arg is valid);
	// a query error throws above and is not cached.
	return data?.season ?? { year };
}

export async function getCurrentSeasonRaceParams(): Promise<{ season: string; round: string }[]> {
	'use cache';
	cacheLife('hours');
	cacheTag('seasons', 'races', 'current-season');
	const { data } = await getClient().query<{
		seasons: { year: number; racesByYear: { round: number }[] }[];
	}>({ query: CurrentSeasonRaceParamsQuery });
	const [current] = data?.seasons ?? [];
	if (!current) return [];
	return current.racesByYear
		.filter(r => r.round != null)
		.map(r => ({ season: String(current.year), round: String(r.round) }));
}

// ---------------------------------------------------------------------------
// Drivers
// ---------------------------------------------------------------------------

export async function getDriverRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers');
	const { data } = await getClient().query<{ drivers: DriverT[] }>({
		query: DriversQuery
	});
	return data?.drivers.map(d => d.id!).filter(Boolean) ?? [];
}

export async function getDriver(rowId: string): Promise<DriverT | null> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers', `driver:${rowId}`);
	const { data } = await getClient().query<{ driver: DriverT }>({
		query: DriverQuery,
		variables: { id: rowId }
	});
	// null = legit "no such driver" (caller calls notFound()); a query error throws.
	return data?.driver ?? null;
}

export async function getCurrentSeasonDriverIds(): Promise<string[]> {
	'use cache';
	cacheLife('hours');
	cacheTag('seasons', 'drivers', 'current-season');
	const { data } = await getClient().query<{
		seasons: { seasonDriverStandingsByYear: { driverId: string }[] }[];
	}>({ query: CurrentSeasonDriverIdsQuery });
	const [current] = data?.seasons ?? [];
	if (!current) return [];
	return [...new Set(current.seasonDriverStandingsByYear.map(s => s.driverId).filter(Boolean))];
}

// ---------------------------------------------------------------------------
// Teams
// ---------------------------------------------------------------------------

export async function getTeamRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('max');
	cacheTag('teams');
	const { data } = await getClient().query<{ teams: { id: string }[] }>({
		query: ConstructorsQuery
	});
	return data?.teams.map(t => t.id).filter(Boolean) ?? [];
}

export async function getCurrentSeasonTeamIds(): Promise<string[]> {
	'use cache';
	cacheLife('hours');
	cacheTag('seasons', 'teams', 'current-season');
	const { data } = await getClient().query<{
		seasons: { seasonTeamStandingsByYear: { teamId: string }[] }[];
	}>({ query: CurrentSeasonTeamIdsQuery });
	const [current] = data?.seasons ?? [];
	if (!current) return [];
	return [...new Set(current.seasonTeamStandingsByYear.map(s => s.teamId).filter(Boolean))];
}

// ---------------------------------------------------------------------------
// Circuits
// ---------------------------------------------------------------------------

export async function getCircuitRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('max');
	cacheTag('circuits');
	const { data } = await getClient().query<{ circuits: Circuit[] }>({
		query: AllCircuitsQuery
	});
	return data?.circuits.map(c => c.id!).filter(Boolean) ?? [];
}

export async function getCurrentSeasonCircuitIds(): Promise<string[]> {
	'use cache';
	cacheLife('hours');
	cacheTag('seasons', 'circuits', 'current-season');
	const { data } = await getClient().query<{
		seasons: { racesByYear: { circuitId: string }[] }[];
	}>({ query: CurrentSeasonCircuitIdsQuery });
	const [current] = data?.seasons ?? [];
	if (!current) return [];
	return [...new Set(current.racesByYear.map(r => r.circuitId).filter(Boolean))];
}

export async function getCircuit(rowId: string): Promise<{ id: string; fullName: string } | null> {
	'use cache';
	cacheLife('max');
	cacheTag('circuits', `circuit:${rowId}`);
	const { data } = await getClient().query<{
		circuit: { id: string; fullName: string } | null;
	}>({ query: CircuitLookupQuery, variables: { ref: rowId } });
	return data?.circuit ?? null;
}

// ---------------------------------------------------------------------------
// Races
// ---------------------------------------------------------------------------

export async function getAllRaces(): Promise<{ season: string; round: string }[]> {
	'use cache';
	cacheLife('max');
	cacheTag('races');
	const { data } = await getClient().query<{ races: Race[] }>({
		query: AllRacesQuery
	});
	return (
		data?.races
			.filter(r => r.year != null && r.round != null)
			.map(r => ({ season: String(r.year), round: String(r.round) })) ?? []
	);
}

export async function getRace(season: number, round: number): Promise<Partial<Race>> {
	'use cache';
	cacheLife('max');
	cacheTag('races', `race:${season}:${round}`);
	const { data } = await getClient().query<{ races: Race[] }>({
		query: RaceLookupQuery,
		variables: { season, round }
	});
	return data?.races[0] ?? {};
}

// Mirrors useRace shape so RoundContent can skip the client useSuspenseQuery when prefetched.
const RaceFullDataQuery = gql`
	query raceFullDataServer($season: Int!, $round: Int!) {
		races(condition: {year: $season, round: $round}) {
			year
			round
			raceResults {
				raceId
				driver {id}
				driverId
				teamId
				gridPositionNumber
				positionNumber
				positionText
				positionDisplayOrder
				points
				laps
				time
				timeMillis
				reasonRetired
			}
			sprintRaceResults {
				raceId
				driver {id}
				driverId
				teamId
				gridPositionNumber
				positionNumber
				positionText
				positionDisplayOrder
				points
				laps
				time
				timeMillis
				reasonRetired
			}
		}
	}
`;

export async function getRaceFullData(season: number, round: number): Promise<Race | null> {
	'use cache';
	// ingest cron invalidates race-data tags when corrections land.
	cacheLife('max');
	cacheTag('races', `race:${season}:${round}`, `race-data:${season}:${round}`);
	const { data } = await getClient().query<{ races: Race[] }>({
		query: RaceFullDataQuery,
		variables: { season, round }
	});
	return data?.races[0] ?? null;
}

export async function getTeam(rowId: string): Promise<TeamRecord | null> {
	'use cache';
	cacheLife('max');
	cacheTag('teams', `team:${rowId}`);
	const { data } = await getClient().query<{ teams: TeamRecord[] }>({
		query: ConstructorDataQuery,
		variables: { constructorRef: rowId }
	});
	return data?.teams[0] ?? null;
}
