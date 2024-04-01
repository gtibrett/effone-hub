import {gql, useQuery} from '@apollo/client';
import {DriverId} from '@effonehub/driver';
import {StatCard} from '@effonehub/ui-components';
import {RaceStatProps} from './index';

type Data = {
	races: {
		lapTimes: {
			driverId: DriverId
		}[]
	}[]
}

const query = gql`
	query seasonLapLeaderQuery($season: Int!, $round: Int!) {
		races (condition: {year: $season, round: $round},orderBy: ROUND_ASC) {
			lapTimes (condition: {position: 1}) {
				driverId
			}
		}
	}
`;

export default function LapLeader({season, round, size}: RaceStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season, round}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.lapTimes.forEach(lt => {
			leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
		});
	});
	
	return <StatCard size={size} loading={loading} data={leaders} label="Most Laps Led"/>;
}