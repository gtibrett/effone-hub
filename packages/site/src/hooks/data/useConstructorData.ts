import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { ConstructorPageData } from '@/components/page/constructor/types';

const ConstructorDataQuery = gql`
	query ConstructorDataQuery($constructorRef: String!, $season: Int!) {
		team(rowId: $constructorRef) {
			id
			name
			countryId
			colors {
				id
				primaryHex
			}

			drivers: seasonEntrantDrivers(orderBy: YEAR_ASC) {
				id
				year
				driver {
					id
					firstName
					lastName
					driverStandings: seasonDriverStandings(orderBy: YEAR_ASC) {
						id
						year
						points
						positionNumber
					}
				}
			}

			standings: seasonTeamStandings(orderBy: YEAR_ASC) {
				id
				points
				positionNumber
				positionText
				year
			}

			antecedents {
				id
				antecedentTeamId
				startYear
				endYear
				antecedentTeam {
					id
					name
					colors {
						id
						primaryHex
					}
					standings: seasonTeamStandings(orderBy: YEAR_ASC) {
						id
						points
						positionNumber
						positionText
						year
					}
				}
			}

			raceResults {
				id
				raceId
				race {
					id
					round
				}
				driverId
				driver {
					id
					abbreviation
				}
				gridPositionNumber
				positionDisplayOrder
				points
			}
		}

		races(condition: { year: $season }, orderBy: ROUND_ASC) {
			id
			rowId
			round
			officialName
			date
		}
	}
`;

export default function useConstructorData(constructorRef?: string, season?: number) {
	return useQuery<ConstructorPageData>(ConstructorDataQuery, {
		variables: { constructorRef, season }
	});
}
