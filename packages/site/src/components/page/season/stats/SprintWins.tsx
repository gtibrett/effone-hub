import {StatCard} from '@/components/app';
import {gql, useQuery} from '@apollo/client';
import {SeasonStatProps} from './index';

type Data = {
	season: {
		racesByYear: {
			nodes: {
				rowId: number
				sprintRaceResults: {
					nodes: {
						driverId: string
					}[]
				}
			}[]
		}
	} | null
}

const query = gql`
	query SeasonSprintWinsQuery($season: Int!) {
		season(year: $season) {
			racesByYear {
				nodes {
					rowId
					sprintRaceResults(condition: {positionNumber: 1}, first: 1) {
						nodes {
							driverId
						}
					}
				}
			}
		}
	}
`;

export default function SprintWins({season, size}: SeasonStatProps) {
	const {data, loading} = useQuery<Data>(query, {variables: {season}});
	const leaders         = new Map<string, number>();

	(data?.season?.racesByYear.nodes || []).forEach(r => {
		r.sprintRaceResults.nodes.forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={loading} data={leaders} label="Most Sprint Wins"/>;
}
