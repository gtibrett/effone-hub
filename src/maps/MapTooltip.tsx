import {Typography} from '@mui/material';

type MapTooltipProps = {
	feature: any;
}

export default function MapTooltip({feature}: MapTooltipProps) {
	if (feature?.geometry?.type !== 'Point') {
		return null;
	}
	
	return <Typography>{feature.properties.name}</Typography>;
}