import {Card, CardHeader} from '@/components/ui';
import {DriverAvatar, DriverByLine} from '@/components/app';
import {useDriverHeaderSx} from '@/hooks';
import type {CSSProperties} from 'react';
import {BumpSerie} from '@nivo/bump/dist/types/bump/types';

export default function LapByLapTooltip({serie}: { serie: BumpSerie<any, any> }) {
	const {data: {driverId}} = serie;
	const hc                 = useDriverHeaderSx(driverId);

	return (
		<div style={{'--team-primary': hc.primary, '--team-foreground': hc.foreground} as CSSProperties}>
		<Card className="p-0">
			<CardHeader className="bg-team-primary text-team-foreground" title={<DriverByLine id={driverId} variant="name"/>} avatar={<DriverAvatar driverId={driverId} size={42}/>}/>
		</Card>
		</div>
	);
}