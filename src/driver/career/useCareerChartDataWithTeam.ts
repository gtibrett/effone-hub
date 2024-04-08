import 'polyfills';
import {DataWithTeamInfo} from '@effonehub/components/charts';
import {useGetTeamColor} from '@effonehub/constructor';
import {Maybe} from '@gtibrett/effone-hub-graph-api/types';
import useCareerData from './useCareerData';

export default function useCareerChartDataWithTeam(driverId?: Maybe<number>) {
	const {data}       = useCareerData(driverId);
	const getTeamColor = useGetTeamColor();
	
	const rawData: DataWithTeamInfo[] = (data?.driver.standings || [])
		.filter(s => !!s)
		.map(s => ({
			teamId:   s.driverTeamByDriverIdAndYear?.team?.teamId,
			color:    getTeamColor(s.driverTeamByDriverIdAndYear?.team?.colors, 'primary', false),
			year:     s.year,
			points:   s.points,
			position: s.position,
			wins:     s.wins
		}));
	rawData.sort((a, b) => a.year > b.year ? 1 : a.year < b.year ? -1 : 0);
	
	return rawData;
}