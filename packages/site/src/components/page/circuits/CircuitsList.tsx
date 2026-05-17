import CircuitQuery from '@/components/page/circuits/CircuitsQuery';
import {useCircuitsList} from '@/components/page/circuits/index';
import {CircuitsListFilters} from '@/components/page/circuits/types';
import {Circuit} from '@/gql/graphql';
import { useSuspenseQuery } from "@apollo/client/react";
import {Link} from '@gtibrett/mui-additions';
import {DataGrid} from '@mui/x-data-grid';

type CircuitsListProps = {
	filters: CircuitsListFilters
}

export default function CircuitsList({filters}: CircuitsListProps) {
	const {data: {circuits}} = useSuspenseQuery<{ circuits: { nodes: Circuit[] } }>(CircuitQuery);
	const filteredCircuits   = useCircuitsList(circuits.nodes, filters);

	return <DataGrid
		rows={filteredCircuits}
		autoHeight
		density="compact"
		getRowId={c => c.rowId}
		columns={
			[
				{
					field:      'name',
					headerName: 'Circuit',
					flex:       1,
					renderCell: ({row}) => <Link href={`/circuits/${row.rowId}`}>{row.name}</Link>
				},
				{
					field:      'country',
					headerName: 'Location',
					flex:       .75,
					renderCell: ({row}) => `${row.placeName}, ${row.country}`
				},
				{
					field:       'races',
					headerName:  'Races',
					headerAlign: 'right',
					align:       'right',
					flex:        .25,
					valueGetter: (value, row) => row.races.nodes.length
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
