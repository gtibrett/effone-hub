import type {Metadata} from 'next';
import HomeContent from './HomeContent';
import {getCurrentSeason} from './lib/cached-data';

export const metadata: Metadata = {
	title:       'effOne Hub',
	description: 'Current Formula One season — race results, championship standings, and visualizations.'
};

export default async function HomePage() {
	const season = await getCurrentSeason();
	return <HomeContent season={season}/>;
}
