import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material';

import { getDriver, getDriverCircuitDialog } from '@/app/lib/cached-data';
import CircuitDialogBody from '@/components/page/driver/circuits/dialog/CircuitDialogBody';

type Params = { driverRef: string; circuitRef: string };

// Non-intercepted fallback for hard navigation / refresh / shared link to the
// circuit dialog URL. Soft nav from the driver page is intercepted into a modal
// by @dialog/(.)circuits/[circuitRef].
export default async function DriverCircuitPage({ params }: { params: Promise<Params> }) {
	const { driverRef, circuitRef } = await params;
	const [driver, data] = await Promise.all([
		getDriver(driverRef),
		getDriverCircuitDialog(driverRef, circuitRef)
	]);

	if (!data) {
		notFound();
	}

	const driverName = driver ? `${driver.firstName ?? ''} ${driver.lastName ?? ''}`.trim() : '';

	return (
		<Container maxWidth="xl" className="py-4">
			<Card>
				<CardHeader
					title={data.circuit.fullName}
					subheader={<Typography variant="subtitle1">{driverName}</Typography>}
				/>
				<CardContent>
					<CircuitDialogBody data={data} driverId={driverRef} />
				</CardContent>
			</Card>
		</Container>
	);
}
