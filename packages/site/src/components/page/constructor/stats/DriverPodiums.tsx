import { gql } from '@apollo/client';

import type { ConstructorDriverPodiumsData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

// Exported for cached-data.ts import
export const ConstructorDriverPodiumsQuery = gql`
	query constructorDriverPodiumsQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			year
			racesByYear(orderBy: ROUND_ASC) {
				rowId
				year
				round
				raceResults(condition: {teamId: $constructorId}) {
					raceId
					driverId
					positionNumber
				}
			}
		}
	}
`;

type DriverPodiumsProps = {
	data: ConstructorDriverPodiumsData;
	place: 1 | 2;
};

export default function DriverPodiums({ data, place }: DriverPodiumsProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear ?? []).forEach(race => {
		race.raceResults.forEach(result => {
			if (result.driverId && result.positionNumber != null && result.positionNumber <= 3) {
				leaders.set(result.driverId, (leaders.get(result.driverId) ?? 0) + 1);
			}
		});
	});

	return (
		<StatCard
			loading={false}
			data={
				new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))
			}
			label="Podiums"
		/>
	);
}
