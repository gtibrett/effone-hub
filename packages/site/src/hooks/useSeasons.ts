import {ApolloError, gql, useQuery} from '@apollo/client';
import {useMemo} from 'react';

export const SeasonsListQuery = gql`
	query SeasonsListQuery {
		seasons(orderBy: YEAR_DESC) {
			nodes {
				year
				seasonDriverStandingsByYear(first: 1) {
					totalCount
				}
			}
		}
	}
`;

type SeasonRow = {
	year: number;
	ended: boolean;
	hasResults: boolean;
};

type SeasonNode = {
	year: number;
	seasonDriverStandingsByYear: { totalCount: number };
};

type useSeasonReturnType = {
	seasons: SeasonRow[];
	loading: boolean;
	error: ApolloError | undefined
}

export default function useSeasons(): useSeasonReturnType {
	const {data, loading, error} = useQuery<{ seasons: { nodes: SeasonNode[] } }>(SeasonsListQuery);

	return useMemo<useSeasonReturnType>(() => {
		const currentYear = new Date().getFullYear();
		const seasons: SeasonRow[] = data?.seasons.nodes.map(s => ({
			year:       s.year,
			ended:      s.year < currentYear,
			hasResults: (s.seasonDriverStandingsByYear?.totalCount ?? 0) > 0
		})) ?? [{year: currentYear, ended: false, hasResults: false}];
		return {seasons, loading, error};
	}, [data, loading, error]);
}
