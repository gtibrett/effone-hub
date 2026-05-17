import {SeasonMenu} from '@/components/app';
import {ListFiltersProps, setNumberFilter, setStringFilter, TableFilter} from '@/components/ui';
import {Input} from '@/components/ui/shadcn/input';
import {Label} from '@/components/ui/shadcn/label';
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
			<div className="flex w-full flex-col gap-1">
				<Label htmlFor="constructors-search-filter">Constructor</Label>
				<Input id="constructors-search-filter" value={localFilters.search} onChange={setStringFilter<ConstructorsListFilters>(setLocalFilters, 'search')}/>
			</div>
			<SeasonMenu required={false} variant="normal" id="constructors-season-filter" season={localFilters.season} setSeason={setNumberFilter<ConstructorsListFilters>(setLocalFilters, 'season')}/>
		</TableFilter>
	);
}