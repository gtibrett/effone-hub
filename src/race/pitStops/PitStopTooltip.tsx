import {Grid, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import {BarTooltipProps} from '@nivo/bar';
import {DriverAvatar, DriverByLine} from '../../driver';
import {getTimeStringFromDate} from '../../helpers';
import {PitStopSerie} from './PitStopsChart';

export default function PitStopTooltip(props: BarTooltipProps<PitStopSerie>) {
	const {value, id, data: {driverId}} = props;
	
	return (
		<List dense>
			<ListItem>
				<ListItemAvatar><DriverAvatar driverId={driverId} size={42}/></ListItemAvatar>
				<ListItemText secondaryTypographyProps={{component: 'div'}} primary={<DriverByLine id={driverId} variant="name"/>} secondary={
					<Grid container spacing={2} alignItems="center">
						<Grid item xs>Stop {id}</Grid>
						<Grid item>{getTimeStringFromDate(new Date(value))}</Grid>
					</Grid>
				}/>
			</ListItem>
		</List>
	);
}