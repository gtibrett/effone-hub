import {ApolloError, gql, useQuery} from '@apollo/client';
import {Season} from '@/gql/graphql';
import {useMemo} from 'react';

export const SeasonsListQuery = gql`
	query SeasonsListQuery {
		seasons {
			year
			ended
			hasResults
		}
	}
`;

type useSeasonReturnType = {
	seasons: Season[];
	loading: boolean;
	error: ApolloError | undefined
}

export default function useSeasons(): useSeasonReturnType {
	const {data, loading, error} = useQuery<{ seasons: Season[] }>(SeasonsListQuery);
	
	return useMemo<useSeasonReturnType>(() => {
		const seasons = (data?.seasons || [{year: (new Date()).getFullYear()}] as Season[]).map(s => s);
		seasons.sort();
		seasons.reverse();
		
		return {seasons, loading, error};
	}, [data, loading, error]);
}