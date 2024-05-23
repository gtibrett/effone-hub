import {SeasonMenu} from '@effonehub/components';
import {ListFiltersProps, setStringFilter, TableFilter} from '@effonehub/ui-components';
import {setNumberFilter} from '@effonehub/ui-components/TableFilter';
import {TextField} from '@mui/material';
import {SyntheticEvent, useState} from 'react';
import {DriversListFilters} from './types';

export default function DriversFilters({filters, setFilters}: ListFiltersProps<DriversListFilters>) {
	const [localFilters, setLocalFilters] = useState<DriversListFilters>(filters);
	
	const handleSearch = (ev: SyntheticEvent) => {
		ev.preventDefault();
		setFilters(localFilters);
	};
	
	return (
		<TableFilter handleSearch={handleSearch}>
			<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="drivers-search-filter" label="Driver" variant="outlined" value={localFilters.search} onChange={setStringFilter<DriversListFilters>(setLocalFilters, 'search')}/>
			<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="drivers-nationality-filter" label="Nationality" variant="outlined" value={localFilters.nationality} onChange={setStringFilter<DriversListFilters>(setLocalFilters, 'nationality')}/>
			<SeasonMenu required={false} variant="normal" id="drivers-season-filter" season={localFilters.season} setSeason={setNumberFilter<DriversListFilters>(setLocalFilters, 'season')}/>
		</TableFilter>
	);
}