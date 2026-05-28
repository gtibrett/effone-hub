import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { DriverPageData } from '../types';

const query = gql`
	query DriverCareerQuery($driverId: String!) {
		driver(rowId: $driverId) {
			id
			standings: seasonDriverStandings(orderBy: YEAR_ASC) {
				id
				year
				positionNumber
				positionText
				points
			}

			# for CareerPerformance.tsx
			raceResults {
				id
				race {
					id
					rowId
					year
					round
					circuit {
						id
						rowId
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
