import { useCallback } from 'react';
import { useSuspenseQuery } from '@apollo/client/react';

import { useFallbackColor } from '@/components/ui';

import type { Entity, RaceStandingsWithEntities } from '../charts';
import type { SeasonTeamStandingNode } from './queries';
import { constructorStandingsQuery } from './queries';

export type {
	SeasonTeamStandingColors,
	SeasonTeamStandingNode,
	SeasonTeamStandingTeamNode
} from './queries';

type ConstructorColors = {
	primaryHex: string | null;
};

type ConstructorNode = {
	id: string;
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
		seasonTeamStandingsByYear: SeasonTeamStandingNode[];
		racesByYear: RaceNode[];
	} | null;
};

const useMapConstructorToEntity = () => {
	const fallbackColor = useFallbackColor();

	return useCallback(
		(constructorNode: ConstructorNode): Entity => ({
			id: constructorNode.id,
			name: constructorNode.name || '',
			color: constructorNode.colors?.primaryHex || fallbackColor
		}),
		[fallbackColor]
	);
};

export default function useConstructorStandingsData(season: number) {
	const { data } = useSuspenseQuery<ConstructorStandingsQueryData>(constructorStandingsQuery, {
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
