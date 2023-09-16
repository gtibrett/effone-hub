import {Result} from '@gtibrett/effone-hub-graph-api';

export function getPositionTextOutcome(positionText: Result['positionText'], status: Result['status']['status']) {
	switch (positionText) {
		// The value of the positionText attribute is either an integer (finishing position), 
		case 'R':
			return `Retired: ${status}`;
		case 'D':
			return 'Disqualified';
		case 'E':
			return 'Excluded';
		case 'W':
			return 'Withdrawn';
		case 'F':
			return 'Failed to qualify';
		case 'N':
			return 'Not Classified';
			
		default:
			return status;
	}
}

export const getTimeStringFromDate = (time: Date) => {
	const hours   = time.getUTCHours();
	const minutes = String(time.getUTCMinutes()).padStart(2, '0');
	const seconds = String(time.getUTCSeconds()).padStart(2, '0');
	const millis  = String(time.getUTCMilliseconds()).padStart(2, '0');
	
	return (hours ? `${hours}:` : '') +
	       (time.getUTCMinutes() ? `${minutes}:` : '') +
	       `${seconds}.${millis}`;
};