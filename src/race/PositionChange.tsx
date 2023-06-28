import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Typography} from '@mui/material';
import {green, red} from '@mui/material/colors';
import {Result} from '@gtibrett/effone-hub-api';

export default function PositionChange({grid, position}: Pick<Result, 'grid' | 'position'>) {
	if (!grid || !position) {
		return null;
	}
	
	const change = Number(grid) - Number(position);
	
	if (!change) {
		return null;
	}
	
	const icon = change > 0 ? <FontAwesomeIcon icon={faArrowUp} color={green[500]}/> : <FontAwesomeIcon icon={faArrowDown} color={red[500]}/>;
	
	return <Typography variant="caption">{icon} {change}</Typography>;
}