import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { Circuit } from '@/gql/graphql';

import { DriverPageData } from '../types';

type RaceResultData = {
	gridPositionNumber?: number | null;
	positionDisplayOrder?: number | null;
	points?: number | null;
	positionText?: string | null;
	teamId?: string | null;
	timeMillis?: number | null;
	reasonRetired?: string | null;
};

export type CircuitWithResults = Pick<Circuit, 'rowId' | 'fullName' | 'longitude' | 'latitude'> & {
	results: RaceResultData[];
	averagePosition?: number;
	averageTime?: number;
	wins: number;
};

const query = gql`
	query DriverCircuitQuery($driverId: String!) {
		driver(rowId: $driverId) {
			raceResults {
				nodes {
					id
					race {
						id
						rowId
						year
						round
						circuit {
							id
							rowId
							fullName
							longitude
							latitude
						}
					}
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
	}
`;

export default function useCircuitData(
	driverId?: string,
	season?: number
): SimpleApolloResult<CircuitWithResults[]> {
	const result = useQuery<DriverPageData>(query, { variables: { driverId, season } });
	const { data, loading } = result;
	const resultsByCircuit: CircuitWithResults[] = [];

	if (loading || !data) {
		return {
			...result,
			data: undefined
		};
	}

	data?.driver.raceResults?.nodes?.forEach(({ race, ...result }) => {
		if (!race?.circuit) {
			return;
		}

		const { rowId } = race.circuit;
		let index = resultsByCircuit.findIndex(c => c.rowId === rowId);

		if (index === -1) {
			resultsByCircuit.push({
				...race.circuit,
				results: [],
				averagePosition: 0,
				averageTime: 0,
				wins: 0
			});

			index = resultsByCircuit.length - 1;
		}

		resultsByCircuit[index].results.push(result as RaceResultData);
	});

	return {
		loading,
		data: resultsByCircuit.map(circuit => {
			const racePositions: number[] = [];
			const raceTimes: number[] = [];

			circuit.results.forEach((result: RaceResultData) => {
				if (result.positionDisplayOrder) {
					racePositions.push(result.positionDisplayOrder);
				}

				try {
					const time = result.timeMillis;

					if (time) {
						raceTimes.push(time);
					}
				} catch (e) {
					// time could not be calculated
				}
			});

			return {
				...circuit,
				averagePosition: !racePositions.length
					? undefined
					: Math.round(racePositions.reduce((a, v) => a + v, 0) / racePositions.length),
				averageTime: !raceTimes.length
					? undefined
					: raceTimes.reduce((a, v) => a + v, 0) / raceTimes.length,
				wins: circuit.results.filter(r => r.positionDisplayOrder === 1).length
			};
		})
	};
}
