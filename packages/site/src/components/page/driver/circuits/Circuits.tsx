'use client';

import NextLink from 'next/link';
import { Alert, Card, Grid, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { DriverCircuitRawData } from '@/app/lib/cached-data';
import { RaceMap, useMapCircuitsToMapPoints } from '@/components/app';
import { getTimeStringFromDate } from '@/helpers';
import type { DriverId } from '@/types';

import type { CircuitWithResults } from './useCircuitData';

type CircuitsProps = {
	driverId: DriverId;
	circuitRawData: DriverCircuitRawData['driver'] | null;
};

function buildCircuitRows(rawData: DriverCircuitRawData['driver'] | null): CircuitWithResults[] {
	if (!rawData) return [];

	const resultsByCircuit: CircuitWithResults[] = [];

	rawData.raceResults.forEach(({ race, ...result }) => {
		if (!race?.circuit) return;

		const { id } = race.circuit;
		let index = resultsByCircuit.findIndex(c => c.id === id);

		if (index === -1) {
			resultsByCircuit.push({
				...race.circuit,
				results: [],
				averagePosition: 0,
				averageTime: 0,
				wins: 0
			});
			index = resultsByCircuit.length - 1;
		}

		resultsByCircuit[index].results.push(result as CircuitWithResults['results'][number]);
	});

	return resultsByCircuit.map(circuit => {
		const racePositions: number[] = [];
		const raceTimes: number[] = [];

		circuit.results.forEach(r => {
			if (r.positionDisplayOrder) {
				racePositions.push(r.positionDisplayOrder);
			}
			try {
				if (r.timeMillis) raceTimes.push(r.timeMillis);
			} catch {
				// time could not be calculated
			}
		});

		return {
			...circuit,
			averagePosition: !racePositions.length
				? undefined
				: Math.round(racePositions.reduce((a, v) => a + v, 0) / racePositions.length),
			averageTime: !raceTimes.length
				? undefined
				: raceTimes.reduce((a, v) => a + v, 0) / raceTimes.length,
			wins: circuit.results.filter(r => r.positionDisplayOrder === 1).length
		};
	});
}

export default function Circuits({ driverId, circuitRawData }: CircuitsProps) {
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();

	const data = buildCircuitRows(circuitRawData);

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
				<DataGrid
					className="mt-4"
					rows={data}
					loading={false}
					autoHeight
					density="compact"
					getRowId={row => row.id || ''}
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
									component={NextLink}
									href={`/drivers/${driverId}/circuits/${row.id}`}
									color="secondary"
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
							valueGetter: (_value, row) => row.results.length
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
