import {SeasonMenu} from '@/components/app';
import {ListFiltersProps, setNumberFilter, setStringFilter, TableFilter} from '@/components/ui';
import {Input} from '@/components/ui/shadcn/input';
import {Label} from '@/components/ui/shadcn/label';
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
			<div className="flex w-full flex-col gap-1">
				<Label htmlFor="drivers-search-filter">Driver</Label>
				<Input id="drivers-search-filter" value={localFilters.search} onChange={setStringFilter<DriversListFilters>(setLocalFilters, 'search')}/>
			</div>
			<div className="flex w-full flex-col gap-1">
				<Label htmlFor="drivers-nationality-filter">Nationality</Label>
				<Input id="drivers-nationality-filter" value={localFilters.nationality} onChange={setStringFilter<DriversListFilters>(setLocalFilters, 'nationality')}/>
			</div>
			<SeasonMenu required={false} variant="normal" id="drivers-season-filter" season={localFilters.season} setSeason={setNumberFilter<DriversListFilters>(setLocalFilters, 'season')}/>
		</TableFilter>
	);
}