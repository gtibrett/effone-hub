import {default as SeasonContent} from '@/components/page/season/Season';
import {PastSeasonsQuery, SingleSeasonQuery} from '@/data/query/season.graphql';
import {Season} from '@/gql/graphql';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle} from '@gtibrett/mui-additions';

type SeasonProps = { season: Pick<Season, 'year'> }

export default function SeasonPage({season}: SeasonProps) {
	setPageTitle(`${season.year} Season`);
	
	return (
		<SeasonContent season={season}/>
	);
}

export async function getStaticProps({params}: { params: { season: string } }) {
	const year             = Number(params.season);
	const {data: {season}} = await apolloClient.query<{ season: { year: number } }>({query: SingleSeasonQuery, variables: {season: year}});
	
	return {
		props: {
			season
		}
	};
}

export async function getStaticPaths() {
	const {data: {seasons}} = await apolloClient.query<{ seasons: { nodes: { year: number }[] } }>({query: PastSeasonsQuery});

	const paths = seasons.nodes.map(season => ({
		params: {season: season.year.toString()}
	}));
	
	return {paths, fallback: 'blocking'};
}