import {DriverAvatar, DriverByLine} from '@effonehub/driver';
import useDriverHeaderSx from '@effonehub/driver/useDriverHeaderSx';
import {PropertiesTable, PropertiesTableRow} from '@effonehub/ui-components';
import {Card, CardHeader} from '@mui/material';
import {PointTooltipProps, PositionsChartTooltipProps} from '../charts';

export function DriverStandingsPositionTooltip({serie}: PositionsChartTooltipProps) {
	const {data: {entity: {id}, color}} = serie;
	const headerSx                      = useDriverHeaderSx(id, color);
	
	return (
		<Card sx={{p: 0}}>
			<CardHeader sx={headerSx} title={<DriverByLine id={id} variant="name"/>} avatar={<DriverAvatar driverId={id} size={42}/>}/>
		</Card>
	);
}

export function DriverStandingsPointsTooltip({point}: PointTooltipProps) {
	const {data}                                  = point;
	const {x}                                     = data;
	const {points, position, entity: {id, color}} = data.data;
	const headerSx                                = useDriverHeaderSx(id, color);
	
	return (
		<Card sx={{p: 0}}>
			<CardHeader sx={headerSx} title={<DriverByLine id={id} variant="name"/>} avatar={<DriverAvatar driverId={id} size={42}/>}/>
			<PropertiesTable>
				<PropertiesTableRow header="Round" align="right">{`${x}`}</PropertiesTableRow>
				<PropertiesTableRow header="Position" align="right">{position}</PropertiesTableRow>
				<PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>
			</PropertiesTable>
		</Card>
	);
}