import {ConstructorPageData} from '@/components/page/constructor/types';
import {gql, useQuery} from '@apollo/client';

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
				nodes {
					id
					year
					driver {
						id
						firstName
						lastName
						driverStandings: seasonDriverStandings(orderBy: YEAR_ASC) {
							nodes {
								id
								year
								points
								positionNumber
							}
						}
					}
				}
			}

			standings: seasonTeamStandings(orderBy: YEAR_ASC) {
				nodes {
					id
					points
					positionNumber
					positionText
					year
				}
			}

			antecedents {
				nodes {
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
							nodes {
								id
								points
								positionNumber
								positionText
								year
							}
						}
					}
				}
			}

			raceResults {
				nodes {
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
		}

		races(condition: { year: $season }, orderBy: ROUND_ASC) {
			nodes {
				id
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
