import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client/react";
import {RaceResult} from '@/gql/graphql';

type Data = {
	driver: {
		raceResults: {
			nodes: Pick<RaceResult, 'positionNumber' | 'positionDisplayOrder' | 'points'>[]
		}
	}
}

const query = gql`
	query driverStats($driverId: String!) {
		driver(rowId: $driverId) {
			raceResults {
				nodes {
					positionNumber
					positionDisplayOrder
					points
				}
			}
		}
	}
`;

const useDriverStatsData = (driverId?: string) => useQuery<Data>(query, {variables: {driverId}});

export default useDriverStatsData;