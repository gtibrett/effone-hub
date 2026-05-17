import {Typography} from '@/components/ui';

type MapTooltipProps = {
	feature: any;
}

export default function MapTooltip({feature}: MapTooltipProps) {
	if (feature?.geometry?.type !== 'Point') {
		return null;
	}

	return (
		<div className="py-2 px-4">
			<Typography>{feature.properties.name}</Typography>
		</div>
	);
}
