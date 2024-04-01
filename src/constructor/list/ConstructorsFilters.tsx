import {SeasonMenu} from '@effonehub/components';
import {ListFiltersProps, setStringFilter, TableFilter} from '@effonehub/ui-components';
import {setNumberFilter} from '@effonehub/ui-components/TableFilter';
import {TextField} from '@mui/material';
import {SyntheticEvent, useState} from 'react';
import {ConstructorsListFilters} from './types';

export default function ConstructorsFilters({filters, setFilters}: ListFiltersProps<ConstructorsListFilters>) {
	const [localFilters, setLocalFilters] = useState<ConstructorsListFilters>(filters);
	
	const handleSearch = (ev: SyntheticEvent) => {
		ev.preventDefault();
		setFilters(localFilters);
	};
	
	return (
		<TableFilter handleSearch={handleSearch}>
			<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="constructors-search-filter" label="Constructor" variant="outlined" value={localFilters.search} onChange={setStringFilter<ConstructorsListFilters>(setLocalFilters, 'search')}/>
			<SeasonMenu required={false} variant="normal" id="constructors-season-filter" season={localFilters.season} setSeason={setNumberFilter<ConstructorsListFilters>(setLocalFilters, 'season')}/>
		</TableFilter>
	);
}