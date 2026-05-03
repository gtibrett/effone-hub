import {gql, useQuery} from '@apollo/client';
import {DriverPageData} from '../types';

const query = gql`
	query DriverCareerQuery($driverId: String!) {
		driver(id: $driverId) {
			standings: seasonDriverStandings(orderBy: YEAR_ASC) {
				nodes {
					year
					positionNumber
					positionText
					points
					constructor {
						id
						colors { primaryHex }
					}
				}
			}

			# for CareerPerformance.tsx
			raceResults(orderBy: [YEAR_ASC, ROUND_ASC]) {
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
					constructorId
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
