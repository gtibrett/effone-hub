import {DataWithValue} from '@/components/app';
import {DriverId} from '@/types';
import {SeasonDriverStanding, SeasonTeamStanding} from '@/gql/graphql';

export type SeasonData = {
	year: number;
	racesByYear: {
		round: number;
		teamStandings: Pick<SeasonTeamStanding, 'teamId' | 'points'>[];
		driverStandings: Pick<SeasonDriverStanding, 'driverId' | 'points'>[];
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
	teamId: string;
	points: number;
	wins: number;
}

export type ChampionData = DriverChampionData | TeamChampionData;

export function isDriverChampion(champion: ChampionData): champion is DriverChampionData {
	return typeof (champion as DriverChampionData).driverId !== 'undefined';
}
