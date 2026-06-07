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
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';

import { ChartsTooltipBody, EndLineLabels, useChartsTheme } from '@/components/ui/charts';

import type { ChartProps, StandingWithEntity } from './types';
import useChartData from './useChartData';

export default function PositionsChart({
	data,
	TooltipComponent,
	height
}: ChartProps & { height?: number }) {
	const chartData = useChartData(data, 'position');
	const { sx } = useChartsTheme();

	const built = useMemo(() => {
		if (!chartData.length) {
			return null;
		}
		const rounds = Math.max(...chartData.map(s => Math.max(...s.data.map(d => Number(d.x)))));
		const xData = Array.from({ length: rounds }, (_, i) => i + 1);
		const lookup = new Map<string, Array<StandingWithEntity | undefined>>();
		const series: LineSeriesType[] = chartData.map(s => {
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
			const id = String(s.id);
			lookup.set(id, standings);
			return {
				type: 'line',
				id,
				label: s.entity.name,
				data: values,
				color: s.color,
				curve: 'monotoneX',
				showMark: false,
				shape: 'circle',
				connectNulls: false
			};
		});
		const maxPos = Math.max(...chartData.flatMap(s => s.data.map(d => Number(d.y || 0))));
		return { series, xData, lookup, maxPos };
	}, [chartData]);

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
		const standing = built.lookup.get(seriesId)?.[dataIndex];
		if (!standing) {
			return null;
		}
		return (
			<ChartsTooltipBody>
				<TooltipComponent serie={{ data: standing }} />
			</ChartsTooltipBody>
		);
	}

	if (!data.length || !built) {
		return null;
	}

	return (
		<Box sx={{ width: '100%', height: height ?? '100%', ...sx }}>
			<ChartsDataProvider
				series={built.series}
				height={height}
				xAxis={[
					{
						id: 'x',
						data: built.xData,
						scaleType: 'point',
						tickInterval: built.xData
					}
				]}
				yAxis={[
					{
						id: 'y',
						scaleType: 'linear',
						min: 1,
						max: built.maxPos,
						reverse: true,
						position: 'right',
						tickInterval: Array.from({ length: built.maxPos }, (_, i) => i + 1)
					}
				]}
				margin={{ top: 12, right: 168, bottom: 28, left: 16 }}
			>
				<ChartsSurface>
					<ChartsGrid vertical horizontal={false} />
					<LinePlot />
					<MarkPlot />
					<ChartsAxisHighlight x="line" />
					<EndLineLabels series={built.series} xData={built.xData} />
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
