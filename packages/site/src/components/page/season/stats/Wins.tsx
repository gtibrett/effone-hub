import {StatCard} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {Season} from '@/gql/graphql';
import {SeasonStatProps} from './index';

type Data = {
	season: Pick<Season, 'racesByYear'> | null;
}

const query = gql`
	query SeasonWinsQuery($season: Int!) {
		season(year: $season) {
			racesByYear {
				nodes {
					rowId
					raceResults(condition: {positionNumber: 1}, first: 1) {
						nodes {
							driverId
						}
					}
				}
			}
		}
	}
`;

export default function Wins({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<string, number>();

	(data?.season?.racesByYear?.nodes || []).forEach(r => {
		(r?.raceResults?.nodes || []).forEach(rs => {
			if (rs?.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders as unknown as Map<DriverId, number>} label="Most Wins"/>;
}
