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

import CircuitsListDoc from '@/components/page/circuits/CircuitsQuery';
import ConstructorsQuery from '@/components/page/constructor/ConstructorsQuery';
import type { TeamWithSeasons } from '@/components/page/constructor/useConstructorsList';
import { DriverCareerQuery } from '@/components/page/driver/career/useCareerData';
import { DriverCircuitQuery } from '@/components/page/driver/circuits/useCircuitData';
import DriversQuery from '@/components/page/driver/DriversQuery';
import { DriverSeasonQuery } from '@/components/page/driver/season/useSeasonData';
import {
	type DriverStatsData,
	driverStats
} from '@/components/page/driver/stats/useDriverStatsData';
import SeasonsListDoc from '@/components/page/season/SeasonsQuery';
import type { SeasonData } from '@/components/page/season/types';
import { PastSeasonsQuery, SingleSeasonQuery } from '@/data/query/season.graphql';
import type { Circuit, Driver as DriverT, Race, RaceResult, SeasonDriver } from '@/gql/graphql';
import { type CircuitPageData, CircuitQuery } from '@/hooks/data/useCircuitByRef';
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

export type AppSeasonState = {
	currentSeason: number;
	seasonToShow: number;
	lastSeason: number;
	seasons: number[];
};

const AppSeasonStateQuery = gql`
	query AppSeasonStateQuery {
		seasons(orderBy: YEAR_DESC) {
			year
			hasResults
		}
	}
`;

export async function getAppSeasonState(): Promise<AppSeasonState> {
	'use cache';
	cacheLife('hours');
	cacheTag('seasons', 'current-season');
	const { data } = await getClient().query<{
		seasons: { year: number; hasResults: boolean | null }[];
	}>({
		query: AppSeasonStateQuery
	});
	const seasons = data?.seasons ?? [];
	if (!seasons.length) throw new Error('AppSeasonStateQuery returned no seasons');
	const currentYear = new Date().getFullYear();
	const years = seasons.map(s => s.year);
	const currentSeason = Math.max(...years);
	const withResults = seasons.filter(s => s.hasResults).map(s => s.year);
	const seasonToShow = withResults.length ? Math.max(...withResults) : currentSeason;
	const endedYears = years.filter(y => y < currentYear);
	const lastSeason = endedYears.length ? Math.max(...endedYears) : currentSeason;
	return { currentSeason, seasonToShow, lastSeason, seasons: years };
}

export async function getSeasons(): Promise<SeasonData[]> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons');
	const { data } = await getClient().query<{ seasons: SeasonData[] }>({
		query: SeasonsListDoc
	});
	return data?.seasons ?? [];
}

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

export async function getDrivers(): Promise<DriverT[]> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers');
	const { data } = await getClient().query<{ drivers: DriverT[] }>({
		query: DriversQuery
	});
	return data?.drivers ?? [];
}

export async function getDriverRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers');
	const { data } = await getClient().query<{ drivers: DriverT[] }>({
		query: DriversQuery
	});
	return data?.drivers.map(d => d.id || '').filter(Boolean) ?? [];
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

// Career query aliases seasonDrivers -> standings; define exact selection shape.
export type DriverCareerStanding = {
	year: SeasonDriver['year'];
	positionNumber: SeasonDriver['positionNumber'];
	points: SeasonDriver['totalPoints'];
	wins: SeasonDriver['totalRaceWins'];
};

export type DriverCareerRaceResult = {
	raceId: RaceResult['raceId'];
	driverId: RaceResult['driverId'];
	gridPositionNumber: RaceResult['gridPositionNumber'];
	positionNumber: RaceResult['positionNumber'];
	positionDisplayOrder: RaceResult['positionDisplayOrder'];
	points: RaceResult['points'];
	positionText: RaceResult['positionText'];
	teamId: RaceResult['teamId'];
	timeMillis: RaceResult['timeMillis'];
	reasonRetired: RaceResult['reasonRetired'];
	race: {
		rowId: string;
		year: number;
		round: number;
		circuit: {
			id: string;
			fullName: string;
			longitude: number | null;
			latitude: number | null;
		};
	} | null;
	team: {
		id: string;
		colors: { teamId: string; primaryHex: string | null; secondaryHex: string | null } | null;
	} | null;
};

