import {gql, useQuery} from '@apollo/client';
import {Circuit, Driver, Race} from '@gtibrett/effone-hub-graph-api';

export type RaceData = Pick<Race, 'date' | 'name' | 'round'> & {
	circuit: Pick<Circuit, 'lat' | 'lng'>;
	results: {
		driver: Pick<Driver, 'forename' | 'surname' | 'code' | 'driverId'>
	}[];
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
				driver {
					forename
					surname
					code
					driverId
				}
			}
		}
	}
`;

export default function useScheduleData(season: number) {
	return useQuery<ScheduleData>(query, {variables: {season}});
}