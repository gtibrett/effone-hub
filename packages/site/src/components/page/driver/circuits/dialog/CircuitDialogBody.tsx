'use client';

import { Card, Grid } from '@mui/material';

import { RaceMap, useMapCircuitsToMapPoints } from '@/components/app';
import ErrorBoundary from '@/components/app/ErrorBoundary';
import { Tabs } from '@/components/ui';
import type { DriverId } from '@/types';

import CircuitChart from './CircuitChart';
import CircuitPerformance from './CircuitPerformance';
import CircuitTable from './CircuitTable';
import LapTimesByYearBox from './LapTimesByYearBox';
import type { CircuitDialogData } from './types';

export default function CircuitDialogBody({
	data,
	driverId
}: {
	data: CircuitDialogData;
	driverId: DriverId;
}) {
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();

	const { circuit } = data;
	const { points, onClick } = mapCircuitsToMapPoints([circuit]);

	return (
		<Grid container spacing={2}>
			<Grid size={9}>
				<Tabs
					active="results"
					tabs={[
						{
							id: 'results',
							label: 'Results',
							content: (
								<ErrorBoundary>
									<CircuitChart data={data} loading={false} />
									<CircuitTable data={data} loading={false} />
								</ErrorBoundary>
							)
						},
						{
							id: 'laptimes',
							label: 'Lap Times',
							content: (
								<ErrorBoundary>
									<LapTimesByYearBox data={data} loading={false} />
								</ErrorBoundary>
							)
						}
					]}
				/>
			</Grid>
			<Grid size={3}>
				<Grid container spacing={1}>
					<Grid size={12}>
						<Card className="mb-4">
							<ErrorBoundary>
								<RaceMap
									points={points}
									onClick={onClick}
									height={200}
									centerOn={{
										latitude: circuit.latitude,
										longitude: circuit.longitude
									}}
									zoom
								/>
							</ErrorBoundary>
						</Card>
					</Grid>
					<Grid size={12}>
						<ErrorBoundary>
							<CircuitPerformance data={data} loading={false} />
						</ErrorBoundary>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
