import { FC } from 'react';

import { Race } from '@/gql/graphql';

export type Entity = {
	id: string;
	name: string;
	color?: string;
};

export type StandingWithEntity = {
	id: string | number;
	entity: Entity;
	points: number;
	position: number;
};

export interface RaceStandingsWithEntities {
	round: Race['round'];
	standings: StandingWithEntity[];
}

// Chart Types
export type ChartMode = 'position' | 'points';

export type ChartProps = {
	data: RaceStandingsWithEntities[];
	TooltipComponent: FC<any>;
};

// Per-round chart datum (synthesized inside the per-chart hook). Each datum
// keeps a back-reference to its source StandingWithEntity so tooltips can
// recover the full row from a (seriesId, dataIndex) pair.
type StandingsChartDatum = {
	x: number;
	y: number | null;
	data?: StandingWithEntity;
};

export type StandingsChartSerie = {
	id: string;
	entity: Entity;
	color: string;
	data: StandingsChartDatum[];
};

// Synthesized by Positions/PointsChart tooltip slots. Keep the same shape
// the legacy nivo BumpSerie / Point tooltips received so the per-page
// tooltip components don't need to change beyond their import lines.
export type PositionsChartTooltipProps = {
	serie: { data: StandingWithEntity };
};

export type PointTooltipProps = {
	point: {
		data: {
			x: number | string;
			data: StandingWithEntity;
		};
	};
};
