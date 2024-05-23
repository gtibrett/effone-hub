import {DriverAvatar, DriverByLine} from '@effonehub/driver';
import useDriverHeaderSx from '@effonehub/driver/useDriverHeaderSx';
import {getTimeStringFromDate} from '@effonehub/helpers';
import {PropertiesTable, PropertiesTableRow} from '@effonehub/ui-components';
import {Card, CardHeader} from '@mui/material';
import {BarTooltipProps} from '@nivo/bar';
import {PitStopSerie} from './PitStopsChart';

export default function PitStopTooltip(props: BarTooltipProps<PitStopSerie>) {
	const {value, id, data: {driverId}} = props;
	const headerSx                      = useDriverHeaderSx(driverId);
	
	return (
		<Card sx={{p: 0}}>
			<CardHeader sx={headerSx}
				avatar={<DriverAvatar driverId={driverId} size={42}/>}
				title={<DriverByLine id={driverId} variant="name"/>}
				subheader={<PropertiesTable>
					<PropertiesTableRow header={`Stop ${id}`}>{getTimeStringFromDate(new Date(value))}</PropertiesTableRow>
				</PropertiesTable>}
			/>
		</Card>
	);
}