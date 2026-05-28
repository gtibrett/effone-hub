import type { Metadata } from 'next';

import { getCircuit, getCurrentSeasonCircuitIds } from '../../lib/cached-data';
import CircuitContent from './CircuitContent';

type Params = Promise<{ circuitRef: string }>;

export async function generateStaticParams(): Promise<{ circuitRef: string }[]> {
	const ids = await getCurrentSeasonCircuitIds();
	return ids.map(circuitRef => ({ circuitRef }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { circuitRef } = await params;
	const c = await getCircuit(circuitRef);
	return {
		title: c?.fullName ? `${c.fullName} | effOne Hub` : `Circuit: ${circuitRef} | effOne Hub`
	};
}

export default async function CircuitPage({ params }: { params: Params }) {
	const { circuitRef } = await params;
	return <CircuitContent circuitRef={circuitRef} />;
}
