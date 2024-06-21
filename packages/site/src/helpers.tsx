import {Maybe, Result, Status} from '@gtibrett/effone-hub-graph-api';
import {capitalize} from '@mui/material';
import {useRouter} from 'next/router';

export const noop = () => null;

export function useSlugs<T extends {}>() {
	return (useRouter().query || {}) as T;
}

export function getPositionTextOutcome(positionText: Result['positionText'], status: Status['status']) {
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

export const getTimeStringFromDate = (time: Date): string => {
	const hours   = time.getUTCHours();
	const minutes = String(time.getUTCMinutes()).padStart(2, '0');
	const seconds = String(time.getUTCSeconds()).padStart(2, '0');
	const millis  = String(time.getUTCMilliseconds()).padStart(2, '0');
	
	return (hours ? `${hours}:` : '') +
	       (time.getUTCMinutes() ? `${minutes}:` : '') +
	       `${seconds}.${millis}`;
};

export const getMillisecondsFromTimeString = (timeString?: Maybe<string>): number | undefined => {
	if (!timeString || timeString.startsWith('+')) {
		return undefined;
	}
	
	const [hms, ms = 0] = timeString.split('.');
	const hmsParts = hms.split(':');
	
	while (hmsParts.length < 3) {
		hmsParts.unshift('00');
	}
	
	return Date.parse(`01 Jan 1970 ${hmsParts.join(':')}.${ms} GMT`);
};

export const round = (num: number, precision = 2) => num > 0 ? Math.trunc(num * Math.pow(10, precision)) / Math.pow(10, precision) : 0;

export const capitalizeCamelCase = (value: string) => capitalize(value.replace(/([a-z])([A-Z])/g, '$1 $2'));

export const getDateWithTime = (dateTime: Date) => <>{dateTime.toLocaleDateString(undefined, {month: 'long', day: 'numeric'})},&nbsp;{dateTime.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'})}</>;