import type {Metadata} from 'next';
import {getTeam, getTeamRowIds} from '../../lib/cached-data';
import ConstructorContent from './ConstructorContent';

type Params = Promise<{teamRef: string}>;

export async function generateStaticParams(): Promise<{teamRef: string}[]> {
	const ids = await getTeamRowIds();
	return ids.map(teamRef => ({teamRef}));
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {teamRef} = await params;
	const team = await getTeam(teamRef);
	return {title: team?.name ? `${team.name} | effOne Hub` : `Constructor: ${teamRef} | effOne Hub`};
}

export default async function ConstructorPage({params}: {params: Params}) {
	const {teamRef} = await params;
	const team = await getTeam(teamRef);
	return <ConstructorContent teamRef={teamRef} team={team}/>;
}
