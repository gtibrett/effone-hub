import {Constructor, Driver, Race, RaceResult, SeasonConstructorStanding} from '@/gql/graphql';

export type DriverByYear = {
	year: number;
	driver: Driver;
}

export type TeamStandingData = Pick<SeasonConstructorStanding, 'points' | 'positionNumber' | 'positionText' | 'year'>;

export type TeamHistoryData = {
	constructorId: string;
	startYear?: number | null;
	endYear?: number | null;
	constructor: {
		id: string;
		name: string;
		colors?: { primaryHex?: string | null } | null;
		standings: TeamStandingData[];
	}
}

export type TeamData = Pick<Constructor, 'id' | 'name' | 'countryId' | 'colors'> & {
	antecedents: { nodes: TeamHistoryData[] };
	standings: { nodes: TeamStandingData[] };
	raceResults: { nodes: RaceResult[] };
	drivers: { nodes: DriverByYear[] };
}

export type ConstructorPageData = {
	team: TeamData;
	races: { nodes: Race[] };
}

export type ConstructorsListFilters = {
	season: number,
	search: '',
}
