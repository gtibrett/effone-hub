import { Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useCircuitsList } from '@/components/page/circuits/index';
import type { CircuitsListFilters } from '@/components/page/circuits/types';
import type { Circuit } from '@/gql/graphql';

type CircuitsListProps = {
	circuits: Circuit[];
	filters: CircuitsListFilters;
};

export default function CircuitsList({ circuits, filters }: CircuitsListProps) {
	const filteredCircuits = useCircuitsList(circuits, filters);

	return (
		<DataGrid
			rows={filteredCircuits}
			autoHeight
			density="compact"
			getRowId={c => c.id}
			columns={[
				{
					field: 'name',
					headerName: 'Circuit',
					flex: 1,
					renderCell: ({ row }) => (
						<Link href={`/circuits/${row.id}`}>{row.fullName}</Link>
					)
				},
				{
					field: 'country',
					headerName: 'Location',
					flex: 0.75,
					renderCell: ({ row }) => `${row.placeName}, ${row.country?.name}`
				},
				{
					field: 'races',
					headerName: 'Races',
					headerAlign: 'right',
					align: 'right',
					flex: 0.25,
					valueGetter: (_value, row) => row.races.length
				}
			]}
			initialState={{
				sorting: {
					sortModel: [{ field: 'circuitName', sort: 'asc' }]
				}
			}}
		/>
	);
}
