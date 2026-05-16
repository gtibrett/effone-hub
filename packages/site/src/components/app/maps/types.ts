import {Circuit} from '@/gql/graphql';

export type Point = {
	id: string | number;
	lng: Circuit['longitude'];
	lat: Circuit['latitude'];
	name: string;
	pointRadius?: number;
	properties: {
		[key: string]: any
	}
}