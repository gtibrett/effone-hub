import {NivoTooltipFactory, useNivoTheme} from '@effonehub/ui-components';
import {ResponsiveBump} from '@nivo/bump';
import {ChartProps} from './types';
import useChartData from './useChartData';

export default function PositionsChart({data, TooltipComponent}: ChartProps) {
	const chartData = useChartData(data, 'position');
	const nivoTheme = useNivoTheme();
	
	if (!data.length) {
		return null;
	}
	
	return (
		<ResponsiveBump
			theme={nivoTheme}
			data={chartData}
			colors={({color}) => color || 'transparent'}
			lineWidth={4}
			activeLineWidth={6}
			inactiveLineWidth={3}
			inactiveOpacity={.25}
			pointSize={0}
			activePointSize={12}
			inactivePointSize={0}
			pointBorderWidth={0}
			activePointBorderWidth={0}
			startLabel={false}
			endLabel={({entity}) => entity.name || ''}
			endLabelPadding={32}
			margin={{top: 12, right: 116, bottom: 28, left: 16}}
			enableGridX={true}
			enableGridY={false}
			axisTop={null}
			axisRight={{
				tickSize:     0,
				tickPadding:  10,
				tickRotation: 0
			}}
			axisBottom={{
				tickSize:     0,
				tickPadding:  5,
				tickRotation: 0
			}}
			axisLeft={null}
			tooltip={NivoTooltipFactory(TooltipComponent)}
		/>
	);
}