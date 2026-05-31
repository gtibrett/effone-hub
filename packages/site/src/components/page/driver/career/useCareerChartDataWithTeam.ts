import '@/polyfills';
import { DataWithTeamInfo } from '@/components/app';
import { useGetTeamColor } from '@/hooks';

import { getSeasonEndTeamByYear } from './seasonEndTeam';
import useCareerData from './useCareerData';

export default function useCareerChartDataWithTeam(driverId?: string): DataWithTeamInfo[] {
	const { data } = useCareerData(driverId);
	const getTeamColor = useGetTeamColor();

	const teamByYear = getSeasonEndTeamByYear(data?.driver.raceResults);

	const rawData: DataWithTeamInfo[] = (data?.driver.standings || [])
		.filter(s => !!s)
		.map(s => {
			const team = s.year != null ? teamByYear.get(s.year) : undefined;
			return {
				teamId: team?.id ?? '',
				color: getTeamColor(team?.colors, 'primaryHex'),
				year: s.year,
				points: s.points,
				position: s.positionNumber,
				wins: s.wins
			};
		});
	rawData.sortByAttribute('year');

	return rawData;
}
