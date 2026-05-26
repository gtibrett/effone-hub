/**
 * Cached RSC data accessors.
 *
 * Each function is wrapped with `use cache` (Next.js 16 Cache Components)
 * + `cacheTag` so the daily ingest job can call `updateTag` to invalidate
 * the relevant slice when new data lands. See `pages/api/cron/ingest.ts`
 * for the invalidation side.
 */

import DriversQuery from '@/components/page/driver/DriversQuery';
import ConstructorsQuery from '@/components/page/constructor/ConstructorsQuery';
import {PastSeasonsQuery, SingleSeasonQuery} from '@/data/query/season.graphql';
import {DriverQuery} from '@/hooks/data/useDriver';
import {Circuit, Driver as DriverT, Race} from '@/gql/graphql';
import {gql} from '@apollo/client';
import {cacheLife, cacheTag} from 'next/cache';
import {getClient} from './apollo-rsc';

const CurrentSeasonQuery = gql`
	query CurrentSeasonQuery {
		seasons(orderBy: YEAR_DESC, first: 1) {
			nodes {
				id
				year
			}
		}
	}
`;

const AllCircuitsQuery = gql`
	query AllCircuitsQuery {
		circuits {
			nodes {
				rowId
			}
		}
	}
`;

const RaceLookupQuery = gql`
	query RaceLookupQuery($season: Int!, $round: Int!) {
		races(condition: {year: $season, round: $round}) {
			nodes {
				rowId
				year
				round
				officialName
				date
				circuit {
					id
					rowId
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
	}
`;

const AllRacesQuery = gql`
	query AllRacesQuery {
		races {
			nodes {
				rowId
				year
				round
			}
		}
	}
`;

export type TeamRecord = {
	id:        string;
	rowId:     string;
	name?:     string | null;
	countryId?: string | null;
	colors?:   {primaryHex?: string | null} | null;
};

export const ConstructorDataQuery = gql`
	query ConstructorPageStaticQuery($constructorRef: String!) {
		teams(condition: {rowId: $constructorRef}) {
			nodes {
				id
				rowId
				name
				countryId
				colors {
					id
					primaryHex
				}
			}
		}
	}
`;

// ---------------------------------------------------------------------------
// Seasons
// ---------------------------------------------------------------------------

export async function getCurrentSeason(): Promise<{year: number}> {
	'use cache';
	cacheLife('hours');
	cacheTag('seasons', 'current-season');
	try {
		const {data} = await getClient().query<{seasons: {nodes: {year: number}[]}}>({query: CurrentSeasonQuery});
		const [current] = data?.seasons.nodes ?? [];
		if (current) return current;
	} catch {
		// fall through
	}
	return {year: new Date().getFullYear()};
}

export async function getPastSeasonYears(): Promise<string[]> {
	'use cache';
	cacheLife('days');
	cacheTag('seasons');
	try {
		const {data} = await getClient().query<{seasons: {nodes: {year: number}[]}}>({query: PastSeasonsQuery});
		return data?.seasons.nodes.map(s => s.year.toString()) ?? [];
	} catch {
		return [];
	}
}

export async function getSeason(year: number): Promise<{year: number}> {
	'use cache';
	cacheLife('days');
	cacheTag('seasons', `season:${year}`);
	try {
		const {data} = await getClient().query<{season: {year: number}}>({
			query:     SingleSeasonQuery,
			variables: {season: year}
		});
		if (data?.season) return data.season;
	} catch {
		// fall through
	}
	return {year};
}

// ---------------------------------------------------------------------------
// Drivers
// ---------------------------------------------------------------------------

export async function getDriverRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('days');
	cacheTag('drivers');
	try {
		const {data} = await getClient().query<{drivers: {nodes: DriverT[]}}>({query: DriversQuery});
		return data?.drivers.nodes.map(d => d.rowId!).filter(Boolean) ?? [];
	} catch {
		return [];
	}
}

export async function getDriver(rowId: string): Promise<DriverT | null> {
	'use cache';
	cacheLife('days');
	cacheTag('drivers', `driver:${rowId}`);
	try {
		const {data} = await getClient().query<{driver: DriverT}>({query: DriverQuery, variables: {id: rowId}});
		return data?.driver ?? null;
	} catch {
		return null;
	}
}

// ---------------------------------------------------------------------------
// Teams
// ---------------------------------------------------------------------------

export async function getTeamRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('days');
	cacheTag('teams');
	try {
		const {data} = await getClient().query<{teams: {nodes: {rowId: string}[]}}>({query: ConstructorsQuery});
		return data?.teams.nodes.map(t => t.rowId).filter(Boolean) ?? [];
	} catch {
		return [];
	}
}

// ---------------------------------------------------------------------------
// Circuits
// ---------------------------------------------------------------------------

export async function getCircuitRowIds(): Promise<string[]> {
	'use cache';
	cacheLife('days');
	cacheTag('circuits');
	try {
		const {data} = await getClient().query<{circuits: {nodes: Circuit[]}}>({query: AllCircuitsQuery});
		return data?.circuits.nodes.map(c => c.rowId!).filter(Boolean) ?? [];
	} catch {
		return [];
	}
}

// ---------------------------------------------------------------------------
// Races
// ---------------------------------------------------------------------------

export async function getAllRaces(): Promise<{season: string; round: string}[]> {
	'use cache';
	cacheLife('days');
	cacheTag('races');
	try {
		const {data} = await getClient().query<{races: {nodes: Race[]}}>({query: AllRacesQuery});
		return data?.races.nodes
			.filter(r => r.year != null && r.round != null)
			.map(r => ({season: String(r.year), round: String(r.round)})) ?? [];
	} catch {
		return [];
	}
}

export async function getRace(season: number, round: number): Promise<Partial<Race>> {
	'use cache';
	cacheLife('days');
	cacheTag('races', `race:${season}:${round}`);
	try {
		const {data} = await getClient().query<{races: {nodes: Race[]}}>({
			query:     RaceLookupQuery,
			variables: {season, round}
		});
		return data?.races.nodes[0] ?? {};
	} catch {
		return {};
	}
}

// Mirrors useRace shape so RoundContent can skip the client useSuspenseQuery when prefetched.
const RaceFullDataQuery = gql`
	query raceFullDataServer($season: Int!, $round: Int!) {
		races(condition: {year: $season, round: $round}) {
			nodes {
				id
				raceResults {
					nodes {
						id
						driver {id rowId}
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
				sprintRaceResults {
					nodes {
						id
						driver {id rowId}
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
		}
	}
`;

export async function getRaceFullData(season: number, round: number): Promise<Race | null> {
	'use cache';
	// 'days' matches getRace; ingest cron invalidates race-data tags when corrections land.
	cacheLife('days');
	cacheTag('races', `race:${season}:${round}`, `race-data:${season}:${round}`);
	try {
		const {data} = await getClient().query<{races: {nodes: Race[]}}>({
			query:     RaceFullDataQuery,
			variables: {season, round}
		});
		return data?.races.nodes[0] ?? null;
	} catch {
		return null;
	}
}

export async function getTeam(rowId: string): Promise<TeamRecord | null> {
	'use cache';
	cacheLife('days');
	cacheTag('teams', `team:${rowId}`);
	try {
		const {data} = await getClient().query<{teams: {nodes: TeamRecord[]}}>({
			query:     ConstructorDataQuery,
			variables: {constructorRef: rowId}
		});
		return data?.teams.nodes[0] ?? null;
	} catch {
		return null;
	}
}
