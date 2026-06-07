import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Skeleton } from '@mui/material';

import { ChartSwitcher, ChartSwitcherChart } from '@/components/app';

import { ConstructorChampion } from '../../stats';
import { PointsChart, PositionsChart } from '../charts';
import ConstructorStandingsDialog from './ConstructorStandingsDialog';
import {
	ConstructorStandingsPointsTooltip,
	ConstructorStandingsPositionTooltip
} from './ConstructorStandingsTooltip';
import useConstructorStandingsData from './useConstructorsStandingsData';

type ConstructorsStandingsProps = { season: number };

export default function ConstructorsStandings({ season }: ConstructorsStandingsProps) {
	const [open, setOpen] = useState(false);
	const { data, chartData } = useConstructorStandingsData(season);
	const height = Math.max(...chartData.map(s => s.standings.length), 10) * 24;
	const router = useRouter();
	const onLabelClick = (teamId: string) => router.push(`/constructors/${teamId}`);

	if (!data?.season?.racesByYear?.length) {
		return (
			<Alert variant="outlined" severity="info">
				Constructor Standings Data Not Available
			</Alert>
		);
	}

	const charts: ChartSwitcherChart[] = [
		{
			id: 'position',
			label: 'Position',
			chart: (
				<PositionsChart
					data={chartData}
					TooltipComponent={ConstructorStandingsPositionTooltip}
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
					TooltipComponent={ConstructorStandingsPointsTooltip}
					height={height}
					onLabelClick={onLabelClick}
				/>
			)
		}
	];

	return (
		<Suspense fallback={<Skeleton variant="rectangular" height={height + 182} />}>
			<ChartSwitcher
				title="Constructor's Standings"
				charts={charts}
				size={height}
				subheader={<ConstructorChampion season={season} />}
				actions={
					<>
						<Button variant="outlined" size="small" onClick={() => setOpen(true)}>
							show full standings
						</Button>
						<ConstructorStandingsDialog season={season} open={open} setOpen={setOpen} />
					</>
				}
			/>
		</Suspense>
	);
}
