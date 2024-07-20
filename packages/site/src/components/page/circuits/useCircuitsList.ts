import {filterByFreeformText, filterByNumber} from '@/components/ui';
import {Circuit} from '@/gql/graphql';
import {useMemo} from 'react';
import {CircuitsListFilters} from './types';

export default function useCircuitsList(unfilteredCircuits: Circuit[], filters: CircuitsListFilters) {
	return useMemo(() => {
		let circuits = unfilteredCircuits || [];
		if (filters.season > 0) {
			circuits = filterByNumber<Circuit>(circuits, filters.season, (season, d) => d.races.filter(s => s.year === season).length > 0);
		}
		
		if (filters.search.length) {
			circuits = filterByFreeformText<Circuit>(circuits, filters.search, ['name', 'country', 'location']);
		}
		
		return circuits;
	}, [filters, unfilteredCircuits]);
}