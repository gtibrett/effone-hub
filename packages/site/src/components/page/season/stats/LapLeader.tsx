import {StatCard} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {AppLapTime, Race, Season} from '@/gql/graphql';
import {SeasonStatProps} from './index';

type Data = {
	season: (Pick<Season, 'year'> & {
		racesByYear: {
			nodes: (Pick<Race, 'rowId' | 'round'> & {
				lapTimes: {
					nodes: Pick<AppLapTime, 'driverId'>[]
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
					lapTimes(condition: {position: 1}) {
						nodes {
							driverId
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
		(r.lapTimes?.nodes || []).forEach((lt: Pick<AppLapTime, 'driverId'>) => {
			if (lt.driverId) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders as unknown as Map<DriverId, number>} label="Most Laps Led"/>;
}
