import {Driver, Responses} from '@gtibrett/effone-hub-api';
import {Card, CardContent, Skeleton, TextField, TextFieldProps, useTheme} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapDrivers} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../drivers/ByLine';
import SeasonMenu from '../schedule/SeasonMenu';
import {Page, TableFilter, usePageTitle} from '../ui-components';

type DriversTableProps = {
	drivers: Driver[];
}

function DriversTable({drivers}: DriversTableProps) {
	
	return (
		<DataGrid
			rows={drivers}
			autoHeight
			density="compact"
			getRowId={r => r.driverId}
			columns={
				[
					{
						field:       'driver',
						headerName:  'Driver',
						flex:        1,
						renderCell:  (({row}) => <ByLine id={row.driverId}/>),
						valueGetter: (({row}) => `${row.familyName}, ${row.givenName}`)
					}
				] as GridColDef<Driver>[]
			}
			initialState={{
				sorting: {
					sortModel: [{field: 'driver', sort: 'asc'}]
				}
			}}
		/>
	);
}

export default function Drivers() {
	usePageTitle('Drivers');
	
	const theme                           = useTheme();
	const [{season: currentSeason}]       = useAppState();
	const [drivers, setDrivers]           = useState<Driver[] | undefined>();
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
			let url = getAPIUrl(`/drivers.json`);
			if (Number(filters.season) > 0) {
				url = getAPIUrl(`/${filters.season}/drivers.json`);
			}
			
			Caxios.get<Responses.DriversResponse>(url, {params: {limit: 2000}})
			      .then(mapDrivers)
			      .then(results => {
				      if (!filters.search.length) {
					      return results;
				      }
				      return results.filter(d => {
					      const tokens = filters.search.toLowerCase().split(' ');
					      for (const token of tokens) {
						      if (d.givenName.toLowerCase().includes(token) || d.familyName.toLowerCase().includes(token)) {
							      return true;
						      }
					      }
					      return false;
				      });
			      })
			      .then(results => setDrivers(results))
			      .catch((err) => {
				      console.log(err);
				      setDrivers([]);
			      });
		}
	}, [filters.season, filters.search]);
	
	return (
		<Page title="Drivers">
			{
				!drivers
				? <Skeleton variant="rectangular" height={400}/>
				: (
					<Card>
						<TableFilter handleSearch={handleSearch}>
							<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="drivers-search-filter" label="Driver" variant="outlined" value={localFilters.search} onChange={setSearch}/>
							<SeasonMenu required={false} variant="normal" id="drivers-season-filter" season={localFilters.season} setSeason={setSeason}/>
						</TableFilter>
						<CardContent>
							<DriversTable drivers={drivers}/>
						</CardContent>
					</Card>
				)
			}
		</Page>
	);
}