import type { Metadata } from 'next';

import { getSeasons } from '@/app/lib/cached-data';

import SeasonsContent from './SeasonsContent';

export const metadata: Metadata = {
	title: 'Past Seasons | effOne Hub'
};

export default async function SeasonsPage() {
	const seasons = await getSeasons();
	return <SeasonsContent seasons={seasons} />;
}
