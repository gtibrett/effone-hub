import {QueryResult} from '@apollo/client/react/types/types';
import {Box, useTheme} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {useNivoTheme} from '../../../ui-components';
import {CircuitDialogData} from './types';

type CircuitChartProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

export default function CircuitChart({data, loading}: CircuitChartProps) {
	const theme     = useTheme();
	const nivoTheme = useNivoTheme();
	const color     = data?.driver?.currentTeam?.team?.colors.primary || theme.palette.primary.main;
	
	const races = data?.circuit.races || [];
	
	const qualifying: LineSerie = {
		id:    'Qualifying',
		color: blueGrey[400],
		data:  []
	};
	
	const results: LineSerie = {
		id:    'Results',
		color: color,
		data:  []
	};
	
	let max = 20;
	races.filter(r => r.results.length).forEach(r => {
		const result = r.results[0];
		const quali  = Number(result.grid);
		const finish = Number(result.positionOrder);
		max          = Math.max(max, quali, finish);
		
		qualifying.data.push({
			x: new Date(r.date),
			y: quali
		});
		results.data.push({
			x: new Date(r.date),
			y: finish
		});
	});
	
	return (
		<Box sx={{height: 200, width: '100%', mb: 1}} aria-hidden>
			<ResponsiveLine
				theme={nivoTheme}
				data={[qualifying, results]}
				colors={({color}) => color || 'transparent'}
				yScale={{
					type: 'linear',
					min:  max,
					max:  1
				}}
				xScale={{
					type: 'time'
				}}
				axisLeft={null}
				axisRight={{
					tickSize:     0,
					tickPadding:  10,
					tickRotation: 0,
					tickValues:   [1, max]
				}}
				axisTop={null}
				axisBottom={null}
				enableGridX={false}
				gridYValues={[1, 5, 10, 15, 20]}
				margin={{top: 5, left: 5, right: 25, bottom: 36}}
				legends={[
					{
						anchor:        'bottom-left',
						direction:     'row',
						justify:       false,
						translateX:    0,
						translateY:    24,
						itemsSpacing:  0,
						itemDirection: 'left-to-right',
						itemWidth:     80,
						itemHeight:    20,
						itemOpacity:   0.75,
						symbolSize:    10,
						symbolShape:   'circle'
					}
				]}
			/>
		</Box>
	);
}