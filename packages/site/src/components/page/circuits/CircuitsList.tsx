import {Circuit} from '@/gql/graphql';
import {Link} from '@gtibrett/mui-additions';
import {DataGrid} from '@mui/x-data-grid';

type CircuitsListProps = {
	circuits: Circuit[];
}

export default function CircuitsList({circuits}: CircuitsListProps) {
	return <DataGrid
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
					renderCell: ({row}) => <Link href={`/circuits/${row.circuitRef}`}>{row.name}</Link>
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
			]
		}
		initialState={{
			sorting: {
				sortModel: [{field: 'circuitName', sort: 'asc'}]
			}
		}}
	/>;
}