import {gql, useQuery} from '@apollo/client';
import {DriverPageData} from '../types';

const query = gql`
	query DriverCareerQuery($driverId: String!) {
		driver(rowId: $driverId) {
			standings: seasonDriverStandings(orderBy: YEAR_ASC) {
				nodes {
					year
					positionNumber
					positionText
					points
				}
			}

			# for CareerPerformance.tsx
			raceResults {
				nodes {
					race {
						rowId
						year
						round
						circuit {
							rowId
							fullName
							longitude
							latitude
						}
					}
					gridPositionNumber
					positionDisplayOrder
					points
					positionText
					teamId
					timeMillis
					reasonRetired
				}
			}
		}
	}
`;

export default function useCareerData(driverId?: string) {
	return useQuery<DriverPageData>(query, {variables: {driverId}});
}
