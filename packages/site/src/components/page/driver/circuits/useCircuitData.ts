import {gql, useQuery} from '@apollo/client';
import {QueryResult} from '@apollo/client/react/types/types';
import {Circuit, Result} from '@/gql/graphql';
import {DriverPageData} from '../types';

export type CircuitWithResults = Pick<Circuit, 'circuitId' | 'circuitRef' | 'name' | 'lng' | 'lat'> & {
	results: Partial<Result>[];
	averagePosition?: number;
	averageTime?: number;
	wins: number;
}

const query = gql`
	query DriverCircuitQuery($driverId: Int!) {
		driver(driverId: $driverId) {
			results {
				raceId
				race {
					year
					round
					circuit {
						circuitId
						name
						lng
						lat
					}
				}
				grid
				positionOrder
				points
				positionText
				teamId
				milliseconds
				status {
					status
				}
			}
		}
	}
`;

export default function useCircuitData(driverId?: number, season?: number): Pick<QueryResult<CircuitWithResults[]>, 'data' | 'loading'> {
	const result                                 = useQuery<DriverPageData>(query, {variables: {driverId, season}});
	const {data, loading}                        = result;
	const resultsByCircuit: CircuitWithResults[] = [];
	
	if (loading || !data) {
		return {
			...result,
			data: undefined
		};
	}
	
	data?.driver.results.forEach(({race, ...result}) => {
		if (!race?.circuit) {
			return;
		}
		
		const {circuitId} = race.circuit;
		let index         = resultsByCircuit.findIndex(c => c.circuitId === circuitId);
		
		if (index === -1) {
			resultsByCircuit.push({
				...race.circuit,
				results:         [],
				averagePosition: 0,
				averageTime:     0,
				wins:            0
			});
			
			index = resultsByCircuit.length - 1;
		}
		
		resultsByCircuit[index].results.push(result);
	});
	
	return {
		loading,
		data: resultsByCircuit.map((circuit) => {
			const racePositions: number[] = [];
			const raceTimes: number[]     = [];
			
			circuit.results.forEach((result: Partial<Result>) => {
				if (result.positionOrder) {
					racePositions.push(result.positionOrder);
				}
				
				try {
					const time = result.milliseconds;
					
					if (time) {
						raceTimes.push(time);
					}
				} catch (e) {
					// time could not be calculated
				}
			});
			
			return {
				...circuit,
				averagePosition: !racePositions.length ? undefined : Math.round(racePositions.reduce((a, v) => a + v, 0) / racePositions.length),
				averageTime:     !raceTimes.length ? undefined : raceTimes.reduce((a, v) => a + v, 0) / raceTimes.length,
				wins:            circuit.results.filter(r => r.positionOrder === 1).length
			};
		})
	};
}