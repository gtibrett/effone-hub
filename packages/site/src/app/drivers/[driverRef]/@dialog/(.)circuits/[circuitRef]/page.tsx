import { Typography } from '@mui/material';

import { getDriver, getDriverCircuitDialog } from '@/app/lib/cached-data';
import CircuitDialogBody from '@/components/page/driver/circuits/dialog/CircuitDialogBody';

import RouteModal from '../../../RouteModal';

type Params = { driverRef: string; circuitRef: string };

export default async function InterceptedCircuitDialog({ params }: { params: Promise<Params> }) {
	const { driverRef, circuitRef } = await params;
	const [driver, data] = await Promise.all([
		getDriver(driverRef),
		getDriverCircuitDialog(driverRef, circuitRef)
	]);

	if (!data) {
		return null;
	}

	const driverName = driver ? `${driver.firstName ?? ''} ${driver.lastName ?? ''}`.trim() : '';

	return (
		<RouteModal
			dismissHref={`/drivers/${driverRef}`}
			title={
				<>
					{data.circuit.fullName}
					<Typography variant="subtitle1" className="mb-4">
						{driverName}
					</Typography>
				</>
			}
		>
			<CircuitDialogBody data={data} driverId={driverRef} />
		</RouteModal>
	);
}
