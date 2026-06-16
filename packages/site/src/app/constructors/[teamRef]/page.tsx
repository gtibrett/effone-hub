import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
	getConstructorData,
	getConstructorSeason,
	getConstructorSeasonStats,
	getCurrentSeason,
	getCurrentSeasonTeamIds,
	getTeam
} from '../../lib/cached-data';
import ConstructorContent from './ConstructorContent';

type Params = Promise<{ teamRef: string }>;

export async function generateStaticParams(): Promise<{ teamRef: string }[]> {
	const ids = await getCurrentSeasonTeamIds();
	return ids.map(teamRef => ({ teamRef }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { teamRef } = await params;
	const team = await getTeam(teamRef);
	return {
		title: team?.name ? `${team.name} | effOne Hub` : `Constructor: ${teamRef} | effOne Hub`
	};
}

export default async function ConstructorPage({ params }: { params: Params }) {
	const { teamRef } = await params;
	const { year: currentSeason } = await getCurrentSeason();
	const [team, constructorData] = await Promise.all([
		getTeam(teamRef),
		getConstructorData(teamRef, currentSeason)
	]);
	if (!team) notFound();

	const isInCurrentSeason =
		typeof constructorData?.team?.standings.find(s => s.year === currentSeason) !== 'undefined';

	const [seasonRaces, seasonStats] = await Promise.all([
		isInCurrentSeason ? getConstructorSeason(teamRef, currentSeason) : Promise.resolve([]),
		isInCurrentSeason
			? getConstructorSeasonStats(team.id, currentSeason)
			: Promise.resolve(null)
	]);

	return (
		<ConstructorContent
			teamRef={teamRef}
			team={team}
			currentSeason={currentSeason}
			constructorData={constructorData}
			isInCurrentSeason={isInCurrentSeason}
			seasonRaces={seasonRaces}
			seasonStats={seasonStats}
		/>
	);
}
