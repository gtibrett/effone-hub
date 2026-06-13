import { gql } from '@apollo/client';

import type { RaceLapLeaderData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';
import type { AppLapTime } from '@/gql/graphql';

import type { RaceStatProps } from './types';

// Exported so cached-data.ts can reuse the same document for SSR prefetch.
export const raceLapLeaderQuery = gql`
	query raceLapLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
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
`;

type Props = RaceStatProps & { data: RaceLapLeaderData };

export default function LapLeader({ data, size }: Props) {
	const leaders = new Map<string, number>();

	((data?.race?.lapTimes || []) as Array<AppLapTime | null>)
		.filter((lt): lt is AppLapTime => lt != null)
		.forEach((lt: AppLapTime) => {
			if (lt.driverId && lt.position === 1) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});

	return <StatCard size={size} loading={false} data={leaders} label="Most Laps Led" />;
}
