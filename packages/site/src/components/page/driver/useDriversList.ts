import {filterByFreeformText, filterByNumber} from '@/components/ui';
import {Driver} from '@/gql/graphql';
import {useSuspenseQuery} from '@apollo/client';
import {useMemo} from 'react';
import DriversQuery from './DriversQuery';
import {DriversListFilters} from './types';

export default function useDriversList(unfilteredDrivers: Driver[], filters: DriversListFilters) {
	return useMemo(() => {
		let drivers = unfilteredDrivers || [];
		if (filters.season > 0) {
			drivers = filterByNumber<Driver>(drivers, filters.season, (season, d) => d.teamsByYear.filter(s => s.year === season).length > 0);
		}
		
		if (filters.search.length) {
			drivers = filterByFreeformText(drivers, filters.search, ['forename', 'surname']);
		}
		
		if (filters.nationality.length) {
			drivers = filterByFreeformText(drivers, filters.nationality, ['nationality']);
		}
		
		return drivers;
	}, [unfilteredDrivers, filters]);
}