import { gql } from '@apollo/client';

export const qualifyingQuery = gql`
	query qualifyingQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			qualifyingResults {
				raceId
				driverId
				teamId
				positionNumber
				q1
				q2
				q3
			}
		}
	}
`;
