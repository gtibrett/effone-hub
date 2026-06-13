import '@/polyfills';
import type { DriverCareerData } from '@/app/lib/cached-data';
import type { DataWithTeamInfo } from '@/components/app';
import { useGetTeamColor } from '@/hooks';

import { getSeasonEndTeamByYear } from './seasonEndTeam';

export default function useCareerChartDataWithTeam(
	careerData: DriverCareerData['driver'] | null | undefined
): DataWithTeamInfo[] {
	const getTeamColor = useGetTeamColor();

	const teamByYear = getSeasonEndTeamByYear(careerData?.raceResults ?? []);

	const rawData: DataWithTeamInfo[] = (careerData?.standings || [])
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
