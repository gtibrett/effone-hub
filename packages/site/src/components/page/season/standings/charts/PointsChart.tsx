'use client';

import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

import {
	ChartsTooltipBody,
	LineHoverHitLayer,
	type LineHoverInfo,
	useChartsTheme
} from '@/components/ui/charts';

import type { ChartProps, StandingWithEntity } from './types';
import useChartData from './useChartData';

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

const MARGIN_TOP = 12;
const MARGIN_RIGHT = 12;
const MARGIN_BOTTOM = 12;
const MARGIN_LEFT = 12;

// `onLabelClick` is part of the shared standings-chart contract (wired in
// PositionsChart); PointsChart has no end-label surface, so it accepts but does
// not consume it. Kept in the type for caller parity.
export default function PointsChart({
	data,
	TooltipComponent,
	height
}: ChartProps & { height?: number; onLabelClick?: (seriesId: string) => void }) {
	const chartData = useChartData(data, 'points');
	const { sx } = useChartsTheme();
	const [hover, setHover] = useState<LineHoverInfo>(null);

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
				curve: 'bumpX',
				showMark: false,
				connectNulls: false,
				highlightScope: { fade: 'global', highlight: 'series' }
			};
		});
		return { series: built, lookup: lkup, ticks: range(rounds), maxPoints: maxY };
	}, [chartData]);

	const hoverSeries = useMemo(
		() => series.map(s => ({ id: String(s.id), data: (s.data ?? []) as (number | null)[] })),
		[series]
	);

	if (!data.length || !ticks.length || !maxPoints) {
		return null;
	}

	const hoveredStanding = hover ? lookup.get(hover.seriesId)?.[hover.dataIndex] : undefined;

	return (
		<Box sx={{ position: 'relative', width: '100%', height: height ?? '100%' }}>
			<LineChart
				height={height}
				series={series}
				highlightedItem={hover ? { seriesId: hover.seriesId, type: 'line' } : null}
				disableLineItemHighlight
				axisHighlight={{ x: 'none' }}
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
				slots={{ tooltip: () => null }}
				skipAnimation={false}
			>
				<LineHoverHitLayer series={hoverSeries} xValues={ticks} onHover={setHover} />
			</LineChart>
			{hover && hoveredStanding ? (
				<Box
					sx={{
						position: 'absolute',
						left: `${hover.left + 12}px`,
						top: `${hover.top + 12}px`,
						pointerEvents: 'none',
						zIndex: 5
					}}
				>
					<ChartsTooltipBody>
						<TooltipComponent
							point={{
								data: {
									x: hover.dataIndex + 1,
									y: hoveredStanding.points,
									data: hoveredStanding
								}
							}}
						/>
					</ChartsTooltipBody>
				</Box>
			) : null}
		</Box>
	);
}
