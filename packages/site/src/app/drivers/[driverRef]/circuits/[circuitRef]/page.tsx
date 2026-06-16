import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, Container, Skeleton, Typography } from '@mui/material';

import { getDriver, getDriverCircuitDialog } from '@/app/lib/cached-data';
import CircuitDialogBody from '@/components/page/driver/circuits/dialog/CircuitDialogBody';

type Params = { driverRef: string; circuitRef: string };

// Non-intercepted fallback for hard navigation / refresh / shared link to the
// circuit dialog URL. Soft nav from the driver page is intercepted into a modal
// by @dialog/(.)circuits/[circuitRef]. The param-dependent data read lives inside
// Suspense so the route keeps a prerenderable static shell (Cache Components).
async function DriverCircuitContent({ params }: { params: Promise<Params> }) {
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
		<Card>
			<CardHeader
				title={data.circuit.fullName}
				subheader={<Typography variant="subtitle1">{driverName}</Typography>}
			/>
			<CardContent>
				<CircuitDialogBody data={data} driverId={driverRef} />
			</CardContent>
		</Card>
	);
}

export default function DriverCircuitPage({ params }: { params: Promise<Params> }) {
	return (
		<Container maxWidth="xl" className="py-4">
			<Suspense fallback={<Skeleton variant="rectangular" height="60vh" />}>
				<DriverCircuitContent params={params} />
			</Suspense>
		</Container>
	);
}
