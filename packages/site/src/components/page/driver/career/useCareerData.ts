import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { DriverPageData } from '../types';

const query = gql`
	query DriverCareerQuery($driverId: String!) {
		driver(id: $driverId) {
			id
			standings: seasonDriverStandings(orderBy: YEAR_ASC) {
				year
				driverId
				positionNumber
				positionText
				points
			}

			# for CareerPerformance.tsx
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
				positionNumber
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

export default function useCareerData(driverId?: string) {
	return useQuery<DriverPageData>(query, { variables: { driverId } });
}
