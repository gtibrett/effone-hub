import {DriverAvatar, DriverByLine} from '@/components/app';
import {PropertiesTable, PropertiesTableRow, Card, CardHeader} from '@/components/ui';
import {getTimeStringFromDate} from '@/helpers';
import {useDriverHeaderSx} from '@/hooks';
import type {CSSProperties} from 'react';
import {BarTooltipProps} from '@nivo/bar';
import {PitStopSerie} from './PitStopsChart';

export default function PitStopTooltip(props: BarTooltipProps<PitStopSerie>) {
	const {value, id, data: {driverId}} = props;
	const hc                            = useDriverHeaderSx(driverId);

	return (
		<div style={{'--team-primary': hc.primary, '--team-foreground': hc.foreground} as CSSProperties}>
		<Card className="p-0">
			<CardHeader className="bg-team-primary text-team-foreground"
				avatar={<DriverAvatar driverId={driverId} size={42}/>}
				title={<DriverByLine id={driverId} variant="name"/>}
				subheader={<PropertiesTable>
					<PropertiesTableRow header={`Stop ${id}`}>{getTimeStringFromDate(new Date(value))}</PropertiesTableRow>
				</PropertiesTable>}
			/>
		</Card>
		</div>
	);
}