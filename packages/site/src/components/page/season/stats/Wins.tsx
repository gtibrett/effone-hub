import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';
import { Season } from '@/gql/graphql';

import { SeasonStatProps } from './index';

type Data = {
	season: Pick<Season, 'racesByYear'> | null;
};

const query = gql`
	query SeasonWinsQuery($season: Int!) {
		season(year: $season) {
			racesByYear {
				id
				rowId
				raceResults(condition: {positionNumber: 1}, first: 1) {
					id
					driverId
				}
			}
		}
	}
`;

export default function Wins({ season, size }: SeasonStatProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { season } });
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		(r?.raceResults || []).forEach(rs => {
			if (rs?.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders} label="Most Wins" />;
}
