import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {List, ListItem, ListItemText, Typography} from '@mui/material';
import {ConstructorByLine} from '../../../constructor';
import {PropertiesTable, PropertiesTableRow} from '../../../ui-components';
import {PointTooltipProps, PositionsChartTooltipProps} from '../charts';

export function ConstructorStandingsPositionTooltip({serie}: PositionsChartTooltipProps) {
	const {data: {entity: {id}}, color} = serie;
	
	return (
		<List dense>
			<ListItem secondaryAction={<FontAwesomeIcon icon={faSquare} color={color}/>}>
				<ListItemText primary={<ConstructorByLine id={id} variant="name"/>}/>
			</ListItem>
		</List>
	);
}

export function ConstructorStandingsPointsTooltip({point}: PointTooltipProps) {
	const {data, color}                      = point;
	const {x}                                = data;
	const {points, position, entity: {name}} = data.data;
	
	return (
		<>
			<Typography variant="h6"><FontAwesomeIcon icon={faSquare} color={color}/>&nbsp;&nbsp;{name}</Typography>
			<PropertiesTable>
				<PropertiesTableRow header="Round" align="right">{`${x}`}</PropertiesTableRow>
				<PropertiesTableRow header="Position" align="right">{position}</PropertiesTableRow>
				<PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>
			</PropertiesTable>
		</>
	);
}