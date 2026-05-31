import { FC } from 'react';
import { BumpComputedSerie, BumpDatum, BumpSerie } from '@nivo/bump';
import { LineSeries, Point } from '@nivo/line';

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

type BumpChartExtraProps = {
	entity: {
		id: string;
		name: string;
	};
	color: string;
};

type StandingsWithEntityBumpDatum = BumpDatum & {
	data?: StandingWithEntity;
};

export type StandingsChartSerie = BumpSerie<StandingsWithEntityBumpDatum, BumpChartExtraProps>;
export type PositionsChartTooltipProps = {
	serie: BumpComputedSerie<StandingsWithEntityBumpDatum, BumpChartExtraProps>;
};

export type PointTooltipProps = {
	point: Point<LineSeries> & {
		data: Point<LineSeries>['data'] & {
			data: StandingWithEntity;
		};
	};
};
