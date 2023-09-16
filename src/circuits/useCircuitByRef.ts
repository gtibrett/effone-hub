import {gql, useQuery} from '@apollo/client';
import {QueryResult} from '@apollo/client/react/types/types';
import {Circuit as CircuitT, Race, Result} from '@gtibrett/effone-hub-graph-api';

const CircuitQuery = gql`
	query CircuitQuery($circuitRef: String!, $showCurrentSeason: Boolean!, $season: Int) {
		circuit: circuitByCircuitRef(circuitRef: $circuitRef) {
			circuitId
			circuitRef
			name
			location
			country
			lat
			lng
			circuitDescription {
				description
			}

			history: races {
				year
				round
				date
				name
				results (condition: {position: 1}) {
					teamId
					driverId
					time
				}
			}

			season: races(condition: {year: $season}) @include(if: $showCurrentSeason) {
				year
				round
				name
				fp1Date
				fp1Time
				fp2Date
				fp2Time
				fp3Date
				fp3Time
				qualiDate
				qualiTime
				date
				time
				results {
					driverId
					team {
						teamId
						constructorRef
					}
					grid
					positionOrder
					points
					time
					status {
						status
					}
				}
			}
		}
	}
`;

export type CircuitHistoryData = Pick<Race, 'year' | 'round' | 'date' | 'name'> & {
	results: Pick<Result, 'teamId' | 'driverId' | 'time'>[]
}

type CircuitPageData = {
	circuit: Pick<CircuitT, 'circuitId' | 'circuitRef' | 'name' | 'location' | 'country' | 'lat' | 'lng' | 'circuitDescription'> & {
		history: CircuitHistoryData[];
		season: Race[]
	}
}

export type CircuitDataProps = Pick<QueryResult<CircuitPageData>, 'data' | 'loading'>;

export default function useCircuitByRef(circuitRef: string | undefined, season?: number) {
	return useQuery<CircuitPageData>(CircuitQuery, {variables: {circuitRef, showCurrentSeason: Boolean(season), season}});
}

