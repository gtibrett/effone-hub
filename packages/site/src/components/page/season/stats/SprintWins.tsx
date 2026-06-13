import { gql } from '@apollo/client';

import type { SeasonSprintWinsData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

import type { SeasonStatProps } from './index';

export const seasonSprintWinsQuery = gql`
	query SeasonSprintWinsQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				sprintRaceResults(condition: {positionNumber: 1}, first: 1) {
					raceId
					driverId
				}
			}
		}
	}
`;

type SprintWinsProps = SeasonStatProps & { data: SeasonSprintWinsData };

export default function SprintWins({ size, data }: SprintWinsProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		r.sprintRaceResults.forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={false} data={leaders} label="Most Sprint Wins" />;
}
