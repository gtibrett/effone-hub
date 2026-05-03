import {StatCard} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {LapTime, Race, Season} from '@/gql/graphql';
import {SeasonStatProps} from './index';

type Data = {
	season: (Pick<Season, 'year'> & {
		racesByYear: {
			nodes: (Pick<Race, 'rowId' | 'round'> & {
				lapTimes: {
					nodes: Pick<LapTime, 'driverId' | 'position'>[]
				}
			})[]
		}
	}) | null;
}

const query = gql`
	query SeasonLapLeaderQuery($season: Int!) {
		season(year: $season) {
			racesByYear {
				nodes {
					rowId
					round
					lapTimes {
						nodes {
							driverId
							position
						}
					}
				}
			}
		}
	}
`;

export default function LapLeader({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<string, number>();

	(data?.season?.racesByYear?.nodes || []).forEach(r => {
		(r.lapTimes?.nodes || []).forEach((lt: Pick<LapTime, 'driverId' | 'position'>) => {
			if (lt.driverId && lt.position === 1) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders as unknown as Map<DriverId, number>} label="Most Laps Led"/>;
}
