import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

import type { SeasonDriverChampionData, SeasonDriverStandingsData } from '@/app/lib/cached-data';
import { ChartSwitcher, type ChartSwitcherChart } from '@/components/app';

type DriverStandingsSeasonData = SeasonDriverStandingsData['season'];

import { DriverChampion } from '../../stats';
import type { RaceStandingsWithEntities, StandingWithEntity } from '../charts';
import { PointsChart, PositionsChart } from '../charts';
import DriverStandingsDialog from './DriverStandingsDialog';
import {
	DriverStandingsPointsTooltip,
	DriverStandingsPositionTooltip
} from './DriverStandingsTooltip';

const FALLBACK_COLOR = 'var(--mui-palette-primary-main)';

type DriversStandingsProps = {
	season: number;
	data: DriverStandingsSeasonData;
	driverChampionData: SeasonDriverChampionData;
};

const DriversStandingsActions = ({ season }: { season: number }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button variant="outlined" size="small" onClick={() => setOpen(true)}>
				show full standings
			</Button>
			<DriverStandingsDialog season={season} open={open} setOpen={setOpen} />
		</>
	);
};

function buildDriverChartData(
	racesByYear: NonNullable<DriverStandingsSeasonData>['racesByYear']
): RaceStandingsWithEntities[] {
	return racesByYear.map(r => {
		const standings: StandingWithEntity[] = r.raceDriverStandings
			.filter(s => s.driver)
			.map(({ driverId, positionNumber, points, driver }) => ({
				id: driverId,
				position: Number(positionNumber),
				points: Number(points),
				entity: {
					id: driver!.id,
					name: driver!.lastName,
					color:
						driver!.seasonEntrantDrivers[0]?.team?.colors?.primaryHex ?? FALLBACK_COLOR
				}
			}));
		return { round: r.round, standings };
	});
}

function DriversStandings({ season, data, driverChampionData }: DriversStandingsProps) {
	const chartData = buildDriverChartData(data?.racesByYear ?? []);
	const height = Math.max(...chartData.map(s => s.standings.length), 20) * 20;
	const router = useRouter();
	const onLabelClick = (driverId: string) => router.push(`/drivers/${driverId}`);

	if (!chartData?.length) {
		return null;
	}

	const charts: ChartSwitcherChart[] = [
		{
			id: 'position',
			label: 'Position',
			chart: (
				<PositionsChart
					data={chartData}
					TooltipComponent={DriverStandingsPositionTooltip}
					height={height}
					onLabelClick={onLabelClick}
				/>
			)
		},
		{
			id: 'points',
			label: 'Points',
			chart: (
				<PointsChart
					data={chartData}
					TooltipComponent={DriverStandingsPointsTooltip}
					height={height}
					onLabelClick={onLabelClick}
				/>
			)
		}
	];

	return (
		<ChartSwitcher
			title="Driver's Standings"
			charts={charts}
			size={height}
			subheader={<DriverChampion season={season} data={driverChampionData} />}
			actions={<DriversStandingsActions season={season} />}
		/>
	);
}

export default memo(DriversStandings);
