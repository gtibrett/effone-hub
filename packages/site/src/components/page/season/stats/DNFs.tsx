import {StatCard} from '@/components/app';
import {gql, useQuery} from '@apollo/client';
import {Season} from '@/gql/graphql';
import {SeasonStatProps} from './index';

type Data = {
	season: Pick<Season, 'racesByYear'> | null;
}

const query = gql`
	query SeasonDNFsQuery($season: Int!) {
		season(year: $season) {
			racesByYear {
				nodes {
					rowId
					raceResults {
						nodes {
							driverId
							reasonRetired
						}
					}
				}
			}
		}
	}
`;

export default function DNFs({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<string, number>();

	(data?.season?.racesByYear?.nodes || []).forEach(r => {
		(r?.raceResults?.nodes || []).forEach(rs => {
			if (rs?.driverId && rs?.reasonRetired != null) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders} label="Most DNFs"/>;
}