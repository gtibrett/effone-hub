import {AppLapTime} from '@/gql/graphql';
import {useMemo} from 'react';
import {LapByLapData} from '../lapByLap/useLapByLapChartData';
import {getColorWithAlt} from './helpers';

export type LapChartDatum = {
	x: number;
	y: number;
	timing: Partial<AppLapTime>;
	color: string;
};

export type LapChartSeries = {
	id: string;
	color?: string;
	data: LapChartDatum[]
}

export default function useLapTimeChartData(lapByLapData: LapByLapData) {
	return useMemo(() => {
		const fastestLapTime         = Math.min(...(lapByLapData.data?.flatMap(d => d.laps).map(lt => lt.timeMillis || Infinity) || []));
		const data: LapChartSeries[] = [];
		
		if (lapByLapData.data?.length) {
			lapByLapData.data.forEach(d => {
				if (!d.driverId) {
					return;
				}
				
				const lapsWithTimes                  = d.laps.filter(l => l.timeMillis).map(l => ({...l, timeMillis: Number(l.timeMillis)}));
				let personalBest: number | undefined = undefined;
				
				data.push({
					id:   d.driverId,
					data: lapsWithTimes.map(lt => {
						personalBest = !personalBest ? lt.timeMillis : Math.min(lt.timeMillis, personalBest);
						
						return {
							x:      lt.lap,
							y:      lt.timeMillis,
							color:  getColorWithAlt(lt.timeMillis, personalBest, fastestLapTime).color,
							timing: lt
						};
					})
				});
			});
		}
		
		return data;
	}, [lapByLapData]);
}