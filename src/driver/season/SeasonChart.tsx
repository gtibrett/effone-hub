import {QueryResult} from '@apollo/client/react/types/types';
import {Box, useTheme} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {useAppState} from '../../app/AppStateProvider';
import {useGetAccessibleChartColors, useNivoTheme} from '../../ui-components';
import {DriverPageData} from '../types';

type SeasonChartProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'>;

export default function SeasonChart({data, loading}: SeasonChartProps) {
	const [{currentSeason}]        = useAppState();
	const theme                    = useTheme();
	const nivoTheme                = useNivoTheme();
	const getAccessibleChartColors = useGetAccessibleChartColors();
	const seasonResults            = data?.driver.results.filter(r => r.race.year === currentSeason);
	const firstResult              = seasonResults?.[0];
	
	if (!firstResult || loading) {
		return null;
	}
	
	const colors = getAccessibleChartColors(data?.driver.currentTeam.team.colors.primary || theme.palette.primary.main);
	
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