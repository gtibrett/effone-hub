import { Driver, Race, RaceResult, SeasonDriverStanding } from '@/gql/graphql';

export type DriverData = Pick<
	Driver,
	| 'id'
	| 'rowId'
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
			rowId: string;
			colors?: { primaryHex?: string | null } | null;
		} | null;
	}[];
	standings: DriverStandingData[];
	raceResults: RaceResult[];
};

export type DriverStandingData = Pick<
	SeasonDriverStanding,
	'points' | 'positionNumber' | 'positionText'
> & {
	year: number;
	teamId?: string;
	team?: { id?: string; colors?: { primaryHex?: string | null } | null } | null;
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
