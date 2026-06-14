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
import { ConstructorSeasonQuery } from '@/components/page/constructor/season/queries';
import {
	ConstructorDriverPodiumsQuery,
	ConstructorDriverPointsQuery,
	ConstructorDriverQualifyingQuery
} from '@/components/page/constructor/stats/queries';
import type { ConstructorPageData } from '@/components/page/constructor/types';
import type { TeamWithSeasons } from '@/components/page/constructor/useConstructorsList';
import { DriverCareerQuery } from '@/components/page/driver/career/useCareerData';
import type { CircuitDialogData } from '@/components/page/driver/circuits/dialog/types';
import { CircuitDataQuery } from '@/components/page/driver/circuits/dialog/useCircuitDialogData';
import { DriverCircuitQuery } from '@/components/page/driver/circuits/useCircuitData';
import DriversQuery from '@/components/page/driver/DriversQuery';
import { DriverSeasonQuery } from '@/components/page/driver/season/useSeasonData';
import {
	type DriverStatsData,
	driverStats
} from '@/components/page/driver/stats/useDriverStatsData';
import { lapsQuery } from '@/components/page/race/lapByLap/queries';
import { pitStopsQuery } from '@/components/page/race/pitStops/queries';
import { qualifyingQuery } from '@/components/page/race/queries';
import {
	raceFastestLapQuery,
	raceLapLeaderQuery,
	racePolesLeaderQuery,
	racePositionsGainedLeaderQuery
} from '@/components/page/race/stats/queries';
import { NextRaceBySeasonDoc, type NextRaceQueryNode } from '@/components/page/raceWeekend/queries';
import SeasonsListDoc from '@/components/page/season/SeasonsQuery';
import {
	constructorStandingsQuery,
	type SeasonTeamStandingNode
} from '@/components/page/season/standings/constructors/queries';
import {
	driverStandingsQuery,
	type SeasonDriverStandingNode
} from '@/components/page/season/standings/drivers/queries';
import {
	type FastestLapQueryData,
	seasonConstructorChampionQuery,
	seasonDNFsQuery,
	seasonDriverChampionQuery,
	seasonFastestLapQuery,
	seasonLapLeaderQuery,
	seasonPolesQuery,
	seasonPositionsGainedQuery,
	seasonSprintWinsQuery,
	seasonWinsQuery
} from '@/components/page/season/stats/queries';
import type { SeasonData } from '@/components/page/season/types';
import { scheduleQuery } from '@/components/page/season/useScheduleData';
import { PastSeasonsQuery, SingleSeasonQuery } from '@/data/query/season.graphql';
import type {
	AppLapTime,
	Circuit,
	Driver as DriverT,
	FastestLap as FastestLapNode,
	Maybe,
	PitStop,
	QualifyingResult,
	Race,
	RaceResult,
	SeasonDriver
} from '@/gql/graphql';
import { type CircuitPageData, CircuitQuery } from '@/hooks/data/useCircuitByRef';
import { ConstructorDataQuery as ConstructorPageQuery } from '@/hooks/data/useConstructorData';
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
	country?: { id?: string | null; alpha2Code?: string | null; name?: string | null } | null;
	colors?: { primaryHex?: string | null; secondaryHex?: string | null } | null;
	bio?: {
		title?: string | null;
		extract?: string | null;
		thumbnailUrl?: string | null;
		sourceUrl?: string | null;
	} | null;
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
				secondaryHex
			}
			bio {
				title
				extract
				thumbnailUrl
				sourceUrl
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
		name: string | null;
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

export async function getDriverCircuitDialog(
	driverId: string,
	circuitId: string
): Promise<CircuitDialogData | null> {
	'use cache';
	cacheLife('max');
	cacheTag('drivers', `driver:${driverId}`, 'circuits', `circuit:${circuitId}`);
	const { data } = await getClient().query<CircuitDialogData>({
		query: CircuitDataQuery,
		variables: { circuitId, driverId }
	});
	return data?.circuit ? data : null;
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
				driver {
					id
					firstName
					lastName
					abbreviation
					bio { thumbnailUrl }
				}
				team {
					id
					name
					colors {
						teamId
						primaryHex
						secondaryHex
					}
				}
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
				driver {
					id
					firstName
					lastName
					abbreviation
					bio { thumbnailUrl }
				}
				team {
					id
					name
					colors {
						teamId
						primaryHex
						secondaryHex
					}
				}
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

export async function getConstructorData(
	teamRef: string,
	season: number
): Promise<ConstructorPageData | null> {
	'use cache';
	cacheLife('max');
	cacheTag('teams', `team:${teamRef}`, `season:${season}`);
	const { data } = await getClient().query<ConstructorPageData>({
		query: ConstructorPageQuery,
		variables: { constructorRef: teamRef, season }
	});
	return data ?? null;
}

// Exact selection shapes for the three season-stat queries.
export type ConstructorDriverPointsRaceResult = {
	driverId: string | null;
	points: string | null;
};

export type ConstructorDriverPointsData = {
	season: {
		racesByYear: {
			raceResults: ConstructorDriverPointsRaceResult[];
			sprintRaceResults: ConstructorDriverPointsRaceResult[];
		}[];
	} | null;
};

export type ConstructorDriverPodiumsRaceResult = {
	driverId: string | null;
	positionNumber: number | null;
};

export type ConstructorDriverPodiumsData = {
	season: {
		racesByYear: {
			rowId: number;
			raceResults: ConstructorDriverPodiumsRaceResult[];
		}[];
	} | null;
};

export type ConstructorDriverQualifyingResult = {
	driverId: string;
	positionNumber: number | null;
	driver: { id: string; fullName: string } | null;
};

export type ConstructorDriverQualifyingData = {
	season: {
		racesByYear: {
			rowId: number;
			round: number;
			qualifyingResults: ConstructorDriverQualifyingResult[];
		}[];
	} | null;
};

export type ConstructorSeasonRaceResult = {
	raceId: string;
	gridPositionNumber: number | null;
	positionDisplayOrder: number | null;
	points: string | null;
	timeMillis: number | null;
	driverId: string | null;
	teamId: string | null;
	reasonRetired: string | null;
};

export type ConstructorSeasonRace = {
	rowId: number;
	year: number;
	round: number;
	officialName: string;
	date: string;
	time: string | null;
	raceResults: ConstructorSeasonRaceResult[];
};

export async function getConstructorSeasonStats(
	constructorId: string,
	season: number
): Promise<{
	points: ConstructorDriverPointsData;
	podiums: ConstructorDriverPodiumsData;
	qualifying: ConstructorDriverQualifyingData;
}> {
	'use cache';
	cacheLife('max');
	cacheTag('teams', `team:${constructorId}`, `season:${season}`);
	const client = getClient();
	const [{ data: points }, { data: podiums }, { data: qualifying }] = await Promise.all([
		client.query<ConstructorDriverPointsData>({
			query: ConstructorDriverPointsQuery,
			variables: { constructorId, season }
		}),
		client.query<ConstructorDriverPodiumsData>({
			query: ConstructorDriverPodiumsQuery,
			variables: { constructorId, season }
		}),
		client.query<ConstructorDriverQualifyingData>({
			query: ConstructorDriverQualifyingQuery,
			variables: { constructorId, season }
		})
	]);
	return {
		points: points ?? { season: null },
		podiums: podiums ?? { season: null },
		qualifying: qualifying ?? { season: null }
	};
}

export async function getConstructorSeason(
	teamRef: string,
	season: number
): Promise<ConstructorSeasonRace[]> {
	'use cache';
	cacheLife('max');
	cacheTag('teams', `team:${teamRef}`, `season:${season}`);
	const { data } = await getClient().query<{ races: ConstructorSeasonRace[] }>({
		query: ConstructorSeasonQuery,
		variables: { teamId: teamRef, season }
	});
	return data?.races ?? [];
}

// ---------------------------------------------------------------------------
// Race — round page supplemental data
// ---------------------------------------------------------------------------

// Qualifying selection anchored to qualifyingQuery's real selection.
export type RaceQualifyingResult = Pick<
	QualifyingResult,
	'raceId' | 'driverId' | 'teamId' | 'positionNumber' | 'q1' | 'q2' | 'q3'
>;

export type RaceQualifyingData = {
	race: { year: number; round: number; qualifyingResults: RaceQualifyingResult[] } | null;
};

export async function getRaceQualifying(
	season: number,
	round: number
): Promise<RaceQualifyingData['race']> {
	'use cache';
	cacheLife('max');
	cacheTag('races', `race:${season}:${round}`, `race-data:${season}:${round}`);
	const { data } = await getClient().query<RaceQualifyingData>({
		query: qualifyingQuery,
		variables: { season, round }
	});
	return data?.race ?? null;
}

// PitStops selection anchored to pitStopsQuery's real selection.
export type RacePitStopResult = Pick<
	PitStop,
	'raceId' | 'lap' | 'stop' | 'time' | 'timeMillis' | 'driverId'
> & {
	driver: { id: string; abbreviation: string } | null;
	team: { id: string; colors: { teamId: string; primaryHex: string | null } | null } | null;
};

export type RacePitStopsData = {
	race: { year: number; round: number; pitStops: RacePitStopResult[] } | null;
};

export async function getRacePitStops(
	season: number,
	round: number
): Promise<RacePitStopsData['race']> {
	'use cache';
	cacheLife('max');
	cacheTag('races', `race:${season}:${round}`, `race-data:${season}:${round}`);
	const { data } = await getClient().query<RacePitStopsData>({
		query: pitStopsQuery,
		variables: { season, round }
	});
	return data?.race ?? null;
}

// Lap-by-lap selection anchored to lapsQuery's real selection.
export type RaceLapTimeResult = Pick<
	AppLapTime,
	'raceId' | 'lap' | 'position' | 'timeText' | 'milliseconds' | 'driverId'
>;

export type RaceLapByLapRaceResult = Pick<
	RaceResult,
	'raceId' | 'positionDisplayOrder' | 'positionNumber' | 'driverId'
> & {
	driver: { id: string; lastName: string } | null;
	team: { id: string; colors: { teamId: string; primaryHex: Maybe<string> } | null } | null;
};

export type RaceLapByLapData = {
	race: {
		year: number;
		round: number;
		lapTimes: RaceLapTimeResult[];
		raceResults: RaceLapByLapRaceResult[];
	} | null;
};

export async function getRaceLapByLap(
	season: number,
	round: number
): Promise<RaceLapByLapData['race']> {
	'use cache';
	cacheLife('max');
	cacheTag('races', `race:${season}:${round}`, `race-data:${season}:${round}`);
	const { data } = await getClient().query<RaceLapByLapData>({
		query: lapsQuery,
		variables: { season, round }
	});
	return data?.race ?? null;
}

// Race stats — four queries fetched in parallel, typed per-query selection.
export type RacePoleResult = { driverId: string };

export type RacePoleData = {
	races: { year: number; round: number; qualifyingResults: RacePoleResult[] }[];
};

export type RaceFastestLapResult = Pick<
	FastestLapNode,
	'raceId' | 'driverId' | 'lap' | 'time' | 'timeMillis'
>;

export type RaceFastestLapData = {
	race: { year: number; round: number; fastestLaps: RaceFastestLapResult[] } | null;
};

export type RaceLapLeaderLapTime = Pick<AppLapTime, 'raceId' | 'driverId' | 'lap' | 'position'>;

export type RaceLapLeaderData = {
	race: { year: number; round: number; lapTimes: RaceLapLeaderLapTime[] } | null;
};

export type RacePositionsGainedResult = Pick<
	RaceResult,
	'raceId' | 'driverId' | 'gridPositionNumber' | 'positionNumber'
>;

export type RacePositionsGainedData = {
	race: { year: number; round: number; raceResults: RacePositionsGainedResult[] } | null;
};

export type RaceStatsBundle = {
	poles: RacePoleData;
	fastestLap: RaceFastestLapData;
	lapLeader: RaceLapLeaderData;
	positionsGained: RacePositionsGainedData;
};

// ---------------------------------------------------------------------------
// Season page — schedule, standings, and stat-card bundle
// ---------------------------------------------------------------------------

// Exact selection shape of scheduleQuery's racesByYear nodes.
export type SeasonScheduleRace = {
	rowId: number;
	round: number;
	date: string;
	officialName: string;
	circuit: { latitude: number | null; longitude: number | null } | null;
	raceResults: { raceId: string; driverId: string }[];
	sprintRaceResults: { raceId: string; driverId: string }[];
};

export type SeasonScheduleData = {
	season: { racesByYear: SeasonScheduleRace[] } | null;
};

export async function getSeasonSchedule(season: number): Promise<SeasonScheduleData['season']> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons', `season:${season}`, 'races');
	const { data } = await getClient().query<SeasonScheduleData>({
		query: scheduleQuery,
		variables: { season }
	});
	return data?.season ?? null;
}

export async function getSeasonRaceSchedule(season: number): Promise<NextRaceQueryNode[]> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons', `season:${season}`, 'races');
	const { data } = await getClient().query<{ races: NextRaceQueryNode[] }>({
		query: NextRaceBySeasonDoc,
		variables: { season }
	});
	return data?.races ?? [];
}

