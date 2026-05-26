export const getColorWithAlt = (
	lapTime: number,
	personalBest: number,
	fastestLapTime: number | undefined
) => {
	if (lapTime === fastestLapTime) {
		return { color: 'oklch(0.548 0.275 311.14)', alt: 'Fastest Lap' };
	} else if (lapTime <= personalBest) {
		return { color: 'oklch(0.632 0.169 151.31)', alt: 'Personal Best' };
	}

	return { color: 'oklch(0.941 0.186 107.18)', alt: 'Slower than Personal Best' };
};
