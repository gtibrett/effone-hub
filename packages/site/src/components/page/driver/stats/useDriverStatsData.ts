import {gql, useQuery} from '@apollo/client';
import {Result} from '@gtibrett/effone-hub-graph-api';
import {DriverId} from '@/types';

type Data = {
	results: Pick<Result, 'driverId' | 'points' | 'positionOrder' | 'position'>[]
}

const query = gql`
	query driverStats($driverId: Int!) {
		results (condition: {driverId: $driverId}) {
			driverId
			position
			positionOrder
			points
		}
	}
`;

const useDriverStatsData = (driverId: DriverId) => useQuery<Data>(query, {variables: {driverId}});

export default useDriverStatsData;