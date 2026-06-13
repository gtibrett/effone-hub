'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Box } from '@mui/material';

import type { Circuit } from '@/gql/graphql';
import { cssVar } from '@/lib/tokens';

import MapTooltip from './MapTooltip';
import type { Point } from './types';
import useLand from './useLand';
import type { MapPointEventHandler } from './useMapSeasonRacesToMapPoints';

type RaceMapProps = {
	points: Point[];
	onClick?: MapPointEventHandler;
	height?: number | string;
	width?: number | 'auto';
	centerOn?: Pick<Circuit, 'longitude' | 'latitude'>;
	zoom?: boolean;
	highlightNext?: boolean;
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

	const land = useLand();
	const [hovered, setHovered] = useState<Point | null>(null);

	// react-simple-maps centers via projectionConfig.rotate (longitude is
	// inverted compared to translate-based math; latitude flips sign too).
	const rotate: [number, number, number] = [
		-Number(centerOn?.longitude ?? 0),
		-Number(centerOn?.latitude ?? 0),
		0
	];

	return (
		<Box className="relative" aria-hidden>
			<Box style={{ height, width, position: 'relative' }}>
				<ComposableMap
					projection="geoEquirectangular"
					projectionConfig={{
						scale: zoom ? 500 : 200,
						rotate
					}}
					style={{ width: '100%', height: '100%' }}
				>
					<Geographies geography={land}>
						{({ geographies }) =>
							geographies.map(geo => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									style={{
										default: {
											fill: cssVar.background.default,
											stroke: cssVar.background.paper,
											strokeWidth: 0.5,
											outline: 'none'
										},
										hover: {
											fill: cssVar.background.default,
											stroke: cssVar.background.paper,
											strokeWidth: 0.5,
											outline: 'none'
										},
										pressed: {
											fill: cssVar.background.default,
											stroke: cssVar.background.paper,
											strokeWidth: 0.5,
											outline: 'none'
										}
									}}
								/>
							))
						}
					</Geographies>
					{points.map(point => {
						const isNext = Boolean(highlightNext && point.properties?.next);
						const fill = isNext ? cssVar.primary.main : cssVar.secondary.main;
						return (
							<Marker
								key={point.id}
								coordinates={[Number(point.lng), Number(point.lat)]}
								onMouseEnter={() => setHovered(point)}
								onMouseLeave={() => setHovered(null)}
								onClick={() => onClick?.(point)}
								style={{
									default: { cursor: onClick ? 'pointer' : 'default' },
									hover: { cursor: onClick ? 'pointer' : 'default' },
									pressed: { cursor: onClick ? 'pointer' : 'default' }
								}}
							>
								<circle r={point.pointRadius ?? 8} fill={fill} strokeWidth={0} />
							</Marker>
						);
					})}
				</ComposableMap>
				{hovered ? (
					<Box
						className="absolute top-1 left-1 pointer-events-none"
						sx={{
							backdropFilter: 'blur(4px)',
							background: cssVar.background.paper,
							borderRadius: 0.5,
							boxShadow: 2
						}}
					>
						<MapTooltip point={hovered} />
					</Box>
				) : null}
			</Box>
		</Box>
	);
}
