import {Box} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {getColorByConstructorId} from '../constructors';
import {SeasonStanding} from '../types/ergast';
import CareerTooltip from './CareerTooltip';

type CareerChartProps = {
	seasons: SeasonStanding[];
}

const getTicks = (points: number) => {
	const ticks = [1];
	for (let i = 0; i < points; i += 100) {
		ticks.push(i);
	}
	
	return [...ticks];
};

export default function CareerChart({seasons}: CareerChartProps) {
	if (!seasons.length) {
		return null;
	}
	
	const constructorId = seasons[seasons.length - 1].DriverStandings?.[0].Constructors?.[0]?.constructorId;
	const color         = getColorByConstructorId(constructorId);
	const max           = Math.max(...seasons.map(s => Number(s.DriverStandings?.[0].position)));
	
	const points: LineSerie = {
		id: 'points',
		color: blueGrey[400],
		data: []
	};
	
	const wins: LineSerie = {
		id: 'wins',
		color: blueGrey[200],
		data: []
	};
	
	const results: LineSerie = {
		id: 'results',
		color: color,
		data: []
	};
	
	let maxPoints = 0;
	let maxWins   = 0;
	seasons.forEach(s => {
		const standing = s.DriverStandings?.[0];
		if (standing) {
			const data = {
				points: Number(standing.points),
				position: Number(standing.position),
				wins: Number(standing.wins)
			};
			
			if (data.points > maxPoints) {
				maxPoints = data.points;
			}
			
			if (data.wins > maxWins) {
				maxWins = data.wins;
			}
			
			points.data.push({
				x: Number(s.season),
				y: Number(data.points),
				data
			});
			results.data.push({
				x: Number(s.season),
				y: Number(standing.position),
				data
			});
			wins.data.push({
				x: Number(s.season),
				y: Number(standing.wins),
				data
			});
		}
	});
	
	results.data = results.data.map(d => ({
		...d,
		y: maxPoints - ((Number(d.y) - 1) / Math.max(20, max) * maxPoints)
	}));
	
	wins.data = wins.data.map(d => ({
		...d,
		y: ((Number(d.y) / maxWins) * maxPoints)
	}));
	
	
	return (
		<Box sx={{height: 132, width: '100%'}} aria-hidden={true}>
			<ResponsiveLine
				data={[points, results, wins]}
				colors={({color}) => color || 'transparent'}
				yScale={{
					type: 'linear',
					min: 0,
					max: maxPoints
				}}
				axisLeft={null}
				axisRight={null}
				axisTop={null}
				axisBottom={null}
				enableGridX={false}
				gridYValues={getTicks(maxPoints)}
				margin={{top: 25, left: 8, right: 8, bottom: 32}}
				useMesh={true}
				crosshairType="x"
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
				tooltip={CareerTooltip}
			/>
		</Box>
	);
}