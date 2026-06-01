import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { DriverPageData } from '../types';

const query = gql`
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

export default function useSeasonData(driverId?: string, season?: number) {
	return useQuery<DriverPageData>(query, { variables: { driverId, season } });
}
