'use client';

import { useMemo } from 'react';
import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import type { BarSeriesType } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';

import { ChartsTooltipBody, createItemTooltipSlot, useChartsTheme } from '@/components/ui/charts';

import { PitStopTableRow } from './PitStops';
import PitStopTooltip from './PitStopTooltip';

type PitStopsChartProps = {
	pitStops: PitStopTableRow[] | undefined;
	maxStops: number;
};

export type PitStopSerie = {
	driverId: string;
	code: string;
	color: string;
	[stop: string]: number | string;
};

export default function PitStopsChart({ maxStops, pitStops }: PitStopsChartProps) {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
	const { sx } = useChartsTheme();

	const built = useMemo(() => {
		if (!pitStops?.length) {
			return null;
		}
		const stops: string[] = Array.from({ length: maxStops }, (_, i) => String(i + 1));
		const drivers: PitStopSerie[] = pitStops.map(p => {
			const row: PitStopSerie = {
				driverId: p.driverId,
				code: p.code || '',
				color: p.color || theme.palette.primary.main
			};
			p.stops.forEach(s => {
				if (s.timeMillis) {
					row[String(s.stop)] = s.timeMillis;
				}
			});
			return row;
		});
		const codes = drivers.map(d => d.code);
		const colors = drivers.map(d => d.color);

		const series: BarSeriesType[] = stops.map(stopNum => ({
			id: stopNum,
			label: `Stop ${stopNum}`,
			type: 'bar',
			data: drivers.map(d => (typeof d[stopNum] === 'number' ? (d[stopNum] as number) : null))
		}));

		return { series, codes, colors, drivers, stops };
	}, [pitStops, maxStops, theme.palette.primary.main]);

	if (!pitStops) {
		return <Skeleton variant="rectangular" height={isSmall ? 400 : 150} />;
	}
	if (!built) {
		return null;
	}

	const TooltipSlot = useMemo(() => {
		function ItemTooltipContent() {
			const tt = useItemTooltip<'bar'>();
			if (!tt || !built) {
				return null;
			}
			const seriesId = String(tt.identifier.seriesId);
			const dataIndex = (tt.identifier as { dataIndex?: number }).dataIndex;
			if (dataIndex == null) {
				return null;
			}
			const driver = built.drivers[dataIndex];
			if (!driver) {
				return null;
			}
			const value = driver[seriesId];
			if (typeof value !== 'number') {
				return null;
			}
			return (
				<ChartsTooltipBody>
					<PitStopTooltip value={value} id={seriesId} data={driver} />
				</ChartsTooltipBody>
			);
		}
		return createItemTooltipSlot(ItemTooltipContent);
	}, [built]);

	const axisConfig = {
		data: built.codes,
		scaleType: 'band' as const,
		colorMap: {
			type: 'ordinal' as const,
			values: built.codes,
			colors: built.colors
		}
	};

	return (
		<Box className="mb-4" style={{ height: isSmall ? 400 : 150 }} aria-hidden>
			<BarChart
				layout={isSmall ? 'horizontal' : 'vertical'}
				series={built.series}
				xAxis={isSmall ? [{ position: 'none' }] : [axisConfig]}
				yAxis={isSmall ? [axisConfig] : [{ position: 'none' }]}
				margin={{
					top: 16,
					right: 16,
					bottom: isSmall ? 16 : 32,
					left: isSmall ? 44 : 16
				}}
				grid={{ horizontal: false, vertical: false }}
				borderRadius={2}
				slots={{ tooltip: TooltipSlot }}
				sx={sx}
				skipAnimation={false}
			/>
		</Box>
	);
}
