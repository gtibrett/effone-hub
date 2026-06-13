import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

import type { RaceResult } from '@/gql/graphql';

export default function PositionChange({
	gridPositionNumber,
	positionDisplayOrder
}: Pick<RaceResult, 'gridPositionNumber' | 'positionDisplayOrder'>) {
	if (!gridPositionNumber || !positionDisplayOrder) {
		return null;
	}

	const change = gridPositionNumber - positionDisplayOrder;

	if (!change) {
		return null;
	}

	const icon =
		change > 0 ? (
			<FontAwesomeIcon icon={faArrowUp} color={green[500]} />
		) : (
			<FontAwesomeIcon icon={faArrowDown} color={red[500]} />
		);

	return (
		<Typography variant="caption">
			{icon} {change}
		</Typography>
	);
}
