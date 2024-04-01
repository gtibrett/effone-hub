import {NivoTooltipFactory, useNivoTheme} from '@effonehub/ui-components';
import {alpha} from '@mui/material';
import {Point, ResponsiveLine} from '@nivo/line';
import {useState} from 'react';
import {ChartProps} from './types';
import useChartData from './useChartData';

const getTicks = (rounds: number) => (new Array<number>(rounds)).fill(0).map((v, i) => i + 1);

export default function PointsChart({data, TooltipComponent}: ChartProps) {
	const chartData                 = useChartData(data, 'points');
	const nivoTheme                 = useNivoTheme();
	const [highlight, setHighlight] = useState<string | number | undefined>();
	const rounds                    = Math.max(...chartData.map(s => Math.max(...s.data.map(d => Number(d.x)))));
	const chartPadding              = (rounds - 1) * .025;
	
	if (!data.length) {
		return null;
	}
	
	return (
		<ResponsiveLine
			theme={nivoTheme}
			data={chartData}
			colors={({color, id}) => color ? (!highlight || id === highlight ? color : alpha(color, .25)) : 'transparent'}
			lineWidth={3}
			enablePoints={false}
			margin={{top: 20, right: 48, bottom: 28, left: 16}}
			enableGridX={true}
			gridXValues={getTicks(rounds)}
			enableGridY={false}
			axisTop={null}
			xScale={{
				type: 'linear',
				min:  1 - chartPadding,
				max:  rounds + chartPadding
			}}
			axisRight={{
				tickSize:     2,
				tickPadding:  8,
				tickRotation: 0,
				tickValues:   5
			}}
			axisBottom={{
				tickSize:     2,
				tickPadding:  2,
				tickRotation: 0,
				tickValues:   getTicks(rounds)
			}}
			axisLeft={null}
			crosshairType="bottom"
			useMesh={true}
			isInteractive={true}
			tooltip={NivoTooltipFactory(TooltipComponent)}
			onClick={({serieId}: Point) => highlight === serieId ? setHighlight(undefined) : setHighlight(serieId)}
		/>
	);
}