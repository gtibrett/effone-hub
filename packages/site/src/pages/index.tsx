import Season from '@/components/page/season/Season';
import {apolloClient} from '@/useApolloClient';
import {gql} from '@apollo/client';
import type {InferGetStaticPropsType} from 'next';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

type SeasonData = {
	year: number;
}

export async function getStaticProps() {
	const {data}    = await apolloClient.query<{ seasons: { nodes: SeasonData[] } }>({query: CurrentSeasonQuery});
	const [current] = data.seasons.nodes;

	return {
		props: {
			season: current ?? {year: new Date().getFullYear()}
		}
	};
}

export default function HomePage({season}: HomePageProps) {
	return (
		<Season season={season}/>
	);
}

const CurrentSeasonQuery = gql`query CurrentSeasonQuery {
	seasons(orderBy: YEAR_DESC, first: 1) {
		nodes {
			year
		}
	}
}`;
