import {useQuery} from '@apollo/client';
import {filterByFreeformText} from '@effonehub/ui-components';
import {filterByNumber} from '@effonehub/ui-components/TableFilter';
import {Team} from '@gtibrett/effone-hub-graph-api';
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