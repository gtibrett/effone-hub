import {green, purple, yellow} from '@mui/material/colors';

export const getTicks = (laps: number) => {
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
	} else if (lapTime <= personalBest) {
		return {color: green[400], alt: 'Personal Best'};
	}
	
	return {color: yellow[500], alt: 'Slower than Personal Best'};
};