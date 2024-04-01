import {Circuit} from '@gtibrett/effone-hub-graph-api';
import {Link} from '@gtibrett/mui-additions';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

type CircuitsListProps = {
	loading: boolean;
	circuits: Circuit[];
}

export default function CircuitsList({loading, circuits}: CircuitsListProps) {
	return <DataGrid
		loading={loading}
		rows={circuits}
		autoHeight
		density="compact"
		getRowId={c => c.circuitId}
		columns={
			[
				{
					field:      'name',
					headerName: 'Circuit',
					flex:       1,
					renderCell: ({row}) => <Link href={`/circuit/${row.circuitRef}`}>{row.name}</Link>
				},
				{
					field:      'country',
					headerName: 'Location',
					flex:       .75,
					renderCell: ({row}) => `${row.location}, ${row.country}`
				},
				{
					field:       'races',
					headerName:  'Races',
					headerAlign: 'right',
					align:       'right',
					flex:        .25,
					valueGetter: (value, row) => row.races.length
				}
			] as GridColDef<Circuit>[]
		}
		initialState={{
			sorting: {
				sortModel: [{field: 'circuitName', sort: 'asc'}]
			}
		}}
	/>;
}