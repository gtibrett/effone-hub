import { Typography } from '@mui/material';

import { getDriver, getDriverSeason } from '@/app/lib/cached-data';
import Season from '@/components/page/driver/season/Season';

import RouteModal from '../../../RouteModal';

type Params = { driverRef: string; year: string };

export default async function InterceptedSeasonDialog({ params }: { params: Promise<Params> }) {
	const { driverRef, year } = await params;
	const season = Number(year);
	const [driver, races] = await Promise.all([
		getDriver(driverRef),
		getDriverSeason(driverRef, season)
	]);

	const driverName = driver ? `${driver.firstName ?? ''} ${driver.lastName ?? ''}`.trim() : '';

	return (
		<RouteModal
			dismissHref={`/drivers/${driverRef}`}
			title={
				<>
					{season} Season
					<Typography variant="subtitle1" className="mb-4">
						{driverName}
					</Typography>
				</>
			}
		>
			<Season
				season={season}
				driverId={driverRef}
				races={races}
				careerData={null}
				currentSeasonTeam={null}
			/>
		</RouteModal>
	);
}
