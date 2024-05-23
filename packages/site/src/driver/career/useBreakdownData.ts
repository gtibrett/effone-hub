import {DriverId} from '@effonehub/driver';
import useCareerData from '@effonehub/driver/career/useCareerData';
import {BarDatum} from '@nivo/bar/dist/types/types';

export interface BreakdownMetrics extends BarDatum {
	wins: number;
	podiums: number;
	inPoints: number;
	outOfPoints: number;
	DNFs: number;
	appearances: number;
}

export interface BreakdownDatum extends BarDatum {
	// @ts-ignore
	driverId: DriverId;
	year: number;
	// @ts-ignore
	raw: BreakdownMetrics; // this works, but doesn't pass ts check
}

export default function useBreakdownData(driverId: DriverId): BreakdownDatum[] | undefined {
	const {data}        = useCareerData(driverId);
	const careerResults = data?.driver.results;
	
	if (!careerResults) {
		return undefined;
	}
	
	// @ts-ignore
	return data?.driver.standings.map(({year}) => {
		const seasonResults = careerResults.filter(r => r.race?.year === year);
		const appearances   = seasonResults.length;
		
		const raw: BreakdownMetrics = {
			wins:        0,
			podiums:     0,
			inPoints:    0,
			outOfPoints: 0,
			DNFs:        0,
			appearances
		};
		
		seasonResults.forEach(r => {
			switch (true) {
				case (r.positionOrder === 1):
					raw.wins++;
					break;
				case (r.positionOrder && r.positionOrder <= 3):
					raw.podiums++;
					break;
				case (r.positionOrder && r.positionOrder <= 10):
					raw.inPoints++;
					break;
				case (r.positionText !== String(r.positionOrder)):
					raw.DNFs++;
					break;
				default:
					raw.outOfPoints++;
			}
		});
		
		
		const asPercentage: BreakdownMetrics = Object.entries(raw)
		                                             .map(([key, value]) => ({key, value: Number(value) / appearances * 100}))
		                                             .reduce((cur, {key, value}) => ({...cur, [`${key}Percentage`]: value}), {}) as BreakdownMetrics;
		
		return {
			year,
			driverId,
			raw,
			...asPercentage
		};
	});
}