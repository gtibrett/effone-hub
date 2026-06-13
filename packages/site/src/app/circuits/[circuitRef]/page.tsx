import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
	getCircuit,
	getCircuitPageData,
	getCurrentSeason,
	getCurrentSeasonCircuitIds,
	getSeasonRaceSchedule
} from '../../lib/cached-data';
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
	const circuit = await getCircuit(circuitRef);
	if (!circuit) notFound();

	const { year: currentSeason } = await getCurrentSeason();
	const [{ current, prior }, races] = await Promise.all([
		getCircuitPageData(circuitRef, currentSeason, currentSeason - 1),
		getSeasonRaceSchedule(currentSeason)
	]);

	return (
		<CircuitContent
			circuitRef={circuitRef}
			current={current}
			prior={prior}
			currentSeason={currentSeason}
			races={races}
		/>
	);
}
