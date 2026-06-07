'use client';

import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';
import { LineChart } from '@mui/x-charts/LineChart';

import {
	ChartsTooltipBody,
	createItemTooltipSlot,
	EndLineLabelsOverlay,
	useChartsTheme
} from '@/components/ui/charts';

import type { ChartProps, StandingWithEntity } from './types';
import useChartData from './useChartData';

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

const MARGIN_TOP = 20;
const MARGIN_RIGHT = 168;
const MARGIN_BOTTOM = 28;
const MARGIN_LEFT = 16;

export default function PointsChart({
	data,
	TooltipComponent,
	height,
	onLabelClick
}: ChartProps & { height?: number; onLabelClick?: (seriesId: string) => void }) {
	const chartData = useChartData(data, 'points');
	const { sx } = useChartsTheme();
	const [hovered, setHovered] = useState<string | null>(null);

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
		<Box sx={{ position: 'relative', width: '100%', height: height ?? '100%' }}>
			<LineChart
				height={height}
				series={series}
				highlightedItem={hovered ? { seriesId: hovered, type: 'line' } : null}
				onHighlightChange={item => setHovered(item ? String(item.seriesId) : null)}
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
						scaleType: 'linear',
						min: 0,
						max: maxPoints,
						position: 'right',
						tickInterval: [0, maxPoints]
					}
				]}
				margin={{
					top: MARGIN_TOP,
					right: MARGIN_RIGHT,
					bottom: MARGIN_BOTTOM,
					left: MARGIN_LEFT
				}}
				grid={{ vertical: true, horizontal: false }}
				hideLegend
				sx={sx}
				slots={{ tooltip: TooltipSlot }}
				skipAnimation={false}
			/>
			{height ? (
				<EndLineLabelsOverlay
					series={series}
					yMin={0}
					yMax={maxPoints}
					height={height}
					marginTop={MARGIN_TOP}
					marginBottom={MARGIN_BOTTOM}
					marginLeft={MARGIN_LEFT}
					marginRight={MARGIN_RIGHT}
					hoveredSeriesId={hovered}
					onHoverChange={setHovered}
					onClick={onLabelClick}
				/>
			) : null}
		</Box>
	);
}
