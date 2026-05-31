import { ComponentProps } from 'react';
import { Box, Typography } from '@mui/material';
import { GeoMapTooltip } from '@nivo/geo';

export default function MapTooltip({ feature }: ComponentProps<GeoMapTooltip>) {
	if (feature?.geometry?.type !== 'Point') {
		return null;
	}

	return (
		<Box className="py-2 px-4">
			<Typography>{feature.properties.name}</Typography>
		</Box>
	);
}
