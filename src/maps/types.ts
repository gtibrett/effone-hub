import {Location} from '@gtibrett/effone-hub-api';

export type Point = {
	id: string | number;
	long: Location['long'];
	lat: Location['lat'];
	name: string;
	properties: {
		[key: string]: any
	}
}