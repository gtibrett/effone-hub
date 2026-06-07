'use client';

import { useMemo } from 'react';
import { Box } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import {
	ChartsAxisHighlight,
	ChartsDataProvider,
	ChartsGrid,
	ChartsSurface,
	ChartsTooltipContainer,
	ChartsXAxis,
	ChartsYAxis
} from '@mui/x-charts';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';
import { LineHighlightPlot, LinePlot, MarkPlot } from '@mui/x-charts/LineChart';

import { ChartsTooltipBody, EndLineLabels, useChartsTheme } from '@/components/ui/charts';

import type { ChartProps, StandingWithEntity } from './types';
import useChartData from './useChartData';

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export default function PointsChart({
	data,
	TooltipComponent,
	height
}: ChartProps & { height?: number }) {
	const chartData = useChartData(data, 'points');
	const { sx } = useChartsTheme();

	const { series, lookup, ticks, maxPoints } = useMemo(() => {
		const rounds = Math.max(...chartData.map(s => Math.max(...s.data.map(d => Number(d.x)))));
		const maxY = Math.max(
			...chartData.map(s => Math.max(...s.data.map(d => Number(d.y ?? 0))))
		);
		const lkup = new Map<string, Array<StandingWithEntity | undefined>>();
		const built: LineSeriesType[] = chartData.map(s => {
			const standings: Array<StandingWithEntity | undefined> = new Array(rounds).fill(
				undefined
			);
			const values: Array<number | null> = new Array(rounds).fill(null);
			s.data.forEach(d => {
				const i = Number(d.x) - 1;
				if (i >= 0 && i < rounds) {
					values[i] = d.y == null ? null : Number(d.y);
					const standing = (d as { data?: StandingWithEntity }).data;
					if (standing) {
						standings[i] = standing;
					}
				}
			});
			lkup.set(String(s.id), standings);
			return {
				type: 'line',
				id: String(s.id),
				label: s.entity.name,
				data: values,
				color: s.color,
				showMark: true,
				shape: 'circle',
				curve: 'linear',
				highlightScope: { fade: 'global', highlight: 'series' }
			};
		});
		return { series: built, lookup: lkup, ticks: range(rounds), maxPoints: maxY };
	}, [chartData]);

	function ItemTooltipContent() {
		const tt = useItemTooltip<'line'>();
		if (!tt) {
			return null;
		}
		const seriesId = String(tt.identifier.seriesId);
		const dataIndex = (tt.identifier as { dataIndex?: number }).dataIndex;
		if (dataIndex == null) {
			return null;
		}
		const standing = lookup.get(seriesId)?.[dataIndex];
		if (!standing) {
			return null;
		}
		const synthesized = {
			point: {
				data: {
					x: dataIndex + 1,
					y: standing.points,
					data: standing
				}
			}
		};
		return (
			<ChartsTooltipBody>
				<TooltipComponent {...synthesized} />
			</ChartsTooltipBody>
		);
	}

	if (!data.length || !ticks.length || !maxPoints) {
		return null;
	}

	return (
		<Box sx={{ width: '100%', height: height ?? '100%', ...sx }}>
			<ChartsDataProvider
				series={series}
				height={height}
				xAxis={[
					{
						id: 'x',
						data: ticks,
						scaleType: 'point',
						tickInterval: ticks,
						label: 'Round'
					}
				]}
				yAxis={[
					{
						id: 'y',
						scaleType: 'linear',
						min: 0,
						max: maxPoints,
						position: 'right',
						tickInterval: [0, maxPoints]
					}
				]}
				margin={{ top: 20, right: 168, bottom: 28, left: 16 }}
			>
				<ChartsSurface>
					<ChartsGrid vertical horizontal={false} />
					<LinePlot />
					<MarkPlot />
					<LineHighlightPlot />
					<ChartsAxisHighlight x="line" />
					<EndLineLabels series={series} xData={ticks} />
					<ChartsXAxis />
					<ChartsYAxis />
				</ChartsSurface>
				<ChartsTooltipContainer trigger="item">
					<ItemTooltipContent />
				</ChartsTooltipContainer>
			</ChartsDataProvider>
		</Box>
	);
}