export type DriverCareerData = {
	driver: {
		id: string;
		standings: DriverCareerStanding[];
		raceResults: DriverCareerRaceResult[];
	};
};

export async function getDriverCareer(
	driverId: string
): Promise<DriverCareerData['driver'] | null> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers', `driver:${driverId}`);
	const { data } = await getClient().query<DriverCareerData>({
		query: DriverCareerQuery,
		variables: { driverId }
	});
	return data?.driver ?? null;
}

// Circuit query returns driver.raceResults; exact selection shape (no aliases).
export type DriverCircuitRaceResult = {
	raceId: RaceResult['raceId'];
	driverId: RaceResult['driverId'];
	gridPositionNumber: RaceResult['gridPositionNumber'];
	positionDisplayOrder: RaceResult['positionDisplayOrder'];
	points: RaceResult['points'];
	positionText: RaceResult['positionText'];
	teamId: RaceResult['teamId'];
	timeMillis: RaceResult['timeMillis'];
	reasonRetired: RaceResult['reasonRetired'];
	race: {
		rowId: string;
		year: number;
		round: number;
		circuit: {
			id: string;
			fullName: string;
			longitude: number | null;
			latitude: number | null;
		};
	} | null;
};

export type DriverCircuitRawData = {
	driver: {
		id: string;
		raceResults: DriverCircuitRaceResult[];
	};
};

export async function getDriverCircuits(
	driverId: string
): Promise<DriverCircuitRawData['driver'] | null> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers', `driver:${driverId}`);
	const { data } = await getClient().query<DriverCircuitRawData>({
		query: DriverCircuitQuery,
		variables: { driverId }
	});
	return data?.driver ?? null;
}

export async function getDriverSeason(driverId: string, season: number): Promise<Race[]> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers', `driver:${driverId}`, `season:${season}`);
	const { data } = await getClient().query<{ races: Race[] }>({
		query: DriverSeasonQuery,
		variables: { driverId, season }
	});
	return data?.races ?? [];
}

export async function getDriverStats(driverId: string): Promise<DriverStatsData['driver'] | null> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers', `driver:${driverId}`);
	const { data } = await getClient().query<DriverStatsData>({
		query: driverStats,
		variables: { driverId }
	});
	return data?.driver ?? null;
}

// ---------------------------------------------------------------------------
// Teams
// ---------------------------------------------------------------------------

export async function getConstructors(): Promise<TeamWithSeasons[]> {
	'use cache';
	cacheLife('max');
	cacheTag('teams');
	// ConstructorsQuery aliases seasonTeams -> seasons, so the real selection shape
	// is TeamWithSeasons, not the codegen Team.
	const { data } = await getClient().query<{ teams: TeamWithSeasons[] }>({
		query: ConstructorsQuery
	});
	return data?.teams ?? [];
}

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

export async function getCircuits(): Promise<Circuit[]> {
	'use cache';
	cacheLife('max');
	cacheTag('circuits');
	const { data } = await getClient().query<{ circuits: Circuit[] }>({
		query: CircuitsListDoc
	});
	return data?.circuits ?? [];
}

export async function getCircuitRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('max');
	cacheTag('circuits');
	const { data } = await getClient().query<{ circuits: Circuit[] }>({
		query: AllCircuitsQuery
	});

	return data?.circuits.map(c => c?.id || '').filter(Boolean) ?? [];
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

export type CircuitPageDataPair = {
	current: CircuitPageData['circuit'] | null;
	prior: CircuitPageData['circuit'] | null;
};

export async function getCircuitPageData(
	circuitRef: string,
	currentSeason: number,
	priorSeason: number
): Promise<CircuitPageDataPair> {
	'use cache';
	cacheLife('max');
	cacheTag('circuits', `circuit:${circuitRef}`);
	const client = getClient();
	const [{ data: currentData }, { data: priorData }] = await Promise.all([
		client.query<CircuitPageData>({
			query: CircuitQuery,
			variables: { circuitRef, showCurrentSeason: true, season: currentSeason }
		}),
		client.query<CircuitPageData>({
			query: CircuitQuery,
			variables: { circuitRef, showCurrentSeason: true, season: priorSeason }
		})
	]);
	return {
		current: currentData?.circuit ?? null,
		prior: priorData?.circuit ?? null
	};
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
