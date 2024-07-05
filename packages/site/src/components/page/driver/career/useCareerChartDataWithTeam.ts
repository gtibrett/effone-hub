import '@/polyfills';
import {DataWithTeamInfo} from '@/components/app';
import {useGetTeamColor} from '@/hooks';
import {Maybe} from '@/gql/graphql';
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
	rawData.sortByAttribute('year');
	
	return rawData;
}