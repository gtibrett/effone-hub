import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { DriverPageData } from '../types';

const query = gql`
	query DriverCareerQuery($driverId: String!) {
		driver(id: $driverId) {
			id
			# season summary: positionNumber/totalPoints/totalRaceWins per year (team lives on raceResults)
			standings: seasonDrivers(orderBy: YEAR_ASC) {
				year
				positionNumber
				points: totalPoints
				wins: totalRaceWins
			}

			# for CareerPerformance.tsx; team here drives per-season team coloring (season-end team)
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
				team {
					id
					colors {
						teamId
						primaryHex
						secondaryHex
					}
				}
				timeMillis
				reasonRetired
			}
		}
	}
`;

export default function useCareerData(driverId?: string) {
	return useQuery<DriverPageData>(query, { variables: { driverId } });
}
