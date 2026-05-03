import {gql, useQuery} from '@apollo/client';
import {DriverPageData} from '../types';

const query = gql`
	query DriverSeasonQuery($driverId: String!, $season: Int!) {
		races(condition: {year: $season}, orderBy: ROUND_ASC) {
			nodes {
				rowId
				round
				officialName
				date
				time
				raceResults(condition: {driverId: $driverId}) {
					nodes {
						gridPositionNumber
						positionDisplayOrder
						points
						positionText
						constructorId
						timeMillis
						reasonRetired
					}
				}
			}
		}
	}
`;

export default function useSeasonData(driverId?: string, season?: number) {
	return useQuery<DriverPageData>(query, {variables: {driverId, season}});
}