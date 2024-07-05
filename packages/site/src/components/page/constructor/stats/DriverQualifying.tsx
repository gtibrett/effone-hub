import {StatCard} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {Team} from '@/gql/graphql';

type Data = {
	races: {
		qualifyings: {
			driverId: DriverId;
			position: number;
			driver: {
				currentTeam: {
					teamId: number
				}
			}
		}[]
	}[]
}

const query = gql`
	query driverQualifying($season: Int!) {
		races (condition: {year: $season},orderBy: ROUND_ASC) {
			qualifyings (orderBy: POSITION_ASC) {
				driverId
				position
				driver {
					currentTeam {
						teamId
					}
				}
			}
		}
	}
`;

type DriverPointsProps = {
	teamId: Team['teamId'];
	season: number;
	place: 1 | 2
}

export default function DriverQualifying({teamId, season, place}: DriverPointsProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {teamId, season}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		const teamQualyfings = r.qualifyings.filter(q => q.driver.currentTeam.teamId === teamId);
		
		if (teamQualyfings.length) {
			let isFirst = true;
			teamQualyfings.forEach(({driverId}) => {
				if (driverId) {
					leaders.set(driverId, (leaders.get(driverId) || 0) + (isFirst ? 1 : 0));
					isFirst = false;
				}
			});
		}
	});
	
	return <StatCard loading={loading} data={new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))} label="Qualifying"/>;
}