import {green, purple, yellow} from '@mui/material/colors';
import {Lap} from '../../types/ergast';

export const getDateFromTimeString = (time: string) => {
	const [mins, secondsWithMilli] = time.split(':');
	const [seconds, milliseconds]  = secondsWithMilli.split('.');
	return Date.UTC(2022, 0, 1, 0, Number(mins), Number(seconds), Number(milliseconds));
};

export const getFastestLapTimeFromLaps = (laps: Lap[]) => {
	let fastestLapTime: number | undefined;
	
	laps.forEach(l => {
		l.Timings.forEach(t => {
			const time = getDateFromTimeString(t.time);
			if (!fastestLapTime || time < fastestLapTime) {
				fastestLapTime = time;
			}
		});
	});
	
	return fastestLapTime;
};

export const getTicks = (laps: number) => {
	const ticks = [1];
	for (let i = 1; i < laps; i++) {
		if (i % 10 === 0) {
			ticks.push(i);
		}
	}
	
	return [...ticks, laps];
};
export const getColor = (lapTime: number, personalBest: number, fastestLapTime: number | undefined) => {
	if (lapTime === fastestLapTime) {
		return purple[800];
	}
	else if (lapTime < personalBest) {
		return green[400];
	}
	
	return yellow[500];
};