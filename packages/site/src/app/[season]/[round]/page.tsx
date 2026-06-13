import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
	getCurrentSeasonRaceParams,
	getRace,
	getRaceFullData,
	getRaceLapByLap,
	getRacePitStops,
	getRaceQualifying,
	getRaceStats
} from '../../lib/cached-data';
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
	const [race, raceData, qualifying, pitStops, lapByLap, stats] = await Promise.all([
		getRace(Number(season), Number(round)),
		getRaceFullData(Number(season), Number(round)),
		getRaceQualifying(Number(season), Number(round)),
		getRacePitStops(Number(season), Number(round)),
		getRaceLapByLap(Number(season), Number(round)),
		getRaceStats(Number(season), Number(round))
	]);

	if (race.year == null) notFound();

	return (
		<RoundContent
			season={season}
			round={round}
			race={race}
			raceData={raceData}
			qualifying={qualifying}
			pitStops={pitStops}
			lapByLap={lapByLap}
			stats={stats}
		/>
	);
}
