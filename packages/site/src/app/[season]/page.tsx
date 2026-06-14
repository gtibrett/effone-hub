import type { Metadata } from 'next';

import {
	getConstructorStandings,
	getDriverStandings,
	getSeason,
	getSeasonRaceSchedule,
	getSeasonSchedule,
	getSeasonStats,
	getSeasons
} from '../lib/cached-data';
import SeasonContent from './SeasonContent';

type Params = Promise<{ season: string }>;

export async function generateStaticParams(): Promise<{ season: string }[]> {
	const seasons = await getSeasons();
	return seasons.map(({ year }) => ({ season: String(year) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { season } = await params;
	return { title: `${season} Season | effOne Hub` };
}

export default async function SeasonPage({ params }: { params: Params }) {
	const { season: seasonParam } = await params;
	const year = Number(seasonParam);
	const [
		season,
		races,
		scheduleData,
		driverStandingsData,
		constructorStandingsData,
		statsBundle
	] = await Promise.all([
		getSeason(year),
		getSeasonRaceSchedule(year),
		getSeasonSchedule(year),
		getDriverStandings(year),
		getConstructorStandings(year),
		getSeasonStats(year)
	]);

	return (
		<SeasonContent
			season={season}
			races={races}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
