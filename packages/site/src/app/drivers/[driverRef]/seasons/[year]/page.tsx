import { Suspense } from 'react';
import { Card, CardContent, CardHeader, Container, Skeleton, Typography } from '@mui/material';

import { getDriver, getDriverSeason } from '@/app/lib/cached-data';
import Season from '@/components/page/driver/season/Season';

type Params = { driverRef: string; year: string };

// Non-intercepted fallback for hard navigation / refresh / shared link to the
// season dialog URL. Soft nav from the driver page is intercepted into a modal
// by @dialog/(.)seasons/[year]. The param-dependent data read lives inside
// Suspense so the route keeps a prerenderable static shell (Cache Components).
async function DriverSeasonContent({ params }: { params: Promise<Params> }) {
	const { driverRef, year } = await params;
	const season = Number(year);
	const [driver, races] = await Promise.all([
		getDriver(driverRef),
		getDriverSeason(driverRef, season)
	]);

	const driverName = driver ? `${driver.firstName ?? ''} ${driver.lastName ?? ''}`.trim() : '';

	return (
		<Card>
			<CardHeader
				title={`${season} Season`}
				subheader={<Typography variant="subtitle1">{driverName}</Typography>}
			/>
			<CardContent>
				<Season
					season={season}
					driverId={driverRef}
					races={races}
					careerData={null}
					currentSeasonTeam={null}
				/>
			</CardContent>
		</Card>
	);
}

export default function DriverSeasonPage({ params }: { params: Promise<Params> }) {
	return (
		<Container maxWidth="xl" className="py-4">
			<Suspense fallback={<Skeleton variant="rectangular" height="60vh" />}>
				<DriverSeasonContent params={params} />
			</Suspense>
		</Container>
	);
}
