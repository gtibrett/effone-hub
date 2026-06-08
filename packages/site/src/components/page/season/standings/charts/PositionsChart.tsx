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

const MARGIN_TOP = 12;
const MARGIN_RIGHT = 48;
const MARGIN_BOTTOM = 28;
const MARGIN_LEFT = 16;

export default function PositionsChart({
	data,
	TooltipComponent,
	height,
	onLabelClick
}: ChartProps & { height?: number; onLabelClick?: (seriesId: string) => void }) {
	const chartData = useChartData(data, 'position');
	const { sx } = useChartsTheme();
	const [hovered, setHovered] = useState<string | null>(null);

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
				connectNulls: false,
				highlightScope: { fade: 'global', highlight: 'series' }
			};
		});
		const maxPos = Math.max(...chartData.flatMap(s => s.data.map(d => Number(d.y || 0))));
		return { series, xData, lookup, maxPos };
	}, [chartData]);

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
		return createItemTooltipSlot(ItemTooltipContent);
	}, [built, TooltipComponent]);

	if (!data.length || !built) {
		return null;
	}

	return (
		<Box sx={{ position: 'relative', width: '100%', height: height ?? '100%' }}>
			<LineChart
				height={height}
				series={built.series}
				highlightedItem={hovered ? { seriesId: hovered, type: 'line' } : null}
				onHighlightChange={item => setHovered(item ? String(item.seriesId) : null)}
				xAxis={[
					{
						data: built.xData,
						scaleType: 'point',
						tickInterval: built.xData
					}
				]}
				yAxis={[
					{
						scaleType: 'linear',
						min: 1,
						max: built.maxPos,
						reverse: true,
						position: 'right',
						tickInterval: Array.from({ length: built.maxPos }, (_, i) => i + 1)
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
					series={built.series}
					yMin={1}
					yMax={built.maxPos}
					yReversed
					height={height}
					marginTop={MARGIN_TOP}
					marginBottom={MARGIN_BOTTOM + 24}
					marginLeft={MARGIN_LEFT}
					marginRight={90}
					hoveredSeriesId={hovered}
					onHoverChange={setHovered}
					onClick={onLabelClick}
				/>
			) : null}
		</Box>
	);
}
