import { gql } from '@apollo/client';

import type { ConstructorDriverPointsData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

// Exported for cached-data.ts import
export const ConstructorDriverPointsQuery = gql`
	query ConstructorDriverPointsQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			year
			racesByYear {
				year
				round
				raceResults(condition: {teamId: $constructorId}) {
					raceId
					driverId
					points
				}
				sprintRaceResults(condition: {teamId: $constructorId}) {
					raceId
					driverId
					points
				}
			}
		}
	}
`;

type DriverPointsProps = {
	data: ConstructorDriverPointsData;
	place: 1 | 2;
};

export default function DriverPoints({ data, place }: DriverPointsProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		[...r.raceResults, ...r.sprintRaceResults].forEach(rs => {
			if (rs.driverId) {
				leaders.set(
					rs.driverId,
					(leaders.get(rs.driverId) || 0) + parseFloat(rs.points || '0')
				);
			}
		});
	});

	return (
		<StatCard
			loading={false}
			data={
				new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))
			}
			label="Points"
		/>
	);
}
