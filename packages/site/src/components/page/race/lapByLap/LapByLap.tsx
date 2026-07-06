'use client';

import { useMemo, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

import {
	BOTTOM_AXIS_HEIGHT,
	ChartsHoverTooltip,
	ChartsTooltipBody,
	EndLineLabelsOverlay,
	LineHoverHitLayer,
	type LineHoverInfo,
	useChartsTheme
} from '@/components/ui/charts';
import type { Maybe } from '@/gql/graphql';
import type { DriverId } from '@/types';

import LapByLapTooltip from './LapByLapTooltip';
import useLapByLapChartData, { type LapByLapData } from './useLapByLapChartData';

export type LapByLapProps = {
	lapByLapData: LapByLapData;
};

type LapChartDatum = {
	x: number;
	y: number | null;
};

export type LapChartSeries = {
	id: DriverId;
	color?: string;
	driverId: DriverId;
	name: Maybe<string> | undefined;
	position: Maybe<number> | undefined;
	data: LapChartDatum[];
};

// ≥ tick-label height: left-positioned axis labels get vertically clamped to
// their distance from the top bound (MUI shortenLabels), so a tight top margin
// blanks the "1" tick.
const MARGIN_TOP = 20;
const MARGIN_RIGHT = 90;
const MARGIN_BOTTOM = 28;
const MARGIN_LEFT = 8;

const getTicks = (laps: number) => {
	const ticks = [1];
	for (let i = 1; i < laps; i++) {
		if (i % 10 === 0) {
			ticks.push(i);
		}
	}
	return [...ticks, laps];
};

export function LapByLap({ lapByLapData }: LapByLapProps) {
	const data = useLapByLapChartData(lapByLapData);
	const { loading, totalLaps } = lapByLapData;
	const { sx } = useChartsTheme();
	const height = data.length * 20;
	const [hover, setHover] = useState<LineHoverInfo>(null);
	const [labelHover, setLabelHover] = useState<string | null>(null);

	const built = useMemo(() => {
		if (!data.length || !totalLaps) {
			return null;
		}
		const laps = Array.from({ length: totalLaps }, (_, i) => i + 1);
		const driverByKey = new Map<string, LapChartSeries>();
		const series: LineSeriesType[] = data.map(s => {
			const values: Array<number | null> = laps.map(lap => {
				const point = s.data.find(d => Number(d.x) === lap);
				return point && point.y != null ? Number(point.y) : null;
			});
			const id = String(s.id);
			driverByKey.set(id, s);
			return {
				type: 'line',
				id,
				label: s.name || id,
				data: values,
				color: s.color || 'transparent',
				curve: 'monotoneX',
				showMark: false,
				connectNulls: false,
				highlightScope: { fade: 'global', highlight: 'series' }
			};
		});
		// Cover the full grid even if a driver never records a position.
		const maxPos = Math.max(
			data.length,
			...data.flatMap(s => s.data.map(d => Number(d.y || 0)))
		);
		return { series, laps, driverByKey, maxPos };
	}, [data, totalLaps]);

	const hoverSeries = useMemo(
		() =>
			(built?.series ?? []).map(s => ({
				id: String(s.id),
				data: (s.data ?? []) as (number | null)[]
			})),
		[built]
	);

	if (loading || !built) {
		return (
			<Box className="w-full" style={{ height }} aria-hidden>
				<Skeleton variant="rectangular" className="w-full" height="100%" />
			</Box>
		);
	}

	const activeSeriesId = hover?.seriesId ?? labelHover;
	const hoveredSerie = hover ? built.driverByKey.get(hover.seriesId) : undefined;

	return (
		<Box className="relative w-full" style={{ height }} aria-hidden>
			<LineChart
				height={height}
				series={built.series}
				highlightedItem={activeSeriesId ? { seriesId: activeSeriesId, type: 'line' } : null}
				disableLineItemHighlight
				axisHighlight={{ x: 'band' }}
				xAxis={[
					{
						data: built.laps,
						scaleType: 'point',
						height: BOTTOM_AXIS_HEIGHT,
						tickInterval: getTicks(totalLaps || 0)
					}
				]}
				yAxis={[
					{
						scaleType: 'linear',
						min: 1,
						max: built.maxPos + 1,
						reverse: true,
						position: 'left',
						tickInterval: Array.from({ length: built.maxPos }, (_, i) => i + 1).filter(
							v => v <= built.maxPos && (v <= 3 || v === built.maxPos || v % 5 === 0)
						)
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
				slots={{ tooltip: () => null }}
				sx={sx}
				skipAnimation={false}
			>
				<LineHoverHitLayer series={hoverSeries} xValues={built.laps} onHover={setHover} />
			</LineChart>
			<EndLineLabelsOverlay
				series={built.series}
				yMin={1}
				yMax={built.maxPos + 1}
				yReversed
				height={height}
				marginTop={MARGIN_TOP}
				marginBottom={MARGIN_BOTTOM + 24}
				marginLeft={MARGIN_LEFT}
				marginRight={MARGIN_RIGHT}
				hoveredSeriesId={activeSeriesId}
				onHoverChange={setLabelHover}
			/>
			{hover && hoveredSerie ? (
				<ChartsHoverTooltip clientX={hover.clientX} clientY={hover.clientY}>
					<ChartsTooltipBody>
						<LapByLapTooltip
							serie={{ data: { driverId: String(hoveredSerie.driverId) } }}
						/>
					</ChartsTooltipBody>
				</ChartsHoverTooltip>
			) : null}
		</Box>
	);
}
