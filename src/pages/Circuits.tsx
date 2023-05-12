import {Circuit, Responses} from '@gtibrett/effone-hub-api';
import {Card, CardContent, Skeleton, TextField, TextFieldProps, useTheme} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapCircuits} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import SeasonMenu from '../schedule/SeasonMenu';
import {Link, Page, TableFilter, usePageTitle} from '../ui-components';

type CircuitsTableProps = {
	circuits: Circuit[];
}

const CircuitsTable = ({circuits}: CircuitsTableProps) => (
	<DataGrid
		rows={circuits}
		autoHeight
		density="compact"
		getRowId={c => c.circuitId}
		columns={
			[
				{
					field:      'circuitName',
					headerName: 'Circuit',
					flex:       1,
					renderCell: ({row}) => <Link to={`/circuit/${row.circuitId}`}>{row.circuitName}</Link>
				},
				{
					field:      'country',
					headerName: 'Location',
					flex:       .75,
					renderCell: ({row}) => row.Location && `${row.Location.locality}, ${row.Location.country}`
				}
			] as GridColDef<Circuit>[]
		}
		initialState={{
			sorting: {
				sortModel: [{field: 'circuitName', sort: 'asc'}]
			}
		}}
	/>
);

export default function Circuits() {
	usePageTitle('Circuits');
	
	const theme                           = useTheme();
	const [{season: currentSeason}]       = useAppState();
	const [circuits, setCircuits]         = useState<Circuit[] | undefined>();
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
			let url = getAPIUrl(`/circuits.json`);
			if (Number(filters.season) > 0) {
				url = getAPIUrl(`/${filters.season}/circuits.json`);
			}
			
			Caxios.get<Responses.CircuitResponse>(url, {params: {limit: 2000}})
			      .then(mapCircuits)
			      .then(results => {
				      if (!filters.search.length) {
					      return results;
				      }
				      return results.filter(c => {
					      const tokens = filters.search.toLowerCase().split(' ');
					      for (const token of tokens) {
						      if (c.circuitName.toLowerCase().includes(token)
						          || c.Location.country.toLowerCase().includes(token)
						          || c.Location.locality.toLowerCase().includes(token)) {
							      return true;
						      }
					      }
					      return false;
				      });
			      })
			      .then(results => setCircuits(results))
			      .catch((err) => {
				      console.log(err);
				      setCircuits([]);
			      });
		}
	}, [filters.season, filters.search]);
	
	return (
		<Page title="Circuits">
			{
				!circuits
				? <Skeleton variant="rectangular" height={400}/>
				: (
					<Card>
						<TableFilter handleSearch={handleSearch}>
							<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="circuits-search-filter" label="Circuit" variant="outlined" value={localFilters.search} onChange={setSearch}/>
							<SeasonMenu required={false} variant="normal" id="circuits-season-filter" season={localFilters.season} setSeason={setSeason}/>
						</TableFilter>
						<CardContent>
							<CircuitsTable circuits={circuits}/>
						</CardContent>
					</Card>
				)
			}
		</Page>
	);
}