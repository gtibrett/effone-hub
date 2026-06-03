import { Box, Typography } from '@mui/material';

import { Point } from './types';

type MapTooltipProps = { point: Point };

export default function MapTooltip({ point }: MapTooltipProps) {
	return (
		<Box className="py-2 px-4">
			<Typography>{point.name}</Typography>
		</Box>
	);
}
