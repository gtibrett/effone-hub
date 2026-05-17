import {useFallbackColor} from '@/components/ui';
import {useGetAccessibleColor} from '@/hooks';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from "@apollo/client/react";
import {useCallback} from 'react';
import {Entity, RaceStandingsWithEntities} from '../charts';

type ConstructorColors = {
	primaryHex: string | null;
};

type ConstructorNode = {
	rowId: string;
	name: string | null;
	colors: ConstructorColors | null;
};

type RaceConstructorStandingNode = {
	teamId: string;
	positionNumber: number | null;
	points: string;
	team: ConstructorNode | null;
};

type RaceNode = {
	round: number;
	raceTeamStandings: { nodes: RaceConstructorStandingNode[] };
};

type ConstructorStandingsQueryData = {
	season: {
		racesByYear: { nodes: RaceNode[] };
	} | null;
};

const useMapConstructorToEntity = () => {
	const getAccessibleColor = useGetAccessibleColor();
	const fallbackColor      = useFallbackColor();

	return useCallback((constructor: ConstructorNode): Entity => ({
		id:    constructor.rowId,
		name:  constructor.name || '',
		color: getAccessibleColor(constructor.colors?.primaryHex || fallbackColor, false)
	}), [getAccessibleColor, fallbackColor]);
};

const query = gql`
	query constructorStandingsQuery($season: Int!) {
		season(year: $season) {
			racesByYear(orderBy: ROUND_ASC) {
				nodes {
					id
					round
					raceTeamStandings(orderBy: POSITION_NUMBER_ASC) {
						nodes {
							id
							teamId
							positionNumber
							points
							team {
								id
								rowId
								name
								colors {
									id
									primaryHex
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default function useConstructorStandingsData(season: number) {
	const {data}                  = useSuspenseQuery<ConstructorStandingsQueryData>(query, {variables: {season}});
	const mapConstructorToEntity  = useMapConstructorToEntity();

	const chartData: RaceStandingsWithEntities[] = (data?.season?.racesByYear?.nodes ?? []).map(r => {
		const standings = r.raceTeamStandings.nodes
			.filter(cs => cs.team)
			.map(({teamId, positionNumber, points, team}) => ({
				id:       teamId,
				position: Number(positionNumber),
				points:   Number(points),
				entity:   mapConstructorToEntity(team as ConstructorNode)
			}));

		return {
			round: r.round,
			standings
		};
	});

	return {data, chartData};
}
