import {Race} from '@gtibrett/effone-hub-graph-api';
import {BumpComputedSerie, BumpDatum, BumpSerie} from '@nivo/bump';
import {Point} from '@nivo/line';
import {FC} from 'react';

export type Entity = {
	id: number;
	name: string;
	color?: string;
}

export type StandingWithEntity = {
	id: string | number;
	entity: Entity;
	points: number;
	position: number;
}

export interface RaceStandingsWithEntities {
	round: Race['round'];
	standings: StandingWithEntity[];
}

// Chart Types
export type ChartMode = 'position' | 'points';

export type ChartProps = {
	data: StandingsChartSerie[];
	TooltipComponent: FC<any>
}

type BumpChartExtraProps = {
	entity: {
		id: number;
		name: string;
	}
	color: string;
}

type StandingsWithEntityBumpDatum = BumpDatum & {
	data?: StandingWithEntity
}

export type StandingsChartSerie = BumpSerie<StandingsWithEntityBumpDatum, BumpChartExtraProps>;
export type PositionsChartTooltipProps = {
	serie: BumpComputedSerie<StandingsWithEntityBumpDatum, BumpChartExtraProps>
};

export type PointTooltipProps = {
	point: Point & {
		data: Point['data'] & {
			data: StandingWithEntity
		}
	}
}