import {useResultsColors} from '@effonehub/components';
import {DriverId} from '@effonehub/driver';
import BreakdownTooltip from '@effonehub/driver/career/BreakdownTooltip';
import {capitalizeCamelCase} from '@effonehub/helpers';
import {NivoTooltipFactory, useNivoTheme} from '@effonehub/ui-components';
import {ResponsiveBar} from '@nivo/bar';
import useBreakdownData, {BreakdownDatum} from './useBreakdownData';

type CareerBreakdownChartProps = {
	driverId: DriverId;
	season?: number;
};

export type BreakdownMetric = keyof ReturnType<typeof useResultsColors>;
export const breakdownMetrics: BreakdownMetric[] = ['wins', 'podiums', 'inPoints', 'outOfPoints', 'DNFs'];

const findRawKey = (percentageKey: BreakdownMetric) => String(percentageKey).replace('Percentage', '') as BreakdownMetric;

export default function CareerBreakdownChart({driverId, season}: CareerBreakdownChartProps) {
	const nivoTheme      = useNivoTheme();
	const colors         = useResultsColors();
	const chartData      = (useBreakdownData(driverId) || []).filter(s => !season || s.year === season);
	const keys           = breakdownMetrics.reverse();
	const isSingleSeason = chartData?.length === 1;
	
	return (
		<ResponsiveBar<BreakdownDatum>
			theme={nivoTheme}
			layout={isSingleSeason ? 'horizontal' : 'vertical'}
			animate={false}
			indexBy="year"
			keys={[...keys].map(k => `${k}Percentage`).reverse()}
			data={chartData}
			colors={({id}) => colors[findRawKey(id)].background}
			enableLabel={isSingleSeason}
			label={({id, data}) => {
				const key = findRawKey(id);
				return `${capitalizeCamelCase(key as string)}: ${data.raw[key]}`;
			}}
			labelTextColor={({data: {id}}) => colors[findRawKey(id)].color}
			labelSkipWidth={55}
			enableGridX={false}
			enableGridY={false}
			padding={0.1}
			innerPadding={1.5}
			margin={{top: 20, left: 10, right: 10, bottom: 40}}
			axisLeft={null}
			axisRight={null}
			axisTop={null}
			axisBottom={
				!isSingleSeason ? {tickSize: 0, tickPadding: 10}
				                : {
						tickSize:       0,
						tickPadding:    0,
						legend:         season,
						legendPosition: 'middle',
						legendOffset:   20,
						renderTick:     () => <></>
					}
			}
			tooltip={NivoTooltipFactory(BreakdownTooltip)}
		/>
	);
}