import {StatCard} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {LapTime, Race} from '@/gql/graphql';
import {RaceStatProps} from './types';

type Data = {
	race: Pick<Race, 'lapTimes'> | null;
}

const query = gql`
	query raceLapLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			lapTimes {
				nodes {
					driverId
					position
				}
			}
		}
	}
`;

export default function LapLeader({season, round, size}: RaceStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season, round}});
	const leaders         = new Map<string, number>();

	(data?.race?.lapTimes?.nodes || []).forEach((lt: Pick<LapTime, 'driverId' | 'position'>) => {
		if (lt.driverId && lt.position === 1) {
			leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
		}
	});

	return <StatCard size={size} loading={loading} data={leaders as unknown as Map<DriverId, number>} label="Most Laps Led"/>;
}
