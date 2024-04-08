import {LapTime} from '@gtibrett/effone-hub-graph-api';
import {useMemo} from 'react';
import {LapByLapData} from '../lapByLap/useLapByLapChartData';
import {getColorWithAlt} from './helpers';

export type LapChartDatum = {
	x: number;
	y: number;
	timing: Partial<LapTime>;
	color: string;
};

export type LapChartSeries = {
	id: number;
	color?: string;
	data: LapChartDatum[]
}

export default function useLapTimeChartData(lapByLapData: LapByLapData) {
	return useMemo(() => {
		const fastestLapTime         = Math.min(...(lapByLapData.data?.flatMap(d => d.laps).map(lt => lt.milliseconds || Infinity) || []));
		const data: LapChartSeries[] = [];
		
		if (lapByLapData.data?.length) {
			lapByLapData.data.forEach(d => {
				if (!d.driverId) {
					return;
				}
				
				const lapsWithTimes                  = d.laps.filter(l => l.milliseconds).map(l => ({...l, milliseconds: Number(l.milliseconds)}));
				let personalBest: number | undefined = undefined;
				
				data.push({
					id:   d.driverId,
					data: lapsWithTimes.map(lt => {
						personalBest = !personalBest ? lt.milliseconds : Math.min(lt.milliseconds, personalBest);
						
						return {
							x:      lt.lap,
							y:      lt.milliseconds,
							color:  getColorWithAlt(lt.milliseconds, personalBest, fastestLapTime).color,
							timing: lt
						};
					})
				});
			});
		}
		
		return data;
	}, [lapByLapData]);
}