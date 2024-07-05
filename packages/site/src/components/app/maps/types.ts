import {Circuit} from '@/gql/graphql';

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