import {Box} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {getColorByConstructorId} from '../../constructors';
import {Race} from '../../types/ergast';

type CircuitChartProps = {
	races: Race[];
}

export default function CircuitChart({races}: CircuitChartProps) {
	if (!races?.[0]?.Results?.[0]) {
		return null;
	}
	
	const constructorId = races?.[races.length-1].Results?.[0].Constructor?.constructorId;
	const color         = getColorByConstructorId(constructorId);
	
	const qualifying: LineSerie = {
		id: 'qualifying',
		color: blueGrey[400],
		data: []
	};
	
	const results: LineSerie = {
		id: 'results',
		color: color,
		data: []
	};
	
	races.forEach(r => {
		const result = r.Results?.[0];
		qualifying.data.push({
			x: Number(r.season),
			y: Number(result?.grid)
		});
		results.data.push({
			x: Number(r.season),
			y: Number(result?.position)
		});
	});
	
	
	return (
		<Box sx={{height: 200, width: '100%'}} aria-hidden>
			<ResponsiveLine
				data={[qualifying, results]}
				colors={({color}) => color || 'transparent'}
				yScale={{
					type: 'linear',
					min: 20,
					max: 1
				}}
				axisLeft={null}
				axisRight={{
					tickSize: 0,
					tickPadding: 10,
					tickRotation: 0,
					tickValues: [1, 20]
				}}
				axisTop={null}
				axisBottom={null}
				enableGridX={false}
				gridYValues={[1, 5, 10, 15, 20]}
				margin={{top: 5, left: 5, right: 25, bottom: 32}}
				legends={[
					{
						anchor: 'bottom',
						direction: 'row',
						justify: false,
						translateX: 0,
						translateY: 24,
						itemsSpacing: 0,
						itemDirection: 'left-to-right',
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 10,
						symbolShape: 'circle'
					}
				]}
			/>
		</Box>
	);
}