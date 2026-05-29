import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { ConstructorPageData } from '@/components/page/constructor/types';

const ConstructorDataQuery = gql`
	query ConstructorDataQuery($constructorRef: String!, $season: Int!) {
		team(id: $constructorRef) {
			id
			name
			countryId
			colors {
				teamId
				primaryHex
			}

			drivers: seasonEntrantDrivers(orderBy: YEAR_ASC) {
				year
				driverId
				teamId
				driver {
					id
					firstName
					lastName
					seasonDriverStandings(orderBy: YEAR_ASC) {
						year
						driverId
						points
						positionNumber
					}
				}
			}

			standings: seasonTeamStandings(orderBy: YEAR_ASC) {
				teamId
				engineManufacturerId
				points
				positionNumber
				positionText
				year
			}

			antecedents {
				teamId
				antecedentTeamId
				startYear
				endYear
				antecedentTeam {
					id
					name
					colors {
						teamId
						primaryHex
					}
					standings: seasonTeamStandings(orderBy: YEAR_ASC) {
						teamId
						engineManufacturerId
						points
						positionNumber
						positionText
						year
					}
				}
			}

			raceResults {
				raceId
				race {
					year
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
			rowId
			year
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
