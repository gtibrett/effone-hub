import {Box, Typography} from '@mui/material';

type MapTooltipProps = {
	feature: any;
}

export default function MapTooltip({feature}: MapTooltipProps) {
	if (feature?.geometry?.type !== 'Point') {
		return null;
	}
	
	return (
		<Box py={1} px={2}>
			<Typography>{feature.properties.name}</Typography>
		</Box>
	);
}