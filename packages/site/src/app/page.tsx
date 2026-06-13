import type { Metadata } from 'next';

import HomeContent from './HomeContent';
import {
	getConstructorStandings,
	getCurrentSeason,
	getDriverStandings,
	getSeasonRaceSchedule,
	getSeasonSchedule,
	getSeasonStats
} from './lib/cached-data';

export const metadata: Metadata = {
	title: 'effOne Hub',
	description:
		'Current Formula One season — race results, championship standings, and visualizations.'
};

export default async function HomePage() {
	const season = await getCurrentSeason();
	const [races, scheduleData, driverStandingsData, constructorStandingsData, statsBundle] =
		await Promise.all([
			getSeasonRaceSchedule(season.year),
			getSeasonSchedule(season.year),
			getDriverStandings(season.year),
			getConstructorStandings(season.year),
			getSeasonStats(season.year)
		]);

	return (
		<HomeContent
			season={season}
			races={races}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
