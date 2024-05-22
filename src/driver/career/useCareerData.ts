import {gql, useQuery} from '@apollo/client';
import {Maybe} from '@gtibrett/effone-hub-graph-api/types';
import {DriverPageData} from '../types';

const query = gql`
	query DriverCareerQuery($driverId: Int!) {
		driver(driverId: $driverId) {
			standings: driverStandingsBySeasons (orderBy: YEAR_ASC) {
				year
				position
				points
				wins

				driverTeamByDriverIdAndYear {
					team {
						teamId
						colors {
							primary
						}
					}
				}
			}

			# for CareerPerformance.tsx
			results {
				raceId
				race {
					year
					round
					circuit {
						circuitId
						name
						lng
						lat
					}
				}
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

export default function useCareerData(driverId?: Maybe<number>) {
	return useQuery<DriverPageData>(query, {variables: {driverId}});
}