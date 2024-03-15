import {Grid, List, ListItem, ListItemText, Typography} from '@mui/material';
import {PointTooltipProps} from '@nivo/line';

export default function HistoryTooltip(props: PointTooltipProps) {
	const {point}                        = props;
	const {data}                         = point;
	// @ts-ignore
	const {points, wins, position, name} = data.data; // extra added to make tooltip better
	
	return (
		<>
			<Grid container spacing={2}>
				<Grid item><Typography variant="h6">{name}</Typography></Grid>
				<Grid item><Typography variant="h6">{point.data.xFormatted}</Typography></Grid>
			</Grid>
			<List dense>
				<ListItem secondaryAction={position}><ListItemText primary="Position"/></ListItem>
				<ListItem secondaryAction={points}><ListItemText primary="Points"/></ListItem>
				<ListItem secondaryAction={wins}><ListItemText primary="Wins"/></ListItem>
			</List>
		</>
	);
}