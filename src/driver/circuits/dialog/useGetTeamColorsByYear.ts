import {useGetTeamColor} from '@effonehub/constructor';
import {Driver} from '@gtibrett/effone-hub-graph-api';
import {useCallback} from 'react';

type ColorsByYear = {
	[year: number]: string
}

export default function useGetTeamColorsByYear() {
	const getTeamColor = useGetTeamColor();
	
	return useCallback((teamsByYear: Driver['teamsByYear']): ColorsByYear => {
		return teamsByYear
			.map(({year, team}) => ({year: year as number, color: getTeamColor(team?.colors)}))
			.reduce((colors, {year, color}) => ({...colors, [year]: color}), {});
	}, [getTeamColor]);
}