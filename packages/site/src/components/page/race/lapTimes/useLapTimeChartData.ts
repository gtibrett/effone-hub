import { useMemo } from 'react';

import type { AppLapTime } from '@/gql/graphql';

import type { LapByLapData } from '../lapByLap/useLapByLapChartData';
import { getColorWithAlt } from './helpers';

export type LapChartDatum = {
	x: number;
	y: number;
	timing: Partial<AppLapTime>;
	color: string;
};

export type LapChartSeries = {
	id: string;
	color?: string;
	data: LapChartDatum[];
};

export default function useLapTimeChartData(lapByLapData: LapByLapData) {
	return useMemo(() => {
		const fastestLapTime = Math.min(
			...(lapByLapData.data?.flatMap(d => d.laps).map(lt => lt.milliseconds || Infinity) ||
				[])
		);
		const data: LapChartSeries[] = [];

		if (lapByLapData.data?.length) {
			lapByLapData.data.forEach(d => {
				if (!d.driverId) {
					return;
				}

				const lapsWithTimes = d.laps
					.filter(l => l.milliseconds)
					.map(l => ({ ...l, milliseconds: Number(l.milliseconds) }));
				let personalBest: number | undefined;

				data.push({
					id: d.driverId,
					data: lapsWithTimes.map(lt => {
						personalBest = !personalBest
							? lt.milliseconds
							: Math.min(lt.milliseconds, personalBest);

						return {
							x: lt.lap ?? 0,
							y: lt.milliseconds,
							color: getColorWithAlt(lt.milliseconds, personalBest, fastestLapTime)
								.color,
							timing: lt
						};
					})
				});
			});
		}

		return data;
	}, [lapByLapData]);
}
