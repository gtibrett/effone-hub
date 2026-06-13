import { gql } from '@apollo/client';

export const raceFastestLapQuery = gql`
	query raceFastestLapQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			fastestLaps(first: 1) {
				raceId
				driverId
				lap
				time
				timeMillis
			}
		}
	}
`;

export const raceLapLeaderQuery = gql`
	query raceLapLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			lapTimes {
				raceId
				driverId
				lap
				position
			}
		}
	}
`;

export const racePolesLeaderQuery = gql`
	query racePolesLeaderQuery($season: Int!, $round: Int!) {
		races (condition: {year: $season, round: $round}) {
			year
			round
			qualifyingResults (condition: {positionNumber: 1}, first: 1) {
				raceId
				driverId
			}
		}
	}
`;

export const racePositionsGainedLeaderQuery = gql`
	query racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			raceResults {
				raceId
				driverId
				gridPositionNumber
				positionNumber
			}
		}
	}
`;
