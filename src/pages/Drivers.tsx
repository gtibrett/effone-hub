import {gql, useQuery} from '@apollo/client';
import {usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton, TextField, TextFieldProps} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../drivers/ByLine';
import {Driver} from '@gtibrett/effone-hub-graph-api';
import SeasonMenu from '../SeasonMenu';
import {Page, TableFilter} from '../ui-components';

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
						valueGetter: (({row}) => `${row.forename}, ${row.surname}`)
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

const DriversQuery = gql`
	#graphql
	query DriversQuery {
		drivers (orderBy: SURNAME_ASC) {
			driverId
			driverRef
			forename
			surname
			seasons {
				year
			}
		}
	}
`;

export default function Drivers() {
	usePageTitle('Drivers');
	
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
	
	const {data, loading} = useQuery<{ drivers: Driver[] }>(DriversQuery, {variables: {year: filters.season > 0 ? filters.season : undefined}});
	
	useEffect(() => {
		let results = data?.drivers || [];
		if (filters.season > 0) {
			results = results.filter(d => d.seasons.find(s => s.year === filters.season));
		}
		
		if (filters.search.length) {
			results = results.filter(d => {
				const tokens = filters.search.toLowerCase().split(' ');
				for (const token of tokens) {
					if (d.forename.toLowerCase().includes(token) || d.surname.toLowerCase().includes(token)) {
						return true;
					}
				}
				return false;
			});
		}
		
		setDrivers(results);
	}, [data, filters.search, filters.season]);
	
	return (
		<Page title="Drivers">
			{
				(loading || !drivers)
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