import {gql, useQuery} from '@apollo/client';
import {Circuit, Race, WikipediaSummary} from '@gtibrett/effone-hub-graph-api';

type RaceData = Pick<Race,
	'url' |
	'name' |
	'date' |
	'time' |
	'fp1Date' |
	'fp1Time' |
	'fp2Date' |
	'fp2Time' |
	'fp3Date' |
	'fp3Time' |
	'qualiTime' |
	'qualiDate'
> & {
	summary: Pick<WikipediaSummary, 'extract'>;
	circuit: Pick<Circuit, 'circuitRef'>
}

export type NextRaceData = {
	season: {
		nextRace: ({
			race: RaceData
		}) | null
	}
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
					circuit {
						circuitRef
					}
				}
			}
		}
	}
`;

export default function useNextRaceData(season: number) {
	return useQuery<NextRaceData>(query, {variables: {season}});
}