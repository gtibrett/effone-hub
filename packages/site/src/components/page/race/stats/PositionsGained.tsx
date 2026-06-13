import { gql } from '@apollo/client';

import type { RacePositionsGainedData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';
import type { RaceResult } from '@/gql/graphql';

import type { RaceStatProps } from './types';

// Exported so cached-data.ts can reuse the same document for SSR prefetch.
export const racePositionsGainedLeaderQuery = gql`
	query racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
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
`;

type ResultNode = Pick<RaceResult, 'driverId' | 'gridPositionNumber' | 'positionNumber'>;

type Props = RaceStatProps & { data: RacePositionsGainedData };

export default function PositionsGained({ data, size }: Props) {
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

	return <StatCard size={size} loading={false} data={leaders} label="Most Positions Gained" />;
}
