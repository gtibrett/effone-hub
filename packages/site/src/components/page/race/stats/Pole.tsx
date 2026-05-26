import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';
import { DriverId } from '@/types';

import { RaceStatProps } from './index';

type Data = {
	races: {
		nodes: {
			qualifyingResults: {
				nodes: {
					driverId: DriverId;
				}[];
			};
		}[];
	};
};

const query = gql`
	query racePolesLeaderQuery($season: Int!, $round: Int!) {
		races (condition: {year: $season, round: $round}) {
			nodes {
				id
				qualifyingResults (condition: {positionNumber: 1}, first: 1) {
					nodes {
						id
						driverId
					}
				}
			}
		}
	}
`;

export default function Pole({ season, round, size }: RaceStatProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { season, round } });
	const leaders = new Map<string, number>();

	(data?.races?.nodes || []).forEach(r => {
		(r.qualifyingResults?.nodes || []).forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId as string, (leaders.get(rs.driverId as string) || 0) + 1);
			}
		});
	});

	return (
		<StatCard
			size={size}
			loading={loading}
			data={leaders}
			label="Pole Position"
			format={() => null}
		/>
	);
}