// Driver standings — exact selection shape from driverStandingsQuery.
export type SeasonDriverStandingsData = {
	season: {
		seasonDriverStandingsByYear: SeasonDriverStandingNode[];
		racesByYear: {
			round: number;
			raceDriverStandings: {
				driverId: string;
				positionNumber: number | null;
				points: string;
				driver: {
					id: string;
					lastName: string;
					seasonEntrantDrivers: {
						team: {
							id: string;
							colors: { teamId: string; primaryHex: string | null } | null;
						} | null;
					}[];
				} | null;
			}[];
		}[];
	} | null;
};

export async function getDriverStandings(
	season: number
): Promise<SeasonDriverStandingsData['season']> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons', `season:${season}`, 'drivers');
	const { data } = await getClient().query<SeasonDriverStandingsData>({
		query: driverStandingsQuery,
		variables: { season }
	});
	return data?.season ?? null;
}

// Constructor standings — exact selection shape from constructorStandingsQuery.
export type SeasonConstructorStandingsData = {
	season: {
		seasonTeamStandingsByYear: SeasonTeamStandingNode[];
		racesByYear: {
			round: number;
			raceTeamStandings: {
				teamId: string;
				positionNumber: number | null;
				points: string;
				team: {
					id: string;
					name: string | null;
					colors: { teamId: string; primaryHex: string | null } | null;
				} | null;
			}[];
		}[];
	} | null;
};

