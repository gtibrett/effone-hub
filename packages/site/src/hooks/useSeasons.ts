import {ApolloError, gql, useQuery} from '@apollo/client';
import {Season} from '@/gql/graphql';
import {useMemo} from 'react';

export const SeasonsListQuery = gql`
	query SeasonsListQuery {
		seasons(orderBy: YEAR_DESC) {
			nodes {
				year
				ended
				hasResults
			}
		}
	}
`;

type SeasonRow = Pick<Season, 'year' | 'ended' | 'hasResults'>;

type useSeasonReturnType = {
	seasons: SeasonRow[];
	loading: boolean;
	error: ApolloError | undefined
}

export default function useSeasons(): useSeasonReturnType {
	const {data, loading, error} = useQuery<{ seasons: { nodes: SeasonRow[] } }>(SeasonsListQuery);

	return useMemo<useSeasonReturnType>(() => {
		const seasons = data?.seasons.nodes ?? [{year: (new Date()).getFullYear(), ended: false, hasResults: false}];
		return {seasons, loading, error};
	}, [data, loading, error]);
}
