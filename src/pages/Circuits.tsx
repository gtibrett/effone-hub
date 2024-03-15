import {gql, useQuery} from '@apollo/client';
import {Circuit} from '@gtibrett/effone-hub-graph-api';
import {Link, usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton, TextField, TextFieldProps} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Page, TableFilter} from '@ui-components';
import {SyntheticEvent, useState} from 'react';
import {useAppState} from '../app/AppStateProvider';
import SeasonMenu from '../SeasonMenu';

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
					renderCell: ({row}) => <Link to={`/circuit/${row.circuitRef}`}>{row.name}</Link>
				},
				{
					field:      'country',
					headerName: 'Location',
					flex:       .75,
					renderCell: ({row}) => `${row.location}, ${row.country}`
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

const CircuitQuery = gql`
	#graphql
	query q {
		circuits {
			circuitId
			circuitRef
			name
			location
			country
			lat
			lng

			races {
				year
			}
		}
	}

`;

export default function Circuits() {
	usePageTitle('Circuits');
	
	const [{season: currentSeason}]       = useAppState();
	const [localFilters, setLocalFilters] = useState({
		season: currentSeason,
		search: ''
	});
	const [filters, setFilters]           = useState({
		season: currentSeason,
		search: ''
	});
	
	const {data, loading} = useQuery<{ circuits: Circuit[] }>(CircuitQuery);
	
	const circuits = (() => {
		let results = data?.circuits || [];
		if (filters.season > 0) {
			results = results.filter(d => d.races.find(r => r.year === filters.season));
		}
		
		if (filters.search.length) {
			results = results.filter(c => {
				const tokens = filters.search.toLowerCase().split(' ');
				for (const token of tokens) {
					if (c.name.toLowerCase().includes(token)
					    || c.country?.toLowerCase().includes(token)
					    || c.location?.toLowerCase().includes(token)) {
						return true;
					}
				}
				return false;
			});
		}
		
		return results;
	})();
	
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
	
	return (
		<Page title="Circuits">
			{
				loading
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