import {Driver, SeasonDriverStanding, Race, RaceResult} from '@/gql/graphql';

export type DriverData = Pick<Driver, 'id' | 'rowId' | 'abbreviation' | 'permanentNumber' | 'firstName' | 'lastName' | 'nationalityCountryId' | 'dateOfBirth'> & {
	seasonEntrantDrivers: {
		nodes: {
			year: number;
			team?: { id: string; rowId: string; colors?: { primaryHex?: string | null } | null } | null;
		}[]
	};
	standings: { nodes: DriverStandingData[] };
	raceResults: { nodes: RaceResult[] };
}

export type DriverStandingData = Pick<SeasonDriverStanding, 'points' | 'positionNumber' | 'positionText'> & {
	year: number;
	teamId?: string;
	team?: { id?: string; colors?: { primaryHex?: string | null } | null } | null;
};

export type DriverPageData = {
	driver: DriverData;
	races: { nodes: Race[] };
}

export type DriversListFilters = {
	season: number,
	search: '',
	nationality: ''
}