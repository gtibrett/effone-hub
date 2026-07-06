'use client';

import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

import {
	BOTTOM_AXIS_HEIGHT,
	ChartsHoverTooltip,
	ChartsTooltipBody,
	LineHoverHitLayer,
	type LineHoverInfo,
	useChartsTheme
} from '@/components/ui/charts';
import type { TeamStandingData } from '@/hooks/data';

import type { HistoryProps } from './History';
import HistoryTooltip from './HistoryTooltip';
import useHistoryChartData, {
	getChartDataByAttribute,
	type HistoryChartData,
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
	const [hover, setHover] = useState<LineHoverInfo>(null);

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
				showMark: false,
				shape: 'circle',
				connectNulls: false,
				highlightScope: { fade: 'global', highlight: 'series' }
			};
		});
		return {
			series,
			xData,
			lookup,
			axisMax,
			axisMin: invert ? axisMax : min,
			axisHi: invert ? min : axisMax,
			maxYear
		};
	}, [historyChartData, dataKey, dataMaxKey, chartColors, invert, min, max]);

	const hoverSeries = useMemo(
		() =>
			(built?.series ?? []).map(s => ({
				id: String(s.id),
				data: (s.data ?? []) as (number | null)[]
			})),
		[built]
	);

	if (!historyChartData || !data || loading || !built) {
		return null;
	}

	const hoveredEntry = hover ? built.lookup.get(hover.seriesId)?.[hover.dataIndex] : undefined;
	const hoveredYear = hover ? built.xData[hover.dataIndex] : undefined;
	const decadeTicks = built.xData.filter(y => y % 10 === 0);

	return (
		<Box className="relative w-full h-full">
			<LineChart
				series={built.series}
				highlightedItem={hover ? { seriesId: hover.seriesId, type: 'line' } : null}
				disableLineItemHighlight
				axisHighlight={{ x: 'band' }}
				xAxis={[
					{
						data: built.xData,
						scaleType: 'linear',
						min: built.xData[0],
						max: built.xData[built.xData.length - 1],
						valueFormatter: v => String(v),
						position: 'bottom',
						height: BOTTOM_AXIS_HEIGHT,
						// Sub-decade histories (e.g. 2021–2026 entrants) have no decade years;
						// fall back to every year so the axis never goes unlabeled.
						tickInterval: decadeTicks.length ? decadeTicks : built.xData
					}
				]}
				yAxis={[
					{
						scaleType: 'linear',
						min: invert ? min - 1 : -1,
						max: built.axisMax + 1,
						reverse: invert,
						position: 'right',
						tickInterval: invert ? [built.axisMax, min] : [min, built.axisMax]
					}
				]}
				// left ≥ half a 4-digit tick label (~14px): the first tick sits on the
				// drawing-area edge and MUI clamps its label to twice the edge distance.
				margin={{ top: 8, left: 16, right: 0, bottom: 28 }}
				grid={{ horizontal: false, vertical: false }}
				sx={sx}
				slots={{ tooltip: () => null }}
				skipAnimation
				hideLegend
			>
				<LineHoverHitLayer series={hoverSeries} xValues={built.xData} onHover={setHover} />
			</LineChart>
			{hover && hoveredEntry ? (
				<ChartsHoverTooltip clientX={hover.clientX} clientY={hover.clientY}>
					<ChartsTooltipBody>
						<HistoryTooltip
							point={{
								data: {
									x: hoveredYear as number,
									xFormatted: String(hoveredYear),
									y: hoveredEntry[dataKey] as number | null | undefined,
									data: hoveredEntry
								}
							}}
						/>
					</ChartsTooltipBody>
				</ChartsHoverTooltip>
			) : null}
		</Box>
	);
}
