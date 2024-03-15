import {QueryResult} from '@apollo/client/react/types/types';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {Box, useTheme} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {NivoTooltip, useGetAccessibleChartColors, useNivoTheme} from '@ui-components';
import HistoryTooltip from './history/HistoryTooltip';
import {ConstructorPageData, TeamStandingData} from './types';

type HistoryChartProps = Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'>;
const getTicks = (points: number) => {
	const ticks = [1];
	for (let i = 0; i < points; i += 100) {
		ticks.push(i);
	}
	
	return [...ticks];
};

const generateBaseSerie = (id: string, data: any) => {
	const serie: LineSerie = {
		id,
		...data,
		data: []
	};
	
	return serie;
};

type StandingWithTeamInfo = TeamStandingData & Pick<Team, 'teamId' | 'name' | 'colors'>;

export default function HistoryChart({data, loading}: HistoryChartProps) {
	const theme                    = useTheme();
	const nivoTheme                = useNivoTheme();
	const getAccessibleChartColors = useGetAccessibleChartColors();
	
	if (!data?.team) {
		return null;
	}
	
	const standingsByTeam = new Map<number, StandingWithTeamInfo[]>();
	
	const {name, teamId, colors} = data.team;
	standingsByTeam.set(teamId, (data.team.standings || []).map(s => ({...s, name, teamId, colors})));
	
	data?.team.teamHistories.forEach(({antecedentTeam: {teamId, name, colors, standings = []}}) => {
		standingsByTeam.set(teamId, standings.map(s => ({...s, name, teamId, colors})));
	});
	
	const flatStandings = Array.from(standingsByTeam.values()).flat();
	
	const minYear   = Math.min(...flatStandings.map(s => s.year));
	const maxYear   = Math.max(...flatStandings.map(s => s.year));
	const maxPoints = Math.max(...flatStandings.map(s => s.points));
	const maxWins   = Math.max(...flatStandings.map(s => s.wins));
	
	const series: LineSerie[] = [];
	
	standingsByTeam.forEach((teamStandings) => {
		const {teamId, name} = teamStandings[0];
		const color          = teamStandings[0].colors.primary || theme.palette.primary.main;
		const colors         = getAccessibleChartColors(color);
		
		const pointsData    = generateBaseSerie(`points-${teamId}`, {teamId, name, color: colors[0]});
		const positionsData = generateBaseSerie(`position-${teamId}`, {teamId, name, color: colors[1]});
		const winsData      = generateBaseSerie(`wins-${teamId}`, {teamId, name, color: colors[2]});
		
		
		for (let x = minYear; x <= maxYear; x++) {
			const {points = null, position = null, wins = null} = teamStandings.find(s => s.year === x) || {};
			
			pointsData.data.push({x, y: points, data: {teamId, name, color: colors[0]}});
			positionsData.data.push({x, y: position, data: {teamId, name, color: colors[1]}});
			winsData.data.push({x, y: wins, data: {teamId, name, color: colors[2]}});
		}
		
		series.push(pointsData, positionsData, winsData);
	});
	
	series
		.filter(s => String(s.id).startsWith('position'))
		.forEach(s => {
			s.data.forEach(d => {
				// @ts-ignore
				d.y = d.y !== null ? maxPoints - ((d.y - 1) / 20 * maxPoints) : null;
			});
		});
	
	series
		.filter(s => String(s.id).startsWith('wins'))
		.forEach(s => {
			s.data.forEach(d => {
				// @ts-ignore
				d.y = d.y !== null ? ((d.y / maxWins) * maxPoints) : null;
			});
		});
	
	if (!data || loading) {
		return null;
	}
	
	return (
		<Box sx={{height: 332, width: '100%'}} aria-hidden>
			<ResponsiveLine
				theme={nivoTheme}
				data={series}
				colors={(point) => {
					return point.color;
				}}
				yScale={{
					type: 'linear',
					min:  0,
					max:  maxPoints
				}}
				xScale={{
					type: 'linear',
					min:  minYear,
					max:  maxYear
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
				tooltip={NivoTooltip(HistoryTooltip)}
			/>
		</Box>
	);
}