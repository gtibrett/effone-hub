import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ApolloError } from '@apollo/client/v4-migration';

export const SeasonsListQuery = gql`
	query SeasonsListQuery {
		seasons(orderBy: YEAR_DESC) {
			nodes {
				id
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
	error: ApolloError | undefined;
};

export default function useSeasons(): useSeasonReturnType {
	const { data, loading, error } = useQuery<{ seasons: { nodes: SeasonNode[] } }>(
		SeasonsListQuery
	);

	return useMemo<useSeasonReturnType>(() => {
		const currentYear = new Date().getFullYear();
		const seasons: SeasonRow[] = data?.seasons.nodes.map(s => ({
			year: s.year,
			ended: s.year < currentYear,
			hasResults: (s.seasonDriverStandingsByYear?.totalCount ?? 0) > 0
		})) ?? [{ year: currentYear, ended: false, hasResults: false }];
		return { seasons, loading, error };
	}, [data, loading, error]);
}
