import {useGetTeamColor} from '@/hooks';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {Team} from '@/gql/graphql';
import {Serie as LineSerie} from '@nivo/line';
import {ConstructorPageData, TeamStandingData} from '../types';

type StandingsAndTeamInfo = Pick<Team, 'id' | 'name' | 'colors'> & {
	standings: TeamStandingData[]
};

export type HistoryChartData = {
	standingsByTeam: Map<string, StandingsAndTeamInfo>;
	minYear: number;
	maxYear: number;
	maxPoints: number;
	maxPosition: number;
}

export default function useHistoryChartData(data: SimpleApolloResult<ConstructorPageData>['data']): HistoryChartData | undefined {
	if (!data?.team) {
		return undefined;
	}

	const standingsByTeam = new Map<string, StandingsAndTeamInfo>();

	const {name, id, colors} = data.team;
	standingsByTeam.set(id, {name, id, colors, standings: data.team.standings.nodes || []});

	data?.team.antecedents.nodes.forEach(({antecedentTeam, startYear, endYear}) => {
		const {id, name, colors, standings = []} = antecedentTeam;
		const filteredStandings = standings.filter(s => s.year && s.year >= (startYear ?? 0) && (!endYear || s.year <= endYear));
		standingsByTeam.set(id, {name, id, colors: colors as any, standings: filteredStandings});
	});

	const flatStandings = Array.from(standingsByTeam.values()).map(t => t.standings).flat();
	const minYear       = Math.min(...flatStandings.map(s => s.year || Number.POSITIVE_INFINITY));
	const maxYear       = Math.max(...flatStandings.map(s => s.year || Number.NEGATIVE_INFINITY));
	const maxPoints     = Math.max(...flatStandings.map(s => s.points || 0));
	const maxPosition   = Math.max(...flatStandings.map(s => s.positionNumber || 0));

	return {standingsByTeam, minYear, maxYear, maxPoints, maxPosition};
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

	return !chartData ? [] : Array.from(chartData.standingsByTeam.values()).map(t => getTeamColor(t.colors ? {primaryHex: t.colors.primaryHex, secondaryHex: null} : null, 'primaryHex'));
}

export function getChartDataByAttribute(attribute: keyof TeamStandingData, chartData: HistoryChartData) {
	const series: LineSerie[]                 = [];
	const {standingsByTeam, minYear, maxYear} = chartData;

	standingsByTeam.forEach((teamWithStandings) => {
		const {id, name} = teamWithStandings;
		const chartData  = generateBaseSerie(name || '', {id, name});

		for (let x = minYear; x <= maxYear; x++) {
			let y          = null;
			const standing = teamWithStandings.standings.find(s => s.year === x);

			if (standing) {
				y = standing[attribute] !== null ? standing[attribute] : null;
			}

			// @ts-ignore
			chartData.data.push({x, y, data: {id, name, ...standing}});
		}

		series.push(chartData);
	});

	return series;
}
