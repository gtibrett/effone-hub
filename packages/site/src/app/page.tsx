import {gql} from '@apollo/client';
import type {Metadata} from 'next';
import {getClient} from './lib/apollo-rsc';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
	title:       'effOne Hub',
	description: 'Current Formula One season — race results, championship standings, and visualizations.'
};

export const revalidate = 3600;

const CurrentSeasonQuery = gql`
	query CurrentSeasonQuery {
		seasons(orderBy: YEAR_DESC, first: 1) {
			nodes {
				id
				year
			}
		}
	}
`;

export default async function HomePage() {
	let season: {year: number} = {year: new Date().getFullYear()};
	try {
		const {data} = await getClient().query<{seasons: {nodes: {year: number}[]}}>({query: CurrentSeasonQuery});
		const [current] = data.seasons.nodes;
		if (current) season = current;
	} catch {
		// fall back to current year on data fetch failure
	}

	return <HomeContent season={season}/>;
}
