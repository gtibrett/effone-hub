import {Circuit} from '@gtibrett/effone-hub-graph-api';

export type Point = {
	id: string | number;
	lng: Circuit['lng'];
	lat: Circuit['lat'];
	name: string;
	pointRadius?: number;
	properties: {
		[key: string]: any
	}
}