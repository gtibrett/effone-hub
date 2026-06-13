import type { Circuit, Driver } from '@/gql/graphql';

export type CircuitData = Pick<Circuit, 'id' | 'fullName' | 'longitude' | 'latitude'> & {
	races: {
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
				id: string;
				colors?: { primaryHex?: string | null } | null;
			} | null;
		}[];
		lapTimes: {
			lap: number;
			timeMillis?: number | null;
		}[];
	}[];
};

export type CircuitDialogData = {
	circuit: CircuitData;
	driver: Pick<Driver, 'id'> & {
		seasonEntrantDrivers: {
			year: number;
			constructor?: { id: string; colors?: { primaryHex?: string | null } | null } | null;
		}[];
	};
};
