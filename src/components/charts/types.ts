import {Team} from '@gtibrett/effone-hub-graph-api';
import {Datum, Serie} from '@nivo/line';
import {ReactNode} from 'react';

export type ActiveChart = string | number;

export type ChartSwitcherChart = {
	id: string | number;
	label: string;
	chart: ReactNode;
}

export type DataWithTeamInfo = {
	teamId: Team['teamId'];
	color: Team['colors']['primary'];
	[key: string]: any;
}

export type SerieWithTeamAndData = Serie & {
	teamId: DataWithTeamInfo['teamId'];
	color: DataWithTeamInfo['color'];
	rawData: Omit<DataWithTeamInfo, 'teamId' | 'color'>
}

export interface MutableSerie extends Serie {
	data: Datum[];
}

export type MutableSerieDataKey = keyof MutableSerie['data'][number];