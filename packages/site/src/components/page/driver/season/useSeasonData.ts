import { gql } from '@apollo/client';

export const DriverSeasonQuery = gql`
	query DriverSeasonQuery($driverId: String!, $season: Int!) {
		races(condition: {year: $season}, orderBy: ROUND_ASC) {
			rowId
			year
			round
			officialName
			date
			time
			raceResults(condition: {driverId: $driverId}) {
				raceId
				driverId
				gridPositionNumber
				positionDisplayOrder
				points
				positionText
				teamId
				timeMillis
				reasonRetired
			}
		}
	}
`;
