import {Box, Typography} from '@mui/material';

type MapTooltipProps = {
	feature: any;
}

export default function MapTooltip({feature}: MapTooltipProps) {
	if (feature?.geometry?.type !== 'Point') {
		return null;
	}
	
	return (
        <Box className="py-2 px-4">
            <Typography>{feature.properties.name}</Typography>
        </Box>
    );
}