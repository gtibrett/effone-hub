import { Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { RaceQualifyingResult } from '@/app/lib/cached-data';
import { ConstructorByLine, DriverByLine } from '@/components/app';

export { qualifyingQuery } from './queries';

type QualifyingProps = {
	rows: RaceQualifyingResult[];
};

export default function Qualifying({ rows }: QualifyingProps) {
	if (!rows.length) {
		return (
			<Alert variant="outlined" severity="info">
				Qualifying Data Not Available
			</Alert>
		);
	}

	return (
		<DataGrid
			rows={rows}
			autoHeight
			density="compact"
			getRowId={r => `${r.driverId ?? 'x'}-${r.positionNumber ?? 0}`}
			initialState={{
				sorting: {
					sortModel: [{ field: 'positionNumber', sort: 'asc' }]
				}
			}}
			columns={[
				{
					field: 'positionNumber',
					headerName: 'P',
					width: 60,
					headerAlign: 'center',
					align: 'center',
					type: 'number'
				},
				{
					field: 'Driver',
					headerName: 'Driver',
					flex: 1,
					renderCell: ({ row }) =>
						row.driverId ? <DriverByLine id={row.driverId} /> : '',
					minWidth: 200
				},
				{
					field: 'Constructor',
					headerName: 'Constructor',
					flex: 1,
					renderCell: ({ row }) =>
						row.teamId ? <ConstructorByLine id={row.teamId} /> : '',
					minWidth: 150
				},
				{
					field: 'q1',
					headerName: 'Q1',
					headerAlign: 'center',
					align: 'center',
					type: 'string'
				},
				{
					field: 'q2',
					headerName: 'Q2',
					headerAlign: 'center',
					align: 'center',
					type: 'string'
				},
				{
					field: 'q3',
					headerName: 'Q3',
					headerAlign: 'center',
					align: 'center',
					type: 'string'
				}
			]}
		/>
	);
}
