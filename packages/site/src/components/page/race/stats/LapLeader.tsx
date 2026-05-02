import {StatCard} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {AppLapTime, Race} from '@/gql/graphql';
import {RaceStatProps} from './types';

type Data = {
	race: Pick<Race, 'lapTimes'> | null;
}

const query = gql`
	query raceLapLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			lapTimes(condition: {position: 1}) {
				nodes {
					driverId
				}
			}
		}
	}
`;

export default function LapLeader({season, round, size}: RaceStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season, round}});
	const leaders         = new Map<string, number>();

	(data?.race?.lapTimes?.nodes || []).forEach((lt: Pick<AppLapTime, 'driverId'>) => {
		if (lt.driverId) {
			leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
		}
	});

	return <StatCard size={size} loading={loading} data={leaders as unknown as Map<DriverId, number>} label="Most Laps Led"/>;
}
