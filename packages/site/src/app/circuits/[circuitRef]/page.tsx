import type { Metadata } from 'next';

import { buildCircuitName, buildCurrentSeasonCircuitRowIds } from '../../lib/build-pg';
import CircuitContent from './CircuitContent';

type Params = Promise<{ circuitRef: string }>;

export async function generateStaticParams(): Promise<{ circuitRef: string }[]> {
	const ids = await buildCurrentSeasonCircuitRowIds();
	return ids.map(circuitRef => ({ circuitRef }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { circuitRef } = await params;
	const c = await buildCircuitName(circuitRef);
	return {
		title: c?.fullName ? `${c.fullName} | effOne Hub` : `Circuit: ${circuitRef} | effOne Hub`
	};
}

export default async function CircuitPage({ params }: { params: Params }) {
	const { circuitRef } = await params;
	return <CircuitContent circuitRef={circuitRef} />;
}
