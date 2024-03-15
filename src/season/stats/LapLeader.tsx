import {gql, useQuery} from '@apollo/client';
import {StatCard} from '@ui-components';
import {DriverId} from '../../driver';
import {SeasonStatProps} from './index';

type Data = {
	races: {
		lapTimes: {
			driverId: DriverId
		}[]
	}[]
}

const query = gql`
	query seasonLapLeaderQuery($season: Int!) {
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			lapTimes (condition: {position: 1}) {
				driverId
			}
		}
	}
`;

export default function LapLeader({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.lapTimes.forEach(lt => {
			leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
		});
	});
	
	return <StatCard size={size} loading={loading} data={leaders} label="Most Laps Led"/>;
}