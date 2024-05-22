import {QueryResult} from '@apollo/client/react/types/types';
import {useGetTeamColor} from '@effonehub/constructor';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {Serie as LineSerie} from '@nivo/line';
import {ConstructorPageData, TeamStandingData} from '../types';

type StandingsAndTeamInfo = Pick<Team, 'teamId' | 'name' | 'colors'> & {
	standings: TeamStandingData[]
};

export type HistoryChartData = {
	standingsByTeam: Map<number, StandingsAndTeamInfo>;
	minYear: number;
	maxYear: number;
	maxPoints: number;
	maxPosition: number;
	maxWins: number;
}

export default function useHistoryChartData(data: Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'>['data']): HistoryChartData | undefined {
	if (!data?.team) {
		return undefined;
	}
	
	const standingsByTeam = new Map<number, StandingsAndTeamInfo>();
	
	const {name, teamId, colors} = data.team;
	standingsByTeam.set(teamId, {name, teamId, colors, standings: data.team.standings || []});
	
	data?.team.teamHistories.forEach(({antecedentTeam: {teamId, name, colors, standings = []}, startYear, endYear}) => {
		const filteredStandings = standings.filter(s => s.year && s.year >= startYear && (!endYear || s.year <= endYear));
		standingsByTeam.set(teamId, {name, teamId, colors, standings: filteredStandings});
	});
	
	const flatStandings = Array.from(standingsByTeam.values()).map(t => t.standings).flat();
	const minYear       = Math.min(...flatStandings.map(s => s.year || Number.POSITIVE_INFINITY));
	const maxYear       = Math.max(...flatStandings.map(s => s.year || Number.NEGATIVE_INFINITY));
	const maxPoints     = Math.max(...flatStandings.map(s => s.points || 0));
	const maxPosition   = Math.max(...flatStandings.map(s => s.position || 0));
	const maxWins       = Math.max(...flatStandings.map(s => s.wins || 0));
	
	return {standingsByTeam, minYear, maxYear, maxPoints, maxPosition, maxWins};
}

const generateBaseSerie = (id: string, data: any) => {
	const serie: LineSerie = {
		id,
		...data,
		data: []
	};
	
	return serie;
};

export function useHistoryChartColors(chartData: HistoryChartData | undefined) {
	const getTeamColor = useGetTeamColor();
	
	return !chartData ? [] : Array.from(chartData.standingsByTeam.values()).map(t => getTeamColor(t.colors));
}

export function getChartDataByAttribute(attribute: keyof TeamStandingData, chartData: HistoryChartData) {
	const series: LineSerie[]                 = [];
	const {standingsByTeam, minYear, maxYear} = chartData;
	
	standingsByTeam.forEach((teamWithStandings) => {
		const {teamId, name} = teamWithStandings;
		const chartData      = generateBaseSerie(name || '', {teamId, name});
		
		for (let x = minYear; x <= maxYear; x++) {
			let y          = null;
			const standing = teamWithStandings.standings.find(s => s.year === x);
			
			if (standing) {
				y = standing[attribute] !== null ? standing[attribute] : null;
			}
			
			// @ts-ignore
			chartData.data.push({x, y, data: {teamId, name, ...standing}});
		}
		
		series.push(chartData);
	});
	
	return series;
}