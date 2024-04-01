import 'polyfills';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {Serie as LineSerie} from '@nivo/line';
import {useMemo} from 'react';
import useCareerData from './useCareerData';
import { DataWithTeamInfo } from '@effonehub/components/charts';

export type TeamSeries = LineSerie & {
	id: Team['teamId'];
	color: string;
	data: (
		{
			year: number;
			points: number | null;
			position: number | null;
			wins: number | null;
		}
		)[]
}

export default function useCareerChartDataWithTeam(driverId?: number) {
	const {data} = useCareerData(driverId);
	
	return useMemo(() => {
		const rawData: DataWithTeamInfo[] = (data?.driver.standings || [])
			.filter(s => !!s)
			.map(s => ({
				teamId:   s.driverTeamByDriverIdAndYear.team.teamId,
				color:    s.driverTeamByDriverIdAndYear.team.colors.primary,
				year:     s.year,
				points:   s.points,
				position: s.position,
				wins:     s.wins
			}));
		rawData.sort((a, b) => a.year > b.year ? 1 : a.year < b.year ? -1 : 0);
		
		return rawData;
		
	}, [data?.driver.standings]);
}