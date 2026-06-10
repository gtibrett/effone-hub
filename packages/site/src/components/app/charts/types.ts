import { ReactNode } from 'react';

import { AppTeamColor, Team } from '@/gql/graphql';

// Loose data bags; x/y projected later via mapLineSerieValues
export type AllowedAxisValue = string | number | Date;
export type Datum = {
	x?: AllowedAxisValue;
	y?: AllowedAxisValue;
	[key: string]: any;
};

export type Serie = {
	id: string | number;
	data: Datum[];
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
