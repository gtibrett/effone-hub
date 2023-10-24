import {Driver, DriverStanding, Race, Result, Team} from '@gtibrett/effone-hub-graph-api';

export type DriverId = Driver['driverId'];

export type DriverData = Pick<Driver,
	'driverId' |
	'driverRef' |
	'code' |
	'number' |
	'forename' |
	'surname' |
	'nationality' |
	'dob' |
	'url' |
	'bio'> & {
	currentTeam: Driver['currentTeam'] & { year: number };
	standings: DriverStandingData[];
	results: Result[];
}

export type DriverStandingData = Pick<DriverStanding,
	'points' |
	'position' |
	'positionText' |
	'wins'> & {
	year: number;
	
	driverTeamByDriverIdAndYear: {
		team: Pick<Team, 'teamId' | 'colors'>
	}
};

export type DriverPageData = {
	driver: DriverData;
	races: Race[];
}