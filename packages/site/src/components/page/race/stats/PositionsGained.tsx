import {StatCard} from '@/components/app';
import {gql, useQuery} from '@apollo/client';
import {Result} from '@/gql/graphql';
import {RaceStatProps} from './index';

type Data = {
	races: {
		results: Pick<Result, 'driverId' | 'grid' | 'positionOrder'>[]
	}[]
}

const query = gql`
	query racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {
		races (condition: {year: $season, round: $round}) {
			results {
				driverId
				grid
				positionOrder
			}
		}
	}
`;

export default function PositionsGained({season, round, size}: RaceStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season, round}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.results.forEach(({driverId, grid, positionOrder}) => {
			if (grid && positionOrder && driverId) {
				leaders.set(driverId, (leaders.get(driverId) || 0) + (grid - positionOrder));
			}
		});
	});
	
	return <StatCard size={size} loading={loading} data={leaders} label="Most Positions Gained"/>;
}