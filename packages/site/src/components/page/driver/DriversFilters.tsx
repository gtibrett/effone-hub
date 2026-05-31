import { SyntheticEvent, useState } from 'react';
import { TextField } from '@mui/material';

import { SeasonMenu } from '@/components/app';
import { ListFiltersProps, setNumberFilter, setStringFilter, TableFilter } from '@/components/ui';

import { DriversListFilters } from './types';

export default function DriversFilters({
	filters,
	setFilters
}: ListFiltersProps<DriversListFilters>) {
	const [localFilters, setLocalFilters] = useState<DriversListFilters>(filters);

	const handleSearch = (ev: SyntheticEvent) => {
		ev.preventDefault();
		setFilters(localFilters);
	};

	return (
		<TableFilter handleSearch={handleSearch}>
			<TextField
				fullWidth
				size="small"
				id="drivers-search-filter"
				label="Driver"
				variant="outlined"
				value={localFilters.search}
				onChange={setStringFilter<DriversListFilters>(setLocalFilters, 'search')}
				slotProps={{
					inputLabel: { shrink: true }
				}}
			/>
			<TextField
				fullWidth
				size="small"
				id="drivers-nationality-filter"
				label="Nationality"
				variant="outlined"
				value={localFilters.nationality}
				onChange={setStringFilter<DriversListFilters>(setLocalFilters, 'nationality')}
				slotProps={{
					inputLabel: { shrink: true }
				}}
			/>
			<SeasonMenu
				required={false}
				variant="normal"
				id="drivers-season-filter"
				season={localFilters.season}
				setSeason={setNumberFilter<DriversListFilters>(setLocalFilters, 'season')}
			/>
		</TableFilter>
	);
}
