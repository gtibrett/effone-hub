import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';
import { Season } from '@/gql/graphql';

import { SeasonStatProps } from './index';

type Data = {
	season: Pick<Season, 'racesByYear'> | null;
};

const query = gql`
	query SeasonPositionsGainedQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				raceResults {
					raceId
					driverId
					gridPositionNumber
					positionNumber
				}
			}
		}
	}
`;

export default function PositionsGained({ season, size }: SeasonStatProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { season } });
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		(r?.raceResults || []).forEach(rs => {
			const { driverId, gridPositionNumber, positionNumber } = rs as {
				driverId?: string;
				gridPositionNumber?: number | null;
				positionNumber?: number | null;
			};
			if (driverId && gridPositionNumber != null && positionNumber != null) {
				leaders.set(
					driverId,
					(leaders.get(driverId) || 0) + (gridPositionNumber - positionNumber)
				);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders} label="Most Positions Gained" />;
}
