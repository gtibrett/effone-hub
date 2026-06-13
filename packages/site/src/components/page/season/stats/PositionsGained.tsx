import { gql } from '@apollo/client';

import type { SeasonPositionsGainedData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

import type { SeasonStatProps } from './index';

export const seasonPositionsGainedQuery = gql`
	query SeasonPositionsGainedQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				raceResults {
					raceId
					driverId
					gridPositionNumber
					positionNumber
				}
			}
		}
	}
`;

type PositionsGainedProps = SeasonStatProps & { data: SeasonPositionsGainedData };

export default function PositionsGained({ size, data }: PositionsGainedProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		(r?.raceResults || []).forEach(rs => {
			const { driverId, gridPositionNumber, positionNumber } = rs;
			if (driverId && gridPositionNumber != null && positionNumber != null) {
				leaders.set(
					driverId,
					(leaders.get(driverId) || 0) + (gridPositionNumber - positionNumber)
				);
			}
		});
	});

	return <StatCard size={size} loading={false} data={leaders} label="Most Positions Gained" />;
}
