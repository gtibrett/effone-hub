import {alpha, Box, Grid, List, ListItem, ListItemText, Typography} from '@mui/material';
import {PointTooltipProps} from '@nivo/line';
import {useInvertedTheme} from '../../ui-components';

export default function HistoryTooltip(props: PointTooltipProps) {
	const {point}                        = props;
	const theme                          = useInvertedTheme();
	const {data}                         = point;
	// @ts-ignore
	const {points, wins, position, name} = data.data; // extra added to make tooltip better
	
	const sx = {
		minWidth: 200,
		p:            1,
		borderRadius: 1,
		background:   alpha(theme.palette.background.paper, .9),
		color:        theme.palette.getContrastText(theme.palette.background.paper)
	};
	
	return <Box sx={sx}>
		<Grid container spacing={2}>
			<Grid item><Typography variant="h6">{name}</Typography></Grid>
			<Grid item><Typography variant="h6">{point.data.xFormatted}</Typography></Grid>
		</Grid>
		<List dense>
			<ListItem secondaryAction={position}><ListItemText primary="Position"/></ListItem>
			<ListItem secondaryAction={points}><ListItemText primary="Points"/></ListItem>
			<ListItem secondaryAction={wins}><ListItemText primary="Wins"/></ListItem>
		</List>
	</Box>;
}