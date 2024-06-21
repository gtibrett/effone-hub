import {useGetAccessibleColor} from '@/hooks';
import {useTheme} from '@mui/material';
import {useMemo} from 'react';
import {ChartMode, RaceStandingsWithEntities, StandingsChartSerie} from './types';

const getLastPoints = (data: StandingsChartSerie['data']) => data.at(-1)?.y || 0;
const sorter        = (a: StandingsChartSerie, b: StandingsChartSerie) => getLastPoints(a.data) > getLastPoints(b.data) ? 1 : getLastPoints(a.data) < getLastPoints(b.data) ? -1 : 0;

export default function useChartData(data: RaceStandingsWithEntities[] = [], mode: ChartMode) {
	const getAccessibleColor = useGetAccessibleColor();
	const fallbackColor      = useTheme().palette.primary.main; // in case of rookie drivers prior to first round
	
	return useMemo(() => {
		const chartSeries: StandingsChartSerie[] = [];
		const maxRound                           = Math.max(...data.filter(r => r.standings.length).map(r => r.round || 0));
		
		data.forEach(({round, standings}) => {
			standings.forEach(standing => {
				const id  = mode === 'position' ? standing.id : standing.entity.name;
				let index = chartSeries.findIndex(s => s.id === String(id));
				
				if (index === -1) {
					chartSeries.push({
						id:     String(id),
						entity: standing.entity,
						color:  getAccessibleColor(standing.entity.color || fallbackColor),
						data:   (new Array(maxRound)).fill(0).map((d, i) => ({x: i + 1, y: null}))
					});
					
					index = chartSeries.length - 1;
				}
				
				if (standing[mode]) {
					const roundIndex = chartSeries[index].data.findIndex(d => d.x === round);
					if (roundIndex === -1) {
						if (round) {
							chartSeries[index].data.push({
								x:    round,
								y:    standing[mode],
								data: standing
							});
						}
					} else {
						chartSeries[index].data[roundIndex] = {
							...(chartSeries[index].data[roundIndex]),
							y:    standing[mode],
							data: standing
						};
					}
				}
			});
		});
		
		chartSeries.sort(sorter);
		
		return chartSeries;
		
	}, [fallbackColor, data, getAccessibleColor, mode]);
}