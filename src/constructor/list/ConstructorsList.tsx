import {ConstructorByLine, useGetTeamColor} from '@effonehub/constructor';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {useTheme} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

type ConstructorsTableProps = {
	loading: boolean;
	teams: Team[];
}

export default function ConstructorsList({loading, teams}: ConstructorsTableProps) {
	const getTeamColor = useGetTeamColor();
	
	return (
		<DataGrid
			loading={loading}
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
						renderCell: (({row}) => <FontAwesomeIcon icon={faSquareFull} color={getTeamColor(row.colors, 'primary', false)}/>),
						sortable:   false
					},
					{
						field:      'name',
						headerName: 'Constructor',
						flex:       1,
						renderCell: (({row}) => <ConstructorByLine id={row.teamId}/>)
					},
					{
						field:       'seasons',
						headerName:  'Seasons',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => row.seasons.length
					},
					{
						field:       'races',
						headerName:  'Races',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => row.results.length
					},
					// {
					// 	field:       'championships',
					// 	headerName:  'Championships',
					// 	flex:        .25,
					// 	type:        'number',
					// 	valueGetter: (value, row) => row.driverStandingsBySeasons.filter(r=>Number(r.position) === 1).length
					// },
					{
						field:       'wins',
						headerName:  'Wins',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => row.results.filter(r => Number(r.positionOrder) === 1).length
					},
					{
						field:       'podiums',
						headerName:  'Podiums',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => row.results.filter(r => Number(r.positionOrder) <= 3).length
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