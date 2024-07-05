import {filterByFreeformText, filterByNumber} from '@/components/ui';
import {useSuspenseQuery} from '@apollo/client';
import {Circuit} from '@/gql/graphql';
import CircuitQuery from './CircuitsQuery';
import {CircuitsListFilters} from './types';

export default function useCircuitsList(filters: CircuitsListFilters) {
	const {data} = useSuspenseQuery<{ circuits: Circuit[] }>(CircuitQuery);
	
	let results = data?.circuits || [];
	if (filters.season > 0) {
		results = filterByNumber<Circuit>(results, filters.season, (season, d) => d.races.filter(s => s.year === season).length > 0);
	}
	
	if (filters.search.length) {
		results = filterByFreeformText<Circuit>(results, filters.search, ['name', 'country', 'location']);
	}
	
	return {data: results};
}