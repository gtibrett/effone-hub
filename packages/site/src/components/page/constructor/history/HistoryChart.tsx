'use client';

import { useMemo } from 'react';
import type { LineSeriesType } from '@mui/x-charts';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';
import { LineChart } from '@mui/x-charts/LineChart';

import { ChartsTooltipBody, createItemTooltipSlot, useChartsTheme } from '@/components/ui/charts';
import { TeamStandingData } from '@/hooks/data';

import { HistoryProps } from './History';
import HistoryTooltip from './HistoryTooltip';
import useHistoryChartData, {
	getChartDataByAttribute,
	HistoryChartData,
	useHistoryChartColors
} from './useHistoryChartData';

type HistoryChartProps = HistoryProps & {
	dataKey: keyof TeamStandingData;
	dataMaxKey: keyof Omit<HistoryChartData, 'standingsByTeam' | 'minYear' | 'maxYear'>;
	invert?: boolean;
	min?: number;
	max?: number;
};

type SeriesEntry = { id: string; name: string; [k: string]: unknown };

export default function HistoryChart({
	data,
	loading,
	dataKey,
	dataMaxKey,
	invert = false,
	min = 0,
	max = 0
}: HistoryChartProps) {
	const historyChartData = useHistoryChartData(data);
	const chartColors = useHistoryChartColors(historyChartData);
	const { sx } = useChartsTheme();

	const built = useMemo(() => {
		if (!historyChartData) {
			return null;
		}
		const { minYear, maxYear, [dataMaxKey]: dataMax } = historyChartData;
		const rawSeries = getChartDataByAttribute(dataKey, historyChartData);
		const axisMax = Math.max(max, dataMax as number);
		const xData: number[] = [];
		for (let y = minYear; y <= maxYear; y++) {
			xData.push(y);
		}
		const lookup = new Map<string, Array<SeriesEntry | undefined>>();
		const series: LineSeriesType[] = rawSeries.map((s, idx) => {
			const values: Array<number | null> = new Array(xData.length).fill(null);
			const entries: Array<SeriesEntry | undefined> = new Array(xData.length).fill(undefined);
			s.data?.forEach(d => {
				const xVal = Number((d as { x?: number }).x);
				const i = xVal - minYear;
				if (i >= 0 && i < xData.length) {
					const y = (d as { y?: number | null }).y;
					values[i] = y == null ? null : Number(y);
					const datum = (d as { data?: SeriesEntry }).data;
					if (datum) {
						entries[i] = datum;
					}
				}
			});
			lookup.set(String(s.id), entries);
			return {
				type: 'line',
				id: String(s.id),
				label: String(s.id),
				data: values,
				color: chartColors[idx] || undefined,
				curve: 'linear',
				showMark: true,
				shape: 'circle',
				connectNulls: false
			};
		});
		return {
			series,
			xData,
			lookup,
			axisMax,
			axisMin: invert ? axisMax : min,
			axisHi: invert ? min : axisMax
		};
	}, [historyChartData, dataKey, dataMaxKey, chartColors, invert, min, max]);

	const TooltipSlot = useMemo(() => {
		function ItemTooltipContent() {
			const tt = useItemTooltip<'line'>();
			if (!tt || !built) {
				return null;
			}
			const seriesId = String(tt.identifier.seriesId);
			const dataIndex = (tt.identifier as { dataIndex?: number }).dataIndex;
			if (dataIndex == null) {
				return null;
			}
			const entry = built.lookup.get(seriesId)?.[dataIndex];
			if (!entry) {
				return null;
			}
			const x = built.xData[dataIndex];
			const synthesized = {
				point: {
					data: {
						x,
						xFormatted: String(x),
						y: entry[dataKey],
						data: entry
					}
				}
			} as unknown as Parameters<typeof HistoryTooltip>[0];
			return (
				<ChartsTooltipBody>
					<HistoryTooltip {...synthesized} />
				</ChartsTooltipBody>
			);
		}
		return createItemTooltipSlot(ItemTooltipContent);
	}, [built, dataKey]);

	if (!historyChartData || !data || loading || !built) {
		return null;
	}

	return (
		<LineChart
			series={built.series}
			xAxis={[
				{
					data: built.xData,
					scaleType: 'linear',
					min: built.xData[0],
					max: built.xData[built.xData.length - 1],
					tickInterval: built.xData,
					valueFormatter: v => String(v)
				}
			]}
			yAxis={[
				{
					min: invert ? min : 0,
					max: built.axisMax,
					reverse: invert,
					position: 'right',
					tickInterval: invert ? [built.axisMax, min] : [min, built.axisMax]
				}
			]}
			margin={{ top: 25, left: 20, right: 28, bottom: 36 }}
			grid={{ horizontal: false, vertical: false }}
			sx={sx}
			slots={{ tooltip: TooltipSlot }}
			skipAnimation={false}
		/>
	);
}
