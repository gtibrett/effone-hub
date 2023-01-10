import {Result} from './types/ergast';

export function getPositionTextOutcome(positionText: Result['positionText'], status: Result['status']) {
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
	}
}