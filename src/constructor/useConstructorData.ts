import {gql, useQuery} from '@apollo/client';
import {ConstructorPageData} from './types';

const ConstructorDataQuery = gql`
	query ConstructorDataQuery($constructorRef: String!, $season: Int!) {
		team: teamByConstructorRef(constructorRef: $constructorRef) {
			teamId
			constructorRef
			name
			nationality
			colors {
				primary
			}
			url
			bio {
				extract
			}

			drivers: driversByYear(orderBy: DRIVER_ID_ASC) {
				year
				driver {
					driverId
					driverRef
					forename
					surname

					driverStandingsBySeasons {
						year
						driverId
						points
						position
						wins
					}
				}
			}

			standings: finalTeamStandingsByYears(orderBy: YEAR_ASC) {
				points
				position
				positionText
				wins
				year
			}

			teamHistories {
				startYear
				endYear
				antecedentTeam {
					teamId
					name
					colors {
						primary
					}

					standings: finalTeamStandingsByYears(orderBy: YEAR_ASC) {
						points
						position
						positionText
						wins
						year
					}
				}
			}

			results(condition: { year: $season }) {
				raceId
				race {
					round
				}
				driverId
				driver {
					code
				}
				grid
				positionOrder
				points
			}
		}

		races (condition: {year: $season}, orderBy:ROUND_ASC) {
			raceId
			round
			name
			date
		}
	}
`;

export default function useConstructorData(constructorRef?: string, season?: number) {
	return useQuery<ConstructorPageData>(ConstructorDataQuery, {variables: {constructorRef, season}});
}