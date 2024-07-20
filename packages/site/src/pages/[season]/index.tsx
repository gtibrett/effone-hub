import {Season} from '@/gql/graphql';
import {SeasonsListQuery} from '@/hooks/useSeasons';
import {apolloClient} from '@/useApolloClient';
import {default as CurrentSeason} from '../seasons/[season]';

export async function getStaticProps({params}: { params: { season: string } }) {
	const {data: {seasons}} = await apolloClient.query<{ seasons: Season[] }>({query: SeasonsListQuery});
	
	const seasonToShow = Math.max(...seasons.filter(s => s.hasResults).map(s => s.year));
	
	return {
		props: {
			season: params.season,
			seasonToShow
		}
	};
}

export async function getStaticPaths() {
	const {data: {seasons}} = await apolloClient.query<{ seasons: Season[] }>({query: SeasonsListQuery});
	
	const currentSeason = Math.max(...seasons.filter(s => !s.ended).map(s => s.year));
	
	const paths = [{
		params: {season: currentSeason.toString()}
	}];
	
	console.warn(paths);
	
	return {paths, fallback: false};
}

export default CurrentSeason;