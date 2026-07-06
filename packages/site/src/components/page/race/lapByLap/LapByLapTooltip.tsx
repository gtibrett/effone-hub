import { Card, CardHeader, Grid } from '@mui/material';

import { DriverAvatar, DriverByLine } from '@/components/app';
import { useDriverHeaderSx } from '@/hooks';

type LapByLapTooltipProps = { serie: { data: { driverId: string } } };

export default function LapByLapTooltip({ serie }: LapByLapTooltipProps) {
	const { driverId } = serie.data;
	const headerSx = useDriverHeaderSx(driverId);

	return (
		<Card className="p-0">
			<Grid container className="items-center justify-stretch flex-nowrap">
				<DriverAvatar driverId={driverId} size={64} />
				<CardHeader
					className={headerSx.className}
					style={headerSx.style}
					title={<DriverByLine id={driverId} variant="name" />}
				/>
			</Grid>
		</Card>
	);
}
