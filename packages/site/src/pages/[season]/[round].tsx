import {Race} from '@/gql/graphql';
import {apolloClient} from '@/useApolloClient';
import {gql} from '@apollo/client';
import {default as CurrentSeasonRound} from '../seasons/[season]/[round]';

export default CurrentSeasonRound;

export async function getStaticProps({params: {season, round}}: { params: { season: string, round: string, race: Race } }) {
	return {
		props: {
			season, round
		}
	};
}

const SeasonRacesQuery = gql`
	query AllRacesQuery {
		races {
			year
			round
		}
	}
`;

export async function getStaticPaths() {
	const {data: {races}} = await apolloClient.query<{ races: Race[] }>({query: SeasonRacesQuery});
	const currentSeason = Math.max(...races.map(r=>r.year || 0))
	
	const paths = races.filter(r=>r.year===currentSeason).map(race => ({
		params: {season: race.year?.toString(), round: race.round?.toString()}
	}));
	
	return {paths, fallback: false};
}