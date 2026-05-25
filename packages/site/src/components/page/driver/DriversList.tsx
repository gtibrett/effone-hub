import {DriverAvatar, DriverByLine} from '@/components/app';
import DriversQuery from '@/components/page/driver/DriversQuery';
import {useDriversList} from '@/components/page/driver/index';
import {DriversListFilters} from '@/components/page/driver/types';
import {Flag} from '@/components/ui';
import {Driver} from '@/gql/graphql';
import { useSuspenseQuery } from "@apollo/client/react";
import {Grid, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid} from '@mui/x-data-grid';

type DriversTableProps = {
	filters: DriversListFilters
}

export default function DriversList({filters}: DriversTableProps) {
	const {data: {drivers}} = useSuspenseQuery<{ drivers: { nodes: Driver[] } }>(DriversQuery);
	const filteredDrivers   = useDriversList(drivers.nodes, filters);
	
	return (
        <DataGrid
			rows={filteredDrivers}
			autoHeight
			density="compact"
			getRowId={r => r.id}
			columns={
				[
					{
						field:        'avatar',
						renderHeader: () => <Typography sx={visuallyHidden}>Photo</Typography>,
						renderCell:   (({row}) => <DriverAvatar driverId={row.id}/>),
						width:        50,
						align:        'center',
						sortable:     false
					},
					{
						field:       'driver',
						headerName:  'Driver',
						flex:        1,
						renderCell:  (({row}) => <DriverByLine driver={row} variant="link"/>),
						valueGetter: (value, row) => `${row.firstName}, ${row.lastName}`
					},
					{
						field:      'nationalityCountryId',
						headerName: 'Nationality',
						flex:       1,
						renderCell: ({value}) => (
							<Grid container spacing={1}>
								<Grid><Flag nationality={value}/></Grid>
								<Grid>{value}</Grid>
							</Grid>
						)
					},
					{
						field:       'seasons',
						headerName:  'Seasons',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => row.seasonEntrantDrivers?.nodes?.length ?? 0
					},
					{
						field:       'races',
						headerName:  'Races',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => row.raceResults?.nodes?.length ?? 0
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
						valueGetter: (value, row) => (row.raceResults?.nodes ?? []).filter((r: any) => Number(r.positionOrder) === 1).length
					},
					{
						field:       'podiums',
						headerName:  'Podiums',
						flex:        .25,
						type:        'number',
						valueGetter: (value, row) => (row.raceResults?.nodes ?? []).filter((r: any) => Number(r.positionOrder) <= 3).length
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