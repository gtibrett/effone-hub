import type { Metadata } from 'next';

import HomeContent from './HomeContent';
import {
	getConstructorStandings,
	getCurrentSeason,
	getDriverStandings,
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
	const [scheduleData, driverStandingsData, constructorStandingsData, statsBundle] =
		await Promise.all([
			getSeasonSchedule(season.year),
			getDriverStandings(season.year),
			getConstructorStandings(season.year),
			getSeasonStats(season.year)
		]);

	return (
		<HomeContent
			season={season}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
