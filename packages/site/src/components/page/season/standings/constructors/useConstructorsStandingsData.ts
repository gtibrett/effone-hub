import {useGetTeamColor} from '@/hooks';
import {gql, useSuspenseQuery} from '@apollo/client';
import {Race, Team} from '@gtibrett/effone-hub-graph-api';
import {useCallback} from 'react';
import {Entity, RaceStandingsWithEntities} from '../charts';

type ConstructorsStandingsData = {
	races: Pick<Race, 'round' | 'teamStandings'>[]
};

const useMapTeamToEntity = () => {
	const getTeamColor = useGetTeamColor();
	return useCallback((team: Team): Entity => ({
		id:    team.teamId,
		name:  team.name || '',
		color: getTeamColor(team.colors, 'primary', false)
	}), [getTeamColor]);
};

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
	const {data}          = useSuspenseQuery<ConstructorsStandingsData>(query, {variables: {season}});
	const mapTeamToEntity = useMapTeamToEntity();
	
	const chartData: RaceStandingsWithEntities[] = (data?.races || []).map(r => {
		return {
			round:     r.round,
			standings: r.teamStandings
			            .filter(ts => ts.team)
			            .map(({teamId, position, points, team}) => ({
					            id:       teamId + '',
					            position: Number(position),
					            points:   Number(points),
					            entity:   mapTeamToEntity(team as Team)
				            })
			            )
		};
	});
	
	return {data, chartData};
}