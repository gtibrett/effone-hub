import {TeamStandingData} from '@effonehub/constructor';
import {NivoTooltipFactory, useNivoTheme} from '@effonehub/ui-components';
import {RequiredByPropTypes} from '@effonehub/ui-components/nivo';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {HistoryProps} from './History';
import HistoryTooltip from './HistoryTooltip';
import useHistoryChartData, {getChartDataByAttribute, HistoryChartData, useHistoryChartColors} from './useHistoryChartData';

type HistoryChartProps = HistoryProps & {
	dataKey: keyof TeamStandingData;
	dataMaxKey: keyof (Omit<HistoryChartData, 'standingsByTeam'>);
	invert?: boolean;
	min?: number;
	max?: number;
}

export default function HistoryChart({data, loading, dataKey, dataMaxKey, invert = false, min = 0, max = 0}: HistoryChartProps) {
	const nivoTheme        = useNivoTheme();
	const historyChartData = useHistoryChartData(data);
	const chartColors      = useHistoryChartColors(historyChartData);
	
	if (!historyChartData || !data || loading) {
		return null;
	}
	
	const {minYear, maxYear, [dataMaxKey]: dataMax} = historyChartData;
	const series: LineSerie[]                       = getChartDataByAttribute(dataKey, historyChartData);
	const axisMax                                   = Math.max(max, dataMax);
	
	return (
		<ResponsiveLine
			{...RequiredByPropTypes.Line}
			theme={nivoTheme}
			data={series}
			colors={chartColors}
			lineWidth={4}
			pointSize={12}
			yScale={{
				type: 'linear',
				min:  invert ? axisMax : min,
				max:  invert ? min : axisMax
			}}
			xScale={{
				type: 'linear',
				min:  minYear,
				max:  maxYear
			}}
			axisLeft={null}
			axisTop={null}
			axisRight={{
				tickSize:   0,
				tickValues: invert ? [axisMax, min] : [min, axisMax]
			}}
			axisBottom={{
				tickSize:     0,
				tickPadding:  10,
				tickRotation: 0
			}}
			margin={{top: 25, left: 20, right: 28, bottom: 36}}
			enableGridX={false}
			enableGridY={false}
			useMesh={true}
			crosshairType="x"
			tooltip={NivoTooltipFactory(HistoryTooltip)}
		/>
	);
}