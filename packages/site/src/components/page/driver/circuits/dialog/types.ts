import { Circuit, Driver } from '@/gql/graphql';

export type CircuitData = Pick<Circuit, 'rowId' | 'fullName' | 'longitude' | 'latitude'> & {
	races: {
		nodes: {
			rowId: number;
			year: number;
			date?: string | null;
			results: {
				gridPositionNumber?: number | null;
				positionDisplayOrder?: number | null;
				positionText?: string | null;
				points?: number | null;
				timeMillis?: number | null;
				reasonRetired?: string | null;
				constructor?: {
					rowId: string;
					colors?: { primaryHex?: string | null } | null;
				} | null;
			}[];
			lapTimes: {
				nodes: {
					lap: number;
					timeMillis?: number | null;
				}[];
			};
		}[];
	};
};

export type CircuitDialogData = {
	circuit: CircuitData;
	driver: Pick<Driver, 'id'> & {
		seasonEntrantDrivers: {
			nodes: {
				year: number;
				constructor?: { id: string; colors?: { primaryHex?: string | null } | null } | null;
			}[];
		};
	};
};
