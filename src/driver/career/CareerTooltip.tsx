import {List, ListItem, ListItemText, Typography} from '@mui/material';
import {PointTooltipProps} from '@nivo/line';

export default function CareerTooltip({point}: PointTooltipProps) {
	const {data} = point;
	
	// @ts-ignore
	const {points, wins, position} = data.data; // extra added to make tooltip better
	
	return (
		<>
			<Typography variant="h6">{point.data.xFormatted}</Typography>
			<List dense>
				<ListItem secondaryAction={position}><ListItemText primary="Position"/></ListItem>
				<ListItem secondaryAction={points}><ListItemText primary="Points"/></ListItem>
				<ListItem secondaryAction={wins}><ListItemText primary="Wins"/></ListItem>
			</List>
		</>
	);
}