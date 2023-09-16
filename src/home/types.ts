import {Circuit, Driver, DriverStanding, Race, Team, TeamStanding} from '@gtibrett/effone-hub-graph-api';

export type RaceData = Pick<Race, 'date' | 'name' | 'round'> & {
	circuit: Pick<Circuit, 'lat' | 'lng'>;
	results: {
		driver: Pick<Driver, 'forename' | 'surname' | 'code' | 'driverId'>
	}[];
	driverStandings: Pick<DriverStanding, 'driverId' | 'points' | 'position' | 'positionText' | 'wins' | 'driver'>[]
}
export type DriverStandingData = Pick<DriverStanding, 'driverId' | 'points' | 'position' | 'positionText' | 'wins'> & { driver: Pick<Driver, 'code' | 'currentTeam'> };
export type TeamStandingData = Pick<TeamStanding, 'teamId' | 'points' | 'position' | 'positionText' | 'wins'> & { team: Pick<Team, 'colors'> };

export type HomePageData = {
	season: {
		nextRace: ({
			race: Race
		}) | null
	}
	races: RaceData[];
	driverStandings: DriverStandingData[];
	teamStandings: TeamStandingData[];
}