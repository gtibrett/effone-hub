import {Paper, useTheme} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {NivoTooltip, useGetAccessibleChartColors, useNivoTheme} from '../../ui-components';
import {DriverStandingData} from '../types';
import CareerTooltip from './CareerTooltip';

type CareerChartProps = {
	standings: DriverStandingData[];
}

const getTicks = (points: number) => {
	const ticks = [1];
	for (let i = 0; i < points; i += 100) {
		ticks.push(i);
	}
	
	return [...ticks];
};

export default function CareerChart({standings}: CareerChartProps) {
	const theme                    = useTheme();
	const nivoTheme                = useNivoTheme();
	const getAccessibleChartColors = useGetAccessibleChartColors();
	
	if (!standings.length) {
		return null;
	}
	
	const colors = getAccessibleChartColors(standings.at(-1)?.driverTeamByDriverIdAndYear.team.colors.primary || theme.palette.primary.main);
	const max    = Math.max(...standings.map(s => s.position || 0));
	
	const points: LineSerie = {
		id:   'Points',
		data: []
	};
	
	const wins: LineSerie = {
		id:   'Wins',
		data: []
	};
	
	const results: LineSerie = {
		id:   'Results',
		data: []
	};
	
	let maxPoints = 0;
	let maxWins   = 0;
	standings.forEach(standing => {
		if (standing) {
			const data = {
				points:   standing.points,
				position: standing.position,
				wins:     standing.wins
			};
			
			if (data.points > maxPoints) {
				maxPoints = data.points;
			}
			
			if (data.wins > maxWins) {
				maxWins = data.wins;
			}
			
			points.data.push({
				x: standing.year,
				y: data.points,
				data
			});
			results.data.push({
				x: standing.year,
				y: standing.position,
				data
			});
			wins.data.push({
				x: standing.year,
				y: standing.wins,
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
		<Paper variant="outlined" sx={{height: 132, p: 1}} aria-hidden>
			<ResponsiveLine
				theme={nivoTheme}
				data={[results, wins, points]}
				colors={colors}
				yScale={{
					type: 'linear',
					min:  0,
					max:  maxPoints
				}}
				axisLeft={null}
				axisRight={null}
				axisTop={null}
				axisBottom={null}
				enableGridX={false}
				gridYValues={getTicks(maxPoints)}
				margin={{top: 8, left: 8, right: 8, bottom: 36}}
				useMesh={true}
				crosshairType="x"
				tooltip={NivoTooltip(CareerTooltip)}
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
		</Paper>
	);
}