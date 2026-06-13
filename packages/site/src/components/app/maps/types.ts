import type { Circuit } from '@/gql/graphql';

export type Point = {
	id: string | number;
	lng: Circuit['longitude'];
	lat: Circuit['latitude'];
	name: string;
	pointRadius?: number;
	properties: {
		// biome-ignore lint/suspicious/noExplicitAny: geojson-style feature properties bag, dynamically keyed
		[key: string]: any;
	};
};
