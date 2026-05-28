import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';

import { SeasonStatProps } from './index';

type Data = {
	season: {
		racesByYear: {
			rowId: number;
			qualifyingResults: {
				driverId: string;
			}[];
		}[];
	} | null;
};

const query = gql`
	query SeasonPolesQuery($season: Int!) {
		season(year: $season) {
			id
			racesByYear {
				id
				rowId
				qualifyingResults(condition: {positionNumber: 1}, first: 1) {
					id
					driverId
				}
			}
		}
	}
`;

export default function Poles({ season, size }: SeasonStatProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { season } });
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		r.qualifyingResults.forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders} label="Most Poles" />;
}
