import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Grid, Typography } from '@mui/material';

import { DriverByLine, RaceMap, useMapCircuitsToMapPoints } from '@/components/app';
import ErrorBoundary from '@/components/app/ErrorBoundary';
import { Tabs } from '@/components/ui';
import { Dialog } from '@/lib/mui-additions';
import type { DriverId } from '@/types';

import CircuitChart from './CircuitChart';
import CircuitPerformance from './CircuitPerformance';
import CircuitTable from './CircuitTable';
import LapTimesByYearBox from './LapTimesByYearBox';
import useCircuitDialogData from './useCircuitDialogData';

type CircuitProps = {
	driverId: DriverId;
	circuitId?: string;
	onClose: () => void;
};

export default function CircuitDialog({ driverId, circuitId, onClose }: CircuitProps) {
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const { data, loading } = useCircuitDialogData(circuitId, driverId);

	if (!data || loading) {
		return null;
	}

	const { circuit } = data;
	const { points, onClick } = mapCircuitsToMapPoints([circuit]);

	return (
		<Dialog
			open={!!circuitId}
			closeIcon={<FontAwesomeIcon icon={faTimes} />}
			onClose={onClose}
			maxWidth="lg"
			fullWidth
			title={
				<>
					{circuit.fullName}
					<Typography variant="subtitle1" className="mb-4">
						<DriverByLine id={driverId} variant="name" />
					</Typography>
				</>
			}
		>
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
										<CircuitChart data={data} loading={loading} />
										<CircuitTable data={data} loading={loading} />
									</ErrorBoundary>
								)
							},
							{
								id: 'laptimes',
								label: 'Lap Times',
								content: (
									<ErrorBoundary>
										<LapTimesByYearBox data={data} loading={loading} />
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
								<CircuitPerformance data={data} loading={loading} />
							</ErrorBoundary>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
}
