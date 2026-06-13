import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

import { ChartSwitcher, type ChartSwitcherChart } from '@/components/app';

import { DriverChampion } from '../../stats';
import { PointsChart, PositionsChart } from '../charts';
import DriverStandingsDialog from './DriverStandingsDialog';
import {
	DriverStandingsPointsTooltip,
	DriverStandingsPositionTooltip
} from './DriverStandingsTooltip';
import useDriverStandingsData from './useDriversStandingsData';

type DriversStandingsProps = { season: number };

const DriversStandingsActions = ({ season }: DriversStandingsProps) => {
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

function DriversStandings({ season }: DriversStandingsProps) {
	const { chartData } = useDriverStandingsData(season);
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
			subheader={<DriverChampion season={season} />}
			actions={<DriversStandingsActions season={season} />}
		/>
	);
}

export default memo(DriversStandings);
