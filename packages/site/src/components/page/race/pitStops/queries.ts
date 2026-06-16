import { gql } from '@apollo/client';

export const pitStopsQuery = gql`
	#graphql
	query pitStopsBySeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			pitStops {
				raceId
				lap
				stop
				time
				timeMillis
				driverId
				driver {
					id
					abbreviation
				}
				team {
					id
					colors {
						teamId
						primaryHex
					}
				}
			}
		}
	}
`;
