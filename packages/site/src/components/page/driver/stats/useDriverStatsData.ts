import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import type { RaceResult } from '@/gql/graphql';

export type DriverStatsData = {
	driver: {
		raceResults: Pick<RaceResult, 'positionNumber' | 'positionDisplayOrder' | 'points'>[];
	};
};

type Data = DriverStatsData;

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

const useDriverStatsData = (driverId?: string) =>
	useQuery<Data>(driverStats, { variables: { driverId } });

export default useDriverStatsData;
