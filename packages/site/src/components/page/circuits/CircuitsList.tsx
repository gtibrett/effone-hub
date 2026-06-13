import { useSuspenseQuery } from '@apollo/client/react';
import { Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import CircuitQuery from '@/components/page/circuits/CircuitsQuery';
import { useCircuitsList } from '@/components/page/circuits/index';
import type { CircuitsListFilters } from '@/components/page/circuits/types';
import type { Circuit } from '@/gql/graphql';

type CircuitsListProps = {
	filters: CircuitsListFilters;
};

export default function CircuitsList({ filters }: CircuitsListProps) {
	const {
		data: { circuits }
	} = useSuspenseQuery<{ circuits: Circuit[] }>(CircuitQuery);
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
