import {green, purple, yellow} from '@mui/material/colors';
import {Lap} from '../../types/ergast';

export const getDateFromTimeString = (time: string | undefined) => {
	if (!time) {
		throw new Error('Time is undefined');
	}
	const [mins, secondsWithMilli] = time.split(':');
	const [seconds, milliseconds]  = secondsWithMilli.split('.');
	return Date.UTC(2022, 0, 1, 0, Number(mins), Number(seconds), Number(milliseconds));
};

export const getTimeStringFromDate = (time: Date) => {
	const hours   = time.getUTCHours();
	const minutes = String(time.getUTCMinutes()).padStart(2, '0');
	const seconds = String(time.getUTCSeconds()).padStart(2, '0');
	const millis  = String(time.getUTCMilliseconds()).padStart(2, '0');
	
	return `${hours}:${minutes}:${seconds}.${millis}`;
};

export const getFastestLapTimeFromLaps = (laps: Lap[]) => {
	let fastestLapTime: number | undefined;
	
	laps.forEach(l => {
		l.Timings.forEach((t) => {
			try {
				const time = getDateFromTimeString(t.time);
				if (time && (!fastestLapTime || time < fastestLapTime)) {
					fastestLapTime = time;
				}
			}
			catch (e) {
				// time couldn't be calculated
			}
		});
	});
	
	return fastestLapTime;
};

export const getTicks        = (laps: number) => {
	const ticks = [1];
	for (let i = 1; i < laps; i++) {
		if (i % 10 === 0) {
			ticks.push(i);
		}
	}
	
	return [...ticks, laps];
};
export const getColorWithAlt = (lapTime: number, personalBest: number, fastestLapTime: number | undefined) => {
	if (lapTime === fastestLapTime) {
		return {color: purple[800], alt: 'Fastest Lap'};
	}
	else if (lapTime < personalBest) {
		return {color: green[400], alt: 'Personal Best'};
	}
	
	return {color: yellow[500], alt: 'Slower than Personal Best'};
};