import {SeasonData} from '@/components/page/season';
import {default as SeasonContent} from '@/components/page/season/Season';
import {PastSeasonsQuery, SingleSeasonQuery} from '@/data/query/season.graphql';
import {Season} from '@/gql/graphql';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle} from '@gtibrett/mui-additions';

type SeasonProps = { season: Season }

export default function SeasonPage({season}: SeasonProps) {
	setPageTitle(`${season} Season`);
	
	return (
		<SeasonContent season={season}/>
	);
}

export async function getStaticProps({params}: { params: { season: string } }) {
	const year             = Number(params.season);
	const {data: {season}} = await apolloClient.query<{ season: SeasonData }>({query: SingleSeasonQuery, variables: {season: year}});
	
	return {
		props: {
			season
		}
	};
}

export async function getStaticPaths() {
	const {data: {seasons}} = await apolloClient.query<{ seasons: SeasonData[] }>({query: PastSeasonsQuery});
	
	const paths = seasons.map(season => ({
		params: {season: season.year.toString()}
	}));
	
	return {paths, fallback: 'blocking'};
}