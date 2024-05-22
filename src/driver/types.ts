import {Driver, DriverStanding, Race, Result, Team} from '@gtibrett/effone-hub-graph-api';
import {Maybe} from '@gtibrett/effone-hub-graph-api/types';

export type DriverId = Maybe<Driver['driverId']> | undefined;

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