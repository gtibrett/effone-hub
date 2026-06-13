import { gql } from '@apollo/client';

import type { DriverId } from '@/types';

type DriverResult = {
	driverId: DriverId;
};

export type RaceData = {
	date: string;
	name: string;
	round: number;
	circuit: { lat: number | null; lng: number | null };
	results: DriverResult[];
	sprintResults: DriverResult[];
};

export type ScheduleData = {
	races: RaceData[];
};

export const scheduleQuery = gql`
	query scheduleQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear(orderBy: ROUND_ASC) {
				rowId
				year
				round
				date
				officialName
				circuit {
					id
					latitude
					longitude
				}
				raceResults(condition: {positionNumber: 1}, first: 1) {
					raceId
					driverId
				}
				sprintRaceResults(condition: {positionNumber: 1}, first: 1) {
					raceId
					driverId
				}
			}
		}
	}
`;
