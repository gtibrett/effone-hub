import { ReactNode } from 'react';
import { AllowedValue } from '@nivo/line';

import { AppTeamColor, Team } from '@/gql/graphql';

// nivo 0.88 dropped exported Serie/Datum; app uses loose data bags (x/y projected later via mapLineSerieValues)
export type Datum = {
	x?: AllowedValue;
	y?: AllowedValue;
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
