import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import {BumpSerie} from '@nivo/bump/dist/types/bump/types';
import {DriverAvatar, DriverByLine} from '../../driver';

export default function LapByLapTooltip({serie}: { serie: BumpSerie<any, any> }) {
	const {color, data: {driverId}} = serie;
	
	return (
		<List dense>
			<ListItem secondaryAction={<FontAwesomeIcon icon={faSquare} color={color}/>}>
				<ListItemAvatar><DriverAvatar driverId={driverId} size={42}/></ListItemAvatar>
				<ListItemText primary={<DriverByLine id={driverId} variant="name"/>}/>
			</ListItem>
		</List>
	);
}