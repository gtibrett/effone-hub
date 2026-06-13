import { gql } from '@apollo/client';

export const lapsQuery = gql`
	#graphql
	query lapsSeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			lapTimes(orderBy: LAP_ASC) {
				raceId
				lap
				position
				timeText
				milliseconds
				driverId
			}
			raceResults(orderBy: POSITION_DISPLAY_ORDER_ASC) {
				raceId
				positionDisplayOrder
				positionNumber
				driverId
				driver {
					id
					lastName
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
