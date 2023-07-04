import {Constructor, Responses} from '@gtibrett/effone-hub-api';
import {usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton, TextField, TextFieldProps} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapConstructors} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../constructors/ByLine';
import SeasonMenu from '../schedule/SeasonMenu';
import {Page, TableFilter} from '../ui-components';

type ConstructorsTableProps = {
	constructors: Constructor[];
}

function ConstructorsTable({constructors}: ConstructorsTableProps) {
	
	return (
		<DataGrid
			rows={constructors}
			autoHeight
			density="compact"
			getRowId={r => r.constructorId}
			columns={
				[
					{
						field:      'name',
						headerName: 'Constructor',
						flex:       1,
						renderCell: (({row}) => <ByLine id={row.constructorId}/>)
					}
				] as GridColDef<Constructor>[]
			}
			initialState={{
				sorting: {
					sortModel: [{field: 'name', sort: 'asc'}]
				}
			}}
		/>
	);
}

export default function Drivers() {
	usePageTitle('Constructors');
	
	const [{season: currentSeason}]       = useAppState();
	const [constructors, setConstructors] = useState<Constructor[] | undefined>();
	const [localFilters, setLocalFilters] = useState({
		season: currentSeason,
		search: ''
	});
	const [filters, setFilters]           = useState({
		season: currentSeason,
		search: ''
	});
	
	const setSeason = (value: number) => {
		setLocalFilters(cur => ({
			...cur,
			season: value
		}));
	};
	
	const setSearch: TextFieldProps['onChange'] = (ev) => {
		setLocalFilters(cur => ({
			...cur,
			search: ev.target.value
		}));
	};
	
	const handleSearch = (ev: SyntheticEvent) => {
		ev.preventDefault();
		setFilters(localFilters);
	};
	
	useEffect(() => {
		if (Number(filters.season) || filters.search.length) {
			let url = getAPIUrl('/constructors.json');
			if (Number(filters.season) > 0) {
				url = getAPIUrl(`/${filters.season}/constructors.json`);
			}
			
			Caxios.get<Responses.ConstructorsResponse>(url, {params: {limit: 2000}})
			      .then(mapConstructors)
			      .then(results => {
				      if (!filters.search.length) {
					      return results;
				      }
				      return results.filter(c => {
					      const tokens = filters.search.toLowerCase().split(' ');
					      for (const token of tokens) {
						      if (c.name.toLowerCase().includes(token)) {
							      return true;
						      }
					      }
					      return false;
				      });
			      })
			      .then(results => setConstructors(results))
			      .catch((err) => {
				      console.log(err);
				      setConstructors([]);
			      });
		}
	}, [filters.season, filters.search]);
	
	return (
		<Page title="Constructors">
			{
				!constructors
				? <Skeleton variant="rectangular" height={400}/>
				: (
					<Card>
						<TableFilter handleSearch={handleSearch}>
							<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="constructors-search-filter" label="Constructor" variant="outlined" value={localFilters.search} onChange={setSearch}/>
							<SeasonMenu required={false} variant="normal" id="constructors-season-filter" season={localFilters.season} setSeason={setSeason}/>
						</TableFilter>
						<CardContent>
							<ConstructorsTable constructors={constructors}/>
						</CardContent>
					</Card>
				)
			}
		</Page>
	);
}