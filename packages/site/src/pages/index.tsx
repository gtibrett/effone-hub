import Season from '@/components/page/season/Season';
import {apolloClient} from '@/useApolloClient';
import {gql} from '@apollo/client';
import type {InferGetStaticPropsType} from 'next';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

type SeasonData = {
	year: number,
	ended: boolean,
	hasResults: boolean
}

export async function getStaticProps() {
	const {data}          = await apolloClient.query<{ seasons: SeasonData[] }>({query: CurrentAndLastSeasonQuery});
	const {seasons}       = data;
	const [currentSeason] = seasons;
	
	return {
		props: {
			season: currentSeason
		}
	};
}

export default function HomePage({season}: HomePageProps) {
	return (
		<Season season={season}/>
	);
}

const CurrentAndLastSeasonQuery = gql`query SeasonsListQuery {
	seasons (orderBy:YEAR_DESC, first:1) {
		year
		ended
		hasResults
	}
}`;

