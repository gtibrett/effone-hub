import {useFallbackColor} from '@/components/ui';
import {useGetAccessibleColor} from '@/hooks';
import {gql, useSuspenseQuery} from '@apollo/client';
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
	constructorId: string;
	positionNumber: number | null;
	points: string;
	constructor: ConstructorNode | null;
};

type RaceNode = {
	round: number;
	raceConstructorStandings: { nodes: RaceConstructorStandingNode[] };
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
					round
					raceConstructorStandings(orderBy: POSITION_NUMBER_ASC) {
						nodes {
							constructorId
							positionNumber
							points
							constructor {
								rowId
								name
								colors {
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
		const standings = r.raceConstructorStandings.nodes
			.filter(cs => cs.constructor)
			.map(({constructorId, positionNumber, points, constructor}) => ({
				id:       constructorId,
				position: Number(positionNumber),
				points:   Number(points),
				entity:   mapConstructorToEntity(constructor as ConstructorNode)
			}));

		return {
			round: r.round,
			standings
		};
	});

	return {data, chartData};
}
