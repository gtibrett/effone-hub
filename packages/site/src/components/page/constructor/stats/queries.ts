import { gql } from '@apollo/client';

export const ConstructorDriverPodiumsQuery = gql`
	query constructorDriverPodiumsQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			year
			racesByYear(orderBy: ROUND_ASC) {
				rowId
				year
				round
				raceResults(condition: {teamId: $constructorId}) {
					raceId
					driverId
					positionNumber
				}
			}
		}
	}
`;

export const ConstructorDriverPointsQuery = gql`
	query ConstructorDriverPointsQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			year
			racesByYear {
				year
				round
				raceResults(condition: {teamId: $constructorId}) {
					raceId
					driverId
					points
				}
				sprintRaceResults(condition: {teamId: $constructorId}) {
					raceId
					driverId
					points
				}
			}
		}
	}
`;

export const ConstructorDriverQualifyingQuery = gql`
	query ConstructorDriverQualifyingQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				qualifyingResults(condition: {teamId: $constructorId}, orderBy: POSITION_NUMBER_ASC) {
					raceId
					driverId
					positionNumber
					driver { id fullName }
				}
			}
		}
	}
`;
