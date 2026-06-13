import type { DataWithValue } from '@/components/app';
import type { SeasonDriverStanding, SeasonTeamStanding } from '@/gql/graphql';
import type { DriverId } from '@/types';

export type SeasonData = {
	year: number;
	seasonDriverStandingsByYear: Pick<
		SeasonDriverStanding,
		'driverId' | 'points' | 'positionNumber'
	>[];
	seasonTeamStandingsByYear: Pick<SeasonTeamStanding, 'teamId' | 'points' | 'positionNumber'>[];
};

export type Data = {
	seasons: SeasonData[];
};

export type DriverChampionData = DataWithValue & {
	driverId: DriverId;
	points: number;
};

export type TeamChampionData = DataWithValue & {
	teamId: string;
	points: number;
};

export type ChampionData = DriverChampionData | TeamChampionData;

export function isDriverChampion(champion: ChampionData): champion is DriverChampionData {
	return typeof (champion as DriverChampionData).driverId !== 'undefined';
}
