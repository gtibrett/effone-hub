import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Result} from '@/gql/graphql';
import {Typography} from '@mui/material';
import {green, red} from '@mui/material/colors';

export default function PositionChange({grid, positionOrder}: Pick<Result, 'grid' | 'position' | 'positionOrder'>) {
	if (!grid || !positionOrder) {
		return null;
	}
	
	const change = grid - positionOrder;
	
	if (!change) {
		return null;
	}
	
	const icon = change > 0 ? <FontAwesomeIcon icon={faArrowUp} color={green[500]}/> : <FontAwesomeIcon icon={faArrowDown} color={red[500]}/>;
	
	return <Typography variant="caption">{icon} {change}</Typography>;
}