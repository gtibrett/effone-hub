import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { Circuit as CircuitT, Race } from '@/gql/graphql';

const CircuitQuery = gql`
	query CircuitQuery($circuitRef: String!, $showCurrentSeason: Boolean!, $season: Int) {
		circuit(rowId: $circuitRef) {
			id
			rowId
			fullName
			placeName
			countryId
			latitude
			longitude
			description {
				description
			}

			history: races(orderBy: YEAR_DESC) {
				id
				year
				round
				date
				officialName
				raceResults(condition: {positionNumber: 1}) {
					id
					teamId
					driverId
					driver {
						id
						firstName
						lastName
					}
					time
				}
				lapTimes(condition: {lap: 1}) {
					id
					driverId
				}
				fastestLaps: lapTimes(first: 1) {
					id
					driverId
					milliseconds
				}
			}

			season: races(condition: {year: $season}) @include(if: $showCurrentSeason) {
				id
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
					id
					driverId
					team {
						id
						rowId
					}
					gridPositionNumber
					positionDisplayOrder
					points
					reasonRetired
				}
			}
		}
	}
`;

export type CircuitHistoryData = Pick<Race, 'year' | 'round' | 'date'> & {
	officialName: string;
	raceResults: {
		teamId: string;
		driverId: string;
		driver: { firstName: string; lastName: string };
		time: string | null;
	}[];
	lapTimes: { driverId: string }[];
	fastestLaps: { driverId: string; milliseconds: number | null }[];
};

type CircuitPageData = {
	circuit: Pick<
		CircuitT,
		'rowId' | 'fullName' | 'placeName' | 'countryId' | 'latitude' | 'longitude' | 'description'
	> & {
		history: CircuitHistoryData[];
		season: Race[];
	};
};

export type CircuitDataProps = SimpleApolloResult<CircuitPageData>;

export default function useCircuitByRef(circuitRef: string, season?: number) {
	return useSuspenseQuery<CircuitPageData>(CircuitQuery, {
		variables: { circuitRef, showCurrentSeason: Boolean(season), season }
	});
}
