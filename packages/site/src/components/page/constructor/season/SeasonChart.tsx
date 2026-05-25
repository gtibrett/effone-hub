import {RequiredByPropTypes, useNivoTheme} from '@/components/ui/nivo';
import {useGetTeamColor} from '@/hooks';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {alpha} from '@/components/ui/colors';
import {Box, Skeleton} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {ConstructorPageData} from '../types';

type SeasonChartProps = SimpleApolloResult<ConstructorPageData> & { season: number };

export default function SeasonChart({data, loading}: SeasonChartProps) {
	const nivoTheme    = useNivoTheme();
	const getTeamColor = useGetTeamColor();

	if (loading || !data) {
		return <Skeleton variant="rectangular" height={132}/>;
	}

	const colors    = [
		getTeamColor(data.team.colors, 'primaryHex', false),
		getTeamColor(data.team.colors, 'secondaryHex', false),
		alpha(getTeamColor(data.team.colors, 'primaryHex', false), .75),
		alpha(getTeamColor(data.team.colors, 'secondaryHex', false), .75)
	];
	const raceResults = data.team.raceResults.nodes;
	const rounds      = Math.max(...(raceResults.map(rs => rs.race?.round || 0)));
	const blankData   = (new Array<number>(rounds)).fill(0).map((v, i) => ({x: i + 1, y: null}));

	const drivers: LineSerie[] =
		      raceResults
		          .map(r => String(r.driver?.abbreviation))
		          .removeDuplicates()
		          .map(id => ({
			          id,
			          data: blankData.map(d => ({
				          x: d.x,
				          y: raceResults.find(rs => String(rs.driver?.abbreviation) === id && rs.race?.round === d.x)?.positionNumber || null
			          }))
		          }));

	// Compute maxPosition from the populated series rather than mutating a
	// `let` inside the .map() — react-hooks/immutability flags the mutation
	// and Nivo only needs the final value to set the y-scale. Nivo's DatumValue
	// is number | string | null; the only y values we set are number | null.
	const maxPosition = Math.max(
		20,
		...drivers.flatMap(d => d.data.map(p => (typeof p.y === 'number' ? p.y : 0)))
	);
	
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