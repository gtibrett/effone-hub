'use client';

import { useMemo } from 'react';
import type { BarSeriesType } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';

import { ChartsTooltipBody, createItemTooltipSlot, useChartsTheme } from '@/components/ui/charts';
import { capitalizeCamelCase } from '@/helpers';
import { RESULTS_COLORS, type ResultsBucket } from '@/lib/resultsColors';
import { DriverId } from '@/types';

import BreakdownTooltip from './BreakdownTooltip';
import useBreakdownData, { type BreakdownDatum } from './useBreakdownData';

type CareerBreakdownChartProps = {
	driverId: DriverId;
	season?: number;
};

export type BreakdownMetric = ResultsBucket;
export const breakdownMetrics = [
	'wins',
	'podiums',
	'inPoints',
	'outOfPoints',
	'DNFs'
] as const satisfies readonly BreakdownMetric[];

export default function CareerBreakdownChart({ driverId, season }: CareerBreakdownChartProps) {
	const { sx } = useChartsTheme();
	const chartData = (useBreakdownData(driverId) || []).filter(s => !season || s.year === season);
	const isSingleSeason = chartData.length === 1;

	const { series, xAxisData, lookup } = useMemo(() => {
		const years = chartData.map(d => d.year);
		const lkup = new Map<number, BreakdownDatum>(chartData.map(d => [d.year, d]));
		// Stack order matches nivo's keys.reverse(): DNFs first (bottom), then outOfPoints, inPoints, podiums, wins on top
		const ordered = [...breakdownMetrics].reverse();
		const built: BarSeriesType[] = ordered.map(metric => {
			const colors = RESULTS_COLORS[metric];
			return {
				id: metric,
				label: capitalizeCamelCase(String(metric)),
				type: 'bar',
				data: chartData.map(d =>
					Number(d[`${metric}Percentage` as keyof BreakdownDatum] ?? 0)
				),
				color: colors.background,
				stack: 'breakdown'
			};
		});
		return { series: built, xAxisData: years, lookup: lkup };
	}, [chartData]);

	if (!chartData.length) {
		return null;
	}

	const TooltipSlot = useMemo(() => {
		function ItemTooltipContent() {
			const tt = useItemTooltip<'bar'>();
			if (!tt) {
				return null;
			}
			const dataIndex = (tt.identifier as { dataIndex?: number }).dataIndex;
			if (dataIndex == null) {
				return null;
			}
			const year = xAxisData[dataIndex];
			const datum = lookup.get(year);
			if (!datum) {
				return null;
			}
			return (
				<ChartsTooltipBody>
					<BreakdownTooltip datum={datum} />
				</ChartsTooltipBody>
			);
		}
		return createItemTooltipSlot(ItemTooltipContent);
	}, [xAxisData, lookup]);

	return (
		<BarChart
			height={isSingleSeason ? 64 : undefined}
			layout={isSingleSeason ? 'horizontal' : 'vertical'}
			series={series}
			xAxis={
				isSingleSeason
					? [{ position: 'none' }]
					: [
							{
								data: xAxisData,
								scaleType: 'band',
								tickLabelStyle: { fontSize: 11 }
							}
						]
			}
			yAxis={[{ position: 'none' }]}
			margin={{ top: 20, left: 10, right: 10, bottom: isSingleSeason ? 8 : 40 }}
			grid={{ horizontal: false, vertical: false }}
			borderRadius={1}
			sx={sx}
			slots={{ tooltip: TooltipSlot }}
			skipAnimation={false}
		/>
	);
}
