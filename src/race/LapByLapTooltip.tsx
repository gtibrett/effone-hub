import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {alpha, Box, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import {BumpSerie} from '@nivo/bump/dist/types/bump/types';
import ByLine from '../drivers/ByLine';
import DriverAvatar from '../drivers/DriverAvatar';
import {useInvertedTheme} from '../ui-components/Theme';

export default function LapByLapTooltip({serie}: { serie: BumpSerie<any, any> }) {
	const {color, id: driverId} = serie;
	
	const theme = useInvertedTheme();
	
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
			<ListItem secondaryAction={<FontAwesomeIcon icon={faSquare} color={color}/>}>
				<ListItemAvatar><DriverAvatar id={driverId} size={42}/></ListItemAvatar>
				<ListItemText primary={<ByLine id={driverId} variant="name"/>}/>
			</ListItem>
		</List>
	</Box>;
}