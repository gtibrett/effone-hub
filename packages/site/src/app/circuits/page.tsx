import type { Metadata } from 'next';

import { getCircuits } from '@/app/lib/cached-data';

import CircuitsContent from './CircuitsContent';

export const metadata: Metadata = {
	title: 'Circuits | effOne Hub'
};

export default async function CircuitsPage() {
	const circuits = await getCircuits();
	return <CircuitsContent circuits={circuits} />;
}
