import {gql, useQuery} from '@apollo/client';
import {DriverId} from '@effonehub/driver';
import {StatCard} from '@effonehub/ui-components';
import {SeasonStatProps} from './index';

type Data = {
	races: {
		qualifyings: {
			driverId: DriverId
		}[]
	}[]
}

const query = gql`
	query seasonPolesLeaderQuery($season: Int!) {
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			qualifyings (condition: {position: 1}) {
				driverId
			}
		}
	}
`;

export default function Poles({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.qualifyings.forEach(rs => {
			leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
		});
	});
	
	return <StatCard size={size} loading={loading} data={leaders} label="Most Poles"/>;
}