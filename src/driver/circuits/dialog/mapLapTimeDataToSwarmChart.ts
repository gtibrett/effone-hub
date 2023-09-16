import {SwarmPlotSvgProps} from '@nivo/swarmplot';
import {CircuitDialogData} from './types';

export type SwarmData = {
	id: string;
	group: string;
	lap: number;
	deviations: number;
	milliseconds: number;
	color: string;
}

function getStandardDeviation(data: number[]) {
	const n = data.length;
	
	if (!n) {
		return 0;
	}
	
	const mean = data.reduce((a, b) => a + b, 0) / n;
	return Math.sqrt(data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}

export function mapLapTimeDataToSwarmChart(data: CircuitDialogData): SwarmPlotSvgProps<SwarmData>['data'] {
	const colorsByYear: { [year: number]: string }         = data.driver.teamsByYear
	                                                             .map(({year, team: {colors}}) => ({year, color: colors.primary}))
	                                                             .reduce((colors, {year, color}) => ({...colors, [year]: color}), {});
	const mappedData: SwarmPlotSvgProps<SwarmData>['data'] = [];
	
	data?.circuit.races.forEach(race => {
		const mappedLaps = race.lapTimes
		                       .filter(l => l.milliseconds)
		                       .map(l => ({
			                       lap:          l.lap,
			                       milliseconds: Number(l.milliseconds)
		                       }));
		
		const averageLapTime = mappedLaps.reduce((a, v) => Number(v.milliseconds) + a, 0) / (mappedLaps.length + Number.EPSILON);
		const stdDevLapTime  = getStandardDeviation(mappedLaps.map(l => l.milliseconds));
		
		mappedLaps.forEach(l => {
			mappedData.push({
				...l,
				id:         `${race.raceId}-${l.lap}`,
				group:      String(race.year),
				deviations: l.milliseconds ? Math.abs(l.milliseconds - averageLapTime) / stdDevLapTime : 1000,
				color:      colorsByYear[race.year]
			});
		});
	});
	
	return mappedData;
}

type LapTimeBoxChartData = { year: number, milliseconds: number }[];

export function mapLapTimeDataToBoxChart(data: CircuitDialogData): LapTimeBoxChartData {
	const mappedData: LapTimeBoxChartData = [];
	
	data?.circuit.races.forEach(race => {
		const mappedLaps = race.lapTimes
		                       .filter(l => l.milliseconds)
		                       .map(l => ({
			                       lap:          l.lap,
			                       milliseconds: Number(l.milliseconds)
		                       }));
		
		mappedLaps.forEach(l => {
			mappedData.push({
				year:         race.year,
				milliseconds: l.milliseconds
			});
		});
	});
	
	return mappedData;
}