import {gql, useQuery} from '@apollo/client';
import {Race, Team} from '@gtibrett/effone-hub-graph-api';
import {Entity, RaceStandingsWithEntities} from '../charts';

type ConstructorsStandingsData = {
	races: Pick<Race, 'round' | 'teamStandings'>[]
};

const mapTeamToEntity = (team: Team): Entity => ({
	id:    team.teamId,
	name:  team.name,
	color: team.colors.primary
});

const query = gql`
	query teamStandingsQuery($season: Int!) {
		races (condition: {year: $season}, orderBy: ROUND_ASC) {
			round
			teamStandings(orderBy: POSITION_ASC) {
				teamId
				points
				position
				team {
					teamId
					name
					colors {
						primary
					}
				}
			}
		}
	}
`;


export default function useConstructorStandingsData(season: number) {
	const {data, loading} = useQuery<ConstructorsStandingsData>(query, {variables: {season}});
	
	const chartData: RaceStandingsWithEntities[] = (data?.races || []).map(r => {
		return {
			round:     r.round,
			standings: r.teamStandings.map(({teamId, position, points, team}) => ({
					id:     teamId,
					position,
					points,
					entity: mapTeamToEntity(team)
				})
			)
		};
	});
	
	return {data, loading, chartData};
}