import { type SyntheticEvent, useState } from 'react';
import { TextField } from '@mui/material';

import { SeasonMenu } from '@/components/app';
import {
	type ListFiltersProps,
	setNumberFilter,
	setStringFilter,
	TableFilter
} from '@/components/ui';

import type { ConstructorsListFilters } from './types';

export default function ConstructorsFilters({
	filters,
	setFilters
}: ListFiltersProps<ConstructorsListFilters>) {
	const [localFilters, setLocalFilters] = useState<ConstructorsListFilters>(filters);

	const handleSearch = (ev: SyntheticEvent) => {
		ev.preventDefault();
		setFilters(localFilters);
	};

	return (
		<TableFilter handleSearch={handleSearch}>
			<TextField
				fullWidth
				size="small"
				id="constructors-search-filter"
				label="Constructor"
				variant="outlined"
				value={localFilters.search}
				onChange={setStringFilter<ConstructorsListFilters>(setLocalFilters, 'search')}
				slotProps={{
					inputLabel: { shrink: true }
				}}
			/>
			<SeasonMenu
				required={false}
				variant="normal"
				id="constructors-season-filter"
				season={localFilters.season}
				setSeason={setNumberFilter<ConstructorsListFilters>(setLocalFilters, 'season')}
			/>
		</TableFilter>
	);
}
