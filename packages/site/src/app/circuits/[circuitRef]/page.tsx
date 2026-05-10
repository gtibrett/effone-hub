import type {Metadata} from 'next';
import {getCircuitRowIds} from '../../lib/cached-data';
import CircuitContent from './CircuitContent';

type Params = Promise<{circuitRef: string}>;

export async function generateStaticParams(): Promise<{circuitRef: string}[]> {
	const ids = await getCircuitRowIds();
	return ids.map(circuitRef => ({circuitRef}));
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {circuitRef} = await params;
	return {title: `Circuit: ${circuitRef} | effOne Hub`};
}

export default async function CircuitPage({params}: {params: Params}) {
	const {circuitRef} = await params;
	return <CircuitContent circuitRef={circuitRef}/>;
}
