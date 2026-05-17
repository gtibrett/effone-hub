import {Typography} from '@/components/ui';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {RaceResult} from '@/gql/graphql';

import {green, red} from '@/lib/muiColors';

export default function PositionChange({gridPositionNumber, positionDisplayOrder}: Pick<RaceResult, 'gridPositionNumber' | 'positionDisplayOrder'>) {
	if (!gridPositionNumber || !positionDisplayOrder) {
		return null;
	}

	const change = gridPositionNumber - positionDisplayOrder;
	
	if (!change) {
		return null;
	}
	
	const icon = change > 0 ? <FontAwesomeIcon icon={faArrowUp} color={green[500]}/> : <FontAwesomeIcon icon={faArrowDown} color={red[500]}/>;
	
	return <Typography variant="caption">{icon} {change}</Typography>;
}