import {DriverByLine} from '@/components/app';
import {CircuitDataProps} from '@/hooks/data';
import {Link} from '@mui/material';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

export default function History({data, loading}: CircuitDataProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!data?.circuit.history.nodes.length) {
		return <Alert variant="outlined" severity="info">Race Data Not Available</Alert>;
	}

	return (
		<DataGrid
			rows={data.circuit.history.nodes}
			autoHeight
			density="compact"
			getRowId={r => r.date}
			initialState={{
				sorting: {
					sortModel: [{field: 'year', sort: 'desc'}]
				}
			}}
			columns={
				[
					{
						field:       'year',
						headerName:  'Season',
						headerAlign: 'center',
						align:       'center',
						width:       100,
						renderCell:  ({row}) => <Link href={`/${row.year}`}>{row.year}</Link>
					},
					{
						field:       'date',
						headerName:  'Date',
						headerAlign: 'center',
						type:        'date',
						align:       'center',
						valueGetter: (value) => (new Date(value)),
						renderCell:  ({value}) => value.toLocaleDateString(),
						minWidth:    100
					},
					{
						field:      'officialName',
						headerName: 'Race',
						flex:       1,
						renderCell: ({row}) => (
							<Link href={`/${row.year}/${row.round}#${row.officialName}`}>{row.year} {row.officialName}</Link>
						),
						minWidth:   200
					},
					{
						field:       'winner',
						headerName:  'Winner',
						flex:        1,
						valueGetter: (value, row) => {
							if (!row.raceResults?.nodes?.length) {
								return '--';
							}

							return `${row.raceResults?.nodes?.[0]?.driver?.lastName}, ${row.raceResults?.nodes?.[0]?.driver?.firstName}`;
						},
						renderCell:  ({row}) => {
							if (!row.raceResults?.nodes?.length) {
								return '--';
							}

							return <DriverByLine id={row.raceResults?.nodes?.[0]?.driverId}/>;
						},
						minWidth:    200
					},
					{
						field:       'time',
						headerName:  'Time',
						sortable:    false,
						headerAlign: 'left',
						align:       'left',
						flex:        .5,
						renderCell:  ({row}) => row.raceResults?.nodes?.[0]?.time || '--',
						minWidth:    110
					}
				]
			}
		/>
	);
}
