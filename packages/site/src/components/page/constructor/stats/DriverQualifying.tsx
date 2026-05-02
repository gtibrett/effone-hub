import {StatCard} from '@/components/app';
import {gql, useQuery} from '@apollo/client';

type QualifyingResultNode = {
	driverId: string;
	positionNumber: number | null;
	driver: {
		id: string;
		fullName: string;
	} | null;
};

type Data = {
	season: {
		racesByYear: {
			nodes: {
				rowId: number;
				round: number;
				qualifyingResults: {
					nodes: QualifyingResultNode[];
				};
			}[];
		};
	} | null;
};

const query = gql`
	query ConstructorDriverQualifyingQuery($season: Int!, $constructorId: String!) {
		season(year: $season) {
			racesByYear {
				nodes {
					rowId
					round
					qualifyingResults(filter: {constructorId: {equalTo: $constructorId}}, orderBy: POSITION_NUMBER_ASC) {
						nodes {
							driverId
							positionNumber
							driver { id fullName }
						}
					}
				}
			}
		}
	}
`;

type DriverQualifyingProps = {
	constructorId: string;
	season: number;
	place: 1 | 2;
};

export default function DriverQualifying({constructorId, season, place}: DriverQualifyingProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {constructorId, season}});
	const leaders         = new Map<string, number>();

	(data?.season?.racesByYear?.nodes || []).forEach(r => {
		const nodes = r.qualifyingResults.nodes;
		if (nodes.length) {
			let isFirst = true;
			nodes.forEach(({driverId}) => {
				if (driverId) {
					leaders.set(driverId, (leaders.get(driverId) || 0) + (isFirst ? 1 : 0));
					isFirst = false;
				}
			});
		}
	});

	return <StatCard loading={loading} data={new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))} label="Qualifying"/>;
}
