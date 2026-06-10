import { useMemo } from 'react';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { feature } from 'topojson-client';

const land = require('world-atlas/land-110m.json');

// react-simple-maps' <Geographies> expects either a topojson object or a
// GeoJSON FeatureCollection — wrap the single land feature in a collection.
export default function useLand(): FeatureCollection<Geometry, { name?: string }> {
	return useMemo(() => {
		const converted = feature(land, land.objects.land) as
			| Feature<Geometry, { name?: string }>
			| FeatureCollection<Geometry, { name?: string }>;
		if ('features' in converted) {
			return converted;
		}
		return {
			type: 'FeatureCollection',
			features: [{ ...converted, id: 'land' }]
		};
	}, []);
}
