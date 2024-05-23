import {useQuery} from '@apollo/client';
import {filterByFreeformText, filterByNumber} from '@effonehub/ui-components';
import {Circuit} from '@gtibrett/effone-hub-graph-api';
import {useMemo} from 'react';
import CircuitQuery from './CircuitsQuery';
import {CircuitsListFilters} from './types';

export default function useCircuitsList(filters: CircuitsListFilters) {
	const {data, loading} = useQuery<{ circuits: Circuit[] }>(CircuitQuery);
	
	return useMemo(() => {
		let results = data?.circuits || [];
		if (filters.season > 0) {
			results = filterByNumber<Circuit>(results, filters.season, (season, d) => d.races.filter(s => s.year === season).length > 0);
		}
		
		if (filters.search.length) {
			results = filterByFreeformText<Circuit>(results, filters.search, ['name', 'country', 'location']);
		}
		
		return {data: results, loading};
	}, [data?.circuits, filters, loading]);
}