import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { StatCard } from '@/components/app';

type ResultNode = {
	driverId: string | null;
	points: string | null;
};

type Data = {
	season: {
		racesByYear: {
			raceResults: ResultNode[];
			sprintRaceResults: ResultNode[];
		}[];
	} | null;
};

const query = gql`
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
	constructorId: string;
	season: number;
	place: 1 | 2;
};

export default function DriverPoints({ constructorId, season, place }: DriverPointsProps) {
	const { data, loading } = useQuery<Data>(query, { variables: { constructorId, season } });
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
			loading={loading}
			data={
				new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))
			}
			label="Points"
		/>
	);
}
