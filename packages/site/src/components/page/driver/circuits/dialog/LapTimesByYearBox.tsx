'use client';

import { useMemo } from 'react';
import { Alert, Card, Skeleton } from '@mui/material';
import {
	ChartDataProvider,
	ChartsAxisHighlight,
	ChartsOverlay,
	ChartsSurface,
	ChartsTooltip,
	ChartsXAxis,
	ChartsYAxis,
	ScatterPlot
} from '@mui/x-charts';
import { useXScale, useYScale } from '@mui/x-charts/hooks';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { ChartsTooltipBody, useChartsTheme } from '@/components/ui/charts';
import { alpha } from '@/components/ui/colors';
import { getTimeStringFromDate } from '@/helpers';

import LapTimesByYearTooltip, { type LapTimesYearStats } from './LapTimesByYearTooltip';
import { mapLapTimeDataToBoxChart } from './mapLapTimeDataToSwarmChart';
import { CircuitDialogData } from './types';
import useGetTeamColorsByYear from './useGetTeamColorsByYear';

type LapTimesChartProps = SimpleApolloResult<CircuitDialogData>;

type YearSummary = LapTimesYearStats & { year: string; color: string };

function quantile(sorted: number[], q: number): number {
	if (!sorted.length) {
		return 0;
	}
	const pos = (sorted.length - 1) * q;
	const lo = Math.floor(pos);
	const hi = Math.ceil(pos);
	if (lo === hi) {
		return sorted[lo];
	}
	return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

function summarize(values: number[]): LapTimesYearStats {
	const sorted = [...values].sort((a, b) => a - b);
	return {
		min: sorted[0],
		max: sorted[sorted.length - 1],
		p10: quantile(sorted, 0.1),
		p25: quantile(sorted, 0.25),
		p50: quantile(sorted, 0.5),
		p75: quantile(sorted, 0.75),
		p90: quantile(sorted, 0.9)
	};
}

type IqrOverlayProps = { summaries: YearSummary[] };
// Composition-mode layer: draws q1-q3 rect, median line, and 10-90 percentile
// whiskers per year, positioned via the active scales.
function IqrOverlay({ summaries }: IqrOverlayProps) {
	const xScale = useXScale<'band'>();
	const yScale = useYScale<'linear'>();
	if (!xScale || !yScale) {
		return null;
	}
	const bandWidth =
		typeof (xScale as any).bandwidth === 'function' ? (xScale as any).bandwidth() : 32;
	const halfWidth = bandWidth * 0.35;
	return (
		<g>
			{summaries.map(s => {
				const cx = (xScale(s.year) as number) + bandWidth / 2;
				if (!Number.isFinite(cx)) {
					return null;
				}
				const yQ1 = yScale(s.p25) as number;
				const yQ3 = yScale(s.p75) as number;
				const yMedian = yScale(s.p50) as number;
				const yP10 = yScale(s.p10) as number;
				const yP90 = yScale(s.p90) as number;
				const fill = alpha(s.color, 0.25);
				return (
					<g key={s.year}>
						<line
							x1={cx}
							x2={cx}
							y1={yP90}
							y2={yP10}
							stroke={s.color}
							strokeWidth={1}
						/>
						<line
							x1={cx - halfWidth / 2}
							x2={cx + halfWidth / 2}
							y1={yP10}
							y2={yP10}
							stroke={s.color}
							strokeWidth={1}
						/>
						<line
							x1={cx - halfWidth / 2}
							x2={cx + halfWidth / 2}
							y1={yP90}
							y2={yP90}
							stroke={s.color}
							strokeWidth={1}
						/>
						<rect
							x={cx - halfWidth}
							y={yQ3}
							width={halfWidth * 2}
							height={yQ1 - yQ3}
							fill={fill}
							stroke={s.color}
							strokeWidth={1}
						/>
						<line
							x1={cx - halfWidth}
							x2={cx + halfWidth}
							y1={yMedian}
							y2={yMedian}
							stroke={s.color}
							strokeWidth={3}
						/>
					</g>
				);
			})}
		</g>
	);
}

export default function LapTimesByYearBox({ data }: LapTimesChartProps) {
	const colorsByYear = useGetTeamColorsByYear()(data?.driver.seasonEntrantDrivers ?? []);
	const { sx } = useChartsTheme();

	const built = useMemo(() => {
		if (!data) {
			return null;
		}
		const rows = mapLapTimeDataToBoxChart(data);
		if (!rows.length) {
			return null;
		}
		const groups = new Map<string, number[]>();
		rows.forEach(({ year, milliseconds }) => {
			const key = String(year);
			if (!groups.has(key)) {
				groups.set(key, []);
			}
			groups.get(key)?.push(milliseconds);
		});
		const years = Array.from(groups.keys()).sort();
		const summaries: YearSummary[] = years.map(year => {
			const stats = summarize(groups.get(year) || []);
			return {
				...stats,
				year,
				color: colorsByYear[Number(year)] || 'currentColor'
			};
		});
		const lookup = new Map<string, YearSummary>(summaries.map(s => [s.year, s]));
		const min = Math.min(...summaries.map(s => s.min));
		const max = Math.max(...summaries.map(s => s.max));
		// Scatter cloud of raw points so the box overlay sits on top of the
		// data it summarizes. Sample for very dense years to keep the SVG light.
		const seriesData: Array<{ id: string; x: string; y: number }> = [];
		years.forEach(year => {
			const vals = groups.get(year) || [];
			const step = Math.max(1, Math.floor(vals.length / 200));
			for (let i = 0; i < vals.length; i += step) {
				seriesData.push({ id: `${year}-${i}`, x: year, y: vals[i] });
			}
		});
		return { years, summaries, lookup, min, max, seriesData };
	}, [data, colorsByYear]);

	if (!data) {
		return <Skeleton variant="rectangular" height={400} />;
	}
	if (!built) {
		return (
			<Alert variant="outlined" severity="info">
				Lap Time Data Not Available
			</Alert>
		);
	}

	function AxisTooltip(props: { axisValue?: string | number | Date }) {
		const yr = props?.axisValue == null ? '' : String(props.axisValue);
		const stats = built?.lookup.get(yr);
		if (!stats) {
			return null;
		}
		return (
			<ChartsTooltipBody>
				<LapTimesByYearTooltip label={yr} stats={stats} />
			</ChartsTooltipBody>
		);
	}

	return (
		<Card variant="outlined" className="h-[60vh] w-full" aria-hidden>
			<ChartDataProvider
				series={[
					{
						id: 'lap-cloud',
						type: 'scatter',
						label: 'Lap times',
						markerSize: 1.5,
						color: 'rgba(255,255,255,0)',
						data: built.seriesData.map((p, i) => ({
							id: p.id,
							x: built.years.indexOf(p.x),
							y: p.y
						}))
					}
				]}
				xAxis={[
					{
						id: 'year-band',
						data: built.years,
						scaleType: 'band'
					}
				]}
				yAxis={[
					{
						id: 'ms',
						min: built.min,
						max: built.max,
						valueFormatter: v => getTimeStringFromDate(new Date(Number(v)))
					}
				]}
				margin={{ top: 16, right: 16, bottom: 40, left: 72 }}
				sx={sx}
			>
				<ChartsSurface>
					<ChartsXAxis axisId="year-band" />
					<ChartsYAxis axisId="ms" />
					<IqrOverlay summaries={built.summaries} />
					<ScatterPlot />
					<ChartsAxisHighlight x="band" />
					<ChartsOverlay />
				</ChartsSurface>
				<ChartsTooltip trigger="axis" slots={{ axisContent: AxisTooltip }} />
			</ChartDataProvider>
		</Card>
	);
}
