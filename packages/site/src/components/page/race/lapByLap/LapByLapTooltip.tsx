import {DriverAvatar, DriverByLine} from '@/components/app';
import {useDriverHeaderSx} from '@/hooks';
import {Card, CardHeader} from '@mui/material';
import {BumpSerie} from '@nivo/bump/dist/types/bump/types';

export default function LapByLapTooltip({serie}: { serie: BumpSerie<any, any> }) {
	const {data: {driverId}} = serie;
	const headerSx           = useDriverHeaderSx(driverId);
	
	return (
		<Card sx={{p: 0}}>
			<CardHeader sx={headerSx} title={<DriverByLine id={driverId} variant="name"/>} avatar={<DriverAvatar driverId={driverId} size={42}/>}/>
		</Card>
	);
}