import CircuitQuery from '@/components/page/circuits/CircuitsQuery';
import {useCircuitsList} from '@/components/page/circuits/index';
import {CircuitsListFilters} from '@/components/page/circuits/types';
import {Circuit} from '@/gql/graphql';
import {useSuspenseQuery} from '@apollo/client';
import {Link} from '@gtibrett/mui-additions';
import {DataGrid} from '@mui/x-data-grid';

type CircuitsListProps = {
	filters: CircuitsListFilters
}

export default function CircuitsList({filters}: CircuitsListProps) {
	const {data: {circuits}} = useSuspenseQuery<{ circuits: Circuit[] }>(CircuitQuery);
	const filteredCircuits   = useCircuitsList(circuits, filters);
	
	return <DataGrid
		rows={filteredCircuits}
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