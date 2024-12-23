import {Driver, FinalTeamStandingsByYear, Race, Result, Team, TeamBio, TeamHistory} from '@/gql/graphql';
import {gql, useQuery} from '@apollo/client';

export type DriverByYear = {
	year: number;
	driver: Driver;
}

export type TeamStandingData = Pick<FinalTeamStandingsByYear, 'points' | 'position' | 'positionText' | 'wins' | 'year'>;

export type TeamHistoryData = TeamHistory & {
	antecedentTeam: {
		standings: TeamStandingData[];
	}
}

export type TeamData = Pick<Team, 'teamId' | 'constructorRef' | 'name' | 'nationality' | 'colors' | 'url'> & {
	bio: Pick<TeamBio, 'extract'>;
	
	teamHistories: TeamHistoryData[];
	
	standings: TeamStandingData[];
	results: Result[];
	drivers: DriverByYear[]
}

export type ConstructorPageData = {
	team: TeamData;
	races: Race[];
}

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