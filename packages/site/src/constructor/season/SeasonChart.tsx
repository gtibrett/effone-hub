import {QueryResult} from '@apollo/client/react/types/types';
import {useGetTeamColor} from '@effonehub/constructor';
import {useNivoTheme} from '@effonehub/ui-components';
import {RequiredByPropTypes} from '@effonehub/ui-components/nivo';
import {alpha, Box, Skeleton} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {ConstructorPageData} from '../types';

type SeasonChartProps = Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'> & { season: number };

export default function SeasonChart({data, loading}: SeasonChartProps) {
	const nivoTheme    = useNivoTheme();
	const getTeamColor = useGetTeamColor();
	let maxPosition    = 20;
	
	if (loading || !data) {
		return <Skeleton variant="rectangular" height={132}/>;
	}
	
	const colors    = [
		getTeamColor(data.team.colors, 'primary', false),
		getTeamColor(data.team.colors, 'secondary', false),
		alpha(getTeamColor(data.team.colors, 'primary', false), .75),
		alpha(getTeamColor(data.team.colors, 'secondary', false), .75)
	];
	const rounds    = Math.max(...((data?.team.results || []).map(rs => rs.race?.round || 0)));
	const blankData = (new Array<number>(rounds)).fill(0).map((v, i) => ({x: i + 1, y: null}));
	
	const drivers: LineSerie[] =
		      data.team.results
		          .map(r => String(r.driver?.code))
		          .removeDuplicates()
		          .map(id => ({
			          id,
			          data: blankData.map(d => {
				          const point = {
					          x: d.x,
					          y: data.team.results.find(rs => String(rs.driver?.code) === id && rs.race?.round === d.x)?.positionOrder || null
				          };
				          
				          maxPosition = Math.max(maxPosition, point.y || 0);
				          
				          return point;
			          })
		          }));
	
	return (
		<Box sx={{height: 132, width: '100%'}} aria-hidden>
			<ResponsiveLine
				{...RequiredByPropTypes.Line}
				theme={nivoTheme}
				data={drivers}
				colors={colors}
				lineWidth={4}
				pointSize={12}
				yScale={{
					type: 'linear',
					min:  maxPosition,
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
				margin={{top: 24, right: 36, bottom: 32, left: 16}}
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