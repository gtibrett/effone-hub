import { gql } from '@apollo/client';

import type { SeasonLapLeaderData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

import type { SeasonStatProps } from './index';

export const seasonLapLeaderQuery = gql`
	query SeasonLapLeaderQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				lapTimes {
					raceId
					driverId
					lap
					position
				}
			}
		}
	}
`;

type LapLeaderProps = SeasonStatProps & { data: SeasonLapLeaderData };

export default function LapLeader({ size, data }: LapLeaderProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		(r.lapTimes || []).forEach(lt => {
			if (lt.driverId && lt.position === 1) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={false} data={leaders} label="Most Laps Led" />;
}
