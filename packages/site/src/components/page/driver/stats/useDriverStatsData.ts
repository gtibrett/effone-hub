import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import type { RaceResult } from '@/gql/graphql';

type Data = {
	driver: {
		raceResults: Pick<RaceResult, 'positionNumber' | 'positionDisplayOrder' | 'points'>[];
	};
};

const query = gql`
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
	useQuery<Data>(query, { variables: { driverId } });

export default useDriverStatsData;
