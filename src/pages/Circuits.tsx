import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Circuit, Responses} from '@gtibrett/effone-hub-api';
import {alpha, Button, Card, CardContent, CardHeader, Grid, Paper, Skeleton, TextField, TextFieldProps, Tooltip, Typography, useTheme} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapCircuits} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import SeasonMenu from '../schedule/SeasonMenu';
import Link from '../ui-components/Link';
import Navigation from '../ui-components/Navigation';
import usePageTitle from '../ui-components/usePageTitle';

type CircuitsTableProps = {
	circuits: Circuit[];
}

function CircuitsTable({circuits}: CircuitsTableProps) {
	
	return (
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
}

export default function Drivers() {
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
	
	let content = <Skeleton variant="rectangular" height={400}/>;
	if (circuits) {
		content = <>
			<Paper elevation={0} sx={{p: 2, boxShadow: `inset 8px 0 0 ${alpha(theme.palette.primary.main, .5)}`, border: `1px solid ${theme.palette.primary.main}`}}>
				<form onSubmit={handleSearch}>
					<Grid container spacing={1}>
						<Grid item xs>
							<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="circuits-search-filter" label="Circuit" variant="outlined" value={localFilters.search} onChange={setSearch}/>
						</Grid>
						<Grid item xs>
							<SeasonMenu required={false} variant="normal" id="circuits-season-filter" season={localFilters.season} setSeason={setSeason}/>
						</Grid>
						<Grid item>
							<Tooltip title="Search" arrow placement="bottom">
								<Button color="secondary" type="submit" variant="contained" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: 26}}/><Typography sx={visuallyHidden}>Search</Typography></Button>
							</Tooltip>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<CircuitsTable circuits={circuits}/>
		</>;
	}
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Navigation>
					<Link to="/">{currentSeason} Season</Link>
					<Typography>All Circuits</Typography>
				</Navigation>
			</Grid>
			
			<Grid item xs={12}>
				<Card elevation={0}>
					<CardHeader title="All Circuits"/>
					
					<CardContent>
						{content}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}