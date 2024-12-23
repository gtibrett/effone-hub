import '@/polyfills';
import {ConstructorByLine} from '@/components/app';
import {ConstructorsListFilters, ConstructorsQuery, useConstructorsList} from '@/components/page/constructor/index';
import {useGetTeamColor} from '@/hooks';
import {useSuspenseQuery} from '@apollo/client';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DataGrid} from '@mui/x-data-grid';
import {TeamWithSeasons} from './useConstructorsList';

type ConstructorsTableProps = {
	filters: ConstructorsListFilters;
}

export default function ConstructorsList({filters}: ConstructorsTableProps) {
	const {data: {teams}} = useSuspenseQuery<{ teams: TeamWithSeasons[] }>(ConstructorsQuery);
	const filteredTeams   = useConstructorsList(teams, filters);
	const getTeamColor    = useGetTeamColor();
	
	return (
		<DataGrid
			rows={filteredTeams}
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
						renderCell: ({row}) => <ConstructorByLine team={row} variant="link"/>
					},
					{
						field:       'seasons',
						headerName:  'Seasons',
						flex:        .25,
						type:        'number',
						valueGetter: (_, row) => row.seasons.map(s => s.year).distinct().length
					},
					{
						field:       'races',
						headerName:  'Races',
						flex:        .25,
						type:        'number',
						valueGetter: (_, row) => row.results.map(r => `${r.raceId}-${r.driverId}`).distinct().length
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
				]
			}
			initialState={{
				sorting: {
					sortModel: [{field: 'name', sort: 'asc'}]
				}
			}}
		/>
	);
}