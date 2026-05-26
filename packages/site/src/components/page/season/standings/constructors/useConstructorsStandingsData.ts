import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';

import { useFallbackColor } from '@/components/ui';

import { Entity, RaceStandingsWithEntities } from '../charts';

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
	raceTeamStandings: RaceConstructorStandingNode[];
};

type ConstructorStandingsQueryData = {
	season: {
		racesByYear: RaceNode[];
	} | null;
};

const useMapConstructorToEntity = () => {
	const fallbackColor = useFallbackColor();

	return useCallback(
		(constructor: ConstructorNode): Entity => ({
			id: constructor.rowId,
			name: constructor.name || '',
			color: constructor.colors?.primaryHex || fallbackColor
		}),
		[fallbackColor]
	);
};

const query = gql`
	query constructorStandingsQuery($season: Int!) {
		season(year: $season) {
			racesByYear(orderBy: ROUND_ASC) {
				id
				round
				raceTeamStandings(orderBy: POSITION_NUMBER_ASC) {
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
`;

export default function useConstructorStandingsData(season: number) {
	const { data } = useSuspenseQuery<ConstructorStandingsQueryData>(query, {
		variables: { season }
	});
	const mapConstructorToEntity = useMapConstructorToEntity();

	const chartData: RaceStandingsWithEntities[] = (data?.season?.racesByYear ?? []).map(r => {
		const standings = r.raceTeamStandings
			.filter(cs => cs.team)
			.map(({ teamId, positionNumber, points, team }) => ({
				id: teamId,
				position: Number(positionNumber),
				points: Number(points),
				entity: mapConstructorToEntity(team as ConstructorNode)
			}));

		return {
			round: r.round,
			standings
		};
	});

	return { data, chartData };
}
