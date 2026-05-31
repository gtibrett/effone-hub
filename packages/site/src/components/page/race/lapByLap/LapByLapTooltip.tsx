import { Card, CardHeader } from '@mui/material';
import { BumpSerie } from '@nivo/bump';

import { DriverAvatar, DriverByLine } from '@/components/app';
import { useDriverHeaderSx } from '@/hooks';

export default function LapByLapTooltip({ serie }: { serie: BumpSerie<any, any> }) {
	const {
		data: { driverId }
	} = serie;
	const headerSx = useDriverHeaderSx(driverId);

	return (
		<Card className="p-0">
			<CardHeader
				className={headerSx.className}
				style={headerSx.style}
				title={<DriverByLine id={driverId} variant="name" />}
				avatar={<DriverAvatar driverId={driverId} size={42} />}
			/>
		</Card>
	);
}
