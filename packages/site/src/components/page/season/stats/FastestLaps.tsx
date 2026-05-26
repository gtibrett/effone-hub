import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';
import { FastestLap, Race } from '@/gql/graphql';

import { FastestLapQueryData, seasonFastestLapQuery } from './FastestLap';
import { SeasonStatProps } from './types';

type RaceNode = Pick<Race, 'rowId' | 'round' | 'officialName'> & {
	fastestLaps: Pick<FastestLap, 'driverId' | 'lap' | 'time' | 'timeMillis'>[];
};

export default function FastestLaps({ season, size = 'small' }: SeasonStatProps) {
	const { loading, data } = useQuery<FastestLapQueryData>(seasonFastestLapQuery, {
		variables: { season }
	});
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach((r: RaceNode) => {
		r.fastestLaps?.forEach((lt: Pick<FastestLap, 'driverId'>) => {
			if (lt.driverId) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard label="Fastest Laps" size={size} loading={loading} data={leaders} />;
}
