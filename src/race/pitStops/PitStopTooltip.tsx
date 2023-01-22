import {alpha, Box, Grid, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import {BarTooltipProps} from '@nivo/bar';
import ByLine from '../../drivers/ByLine';
import DriverAvatar from '../../drivers/DriverAvatar';
import {useInvertedTheme} from '../../ui-components/Theme';
import {getTimeStringFromDate} from '../lapTimes/helpers';
import {PitStopSerie} from './PitStopsChart';

export default function PitStopTooltip(props: BarTooltipProps<PitStopSerie>) {
	const {indexValue, value, id} = props;
	const driverId                = String(indexValue);
	const theme                   = useInvertedTheme();
	
	const sx = {
		px: 1,
		borderRadius: 1,
		background: alpha(theme.palette.background.paper, .9),
		color: theme.palette.getContrastText(theme.palette.background.paper),
		
		'& .MuiTypography-root': {
			color: theme.palette.getContrastText(theme.palette.background.paper)
		}
	};
	
	return <Box sx={sx}>
		<List dense>
			<ListItem>
				<ListItemAvatar><DriverAvatar id={driverId} size={42}/></ListItemAvatar>
				<ListItemText secondaryTypographyProps={{component: 'div'}} primary={<ByLine id={driverId} variant="name"/>} secondary={
					<Grid container spacing={2} alignItems="center">
						<Grid item xs>Stop {id}</Grid>
						<Grid item>{getTimeStringFromDate(new Date(value))}</Grid>
					</Grid>
				}/>
			</ListItem>
		</List>
	</Box>;
}