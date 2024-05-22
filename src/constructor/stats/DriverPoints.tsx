import {gql, useQuery} from '@apollo/client';
import {DriverId} from '@effonehub/driver';
import {StatCard} from '@effonehub/ui-components';
import {Team} from '@gtibrett/effone-hub-graph-api';

type Data = {
	races: {
		results: {
			driverId: DriverId;
			points: number;
		}[]
	}[]
}

const query = gql`
	query driverSeasonStatsByConstructor($season: Int!, $teamId: Int!) {
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			results (condition: {teamId: $teamId}) {
				driverId
				points
			}
		}
	}
`;

type DriverPointsProps = {
	teamId: Team['teamId'];
	season: number;
	place: 1 | 2
}

export default function DriverPoints({teamId, season, place}: DriverPointsProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {teamId, season}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.results.forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + rs.points);
			}
		});
	});
	
	return <StatCard loading={loading} data={new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))} label="Points"/>;
}