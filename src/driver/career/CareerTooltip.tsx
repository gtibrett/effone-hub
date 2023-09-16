import {alpha, Box, List, ListItem, ListItemText, Typography} from '@mui/material';
import {PointTooltipProps} from '@nivo/line';
import {useInvertedTheme} from '../../ui-components';

export default function CareerTooltip({point}: PointTooltipProps) {
	const theme  = useInvertedTheme();
	const {data} = point;
	// @ts-ignore
	
	const {points, wins, position} = data.data; // extra added to make tooltip better
	
	const sx = {
		p:            1,
		borderRadius: 1,
		background:   alpha(theme.palette.background.paper, .9),
		color:        theme.palette.getContrastText(theme.palette.background.paper)
	};
	
	return <Box sx={sx}>
		<Typography variant="h6">{point.data.xFormatted}</Typography>
		<List dense>
			<ListItem secondaryAction={position}><ListItemText primary="Position"/></ListItem>
			<ListItem secondaryAction={points}><ListItemText primary="Points"/></ListItem>
			<ListItem secondaryAction={wins}><ListItemText primary="Wins"/></ListItem>
		</List>
	</Box>;
}