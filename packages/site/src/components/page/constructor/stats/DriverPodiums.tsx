import {StatCard} from '@/components/app';
import { gql } from '@apollo/client';

import { useQuery } from "@apollo/client/react";

type RaceResultNode = {
	driverId: string | null;
	positionNumber: number | null;
};

type RaceNode = {
	rowId: number;
	raceResults: { nodes: RaceResultNode[] };
};

type QueryResponse = {
	season: {
		racesByYear: { nodes: RaceNode[] };
	} | null;
};

const query = gql`
	query constructorDriverPodiumsQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			racesByYear(orderBy: ROUND_ASC) {
				nodes {
					id
					rowId
					raceResults(condition: {teamId: $constructorId}) {
						nodes {
							id
							driverId
							positionNumber
						}
					}
				}
			}
		}
	}
`;

type DriverPodiumsProps = {
	constructorId: string;
	season: number;
	place: 1 | 2;
};

export default function DriverPodiums({constructorId, season, place}: DriverPodiumsProps) {
	const {data, loading} = useQuery<QueryResponse>(query, {variables: {constructorId, season}});
	const leaders         = new Map<string, number>();

	(data?.season?.racesByYear?.nodes ?? []).forEach(race => {
		race.raceResults.nodes.forEach(result => {
			if (result.driverId && result.positionNumber != null && result.positionNumber <= 3) {
				leaders.set(result.driverId, (leaders.get(result.driverId) ?? 0) + 1);
			}
		});
	});

	return <StatCard loading={loading} data={new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))} label="Podiums"/>;
}
