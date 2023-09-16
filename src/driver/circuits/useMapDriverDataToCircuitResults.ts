import {QueryResult} from '@apollo/client/react/types/types';
import {Circuit, Result} from '@gtibrett/effone-hub-graph-api';
import {DriverPageData} from '../types';

export type CircuitWithResults = Pick<Circuit, 'circuitId' | 'circuitRef' | 'name' | 'lng' | 'lat'> & {
	results: Partial<Result>[];
	averagePosition?: number;
	averageTime?: number;
	wins: number;
}

type useResultsByCircuitProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'>;

export default function useMapDriverDataToCircuitResults(data: useResultsByCircuitProps['data']) {
	const resultsByCircuit: CircuitWithResults[] = [];
	data?.driver.results.forEach(({race, ...result}) => {
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
	
	return resultsByCircuit.map((circuit) => {
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
	});
}