import { gql } from '@apollo/client';

export const ConstructorSeasonQuery = gql`
	query ConstructorSeasonQuery($teamId: String!, $season: Int!) {
		races(condition: { year: $season }, orderBy: ROUND_ASC) {
			rowId
			year
			round
			officialName
			date
			time

			raceResults(condition: { teamId: $teamId }) {
				raceId
				gridPositionNumber
				positionDisplayOrder
				points
				timeMillis
				driverId
				teamId
				reasonRetired
			}
		}
	}
`;
