import {DriverId} from '@effonehub/driver';
import {DataWithValue} from '@effonehub/ui-components';
import {DriverStanding, Team, TeamStanding} from '@gtibrett/effone-hub-graph-api';

export type SeasonData = {
	year: number;
	racesByYear: {
		round: number;
		teamStandings: Pick<TeamStanding, 'teamId' | 'points' | 'wins'>[];
		driverStandings: Pick<DriverStanding, 'driverId' | 'points' | 'wins'>[];
	}[]
};

export type Data = {
	seasons: SeasonData[]
}

export type DriverChampionData = DataWithValue & {
	driverId: DriverId;
	points: number;
	wins: number;
}

export type TeamChampionData = DataWithValue & {
	teamId: Team['teamId'];
	points: number;
	wins: number;
}

export type ChampionData = DriverChampionData | TeamChampionData;

export function isDriverChampion(champion: ChampionData): champion is DriverChampionData {
	return typeof (champion as DriverChampionData).driverId !== 'undefined';
}