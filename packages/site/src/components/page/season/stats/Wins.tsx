import { gql } from '@apollo/client';

import type { SeasonWinsData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

import type { SeasonStatProps } from './index';

export const seasonWinsQuery = gql`
	query SeasonWinsQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				raceResults(condition: {positionNumber: 1}, first: 1) {
					raceId
					driverId
				}
			}
		}
	}
`;

type WinsProps = SeasonStatProps & { data: SeasonWinsData };

export default function Wins({ size, data }: WinsProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		(r?.raceResults || []).forEach(rs => {
			if (rs?.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={false} data={leaders} label="Most Wins" />;
}
