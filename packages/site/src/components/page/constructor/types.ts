import { Driver, Race, RaceResult, SeasonTeamStanding, Team } from '@/gql/graphql';

export type DriverByYear = {
	year: number;
	driver: Driver;
};

export type TeamStandingData = Pick<
	SeasonTeamStanding,
	'points' | 'positionNumber' | 'positionText' | 'year'
>;

export type TeamHistoryData = {
	antecedentTeamId: string;
	startYear?: number | null;
	endYear?: number | null;
	antecedentTeam: {
		id: string;
		name: string;
		colors?: { primaryHex?: string | null } | null;
		standings: TeamStandingData[];
	};
};

export type TeamData = Pick<Team, 'id' | 'name' | 'countryId' | 'colors'> & {
	antecedents: TeamHistoryData[];
	standings: TeamStandingData[];
	raceResults: RaceResult[];
	drivers: DriverByYear[];
};

export type ConstructorPageData = {
	team: TeamData;
	races: Race[];
};

export type ConstructorsListFilters = {
	season: number;
	search: '';
};
