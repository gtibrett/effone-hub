import { gql } from '@apollo/client';

import type { Circuit } from '@/gql/graphql';

type RaceResultData = {
	gridPositionNumber?: number | null;
	positionDisplayOrder?: number | null;
	points?: number | null;
	positionText?: string | null;
	teamId?: string | null;
	timeMillis?: number | null;
	reasonRetired?: string | null;
};

export type CircuitWithResults = Pick<Circuit, 'id' | 'fullName' | 'longitude' | 'latitude'> & {
	results: RaceResultData[];
	averagePosition?: number;
	averageTime?: number;
	wins: number;
};

export const DriverCircuitQuery = gql`
	query DriverCircuitQuery($driverId: String!) {
		driver(id: $driverId) {
			id
			raceResults {
				raceId
				driverId
				race {
					rowId
					year
					round
					circuit {
						id
						fullName
						longitude
						latitude
					}
				}
				gridPositionNumber
				positionDisplayOrder
				points
				positionText
				teamId
				timeMillis
				reasonRetired
			}
		}
	}
`;
