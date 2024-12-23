import {DriverAvatar, DriverByLine} from '@/components/app';
import DriversQuery from '@/components/page/driver/DriversQuery';
import {useDriversList} from '@/components/page/driver/index';
import {DriversListFilters} from '@/components/page/driver/types';
import {Flag} from '@/components/ui';
import {Driver} from '@/gql/graphql';
import {useSuspenseQuery} from '@apollo/client';
import {Grid, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid} from '@mui/x-data-grid';

type DriversTableProps = {
	filters: DriversListFilters
}

export default function DriversList({filters}: DriversTableProps) {
	const {data: {drivers}} = useSuspenseQuery<{ drivers: Driver[] }>(DriversQuery);
	const filteredDrivers   = useDriversList(drivers, filters);
	
	return (
		<DataGrid
			rows={filteredDrivers}
			autoHeight
			density="compact"
			getRowId={r => r.driverId}
			columns={
				[
					{
						field:        'avatar',
						renderHeader: () => <Typography sx={visuallyHidden}>Photo</Typography>,
						renderCell:   (({row}) => <DriverAvatar driverId={row.driverId}/>),
						width:        50,
						align:        'center',
						sortable:     false
					},
					{
						field:       'driver',
						headerName:  'Driver',
						flex:        1,
						renderCell:  (({row}) => <DriverByLine driver={row} variant="link"/>),
						valueGetter: (value, row) => `${row.forename}, ${row.surname}`
					},
					{
						field:      'nationality',
						headerName: 'Nationality',
						flex:       1,
						renderCell: ({value}) => (
							<Grid container spacing={1}>
								<Grid item><Flag nationality={value}/></Grid>
								<Grid item>{value}</Grid>
							</Grid>
						)
					},
					{
						field:       'seasons',
						headerName:  'Seasons',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => row.teamsByYear.length
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
				]
			}
			initialState={{
				sorting: {
					sortModel: [{field: 'driver', sort: 'asc'}]
				}
			}}
		/>
	);
}