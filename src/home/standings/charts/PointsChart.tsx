import {alpha} from '@mui/material';
import {Point, ResponsiveLine} from '@nivo/line';
import {useState} from 'react';
import {NivoTooltip, useNivoTheme} from '../../../ui-components';
import {ChartProps} from './types';

export default function PointsChart({data, TooltipComponent}: ChartProps) {
	const nivoTheme                 = useNivoTheme();
	const [highlight, setHighlight] = useState<string | number | undefined>();
	
	if (!data.length) {
		return null;
	}
	
	return (
		<ResponsiveLine
			theme={nivoTheme}
			data={data}
			colors={({color, id}) => color ? (!highlight || id === highlight ? color : alpha(color, .25)) : 'transparent'}
			lineWidth={3}
			enablePoints={false}
			margin={{top: 10, right: 50, bottom: 20, left: 20}}
			enableGridX={true}
			enableGridY={false}
			axisTop={null}
			axisRight={{
				tickSize:     2,
				tickPadding:  8,
				tickRotation: 0,
				tickValues:   5
			}}
			axisBottom={{
				tickSize:     2,
				tickPadding:  2,
				tickRotation: 0
			}}
			axisLeft={null}
			crosshairType="bottom"
			useMesh={true}
			isInteractive={true}
			tooltip={NivoTooltip(TooltipComponent)}
			onClick={({serieId}: Point) => highlight === serieId ? setHighlight(undefined) : setHighlight(serieId)}
		/>
	);
}