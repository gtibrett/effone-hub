import '@/polyfills';
import {DataWithTeamInfo} from '@/components/app';
import {useGetTeamColor} from '@/hooks';
import useCareerData from './useCareerData';

export default function useCareerChartDataWithTeam(driverId?: string) {
	const {data}       = useCareerData(driverId);
	const getTeamColor = useGetTeamColor();

	const rawData: DataWithTeamInfo[] = (data?.driver.standings?.nodes || [])
		.filter(s => !!s)
		.map(s => ({
			teamId:   s.constructor?.id ?? '',
			color:    getTeamColor(s.constructor?.colors ? {primaryHex: s.constructor.colors.primaryHex, secondaryHex: null} : null, 'primaryHex', false),
			year:     s.year,
			points:   s.points,
			position: s.positionNumber,
			wins:     0
		}));
	rawData.sortByAttribute('year');

	return rawData;
}
