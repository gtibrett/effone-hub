import {SeasonMenu} from '@/components/app';
import {ListFiltersProps, setNumberFilter, setStringFilter, TableFilter} from '@/components/ui';
import {Input} from '@/components/ui/shadcn/input';
import {Label} from '@/components/ui/shadcn/label';
import {SyntheticEvent, useState} from 'react';
import {CircuitsListFilters} from './types';

export default function CircuitsFilters({filters, setFilters}: ListFiltersProps<CircuitsListFilters>) {
	const [localFilters, setLocalFilters] = useState<CircuitsListFilters>(filters);

	const handleSearch = (ev: SyntheticEvent) => {
		ev.preventDefault();
		setFilters(localFilters);
	};

	return (
		<TableFilter handleSearch={handleSearch}>
			<div className="flex w-full flex-col gap-1">
				<Label htmlFor="circuits-search-filter">Circuit</Label>
				<Input id="circuits-search-filter" value={localFilters.search} onChange={setStringFilter<CircuitsListFilters>(setLocalFilters, 'search')}/>
			</div>
			<SeasonMenu required={false} variant="normal" id="circuits-season-filter" season={localFilters.season} setSeason={setNumberFilter<CircuitsListFilters>(setLocalFilters, 'season')}/>
		</TableFilter>
	);
}