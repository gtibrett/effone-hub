import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';
import { AppLapTime, Race } from '@/gql/graphql';

import { RaceStatProps } from './types';

type Data = {
	race: Pick<Race, 'lapTimes'> | null;
};

const query = gql`
	query raceLapLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			lapTimes {
				id
				driverId
				position
			}
		}
	}
`;

export default function LapLeader({ season, round, size }: RaceStatProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { season, round } });
	const leaders = new Map<string, number>();

	((data?.race?.lapTimes || []) as Array<AppLapTime | null>)
		.filter((lt): lt is AppLapTime => lt != null)
		.forEach((lt: AppLapTime) => {
			if (lt.driverId && lt.position === 1) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});

	return <StatCard size={size} loading={loading} data={leaders} label="Most Laps Led" />;
}
