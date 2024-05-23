import {CircuitsListFilters} from '@effonehub/circuits/list/types';
import {SeasonMenu} from '@effonehub/components';
import {ListFiltersProps, setStringFilter, TableFilter} from '@effonehub/ui-components';
import {setNumberFilter} from '@effonehub/ui-components/TableFilter';
import {TextField} from '@mui/material';
import {SyntheticEvent, useState} from 'react';

export default function CircuitsFilters({filters, setFilters}: ListFiltersProps<CircuitsListFilters>) {
	const [localFilters, setLocalFilters] = useState<CircuitsListFilters>(filters);
	
	const handleSearch = (ev: SyntheticEvent) => {
		ev.preventDefault();
		setFilters(localFilters);
	};
	
	return (
		<TableFilter handleSearch={handleSearch}>
			<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="circuits-search-filter" label="Circuit" variant="outlined" value={localFilters.search} onChange={setStringFilter<CircuitsListFilters>(setLocalFilters, 'search')}/>
			<SeasonMenu required={false} variant="normal" id="circuits-season-filter" season={localFilters.season} setSeason={setNumberFilter<CircuitsListFilters>(setLocalFilters, 'season')}/>
		</TableFilter>
	);
}