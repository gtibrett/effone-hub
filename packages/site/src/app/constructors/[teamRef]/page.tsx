import ConstructorsQuery from '@/components/page/constructor/ConstructorsQuery';
import {gql} from '@apollo/client';
import type {Metadata} from 'next';
import {getClient} from '../../lib/apollo-rsc';
import ConstructorContent, {TeamProp} from './ConstructorContent';

type Params = Promise<{teamRef: string}>;

export const revalidate = 86400;
export const dynamicParams = true;

const ConstructorDataQuery = gql`
	query ConstructorPageStaticQuery($constructorRef: String!) {
		teams(condition: {rowId: $constructorRef}) {
			nodes {
				id
				rowId
				name
				countryId
				colors {
					id
					primaryHex
				}
			}
		}
	}
`;

export async function generateStaticParams(): Promise<{teamRef: string}[]> {
	try {
		const {data: {teams}} = await getClient().query<{teams: {nodes: {rowId: string}[]}}>({query: ConstructorsQuery});
		return teams.nodes.map(t => ({teamRef: t.rowId}));
	} catch {
		return [];
	}
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {teamRef} = await params;
	try {
		const {data: {teams}} = await getClient().query<{teams: {nodes: TeamProp[]}}>({query: ConstructorDataQuery, variables: {constructorRef: teamRef}});
		const team            = teams.nodes[0];
		return {title: team?.name ? `${team.name} | effOne Hub` : `Constructor: ${teamRef} | effOne Hub`};
	} catch {
		return {title: `Constructor: ${teamRef} | effOne Hub`};
	}
}

export default async function ConstructorPage({params}: {params: Params}) {
	const {teamRef} = await params;

	let team: TeamProp | null = null;
	try {
		const {data: {teams}} = await getClient().query<{teams: {nodes: TeamProp[]}}>({query: ConstructorDataQuery, variables: {constructorRef: teamRef}});
		team                  = teams.nodes[0] ?? null;
	} catch {
		// fall back
	}

	return <ConstructorContent teamRef={teamRef} team={team}/>;
}
