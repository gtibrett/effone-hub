import {useMemo} from 'react';
import {feature} from 'topojson-client';

export default function useLand() {
	const land = require('world-atlas/land-110m.json');
	
	return useMemo(() => {
		const geoJSON     = feature(land, land.objects.land);
		// @ts-ignore
		const landFeature = geoJSON.features[0];
		landFeature.id    = 'land';
		
		return landFeature;
	}, [land]);
}