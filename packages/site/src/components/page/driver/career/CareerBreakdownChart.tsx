import { ResponsiveBar } from '@nivo/bar';

import { NivoTooltipFactory, useNivoTheme } from '@/components/ui/nivo';
import { capitalizeCamelCase } from '@/helpers';
import { RESULTS_COLORS, type ResultsBucket } from '@/lib/resultsColors';
import { DriverId } from '@/types';

import BreakdownTooltip from './BreakdownTooltip';
import useBreakdownData, { BreakdownDatum } from './useBreakdownData';

type CareerBreakdownChartProps = {
	driverId: DriverId;
	season?: number;
};

export type BreakdownMetric = ResultsBucket;
export const breakdownMetrics: BreakdownMetric[] = [
	'wins',
	'podiums',
	'inPoints',
	'outOfPoints',
	'DNFs'
];

const findRawKey = (percentageKey: string | number) =>
	String(percentageKey).replace('Percentage', '') as BreakdownMetric;

export default function CareerBreakdownChart({ driverId, season }: CareerBreakdownChartProps) {
	const nivoTheme = useNivoTheme();
	const chartData = (useBreakdownData(driverId) || []).filter(s => !season || s.year === season);
	// Reverse on a copy — `breakdownMetrics` is a module-level array, and
	// mutating it here re-orders the legend/keys across every render of any
	// component that imports it. Surfaces as bar fills swapping on hover.
	const keys = [...breakdownMetrics].reverse();
	const isSingleSeason = chartData?.length === 1;

	return (
		<ResponsiveBar<BreakdownDatum>
			theme={nivoTheme}
			layout={isSingleSeason ? 'horizontal' : 'vertical'}
			indexBy="year"
			keys={[...keys].map(k => `${k}Percentage`).reverse()}
			data={chartData}
			colors={({ id }) => RESULTS_COLORS[findRawKey(id)].background}
			enableLabel={isSingleSeason}
			label={({ id, data }) => {
				const key = findRawKey(id);
				return `${capitalizeCamelCase(key as string)}: ${data.raw[key]}`;
			}}
			labelTextColor={({ data: { id } }) => RESULTS_COLORS[findRawKey(id)].color}
			labelSkipWidth={55}
			enableGridX={false}
			enableGridY={false}
			padding={0.1}
			innerPadding={1.5}
			margin={{ top: 20, left: 10, right: 10, bottom: 40 }}
			axisLeft={null}
			axisRight={null}
			axisTop={null}
			axisBottom={
				!isSingleSeason
					? { tickSize: 0, tickPadding: 10 }
					: {
							tickSize: 0,
							tickPadding: 0,
							legend: season,
							legendPosition: 'middle',
							legendOffset: 20,
							renderTick: () => <></>
						}
			}
			tooltip={NivoTooltipFactory(BreakdownTooltip)}
		/>
	);
}
