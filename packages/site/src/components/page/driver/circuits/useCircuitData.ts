import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import type { Circuit } from '@/gql/graphql';

import type { DriverPageData } from '../types';

type RaceResultData = {
	gridPositionNumber?: number | null;
	positionDisplayOrder?: number | null;
	points?: number | null;
	positionText?: string | null;
	teamId?: string | null;
	timeMillis?: number | null;
	reasonRetired?: string | null;
};

export type CircuitWithResults = Pick<Circuit, 'id' | 'fullName' | 'longitude' | 'latitude'> & {
	results: RaceResultData[];
	averagePosition?: number;
	averageTime?: number;
	wins: number;
};

const query = gql`
	query DriverCircuitQuery($driverId: String!) {
		driver(id: $driverId) {
			id
			raceResults {
				raceId
				driverId
				race {
					rowId
					year
					round
					circuit {
						id
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

	data?.driver.raceResults?.forEach(({ race, ...result }) => {
		if (!race?.circuit) {
			return;
		}

		const { id } = race.circuit;
		let index = resultsByCircuit.findIndex(c => c.id === id);

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
				} catch {
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
