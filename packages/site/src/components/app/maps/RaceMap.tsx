import { useEffect, useState } from 'react';
import { useComponentDimensionsWithRef } from '@gtibrett/mui-additions';
import { Box } from '@mui/material';
import { GeoMapEventHandler, ResponsiveGeoMap } from '@nivo/geo';

import { alpha } from '@/components/ui/colors';
import { NivoTooltipFactory, RequiredByPropTypes, useNivoTheme } from '@/components/ui/nivo';
import { Circuit } from '@/gql/graphql';
import { cssVar } from '@/lib/tokens';

import MapTooltip from './MapTooltip';
import { Point } from './types';
import useLand from './useLand';

type RaceMapProps = {
	points: Point[];
	onClick?: GeoMapEventHandler;
	height?: number | 'auto';
	width?: number | 'auto';
	centerOn?: Pick<Circuit, 'longitude' | 'latitude'>;
	zoom?: boolean;
	highlightNext?: boolean;
};

const mapPointsToFeatures = (points: Point[]) => {
	return points.map(feature => ({
		id: String(feature.id),
		type: 'Feature',
		properties: {
			name: feature.name,
			...feature.properties
		},
		geometry: {
			type: 'Point',
			coordinates: [feature.lng, feature.lat]
		}
	}));
};

type Translation = [number, number];

const calculateXTranslation = (long: number, scale = 1) => {
	return 0.5 + ((long * -1) / 180) * scale;
};

const calculateYTranslation = (lat: number, scale = 1) => {
	return 0.5 + (lat / 90) * scale;
};

export default function RaceMap(props: RaceMapProps) {
	const {
		points,
		onClick,
		height = 300,
		width = 'auto',
		centerOn = { longitude: 0, latitude: 0 },
		zoom = false,
		highlightNext = false
	} = props;

	const nivoTheme = useNivoTheme();
	const land = useLand();
	const { ref, dimensions, node } = useComponentDimensionsWithRef();
	const [lastDimensions, setLastDimensions] = useState(dimensions);
	const pointFeatures = mapPointsToFeatures(points);
	const [translation, setTranslation] = useState<Translation>([0.5, 0.5]);

	useEffect(() => {
		if (
			node &&
			(dimensions.width !== lastDimensions.width ||
				dimensions.height !== lastDimensions.height)
		) {
			setTimeout(() => {
				const g = node.querySelector('svg>g:first-of-type');
				if (g && dimensions.width) {
					const { width, height } = g.getBoundingClientRect();
					const xScale = width / 2 / dimensions.width;
					const yScale = height / 2 / dimensions.height;

					setTranslation([
						calculateXTranslation(Number(centerOn?.longitude), xScale),
						calculateYTranslation(Number(centerOn?.latitude), yScale)
					]);
				}

				setLastDimensions(dimensions);
			}, 200);
		}
	}, [centerOn, node, dimensions, lastDimensions]);

	// PropTypes vs TS mismatches
	return (
		<Box ref={ref} className="relative" aria-hidden>
			<Box style={{ height, width }}>
				<ResponsiveGeoMap
					{...RequiredByPropTypes.GeoMap}
					theme={nivoTheme}
					features={[land, ...pointFeatures]}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					projectionType="equirectangular"
					projectionTranslation={translation}
					projectionScale={zoom ? 500 : 100}
					// @ts-ignore
					borderColor={(feature: any) => {
						if (feature?.geometry?.type === 'Point') {
							return highlightNext && feature.properties.next
								? cssVar.secondary.dark
								: cssVar.background.paper;
						} else {
							return cssVar.background.paper;
						}
					}}
					borderWidth={(feature: any) => {
						if (feature?.geometry?.type === 'Point') {
							return highlightNext && feature.properties.next ? 5 : 1;
						} else {
							return 0.5;
						}
					}}
					fillColor={(feature: any) => {
						if (feature?.geometry?.type === 'Point') {
							return highlightNext && feature.properties.next
								? cssVar.background.paper
								: cssVar.secondary.main;
						} else {
							return cssVar.background.default; //`color-mix(in oklch, ${cssVar.background.paper} 75%, ${cssVar.background.default} 25%)`;
						}
					}}
					tooltip={NivoTooltipFactory(MapTooltip)}
					onClick={onClick}
				/>
			</Box>
		</Box>
	);
}
