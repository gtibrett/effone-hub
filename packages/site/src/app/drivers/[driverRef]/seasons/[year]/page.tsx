import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material';

import { getDriver, getDriverSeason } from '@/app/lib/cached-data';
import Season from '@/components/page/driver/season/Season';

type Params = { driverRef: string; year: string };

// Non-intercepted fallback for hard navigation / refresh / shared link to the
// season dialog URL. Soft nav from the driver page is intercepted into a modal
// by @dialog/(.)seasons/[year].
export default async function DriverSeasonPage({ params }: { params: Promise<Params> }) {
	const { driverRef, year } = await params;
	const season = Number(year);
	const [driver, races] = await Promise.all([
		getDriver(driverRef),
		getDriverSeason(driverRef, season)
	]);

	const driverName = driver ? `${driver.firstName ?? ''} ${driver.lastName ?? ''}`.trim() : '';

	return (
		<Container maxWidth="xl" className="py-4">
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
		</Container>
	);
}
