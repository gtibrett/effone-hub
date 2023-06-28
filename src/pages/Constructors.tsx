import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Constructor, Responses} from '@gtibrett/effone-hub-api';
import {alpha, Button, Card, CardContent, CardHeader, Grid, Paper, Skeleton, TextField, TextFieldProps, Tooltip, Typography, useTheme} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapConstructors} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../constructors/ByLine';
import SeasonMenu from '../schedule/SeasonMenu';
import Link from '../ui-components/Link';
import Navigation from '../ui-components/Navigation';
import usePageTitle from '../ui-components/usePageTitle';

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
	
	const theme                           = useTheme();
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
	
	let content = <Skeleton variant="rectangular" height={400}/>;
	if (constructors) {
		content = <>
			<Paper elevation={0} sx={{p: 2, boxShadow: `inset 8px 0 0 ${alpha(theme.palette.primary.main, .5)}`, border: `1px solid ${theme.palette.primary.main}`}}>
				<form onSubmit={handleSearch}>
					<Grid container spacing={1}>
						<Grid item xs>
							<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="constructors-search-filter" label="Constructor" variant="outlined" value={localFilters.search} onChange={setSearch}/>
						</Grid>
						<Grid item xs>
							<SeasonMenu required={false} variant="normal" id="constructors-season-filter" season={localFilters.season} setSeason={setSeason}/>
						</Grid>
						<Grid item>
							<Tooltip title="Search" arrow placement="bottom">
								<Button color="secondary" type="submit" variant="contained" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: 26}}/><Typography sx={visuallyHidden}>Search</Typography></Button>
							</Tooltip>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<ConstructorsTable constructors={constructors}/>
		</>;
	}
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Navigation>
					<Link to="/">{currentSeason} Season</Link>
					<Typography>All Constructors</Typography>
				</Navigation>
			</Grid>
			
			<Grid item xs={12}>
				<Card elevation={0}>
					<CardHeader title="All Constructors"/>
					
					<CardContent>
						{content}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}