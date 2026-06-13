import type { ReactNode } from 'react';

import type { AppTeamColor, Team } from '@/gql/graphql';

// Loose data bags; x/y projected later via mapLineSerieValues
export type AllowedAxisValue = string | number | Date;
export type Datum = {
	x?: AllowedAxisValue;
	y?: AllowedAxisValue;
	// biome-ignore lint/suspicious/noExplicitAny: intentional loose data-bag — chart data carries dynamically-keyed fields the chart-helper layer (mapLineSerieValues/maxValue) reads and projects; `unknown` here cascades into those helpers
	[key: string]: any;
};

export type Serie = {
	id: string | number;
	data: Datum[];
	// biome-ignore lint/suspicious/noExplicitAny: intentional loose data-bag (see Datum) — dynamically-keyed serie fields consumed by the chart-helper layer
	[key: string]: any;
};

export type ActiveChart = string | number;

export type ChartSwitcherChart = {
	id: string | number;
	label: string;
	chart: ReactNode;
};

export type DataWithTeamInfo = {
	teamId: Team['id'];
	color: AppTeamColor['primaryHex'];
	[key: string]: unknown;
};

export type SerieWithTeamAndData = Serie & {
	teamId: DataWithTeamInfo['teamId'];
	color: DataWithTeamInfo['color'];
	rawData: Omit<DataWithTeamInfo, 'teamId' | 'color'>;
};

export interface MutableSerie extends Serie {
	data: Datum[];
}

export type MutableSerieDataKey = keyof MutableSerie['data'][number];
