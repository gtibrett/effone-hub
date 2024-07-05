import {filterByFreeformText, filterByNumber} from '@/components/ui';
import {useQuery} from '@apollo/client';
import {Team} from '@/gql/graphql';
import ConstructorsQuery from './ConstructorsQuery';
import {ConstructorsListFilters} from './types';

export type TeamWithSeasons = Omit<Team, 'driversByYear'> & {
	seasons: Team['driversByYear']
}

type ConstructorsListData = {
	teams: TeamWithSeasons[]
}

export default function useConstructorsList(filters: ConstructorsListFilters) {
	const {data, loading} = useQuery<ConstructorsListData>(ConstructorsQuery, {variables: {year: filters.season > 0 ? filters.season : undefined}});
	
	let teams = data?.teams || [];
	if (filters.season > 0) {
		teams = filterByNumber<TeamWithSeasons>(teams, filters.season, (season, d) => d.seasons.filter(s => s.year === season).length > 0);
	}
	
	if (filters.search.length) {
		teams = filterByFreeformText<TeamWithSeasons>(teams, filters.search, ['name']);
	}
	
	return {data: teams, loading};
}