import {gql, useQuery} from '@apollo/client';
import {DriverPageData} from './types';

const DriverDataQuery = gql`
	query DriverDataQuery($driverRef: String!, $season: Int!) {
		driver: driverByDriverRef(driverRef: $driverRef) {
			driverId
			driverRef
			code
			number
			dob
			forename
			surname
			nationality
			currentTeam {
				team {
					colors {
						primary
					}
				}
			}
			url
			bio {
				thumbnail {
					source
				}
				extract
			}

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

		races (condition: {year: $season}, orderBy:ROUND_ASC) {
			raceId
			round
			name
			date
		}
	}
`;

export default function useDriverData(driverRef?: string, season?: number) {
	return useQuery<DriverPageData>(DriverDataQuery, {variables: {driverRef, season}});
}