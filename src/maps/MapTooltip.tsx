import {alpha, Box, Typography} from '@mui/material';
import {useInvertedTheme} from '../ui-components';

type MapTooltipProps = {
	feature: any;
}

export default function MapTooltip({feature}: MapTooltipProps) {
	const theme = useInvertedTheme();
	
	if (feature?.geometry?.type !== 'Point') {
		return null;
	}
	
	const sx = {
		p:            1,
		borderRadius: 1,
		background:   alpha(theme.palette.background.paper, .75),
		color:        theme.palette.getContrastText(theme.palette.background.paper)
	};
	
	return (
		<Box sx={sx}>
			<Typography>{feature.properties.name}</Typography>
		</Box>
	);
}