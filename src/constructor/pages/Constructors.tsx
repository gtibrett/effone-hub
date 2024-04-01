import {gql, useQuery} from '@apollo/client';
import {useAppState} from '@effonehub/app';
import {SeasonMenu} from '@effonehub/components';
import {ConstructorByLine} from '@effonehub/constructor';
import {Page, TableFilter} from '@effonehub/ui-components';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton, TextField, TextFieldProps, useTheme} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SyntheticEvent, useEffect, useState} from 'react';

type ConstructorsTableProps = {
	teams: Team[];
}

function ConstructorsTable({teams}: ConstructorsTableProps) {
	const theme = useTheme();
	
	return (
		<DataGrid
			rows={teams}
			autoHeight
			density="compact"
			getRowId={r => r.teamId}
			columns={
				[
					{
						field:      'color',
						headerName: '',
						width:      24,
						renderCell: (({row}) => <FontAwesomeIcon icon={faSquareFull} color={row.colors.primary || theme.palette.primary.main}/>),
						sortable:   false
					},
					{
						field:      'name',
						headerName: 'Constructor',
						flex:       1,
						renderCell: (({row}) => <ConstructorByLine id={row.teamId}/>)
					}
				
				] as GridColDef<Team>[]
			}
			initialState={{
				sorting: {
					sortModel: [{field: 'name', sort: 'asc'}]
				}
			}}
		/>
	);
}

const ConstructorsQuery = gql`
	#graphql
	query ConstructorsQuery {
		teams (orderBy: NAME_ASC) {
			teamId
			constructorRef
			name
			colors {
				primary
			}
			seasons : driversByYear{
				year
			}
		}
	}
`;

export default function Drivers() {
	setPageTitle('Constructors');
	
	const [{season: currentSeason}]       = useAppState();
	const [teams, setTeams]               = useState<Team[] | undefined>();
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
	
	const {data, loading} = useQuery<{ teams: Team[] }>(ConstructorsQuery, {variables: {year: filters.season > 0 ? filters.season : undefined}});
	
	useEffect(() => {
		let results = data?.teams || [];
		if (filters.season > 0) {
			results = results.filter(t => t.seasons.find(s => s.year === filters.season));
		}
		
		if (filters.search.length) {
			results = results.filter(t => {
				const tokens = filters.search.toLowerCase().split(' ');
				for (const token of tokens) {
					if (t.name.toLowerCase().includes(token)) {
						return true;
					}
				}
				return false;
			});
		}
		
		setTeams(results);
	}, [data, filters.search, filters.season]);
	
	return (
		<Page title="Constructors">
			{
				(loading || !teams)
				? <Skeleton variant="rectangular" height={800}/>
				: (
					<Card>
						<TableFilter handleSearch={handleSearch}>
							<TextField fullWidth size="small" InputLabelProps={{shrink: true}} id="constructors-search-filter" label="Constructor" variant="outlined" value={localFilters.search} onChange={setSearch}/>
							<SeasonMenu required={false} variant="normal" id="constructors-season-filter" season={localFilters.season} setSeason={setSeason}/>
						</TableFilter>
						<CardContent>
							<ConstructorsTable teams={teams}/>
						</CardContent>
					</Card>
				)
			}
		</Page>
	);
}