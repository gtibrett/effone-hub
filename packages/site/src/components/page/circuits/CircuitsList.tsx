import CircuitQuery from '@/components/page/circuits/CircuitsQuery';
import {useCircuitsList} from '@/components/page/circuits/index';
import {CircuitsListFilters} from '@/components/page/circuits/types';
import {DataTable, Link} from '@/components/ui';
import {Circuit} from '@/gql/graphql';
import {useSuspenseQuery} from '@apollo/client/react';
import type {ColumnDef} from '@tanstack/react-table';

type CircuitsListProps = {
	filters: CircuitsListFilters
}

export default function CircuitsList({filters}: CircuitsListProps) {
	const {data: {circuits}} = useSuspenseQuery<{ circuits: { nodes: Circuit[] } }>(CircuitQuery);
	const filteredCircuits   = useCircuitsList(circuits.nodes, filters);

	const columns: ColumnDef<Circuit, any>[] = [
		{
			accessorKey: 'name',
			header:      'Circuit',
			cell:        ({row}) => <Link href={`/circuits/${row.original.rowId}`}>{row.original.name}</Link>
		},
		{
			accessorKey: 'country',
			header:      'Location',
			cell:        ({row}) => `${row.original.placeName}, ${row.original.country}`
		},
		{
			id:         'races',
			header:     () => <div className="text-right w-full">Races</div>,
			accessorFn: (row) => row.races.nodes.length,
			cell:       ({getValue}) => <div className="text-right">{getValue<number>()}</div>
		}
	];

	return (
		<DataTable<Circuit>
			rows={filteredCircuits}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(c: Circuit) => c.rowId}
			initialState={{
				sorting: {
					sortModel: [{field: 'circuitName', sort: 'asc'}]
				}
			}}
		/>
	);
}
