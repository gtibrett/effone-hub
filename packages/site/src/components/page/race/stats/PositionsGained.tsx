import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';
import { Race, RaceResult } from '@/gql/graphql';

import { RaceStatProps } from './types';

type Data = {
	race: Pick<Race, 'raceResults'> | null;
};

const query = gql`
	query racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			raceResults {
				id
				driverId
				gridPositionNumber
				positionNumber
			}
		}
	}
`;

type ResultNode = Pick<RaceResult, 'driverId' | 'gridPositionNumber' | 'positionNumber'>;

export default function PositionsGained({ season, round, size }: RaceStatProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { season, round } });
	const leaders = new Map<string, number>();

	((data?.race?.raceResults || []) as Array<ResultNode | null>)
		.filter((r): r is ResultNode => r != null)
		.forEach((r: ResultNode) => {
			const { driverId, gridPositionNumber, positionNumber } = r;
			if (driverId && gridPositionNumber != null && positionNumber != null) {
				leaders.set(
					driverId,
					(leaders.get(driverId) || 0) + (gridPositionNumber - positionNumber)
				);
			}
		});

	return <StatCard size={size} loading={loading} data={leaders} label="Most Positions Gained" />;
}
