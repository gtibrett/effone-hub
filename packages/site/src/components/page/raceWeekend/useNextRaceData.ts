import {gql, useSuspenseQuery} from '@apollo/client';
import {Season} from '@gtibrett/effone-hub-graph-api';

export type NextRaceData = {
	season: Pick<Season, 'nextRace'>
};

const query = gql`
	query nextRaceQuery($season: Int!) {
		season(year: $season) {
			nextRace {
				race {
					url
					summary {
						extract
					}
					name
					date
					time
					fp1Date
					fp1Time
					fp2Date
					fp2Time
					fp3Date
					fp3Time
					qualiTime
					qualiDate
					sprintDate
					sprintTime
					circuit {
						circuitRef
					}
				}
			}
		}
	}
`;

export default function useNextRaceData(season: number) {
	return useSuspenseQuery<NextRaceData>(query, {variables: {season}});
}