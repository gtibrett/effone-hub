import {ResponsiveBump} from '@nivo/bump';
import {NivoTooltip, useNivoTheme} from '../../../ui-components';
import {ChartProps} from './types';

export default function PositionsChart({data, TooltipComponent}: ChartProps) {
	const nivoTheme = useNivoTheme();
	
	if (!data.length) {
		return null;
	}
	
	return (
		<ResponsiveBump
			theme={nivoTheme}
			data={data}
			colors={({color}) => color || 'transparent'}
			lineWidth={4}
			activeLineWidth={6}
			inactiveLineWidth={3}
			inactiveOpacity={.25}
			pointSize={0}
			activePointSize={0}
			inactivePointSize={0}
			pointBorderWidth={0}
			activePointBorderWidth={0}
			startLabel={false}
			endLabel={({entity}) => entity.name || ''}
			endLabelPadding={32}
			margin={{top: 0, right: 120, bottom: 20, left: 20}}
			enableGridX={true}
			enableGridY={false}
			axisTop={null}
			axisRight={{
				tickSize:     2,
				tickPadding:  8,
				tickRotation: 0
			}}
			axisBottom={{
				tickSize:     2,
				tickPadding:  2,
				tickRotation: 0
			}}
			axisLeft={null}
			tooltip={NivoTooltip(TooltipComponent)}
		/>
	);
}