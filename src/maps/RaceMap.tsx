import {Location} from '@gtibrett/effone-hub-api';
import {alpha, Box, Skeleton, useTheme} from '@mui/material';
import {GeoMapEventHandler, ResponsiveGeoMap} from '@nivo/geo';
import {useEffect, useState} from 'react';
import {NivoTooltip, useNivoTheme} from '../ui-components/nivo';
import useComponentDimensionsWithRef from '../ui-components/useComponentDimensions';
import MapTooltip from './MapTooltip';
import {Point} from './types';
import useLand from './useLand';

type RaceMapProps = {
	points: Point[];
	onClick?: GeoMapEventHandler;
	height?: number | 'auto';
	width?: number | 'auto';
	centerOn?: Pick<Location, 'long' | 'lat'>;
	zoom?: boolean;
}

const mapPointsToFeatures = (points: Point[]) => {
	return points.map((feature) => ({
		'type':       'Feature',
		'properties': {
			'name': feature.name,
			...feature.properties
		},
		'geometry':   {
			'type':        'Point',
			'coordinates': [
				feature.long,
				feature.lat
			]
		},
		'id':         feature.id
	}));
};

type Translation = [number, number];

const calculateXTranslation = (long: number, scale: number = 1) => {
	return .5 + (long * -1) / 180 * scale;
};

const calculateYTranslation = (lat: number, scale: number = 1) => {
	return .5 + (lat / 90) * scale;
};

export default function RaceMap({points, onClick, height = 300, width = 'auto', centerOn = {long: '0', lat: '0'}, zoom = false}: RaceMapProps) {
	const nivoTheme                     = useNivoTheme();
	const theme                         = useTheme();
	const land                          = useLand();
	const {ref, dimensions, node}       = useComponentDimensionsWithRef();
	const pointFeatures                 = mapPointsToFeatures(points);
	const [translation, setTranslation] = useState<Translation>([.5, .5]);
	const [ready, setReady]             = useState<boolean>(false);
	
	useEffect(() => {
		if (node) {
			setTimeout(() => {
				const g = node.querySelector('svg>g:first-of-type');
				if (g && dimensions.width) {
					const {width, height} = g.getBoundingClientRect();
					const xScale          = ((width / 2) / dimensions.width);
					const yScale          = ((height / 2) / dimensions.height);
					
					setTranslation([calculateXTranslation(Number(centerOn?.long), xScale), calculateYTranslation(Number(centerOn?.lat), yScale)]);
					setReady(true);
				}
			}, 200);
		}
	}, [centerOn, node, dimensions.height, dimensions.width]);
	
	return (
		<Box ref={ref} sx={{position: 'relative', height, width}} aria-hidden>
			<Box sx={{opacity: !ready ? 0 : 1, height, width}}>
				<ResponsiveGeoMap
					theme={nivoTheme}
					features={[land, ...pointFeatures]}
					margin={{top: 0, right: 0, bottom: 0, left: 0}}
					projectionType="equirectangular"
					projectionTranslation={translation}
					projectionScale={zoom ? 500 : 100}
					borderWidth={0.5}
					borderColor={theme.palette.primary.main}
					tooltip={NivoTooltip(MapTooltip)}
					fillColor={(feature) => {
						if (feature?.geometry?.type === 'Point') {
							return theme.palette.secondary.main;
						} else {
							return alpha(theme.palette.primary.light, .25);
						}
					}}
					onClick={onClick}
				/>
			</Box>
			{!ready && <Skeleton variant="rectangular" height={height} sx={{position: 'absolute', top: 0, left: 0, right: 0}}/>}
		</Box>
	);
};