import {ConstructorPageData} from '@/components/page/constructor/types';
import {gql, useQuery} from '@apollo/client';

const ConstructorDataQuery = gql`
	query ConstructorDataQuery($constructorRef: String!, $season: Int!) {
		team: constructor(id: $constructorRef) {
			id
			name
			countryId
			colors {
				primaryHex
			}

			drivers: seasonEntrantDrivers(orderBy: YEAR_ASC) {
				nodes {
					year
					driver {
						id
						firstName
						lastName
						driverStandings: seasonDriverStandings(orderBy: YEAR_ASC) {
							nodes {
								year
								points
								positionNumber
								wins
							}
						}
					}
				}
			}

			standings: seasonConstructorStandings(orderBy: YEAR_ASC) {
				nodes {
					points
					positionNumber
					positionText
					year
				}
			}

			antecedents {
				nodes {
					constructorId
					startYear
					endYear
					constructor {
						id
						name
						colors {
							primaryHex
						}
						standings: seasonConstructorStandings(orderBy: YEAR_ASC) {
							nodes {
								points
								positionNumber
								positionText
								year
							}
						}
					}
				}
			}

			raceResults(condition: { year: $season }) {
				nodes {
					raceId
					race {
						round
					}
					driverId
					driver {
						abbreviation
					}
					gridPositionNumber
					positionDisplayOrder
					points
				}
			}
		}

		races(condition: { year: $season }, orderBy: ROUND_ASC) {
			nodes {
				rowId
				round
				officialName
				date
			}
		}
	}
`;

export default function useConstructorData(constructorRef?: string, season?: number) {
	return useQuery<ConstructorPageData>(ConstructorDataQuery, {variables: {constructorRef, season}});
}
