import {StatCard} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';

type ResultNode = {
	driverId: string | null;
	points: string | null;
};

type Data = {
	season: {
		racesByYear: {
			nodes: {
				raceResults: { nodes: ResultNode[] };
				sprintRaceResults: { nodes: ResultNode[] };
			}[];
		};
	} | null;
};

const query = gql`
	query ConstructorDriverPointsQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			racesByYear {
				nodes {
					raceResults(condition: {constructorId: $constructorId}) {
						nodes {
							driverId
							points
						}
					}
					sprintRaceResults(condition: {constructorId: $constructorId}) {
						nodes {
							driverId
							points
						}
					}
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

export default function DriverPoints({constructorId, season, place}: DriverPointsProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {constructorId, season}});
	const leaders         = new Map<string, number>();

	(data?.season?.racesByYear?.nodes || []).forEach(r => {
		[...r.raceResults.nodes, ...r.sprintRaceResults.nodes].forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + parseFloat(rs.points || '0'));
			}
		});
	});

	return <StatCard loading={loading} data={new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place)) as unknown as Map<DriverId, number>} label="Points"/>;
}