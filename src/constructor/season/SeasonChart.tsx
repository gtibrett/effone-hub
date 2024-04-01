import {QueryResult} from '@apollo/client/react/types/types';
import {useGetAccessibleChartColors, useNivoTheme} from '@effonehub/ui-components';
import {Box, Skeleton, useTheme} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {ConstructorPageData} from '../types';

type SeasonChartProps = Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'> & { season: number };

export default function SeasonChart({data, loading}: SeasonChartProps) {
	const theme                    = useTheme();
	const nivoTheme                = useNivoTheme();
	const getAccessibleChartColors = useGetAccessibleChartColors();
	
	if (loading || !data) {
		return <Skeleton variant="rectangular" height={132}/>;
	}
	
	const colors               = getAccessibleChartColors(data.team.colors.primary || theme.palette.primary.main);
	const drivers: LineSerie[] = [];
	
	data.team.results.forEach(result => {
		let index = drivers.findIndex(d => d.id === result.driver.code);
		
		if (index === -1) {
			drivers.push({
				id:   String(result.driver.code),
				data: []
			});
			
			index = drivers.length - 1;
		}
		
		// @ts-ignore
		drivers[index].data.push({
			x: result.race.round,
			y: result.positionOrder
		});
	});
	
	return (
		<Box sx={{height: 132, width: '100%'}} aria-hidden>
			<ResponsiveLine
				theme={nivoTheme}
				data={drivers}
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
						anchor:        'bottom',
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