export async function getConstructorStandings(
	season: number
): Promise<SeasonConstructorStandingsData['season']> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons', `season:${season}`, 'teams');
	const { data } = await getClient().query<SeasonConstructorStandingsData>({
		query: constructorStandingsQuery,
		variables: { season }
	});
	return data?.season ?? null;
}

// Season stat-card bundle — parallel fetch of all ~11 season-stat queries.

export type SeasonWinsRaceNode = {
	rowId: number;
	raceResults: { raceId: string; driverId: string }[];
};

export type SeasonWinsData = {
	season: { racesByYear: SeasonWinsRaceNode[] } | null;
};

export type SeasonSprintWinsRaceNode = {
	rowId: number;
	sprintRaceResults: { raceId: string; driverId: string }[];
};

export type SeasonSprintWinsData = {
	season: { racesByYear: SeasonSprintWinsRaceNode[] } | null;
};

export type SeasonPolesRaceNode = {
	rowId: number;
	qualifyingResults: { raceId: string; driverId: string }[];
};

export type SeasonPolesData = {
	season: { racesByYear: SeasonPolesRaceNode[] } | null;
};

export type SeasonLapLeaderRaceNode = {
	rowId: number;
	lapTimes: { raceId: string; driverId: string; lap: number; position: number }[];
};

