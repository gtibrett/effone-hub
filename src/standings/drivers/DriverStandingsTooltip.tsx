import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Grid} from '@mui/material';
import {PropertiesTable, PropertiesTableRow} from '@ui-components';
import {DriverAvatar, DriverByLine} from '../../driver';
import {PointTooltipProps, PositionsChartTooltipProps} from '../charts';

export function DriverStandingsPositionTooltip({serie}: PositionsChartTooltipProps) {
	const {data: {entity: {id}}, color} = serie;
	
	return (
		<Grid container spacing={2} alignItems="center">
			<Grid item><DriverAvatar driverId={id} size={42}/></Grid>
			<Grid item xs><DriverByLine id={id} variant="name"/></Grid>
			<Grid item><FontAwesomeIcon icon={faSquare} color={color}/></Grid>
		</Grid>
	);
}

export function DriverStandingsPointsTooltip({point}: PointTooltipProps) {
	const {data, color}                    = point;
	const {x}                              = data;
	const {points, position, entity: {id}} = data.data;
	
	return (
		<>
			<Grid container spacing={2} alignItems="center">
				<Grid item><DriverAvatar driverId={id} size={42}/></Grid>
				<Grid item xs><DriverByLine id={id} variant="name"/></Grid>
				<Grid item><FontAwesomeIcon icon={faSquare} color={color}/></Grid>
			</Grid>
			<PropertiesTable>
				<PropertiesTableRow header="Round" align="right">{`${x}`}</PropertiesTableRow>
				<PropertiesTableRow header="Position" align="right">{position}</PropertiesTableRow>
				<PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>
			</PropertiesTable>
		</>
	);
}