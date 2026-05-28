import type { Metadata } from 'next';

import { getCurrentSeasonRaceParams, getRace, getRaceFullData } from '../../lib/cached-data';
import RoundContent from './RoundContent';

type Params = Promise<{ season: string; round: string }>;

export async function generateStaticParams(): Promise<{ season: string; round: string }[]> {
	return getCurrentSeasonRaceParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { season, round } = await params;
	const race = await getRace(Number(season), Number(round));
	return {
		title: race?.officialName
			? `${race.officialName} | effOne Hub`
			: `Race ${season}/${round} | effOne Hub`
	};
}

export default async function RoundPage({ params }: { params: Params }) {
	const { season, round } = await params;
	const [race, prefetchedRaceData] = await Promise.all([
		getRace(Number(season), Number(round)),
		getRaceFullData(Number(season), Number(round))
	]);

	return (
		<RoundContent
			season={season}
			round={round}
			race={race}
			prefetchedRaceData={prefetchedRaceData}
		/>
	);
}
