'use client';

import { useMemo } from 'react';
import { Alert, Box, Skeleton } from '@mui/material';
import type { ScatterSeriesType } from '@mui/x-charts';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { useChartsTheme } from '@/components/ui/charts';

import { type SwarmData, useMapLapTimeDataToSwarmChart } from './mapLapTimeDataToSwarmChart';
import type { CircuitDialogData } from './types';

type LapTimesChartProps = SimpleApolloResult<CircuitDialogData>;

// Deterministic per-id jitter so the swarm geometry is stable across renders
// (Date.now / Math.random would re-place points each frame).
function hashedJitter(id: string): number {
	let h = 0;
	for (let i = 0; i < id.length; i++) {
		h = (h << 5) - h + id.charCodeAt(i);
		h |= 0;
	}
	return ((h % 1000) / 1000 - 0.5) * 0.7;
}

export default function LapTimesByYearSwarm({ data, loading }: LapTimesChartProps) {
	const mapLapTimeDataToSwarmChart = useMapLapTimeDataToSwarmChart();
	const { sx } = useChartsTheme();

	const built = useMemo(() => {
		if (!data) {
			return null;
		}
		const chartData = mapLapTimeDataToSwarmChart(data).filter(d => d.deviations < 3);
		if (!chartData.length) {
			return null;
		}
		const min = Math.min(...chartData.map(d => d.milliseconds));
		const max = Math.max(...chartData.map(d => d.milliseconds));
		const byYear = new Map<string, SwarmData[]>();
		chartData.forEach(d => {
			const yr = String(d.group);
			if (!byYear.has(yr)) {
				byYear.set(yr, []);
			}
			byYear.get(yr)?.push(d);
		});
		const years = Array.from(byYear.keys()).sort();
		const series: ScatterSeriesType[] = years.map(year => {
			const points = byYear.get(year) || [];
			return {
				id: year,
				type: 'scatter',
				label: year,
				color: points[0]?.color || undefined,
				markerSize: 4,
				data: points.map(p => ({
					id: p.id,
					x: Number(year) + hashedJitter(p.id),
					y: p.milliseconds
				}))
			};
		});
		return { series, min, max, years };
	}, [data, mapLapTimeDataToSwarmChart]);

	if (!data || loading) {
		return <Skeleton variant="rectangular" height={400} />;
	}
	if (!built) {
		return (
			<Alert variant="outlined" severity="info">
				Lap Time Data Not Available
			</Alert>
		);
	}

	const numericYears = built.years.map(y => Number(y));

	return (
		<Box className="h-[60vh] w-full" aria-hidden>
			<ScatterChart
				series={built.series}
				xAxis={[
					{
						min: Math.min(...numericYears) - 0.5,
						max: Math.max(...numericYears) + 0.5,
						tickInterval: numericYears,
						valueFormatter: (v: unknown) =>
							numericYears.includes(Number(v)) ? String(Math.round(Number(v))) : ''
					}
				]}
				yAxis={[
					{
						min: built.min,
						max: built.max,
						position: 'none'
					}
				]}
				margin={{ top: 10, right: 10, bottom: 80, left: 10 }}
				grid={{ horizontal: false, vertical: false }}
				sx={sx}
				disableAxisListener
				skipAnimation
				slotProps={{ tooltip: { trigger: 'none' } }}
			/>
		</Box>
	);
}