export type SeasonLapLeaderData = {
	season: { racesByYear: SeasonLapLeaderRaceNode[] } | null;
};

export type SeasonPositionsGainedRaceNode = {
	rowId: number;
	raceResults: {
		raceId: string;
		driverId: string;
		gridPositionNumber: number | null;
		positionNumber: number | null;
	}[];
};

export type SeasonPositionsGainedData = {
	season: { racesByYear: SeasonPositionsGainedRaceNode[] } | null;
};

export type SeasonDNFsRaceNode = {
	rowId: number;
	raceResults: { raceId: string; driverId: string; reasonRetired: string | null }[];
};

export type SeasonDNFsData = {
	season: { racesByYear: SeasonDNFsRaceNode[] } | null;
};

export type SeasonDriverChampionData = {
	seasonDriverStandings: { year: number; driverId: string }[];
};

export type SeasonConstructorChampionData = {
	season: {
		seasonTeamStandingsByYear: {
			year: number;
			teamId: string;
			engineManufacturerId: string | null;
		}[];
	} | null;
};

export type SeasonStatsBundle = {
	wins: SeasonWinsData;
	sprintWins: SeasonSprintWinsData;
	poles: SeasonPolesData;
	lapLeader: SeasonLapLeaderData;
	fastestLap: FastestLapQueryData;
	positionsGained: SeasonPositionsGainedData;
	dnfs: SeasonDNFsData;
	driverChampion: SeasonDriverChampionData;
	constructorChampion: SeasonConstructorChampionData;
};

