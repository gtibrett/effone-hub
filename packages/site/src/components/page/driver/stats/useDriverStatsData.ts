import { gql } from '@apollo/client';

import type { RaceResult } from '@/gql/graphql';

export type DriverStatsData = {
	driver: {
		raceResults: Pick<RaceResult, 'positionNumber' | 'positionDisplayOrder' | 'points'>[];
	};
};

export const driverStats = gql`
	query driverStats($driverId: String!) {
		driver(id: $driverId) {
			id
			raceResults {
				raceId
				driverId
				positionNumber
				positionDisplayOrder
				points
			}
		}
	}
`;
