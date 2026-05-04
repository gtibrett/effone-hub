import {Circuit} from '@/gql/graphql';
import {gql} from '@apollo/client';
import type {Metadata} from 'next';
import {getClient} from '../../lib/apollo-rsc';
import CircuitContent from './CircuitContent';

type Params = Promise<{circuitRef: string}>;

export const revalidate = 86400;
export const dynamicParams = true;

const AllCircuitsQuery = gql`
	query AllCircuitsQuery {
		circuits {
			nodes {
				rowId
			}
		}
	}
`;

export async function generateStaticParams(): Promise<{circuitRef: string}[]> {
	try {
		const {data: {circuits}} = await getClient().query<{circuits: {nodes: Circuit[]}}>({query: AllCircuitsQuery});
		return circuits.nodes.map(({rowId}) => ({circuitRef: rowId!}));
	} catch {
		return [];
	}
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {circuitRef} = await params;
	return {title: `Circuit: ${circuitRef} | effOne Hub`};
}

export default async function CircuitPage({params}: {params: Params}) {
	const {circuitRef} = await params;
	return <CircuitContent circuitRef={circuitRef}/>;
}