export async function getSeasonStats(season: number): Promise<SeasonStatsBundle> {
	'use cache';
	cacheLife('max');
	cacheTag('seasons', `season:${season}`, 'races', 'drivers');
	const client = getClient();
	const [
		{ data: wins },
		{ data: sprintWins },
		{ data: poles },
		{ data: lapLeader },
		{ data: fastestLap },
		{ data: positionsGained },
		{ data: dnfs },
		{ data: driverChampion },
		{ data: constructorChampion }
	] = await Promise.all([
		client.query<SeasonWinsData>({ query: seasonWinsQuery, variables: { season } }),
		client.query<SeasonSprintWinsData>({ query: seasonSprintWinsQuery, variables: { season } }),
		client.query<SeasonPolesData>({ query: seasonPolesQuery, variables: { season } }),
		client.query<SeasonLapLeaderData>({ query: seasonLapLeaderQuery, variables: { season } }),
		client.query<FastestLapQueryData>({ query: seasonFastestLapQuery, variables: { season } }),
		client.query<SeasonPositionsGainedData>({
			query: seasonPositionsGainedQuery,
			variables: { season }
		}),
		client.query<SeasonDNFsData>({ query: seasonDNFsQuery, variables: { season } }),
		client.query<SeasonDriverChampionData>({
			query: seasonDriverChampionQuery,
			variables: { season }
		}),
		client.query<SeasonConstructorChampionData>({
			query: seasonConstructorChampionQuery,
			variables: { season }
		})
	]);
	return {
		wins: wins ?? { season: null },
		sprintWins: sprintWins ?? { season: null },
		poles: poles ?? { season: null },
		lapLeader: lapLeader ?? { season: null },
		fastestLap: fastestLap ?? { season: null },
		positionsGained: positionsGained ?? { season: null },
		dnfs: dnfs ?? { season: null },
		driverChampion: driverChampion ?? { seasonDriverStandings: [] },
		constructorChampion: constructorChampion ?? { season: null }
	};
}

export async function getRaceStats(season: number, round: number): Promise<RaceStatsBundle> {
	'use cache';
	cacheLife('max');
	cacheTag('races', `race:${season}:${round}`, `race-data:${season}:${round}`);
	const client = getClient();
	const [{ data: poles }, { data: fastestLap }, { data: lapLeader }, { data: positionsGained }] =
		await Promise.all([
			client.query<RacePoleData>({
				query: racePolesLeaderQuery,
				variables: { season, round }
			}),
			client.query<RaceFastestLapData>({
				query: raceFastestLapQuery,
				variables: { season, round }
			}),
			client.query<RaceLapLeaderData>({
				query: raceLapLeaderQuery,
				variables: { season, round }
			}),
			client.query<RacePositionsGainedData>({
				query: racePositionsGainedLeaderQuery,
				variables: { season, round }
			})
		]);
	return {
		poles: poles ?? { races: [] },
		fastestLap: fastestLap ?? { race: null },
		lapLeader: lapLeader ?? { race: null },
		positionsGained: positionsGained ?? { race: null }
	};
}
