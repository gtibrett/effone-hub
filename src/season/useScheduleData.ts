import {gql, useQuery} from '@apollo/client';
import {DriverId} from '@effonehub/driver';
import {Circuit, Race} from '@gtibrett/effone-hub-graph-api';

type DriverResult = {
	driverId: DriverId
}

export type RaceData = Pick<Race, 'date' | 'name' | 'round'> & {
	circuit: Pick<Circuit, 'lat' | 'lng'>;
	results: DriverResult[];
	sprintResults: DriverResult[];
}

export type ScheduleData = {
	races: RaceData[];
}

const query = gql`
	query scheduleQuery($season: Int!) {
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			date
			name
			round
			circuit {
				lat
				lng
			}
			results(first: 1, orderBy: POSITION_ASC) {
				driverId
			}
			sprintResults(first: 1, orderBy: POSITION_ASC) {
				driverId
			}
		}
	}
`;

export default function useScheduleData(season: number) {
	return useQuery<ScheduleData>(query, {variables: {season}});
}