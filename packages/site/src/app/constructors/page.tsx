import type { Metadata } from 'next';

import { getConstructors } from '@/app/lib/cached-data';

import ConstructorsContent from './ConstructorsContent';

export const metadata: Metadata = {
	title: 'Constructors | effOne Hub'
};

export default async function ConstructorsPage() {
	const teams = await getConstructors();
	return <ConstructorsContent teams={teams} />;
}
