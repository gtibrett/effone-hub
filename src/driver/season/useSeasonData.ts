import {gql, useQuery} from '@apollo/client';
import {DriverId, DriverPageData} from '../types';

const query = gql`
	query DriverSeasonQuery($driverId: Int!, $season: Int!) {
		races (condition: {year: $season}, orderBy:ROUND_ASC) {
			raceId
			round
			name
			date
			time

			results (condition: {driverId: $driverId}) {
				grid
				positionOrder
				points
				positionText
				teamId
				milliseconds
				status {
					status
				}
			}
		}
	}
`;

export default function useSeasonData(driverId?: DriverId, season?: number) {
	return useQuery<DriverPageData>(query, {variables: {driverId, season}});
}