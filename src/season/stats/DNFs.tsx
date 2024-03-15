import {gql, useQuery} from '@apollo/client';
import {StatCard} from '@ui-components';
import {DriverId} from '../../driver';
import {SeasonStatProps} from './index';

type Data = {
	races: {
		results: {
			driverId: DriverId
		}[]
	}[]
}

const query = gql`
	query seasonDNFsLeaderQuery($season: Int!) {
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			results (condition: {position: null}) {
				driverId
			}
		}
	}
`;

export default function DNFs({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.results.forEach(rs => {
			leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
		});
	});
	
	return <StatCard size={size} loading={loading} data={leaders} label="Most DNFs"/>;
}