import type { Metadata } from 'next';

import {
	getAppSeasonState,
	getConstructorStandings,
	getDriverStandings,
	getSeason,
	getSeasonRaceSchedule,
	getSeasonSchedule,
	getSeasonStats
} from '../lib/cached-data';
import SeasonContent from './SeasonContent';

type Params = Promise<{ season: string }>;

// Prerender only the two most recent seasons. Each season page fans out to 14
// GraphQL queries (getSeasonStats alone fires 9), so prerendering the full
// ~76-season F1 history cost ~1,000+ Neon queries on EVERY deploy — the
// dominant data-transfer driver. Older seasons render on-demand (dynamicParams
// defaults true) and cache via cacheLife('max').
export async function generateStaticParams(): Promise<{ season: string }[]> {
	const { seasons } = await getAppSeasonState();
	return [...seasons]
		.sort((a, b) => b - a)
		.slice(0, 2)
		.map(year => ({ season: String(year) }));
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
