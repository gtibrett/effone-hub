import '@/polyfills';
import { DataWithTeamInfo } from '@/components/app';
import { useGetTeamColor } from '@/hooks';

import useCareerData from './useCareerData';

export default function useCareerChartDataWithTeam(driverId?: string) {
	const { data } = useCareerData(driverId);
	const getTeamColor = useGetTeamColor();

	const rawData: DataWithTeamInfo[] = (data?.driver.standings || [])
		.filter(s => !!s)
		.map(s => ({
			teamId: s.team?.id ?? '',
			color: getTeamColor(
				s.team?.colors
					? { primaryHex: s.team.colors.primaryHex, secondaryHex: null }
					: null,
				'primaryHex'
			),
			year: s.year,
			points: s.points,
			position: s.positionNumber,
			wins: 0
		}));
	rawData.sortByAttribute('year');

	return rawData;
}
