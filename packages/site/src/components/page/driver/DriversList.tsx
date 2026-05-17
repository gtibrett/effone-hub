import {DriverAvatar, DriverByLine} from '@/components/app';
import DriversQuery from '@/components/page/driver/DriversQuery';
import {useDriversList} from '@/components/page/driver/index';
import {DriversListFilters} from '@/components/page/driver/types';
import {DataTable, Flag} from '@/components/ui';
import {Driver} from '@/gql/graphql';
import {useSuspenseQuery} from '@apollo/client/react';
import {Grid, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import type {ColumnDef} from '@tanstack/react-table';

type DriversTableProps = {
	filters: DriversListFilters
}

export default function DriversList({filters}: DriversTableProps) {
	const {data: {drivers}} = useSuspenseQuery<{ drivers: { nodes: Driver[] } }>(DriversQuery);
	const filteredDrivers   = useDriversList(drivers.nodes, filters);

	const columns: ColumnDef<Driver, any>[] = [
		{
			id:            'avatar',
			header:        () => <Typography sx={visuallyHidden}>Photo</Typography>,
			cell:          ({row}) => <DriverAvatar driverId={row.original.id}/>,
			size:          50,
			enableSorting: false
		},
		{
			id:         'driver',
			header:     'Driver',
			accessorFn: (row) => `${row.firstName}, ${row.lastName}`,
			cell:       ({row}) => <DriverByLine driver={row.original} variant="link"/>
		},
		{
			accessorKey: 'nationalityCountryId',
			header:      'Nationality',
			cell:        ({getValue}) => {
				const value = getValue<string>();
				return (
					<Grid container spacing={1}>
						<Grid item><Flag nationality={value}/></Grid>
						<Grid item>{value}</Grid>
					</Grid>
				);
			}
		},
		{
			id:         'seasons',
			header:     'Seasons',
			accessorFn: (row) => row.seasonEntrantDrivers?.nodes?.length ?? 0,
			cell:       ({getValue}) => <div className="text-right">{getValue<number>()}</div>
		},
		{
			id:         'races',
			header:     'Races',
			accessorFn: (row) => row.raceResults?.nodes?.length ?? 0,
			cell:       ({getValue}) => <div className="text-right">{getValue<number>()}</div>
		},
		{
			id:         'wins',
			header:     'Wins',
			accessorFn: (row) => (row.raceResults?.nodes ?? []).filter((r: any) => Number(r.positionOrder) === 1).length,
			cell:       ({getValue}) => <div className="text-right">{getValue<number>()}</div>
		},
		{
			id:         'podiums',
			header:     'Podiums',
			accessorFn: (row) => (row.raceResults?.nodes ?? []).filter((r: any) => Number(r.positionOrder) <= 3).length,
			cell:       ({getValue}) => <div className="text-right">{getValue<number>()}</div>
		}
	];

	return (
		<DataTable<Driver>
			rows={filteredDrivers}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(r) => r.id}
			initialState={{
				sorting: {
					sortModel: [{field: 'driver', sort: 'asc'}]
				}
			}}
		/>
	);
}
