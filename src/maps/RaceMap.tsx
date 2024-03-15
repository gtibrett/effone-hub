import {Circuit} from '@gtibrett/effone-hub-graph-api';
import {useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {alpha, Box, Skeleton, useTheme} from '@mui/material';
import {GeoMapEventHandler, ResponsiveGeoMap} from '@nivo/geo';
import {NivoTooltip, useNivoTheme} from '@ui-components';
import {useEffect, useState} from 'react';
import MapTooltip from './MapTooltip';
import {Point} from './types';
import useLand from './useLand';

type RaceMapProps = {
	points: Point[];
	onClick?: GeoMapEventHandler;
	height?: number | 'auto';
	width?: number | 'auto';
	centerOn?: Pick<Circuit, 'lng' | 'lat'>;
	zoom?: boolean;
	highlightNext?: boolean;
}

const mapPointsToFeatures = (points: Point[]) => {
	return points.map((feature) => ({
		'id':         String(feature.id),
		'type':       'Feature',
		'properties': {
			'name': feature.name,
			...feature.properties
		},
		'geometry':   {
			'type':        'Point',
			'coordinates': [
				feature.lng,
				feature.lat
			]
		}
	}));
};

type Translation = [number, number];

const calculateXTranslation = (long: number, scale: number = 1) => {
	return .5 + (long * -1) / 180 * scale;
};

const calculateYTranslation = (lat: number, scale: number = 1) => {
	return .5 + (lat / 90) * scale;
};

export default function RaceMap(props: RaceMapProps) {
	const {points, onClick, height = 300, width = 'auto', centerOn = {lng: 0, lat: 0}, zoom = false, highlightNext = false} = props;
	
	const nivoTheme                           = useNivoTheme();
	const theme                               = useTheme();
	const land                                = useLand();
	const {ref, dimensions, node}             = useComponentDimensionsWithRef();
	const [lastDimensions, setLastDimensions] = useState(dimensions);
	const pointFeatures                       = mapPointsToFeatures(points);
	const [translation, setTranslation]       = useState<Translation>([.5, .5]);
	const [ready, setReady]                   = useState<boolean>(false);
	
	useEffect(() => {
		if (node && (dimensions.width !== lastDimensions.width || dimensions.height !== lastDimensions.height)) {
			setTimeout(() => {
				const g = node.querySelector('svg>g:first-of-type');
				if (g && dimensions.width) {
					const {width, height} = g.getBoundingClientRect();
					const xScale          = ((width / 2) / dimensions.width);
					const yScale          = ((height / 2) / dimensions.height);
					
					setTranslation([calculateXTranslation(Number(centerOn?.lng), xScale), calculateYTranslation(Number(centerOn?.lat), yScale)]);
					setReady(true);
				}
				
				setLastDimensions(dimensions);
			}, 200);
		}
	}, [centerOn, node, dimensions, lastDimensions]);
	
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
					// @ts-ignore
					borderColor={feature => {
						if (feature?.geometry?.type === 'Point') {
							const nextColor = theme.palette.mode === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.light;
							return highlightNext && feature.properties.next ? nextColor : theme.palette.background.paper;
						} else {
							return theme.palette.primary.main;
						}
					}}
					borderWidth={(feature) => {
						if (feature?.geometry?.type === 'Point') {
							return highlightNext && feature.properties.next ? 5 : 1;
						} else {
							return .5;
						}
					}}
					fillColor={(feature) => {
						if (feature?.geometry?.type === 'Point') {
							return highlightNext && feature.properties.next ? theme.palette.background.paper : theme.palette.secondary.main;
						} else {
							return alpha(theme.palette.primary.light, .25);
						}
					}}
					tooltip={NivoTooltip(MapTooltip)}
					onClick={onClick}
				/>
			</Box>
			{!ready && <Skeleton variant="rectangular" height={height} sx={{position: 'absolute', top: 0, left: 0, right: 0}}/>}
		</Box>
	);
};