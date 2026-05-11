import type {Metadata} from 'next';
import {buildTeamFull, buildTeamName, buildTeamRowIds} from '../../lib/build-pg';
import ConstructorContent from './ConstructorContent';

type Params = Promise<{teamRef: string}>;

export async function generateStaticParams(): Promise<{teamRef: string}[]> {
	const ids = await buildTeamRowIds();
	return ids.map(teamRef => ({teamRef}));
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {teamRef} = await params;
	const team = await buildTeamName(teamRef);
	return {title: team?.name ? `${team.name} | effOne Hub` : `Constructor: ${teamRef} | effOne Hub`};
}

export default async function ConstructorPage({params}: {params: Params}) {
	const {teamRef} = await params;
	const team = await buildTeamFull(teamRef);
	return <ConstructorContent teamRef={teamRef} team={team as any}/>;
}
