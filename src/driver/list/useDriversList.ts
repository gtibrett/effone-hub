import {useQuery} from '@apollo/client';
import {filterByFreeformText} from '@effonehub/ui-components';
import {filterByNumber} from '@effonehub/ui-components/TableFilter';
import {Driver} from '@gtibrett/effone-hub-graph-api';
import {useMemo} from 'react';
import DriversQuery from './DriversQuery';
import {DriversListFilters} from './types';

export default function useDriversList(filters: DriversListFilters) {
	const {data, loading} = useQuery<{ drivers: Driver[] }>(DriversQuery);
	
	return useMemo(() => {
		let drivers = data?.drivers || [];
		if (filters.season > 0) {
			drivers = filterByNumber<Driver>(drivers, filters.season, (season, d) => d.teamsByYear.filter(s => s.year === season).length > 0);
		}
		
		if (filters.search.length) {
			drivers = filterByFreeformText(drivers, filters.search, ['forename', 'surname']);
		}
		
		if (filters.nationality.length) {
			drivers = filterByFreeformText(drivers, filters.nationality, ['nationality']);
		}
		
		return {data: drivers, loading};
	}, [data?.drivers, filters, loading]);
}