'use client';

import { useMemo, useState } from 'react';
import type { LineSeriesType } from '@mui/x-charts';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';
import { LineChart } from '@mui/x-charts/LineChart';

import { ChartsTooltipBody, createItemTooltipSlot, useChartsTheme } from '@/components/ui/charts';
import { alpha } from '@/components/ui/colors';

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
	const [highlight, setHighlight] = useState<string | undefined>();

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
			const fade = highlight && s.id !== highlight;
			return {
				type: 'line',
				id: String(s.id),
				label: s.entity.name,
				data: values,
				color: fade ? alpha(s.color, 0.25) : s.color,
				showMark: true,
				shape: 'circle',
				curve: 'linear'
			};
		});
		return { series: built, lookup: lkup, ticks: range(rounds), maxPoints: maxY };
	}, [chartData, highlight]);

	const TooltipSlot = useMemo(() => {
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
		return createItemTooltipSlot(ItemTooltipContent);
	}, [lookup, TooltipComponent]);

	if (!data.length || !ticks.length || !maxPoints) {
		return null;
	}

	return (
		<LineChart
			height={height}
			series={series}
			xAxis={[
				{
					data: ticks,
					scaleType: 'point',
					tickInterval: ticks,
					label: 'Round'
				}
			]}
			yAxis={[
				{
					min: 0,
					max: maxPoints,
					position: 'right',
					tickInterval: [0, maxPoints]
				}
			]}
			margin={{ top: 20, right: 48, bottom: 28, left: 16 }}
			grid={{ vertical: true, horizontal: false }}
			sx={sx}
			slots={{ tooltip: TooltipSlot }}
			onLineClick={(_e, params) => {
				const id = String(params.seriesId);
				setHighlight(highlight === id ? undefined : id);
			}}
			onMarkClick={(_e, params) => {
				const id = String(params.seriesId);
				setHighlight(highlight === id ? undefined : id);
			}}
			skipAnimation={false}
		/>
	);
}
