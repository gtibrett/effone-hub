import {useGetAccessibleChartColors} from '@/hooks';
import {alpha} from '@/lib/color';
import {useCssTokens} from '@/lib/cssTokens';
import {Serie} from '@nivo/line';
import {useCallback} from 'react';
import {DataWithTeamInfo, MutableSerie, SerieWithTeamAndData} from './types';

export default function useSplitSeriesByTeam() {
	const tokens                   = useCssTokens();
	const getAccessibleChartColors = useGetAccessibleChartColors();

	return useCallback((xKey: keyof SerieWithTeamAndData['rawData'], data: DataWithTeamInfo[]): [Serie[], Serie] => {
		const xKeys = (data.map((rawData) => rawData[xKey]) || []).removeDuplicates();
		const teams = (data.map(({teamId, color}) => ({teamId, color})) || []).removeDuplicates((a, b) => a.teamId === b.teamId);

		const seriesByTeam: MutableSerie[] = teams.map(({teamId, color}) => (
			{
				id:    teamId,
				color: getAccessibleChartColors(color || tokens.primary)[0],
				data:  xKeys.map(val => (
					{
						[xKey]: val
					}
				))
			}
		));

		const baseSerie: MutableSerie = {
			id:    -1,
			color: alpha(tokens.border, .1),
			data:  xKeys.map(val => (
				{
					[xKey]: val
				}
			))
		};

		data.forEach(({teamId, ...rawData}) => {
			const seriesIndex = seriesByTeam.findIndex(ts => ts.id === teamId);

			if (!seriesByTeam[seriesIndex]) {
				return;
			}

			const dataIndex = seriesByTeam[seriesIndex].data.findIndex(d => d[xKey] === rawData[xKey]);

			if (!seriesByTeam[seriesIndex].data[dataIndex]) {
				return;
			}

			seriesByTeam[seriesIndex].data[dataIndex] = rawData;
			baseSerie.data[dataIndex]                 = rawData;
		});

		return [seriesByTeam, baseSerie];
	}, [getAccessibleChartColors, tokens.border, tokens.primary]);
}
