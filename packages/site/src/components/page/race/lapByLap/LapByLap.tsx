'use client';

import { useMemo } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';
import { LineChart } from '@mui/x-charts/LineChart';

import { ChartsTooltipBody, createItemTooltipSlot, useChartsTheme } from '@/components/ui/charts';
import { Maybe } from '@/gql/graphql';
import { DriverId } from '@/types';

import LapByLapTooltip from './LapByLapTooltip';
import useLapByLapChartData, { useLapByLapData } from './useLapByLapChartData';

export type LapByLapProps = {
	season: number;
	round: number;
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
	data: LapChartDatum[];
};

const getTicks = (laps: number) => {
	const ticks = [1];
	for (let i = 1; i < laps; i++) {
		if (i % 10 === 0) {
			ticks.push(i);
		}
	}
	return [...ticks, laps];
};

function LapByLap({ season, round }: LapByLapProps) {
	const lapByLapData = useLapByLapData(season, round);
	const data = useLapByLapChartData(lapByLapData);
	const { loading, totalLaps } = lapByLapData;
	const { sx } = useChartsTheme();
	const height = data.length * 20;

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
				connectNulls: false
			};
		});
		const maxPos = Math.max(...data.flatMap(s => s.data.map(d => Number(d.y || 0))));
		return { series, laps, driverByKey, maxPos };
	}, [data, totalLaps]);

	const TooltipSlot = useMemo(() => {
		function ItemTooltipContent() {
			const tt = useItemTooltip<'line'>();
			if (!tt || !built) {
				return null;
			}
			const id = String(tt.identifier.seriesId);
			const serie = built.driverByKey.get(id);
			if (!serie) {
				return null;
			}
			return (
				<ChartsTooltipBody>
					<LapByLapTooltip serie={{ data: { driverId: String(serie.driverId) } }} />
				</ChartsTooltipBody>
			);
		}
		return createItemTooltipSlot(ItemTooltipContent);
	}, [built]);

	if (loading || !built) {
		return (
			<Box className="w-full" style={{ height }} aria-hidden>
				<Skeleton variant="rectangular" className="w-full" height="100%" />
			</Box>
		);
	}

	return (
		<Box className="w-full" style={{ height }} aria-hidden>
			<LineChart
				series={built.series}
				xAxis={[
					{
						data: built.laps,
						scaleType: 'point',
						tickInterval: getTicks(totalLaps || 0)
					}
				]}
				yAxis={[
					{
						scaleType: 'linear',
						min: 1,
						max: built.maxPos,
						reverse: true,
						position: 'right',
						tickInterval: 'auto'
					}
				]}
				margin={{ top: 16, right: 120, bottom: 42, left: 24 }}
				grid={{ vertical: true, horizontal: false }}
				slotProps={{
					legend: {
						direction: 'vertical',
						position: { vertical: 'middle', horizontal: 'end' }
					}
				}}
				slots={{ tooltip: TooltipSlot }}
				sx={sx}
				skipAnimation={false}
			/>
		</Box>
	);
}

export default LapByLap;
