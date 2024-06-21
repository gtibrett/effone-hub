import {Driver, FinalTeamStandingsByYear, Race, Result, Team, TeamBio, TeamHistory} from '@gtibrett/effone-hub-graph-api';

export type DriverByYear = {
	year: number;
	driver: Driver;
}

export type TeamStandingData = Pick<FinalTeamStandingsByYear, 'points' | 'position' | 'positionText' | 'wins' | 'year'>;

export type TeamHistoryData = TeamHistory & {
	antecedentTeam: {
		standings: TeamStandingData[];
	}
}

export type TeamData = Pick<Team, 'teamId' | 'constructorRef' | 'name' | 'nationality' | 'colors' | 'url'> & {
	bio: Pick<TeamBio, 'extract'>;
	
	teamHistories: TeamHistoryData[];
	
	standings: TeamStandingData[];
	results: Result[];
	drivers: DriverByYear[]
}

export type ConstructorPageData = {
	team: TeamData;
	races: Race[];
}

export type ConstructorsListFilters = {
	season: number,
	search: '',
}