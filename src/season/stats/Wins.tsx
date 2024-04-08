import {gql, useQuery} from '@apollo/client';
import {DriverId} from '@effonehub/driver';
import {StatCard} from '@effonehub/ui-components';
import {SeasonStatProps} from './index';

type Data = {
	races: {
		results: {
			driverId: DriverId
		}[]
	}[]
}

const query = gql`
	query seasonWinsLeaderQuery($season: Int!) {
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			results (condition: {positionOrder: 1}) {
				driverId
			}
		}
	}
`;

export default function Wins({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.results.forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});
	
	return <StatCard size={size} loading={loading} data={leaders} label="Most Wins"/>;
}