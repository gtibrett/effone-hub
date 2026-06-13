import { useMemo } from 'react';

import { filterByFreeformText, filterByNumber } from '@/components/ui';
import type { Driver } from '@/gql/graphql';

import type { DriversListFilters } from './types';

export default function useDriversList(unfilteredDrivers: Driver[], filters: DriversListFilters) {
	return useMemo(() => {
		let drivers = unfilteredDrivers || [];
		if (filters.season > 0) {
			drivers = filterByNumber<Driver>(
				drivers,
				filters.season,
				(season, d) =>
					(d.seasonDrivers ?? []).filter(s => s?.season?.year === season).length > 0
			);
		}

		if (filters.search.length) {
			drivers = filterByFreeformText(drivers, filters.search, ['firstName', 'lastName']);
		}

		if (filters.nationality.length) {
			drivers = filterByFreeformText(drivers, filters.nationality, ['nationalityCountryId']);
		}

		return drivers;
	}, [unfilteredDrivers, filters]);
}
