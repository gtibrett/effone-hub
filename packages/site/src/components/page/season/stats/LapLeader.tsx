import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';
import { AppLapTime, Race, Season } from '@/gql/graphql';

import { SeasonStatProps } from './index';

type Data = {
	season:
		| (Pick<Season, 'year'> & {
				racesByYear: (Pick<Race, 'rowId' | 'round'> & {
					lapTimes: Pick<AppLapTime, 'driverId' | 'position'>[];
				})[];
		  })
		| null;
};

const query = gql`
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

export default function LapLeader({ season, size }: SeasonStatProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { season } });
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		(r.lapTimes || []).forEach((lt: Pick<AppLapTime, 'driverId' | 'position'>) => {
			if (lt.driverId && lt.position === 1) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders} label="Most Laps Led" />;
}
