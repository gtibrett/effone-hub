import {filterByFreeformText, filterByNumber} from '@/components/ui';
import {Team} from '@/gql/graphql';
import {useMemo} from 'react';
import {ConstructorsListFilters} from './types';

export type TeamWithSeasons = Omit<Team, 'driversByYear'> & {
	seasons: Team['driversByYear']
}

export default function useConstructorsList(unfilteredTeams: TeamWithSeasons[], filters: ConstructorsListFilters) {
	return useMemo(() => {
		let teams = unfilteredTeams || [];
		if (filters.season > 0) {
			teams = filterByNumber<TeamWithSeasons>(teams, filters.season, (season, d) => d.seasons.filter(s => s.year === season).length > 0);
		}
		
		if (filters.search.length) {
			teams = filterByFreeformText<TeamWithSeasons>(teams, filters.search, ['name']);
		}
		
		return teams;
	}, [filters, unfilteredTeams]);
}