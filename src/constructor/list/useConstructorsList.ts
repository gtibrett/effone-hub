import {useQuery} from '@apollo/client';
import {filterByFreeformText} from '@effonehub/ui-components';
import {filterByNumber} from '@effonehub/ui-components/TableFilter';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {useMemo} from 'react';
import ConstructorsQuery from './ConstructorsQuery';
import {ConstructorsListFilters} from './types';

export default function useConstructorsList(filters: ConstructorsListFilters) {
	const {data, loading} = useQuery<{ teams: Team[] }>(ConstructorsQuery, {variables: {year: filters.season > 0 ? filters.season : undefined}});
	
	return useMemo(() => {
		let teams = data?.teams || [];
		if (filters.season > 0) {
			teams = filterByNumber<Team>(teams, filters.season, (season, d) => d.seasons.filter(s => s.year === season).length > 0);
		}
		
		if (filters.search.length) {
			teams = filterByFreeformText<Team>(teams, filters.search, ['name']);
		}
		
		return {data: teams, loading};
	}, [data?.teams, filters.search, filters.season, loading]);
}