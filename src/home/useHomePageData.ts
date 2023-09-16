import {gql, useQuery} from '@apollo/client';
import {HomePageData} from './types';

const HomePageQuery = gql`
	query homePage($season: Int!) {
		season(year: $season) {
			nextRace {
				race {
					url
					summary {
						extract
					}
					name
					date
					time
					fp1Date
					fp1Time
					fp2Date
					fp2Time
					fp3Date
					fp3Time
					qualiTime
					qualiDate
					circuit {
						circuitRef
					}
				}
			}
		}
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			date
			name
			round
			circuit {
				lat
				lng
			}
			results(first: 1, orderBy: POSITION_ASC) {
				driver {
					forename
					surname
					code
					driverId
				}
			}
			driverStandings {
				driverId
				points
				position
				positionText
				wins
				driver {
					driverId
					code
					currentTeam {
						team {
							colors {
								primary
							}
						}
					}
				}
			}
		}

		driverStandings: driverStandingsBySeasons(condition: {year: $season}, orderBy: POSITION_ASC) {
			driverId
			points
			position
			positionText
			wins
			driver {
				code
				currentTeam {
					team {
						colors {
							primary
						}
					}
				}
			}
		}

		teamStandings: finalTeamStandingsByYears(condition: {year: $season}, orderBy: POSITION_ASC) {
			teamId
			team {
				colors {
					primary
				}
			}
			points
			position
			positionText
			wins
		}
	}
`;

export default function useHomePageData(season: number) {
	return useQuery<HomePageData>(HomePageQuery, {variables: {season}});
}