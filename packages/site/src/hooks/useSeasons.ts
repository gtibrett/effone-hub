import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { ApolloError } from '@apollo/client/v4-migration';

export const SeasonsListQuery = gql`
	query SeasonsListQuery {
		seasons(orderBy: YEAR_DESC) {
			year
			hasResults
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
	hasResults: boolean | null;
};

type useSeasonReturnType = {
	seasons: SeasonRow[];
	loading: boolean;
	error: ApolloError | undefined;
};

export default function useSeasons(): useSeasonReturnType {
	const { data, loading, error } = useQuery<{ seasons: SeasonNode[] }>(SeasonsListQuery);

	return useMemo<useSeasonReturnType>(() => {
		const currentYear = new Date().getFullYear();
		const seasons: SeasonRow[] = data?.seasons.map(s => ({
			year: s.year,
			ended: s.year < currentYear,
			hasResults: !!s.hasResults
		})) ?? [{ year: currentYear, ended: false, hasResults: false }];
		return { seasons, loading, error };
	}, [data, loading, error]);
}
