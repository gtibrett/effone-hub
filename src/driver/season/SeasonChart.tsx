import {QueryResult} from '@apollo/client/react/types/types';
import {Box, useTheme} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {useGetAccessibleChartColors, useNivoTheme} from '../../ui-components';
import {DriverId, useDriver} from '../index';
import {DriverPageData} from '../types';

type SeasonChartProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'> & { driverId: DriverId };

export default function SeasonChart({driverId, data, loading}: SeasonChartProps) {
	const theme                    = useTheme();
	const nivoTheme                = useNivoTheme();
	const getAccessibleChartColors = useGetAccessibleChartColors();
	const driver                   = useDriver(driverId);
	const seasonResults            = data?.races.filter(r => r.results.length).map(r => ({...r.results[0], race: r}));
	const firstResult              = seasonResults?.[0];
	
	if (!firstResult || !driver || loading) {
		return null;
	}
	
	const colors = getAccessibleChartColors(driver.currentTeam?.team?.colors.primary || theme.palette.primary.main);
	
	const qualifying: LineSerie = {
		id:   'qualifying',
		data: []
	};
	
	const results: LineSerie = {
		id:   'results',
		data: []
	};
	
	seasonResults.forEach(result => {
		qualifying.data.push({
			x: result.race.round,
			y: result.grid
		});
		results.data.push({
			x: result.race.round,
			y: result?.positionOrder
		});
	});
	
	return (
		<Box sx={{height: 132, width: '100%'}} aria-hidden>
			<ResponsiveLine
				theme={nivoTheme}
				data={[results, qualifying]}
				colors={colors}
				yScale={{
					type: 'linear',
					min:  20,
					max:  1
				}}
				axisLeft={null}
				axisRight={{
					tickSize:     0,
					tickPadding:  10,
					tickRotation: 0,
					tickValues:   [1, 20]
				}}
				axisTop={null}
				axisBottom={null}
				enableGridX={false}
				gridYValues={[1, 5, 10, 15, 20]}
				margin={{top: 5, left: 5, right: 25, bottom: 32}}
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