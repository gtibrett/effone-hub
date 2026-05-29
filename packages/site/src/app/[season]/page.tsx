import type { Metadata } from 'next';

import { getCurrentSeason, getSeason } from '../lib/cached-data';
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
	const season = await getSeason(year);
	return <SeasonContent season={season} />;
}
