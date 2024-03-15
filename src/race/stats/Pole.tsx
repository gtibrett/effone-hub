import {gql, useQuery} from '@apollo/client';
import {StatCard} from '@ui-components';
import {DriverId} from '../../driver';
import {RaceStatProps} from './index';

type Data = {
	races: {
		qualifyings: {
			driverId: DriverId
		}[]
	}[]
}

const query = gql`
	query racePolesLeaderQuery($season: Int!, $round: Int!) {
		races (condition: {year: $season, round: $round}) {
			qualifyings (condition: {position: 1}) {
				driverId
			}
		}
	}
`;

export default function Pole({season, round, size}: RaceStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season, round}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.qualifyings.forEach(rs => {
			leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
		});
	});
	
	return <StatCard size={size} loading={loading} data={leaders} label="Pole Position" format={() => null}/>;
}