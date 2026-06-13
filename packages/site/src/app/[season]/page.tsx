import type { Metadata } from 'next';

import {
	getConstructorStandings,
	getCurrentSeason,
	getDriverStandings,
	getSeason,
	getSeasonSchedule,
	getSeasonStats
} from '../lib/cached-data';
import SeasonContent from './SeasonContent';

type Params = Promise<{ season: string }>;

export async function generateStaticParams(): Promise<{ season: string }[]> {
	const { year } = await getCurrentSeason();
	return [{ season: String(year) }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { season } = await params;
	return { title: `${season} Season | effOne Hub` };
}

export default async function SeasonPage({ params }: { params: Params }) {
	const { season: seasonParam } = await params;
	const year = Number(seasonParam);
	const [season, scheduleData, driverStandingsData, constructorStandingsData, statsBundle] =
		await Promise.all([
			getSeason(year),
			getSeasonSchedule(year),
			getDriverStandings(year),
			getConstructorStandings(year),
			getSeasonStats(year)
		]);

	return (
		<SeasonContent
			season={season}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
