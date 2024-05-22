import {Serie} from '@nivo/line';
import {MutableSerie, MutableSerieDataKey} from './types';

export type * from './types';

export {default as ChartSwitcher} from './ChartSwitcher';
export {default as LineChartByTeam} from './LineChartByTeam';
export type {LineChartByTeamProps} from './LineChartByTeam';

export const PositionGridYValues = (max: number = 20) => (
	[...([1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].filter(v => v < max)), max]
);

export const mapLineSerieValues = (xKey: MutableSerieDataKey, yKey: MutableSerieDataKey) => {
	return <T extends Serie = MutableSerie>(series: T) => ({...series, data: series.data.map((data) => ({...data, x: data[xKey], y: data[yKey], series, data}))});
};

export const maxValue = <T extends Serie = MutableSerie>(serie: T, key: MutableSerieDataKey) => serie.data.map((d) => d[key]).reduce((prev, cur) => Number(cur) > Number(prev) ? cur : prev, 0) || 20;