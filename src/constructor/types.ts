import {Driver, Race, Result, Team, TeamHistory, TeamStanding} from '@gtibrett/effone-hub-graph-api';

export type DriverByYear = {
	year: number;
	driver: Driver;
}

export type TeamHistoryData = TeamHistory & {
	antecedentTeam: {
		standings: TeamStandingData[];
	}
}

export type TeamData = Pick<Team, 'teamId' | 'constructorRef' | 'name' | 'nationality' | 'colors' | 'url'> & {
	bio: Pick<Team['bio'], 'extract'>;
	
	teamHistories: TeamHistoryData[];
	
	standings: TeamStandingData[];
	results: Result[];
	drivers: DriverByYear[]
}

export type TeamStandingData = Pick<TeamStanding, 'points' | 'position' | 'positionText' | 'wins' | 'year'>;

export type ConstructorPageData = {
	team: TeamData;
	races: Race[];
}