import { useState } from 'react';
import { Alert, Card, Grid, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { RaceMap, useMapCircuitsToMapPoints } from '@/components/app';
import { getTimeStringFromDate } from '@/helpers';
import { DriverId } from '@/types';

import CircuitDialog from './dialog/CircuitDialog';
import useCircuitData, { CircuitWithResults } from './useCircuitData';

type CircuitsProps = { driverId: DriverId };

export default function Circuits({ driverId }: CircuitsProps) {
	const { data, loading } = useCircuitData(driverId);
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const [active, setActive] = useState<CircuitWithResults['rowId'] | undefined>();

	if (!data?.length) {
		return (
			<Alert variant="outlined" severity="info">
				Circuit Data Not Available
			</Alert>
		);
	}

	const { points, onClick } = mapCircuitsToMapPoints(data || []);

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<Card>
					<RaceMap points={points} onClick={onClick} height={250} />
				</Card>
			</Grid>
			<Grid size={12}>
				<CircuitDialog
					driverId={driverId}
					circuitId={active}
					onClose={() => setActive(undefined)}
				/>
				<DataGrid
					className="mt-4"
					rows={data}
					loading={loading}
					autoHeight
					density="compact"
					getRowId={row => row.rowId || ''}
					initialState={{
						sorting: {
							sortModel: [{ field: 'fullName', sort: 'asc' }]
						}
					}}
					columns={[
						{
							field: 'fullName',
							headerName: 'Circuit',
							flex: 1,
							minWidth: 250,
							renderCell: ({ row }) => (
								<Link
									href="#"
									color="secondary"
									onClick={() => setActive(row.rowId)}
								>
									{row.fullName}
								</Link>
							)
						},
						{
							field: 'races',
							headerName: 'Races',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							valueGetter: (value, row) => row.results.length
						},
						{
							field: 'wins',
							headerName: 'Wins',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1
						},
						{
							field: 'averagePosition',
							headerName: 'Avg. Finish',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1
						},
						{
							field: 'averageTime',
							headerName: 'Avg. Time',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							renderCell: ({ value }) => {
								if (!value) {
									return '--';
								}
								return getTimeStringFromDate(new Date(value));
							}
						}
					]}
				/>
			</Grid>
		</Grid>
	);
}
