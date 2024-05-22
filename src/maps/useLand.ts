import {useMemo} from 'react';
import {feature} from 'topojson-client';

const land = require('world-atlas/land-110m.json');

export default function useLand() {
	return useMemo(() => {
		const geoJSON     = feature(land, land.objects.land);
		// @ts-ignore
		const landFeature = geoJSON.features[0];
		landFeature.id    = 'land';
		
		return landFeature;
	}, []);
}