import {Circuit as CircuitT, Race} from '@/gql/graphql';
import {gql, useSuspenseQuery} from '@apollo/client';
import {QueryResult} from '@apollo/client/react/types/types';

const CircuitQuery = gql`
	query CircuitQuery($circuitRef: String!, $showCurrentSeason: Boolean!, $season: Int) {
		circuit(id: $circuitRef) {
			fullName
			placeName
			countryId
			latitude
			longitude
			description {
				description
			}

			history: racesByYear(orderBy: YEAR_DESC) {
				nodes {
					year
					round
					date
					officialName
					raceResults(condition: {positionNumber: 1}) {
						nodes {
							constructorId
							driverId
							driver {
								firstName
								lastName
							}
							time
						}
					}
					lapTimes(condition: {position: 1}) {
						nodes {
							driverId
						}
					}
					fastestLaps: lapTimes(orderBy: TIME_MILLIS_ASC, first: 1) {
						nodes {
							driverId
							timeMillis
						}
					}
				}
			}

			season: racesByYear(condition: {year: $season}) @include(if: $showCurrentSeason) {
				nodes {
					year
					round
					officialName
					freePractice1Date
					freePractice1Time
					freePractice2Date
					freePractice2Time
					freePractice3Date
					freePractice3Time
					qualifyingDate
					qualifyingTime
					date
					time
					raceResults {
						nodes {
							driverId
							constructor {
								id
							}
							gridPositionNumber
							positionDisplayOrder
							points
							reasonRetired
						}
					}
				}
			}
		}
	}
`;

export type CircuitHistoryData = Pick<Race, 'year' | 'round' | 'date'> & {
	officialName: string;
	raceResults: {
		nodes: {
			constructorId: string;
			driverId: string;
			driver: { firstName: string; lastName: string };
			time: string | null;
		}[];
	};
	lapTimes: { nodes: { driverId: string }[] };
	fastestLaps: { nodes: { driverId: string; timeMillis: number | null }[] };
}

type CircuitPageData = {
	circuit: Pick<CircuitT, 'fullName' | 'placeName' | 'countryId' | 'latitude' | 'longitude' | 'description'> & {
		history: { nodes: CircuitHistoryData[] };
		season: { nodes: Race[] };
	}
}

export type CircuitDataProps = Pick<QueryResult<CircuitPageData>, 'data' | 'loading'>;

export default function useCircuitByRef(circuitRef: string, season?: number) {
	return useSuspenseQuery<CircuitPageData>(CircuitQuery, {variables: {circuitRef, showCurrentSeason: Boolean(season), season}});
}
