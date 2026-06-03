'use client';

import { useMemo } from 'react';
import type { LineSeriesType } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

import { ChartsTooltipBody, useChartsTheme } from '@/components/ui/charts';

import type { ChartProps, StandingWithEntity } from './types';
import useChartData from './useChartData';

export default function PositionsChart({ data, TooltipComponent }: ChartProps) {
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
				id,
				label: s.entity.name,
				data: values,
				color: s.color,
				curve: 'monotoneX',
				showMark: false,
				connectNulls: false
			};
		});
		const maxPos = Math.max(...chartData.flatMap(s => s.data.map(d => Number(d.y || 0))));
		return { series, xData, lookup, maxPos };
	}, [chartData]);

	if (!data.length || !built) {
		return null;
	}

	function ItemTooltip(props: { itemData?: { seriesId?: string; dataIndex?: number } }) {
		const itemData = props?.itemData;
		if (!itemData?.seriesId || itemData.dataIndex == null || !built) {
			return null;
		}
		const standing = built.lookup.get(itemData.seriesId)?.[itemData.dataIndex];
		if (!standing) {
			return null;
		}
		return (
			<ChartsTooltipBody>
				<TooltipComponent serie={{ data: standing }} />
			</ChartsTooltipBody>
		);
	}

	return (
		<LineChart
			series={built.series}
			xAxis={[
				{
					data: built.xData,
					scaleType: 'point',
					tickInterval: built.xData
				}
			]}
			yAxis={[
				{
					min: 1,
					max: built.maxPos,
					reverse: true,
					position: 'right',
					tickInterval: 'auto'
				}
			]}
			margin={{ top: 12, right: 116, bottom: 28, left: 16 }}
			grid={{ vertical: true, horizontal: false }}
			slotProps={{
				legend: {
					direction: 'vertical',
					position: { vertical: 'middle', horizontal: 'end' }
				},
				tooltip: { trigger: 'item' }
			}}
			slots={{ itemContent: ItemTooltip }}
			sx={sx}
			skipAnimation={false}
		/>
	);
}
