import { Driver, Race, RaceResult, SeasonDriver } from '@/gql/graphql';

import { SeasonTeam } from './career/seasonEndTeam';

export type DriverData = Pick<
	Driver,
	| 'id'
	| 'abbreviation'
	| 'permanentNumber'
	| 'firstName'
	| 'lastName'
	| 'nationalityCountryId'
	| 'dateOfBirth'
> & {
	seasonEntrantDrivers: {
		year: number;
		team?: {
			id: string;
			colors?: { primaryHex?: string | null } | null;
		} | null;
	}[];
	standings: DriverStandingData[];
	raceResults: RaceResult[];
};

export type DriverStandingData = Pick<SeasonDriver, 'year' | 'positionNumber'> & {
	points: SeasonDriver['totalPoints'];
	wins: SeasonDriver['totalRaceWins'];
	// client-enriched season-end team (team is on raceResults, not the season standing)
	team?: SeasonTeam | null;
};

export type DriverPageData = {
	driver: DriverData;
	races: Race[];
};

export type DriversListFilters = {
	season: number;
	search: '';
	nationality: '';
};
