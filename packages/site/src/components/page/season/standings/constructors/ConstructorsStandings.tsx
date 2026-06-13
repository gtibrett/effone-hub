import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Skeleton } from '@mui/material';

import type {
	SeasonConstructorChampionData,
	SeasonConstructorStandingsData
} from '@/app/lib/cached-data';
import { ChartSwitcher, type ChartSwitcherChart } from '@/components/app';

type ConstructorStandingsSeasonData = SeasonConstructorStandingsData['season'];

import { ConstructorChampion } from '../../stats';
import type { RaceStandingsWithEntities } from '../charts';
import { PointsChart, PositionsChart } from '../charts';
import ConstructorStandingsDialog from './ConstructorStandingsDialog';
import {
	ConstructorStandingsPointsTooltip,
	ConstructorStandingsPositionTooltip
} from './ConstructorStandingsTooltip';

const FALLBACK_COLOR = 'var(--mui-palette-primary-main)';

type ConstructorsStandingsProps = {
	season: number;
	data: ConstructorStandingsSeasonData;
	constructorChampionData: SeasonConstructorChampionData;
};

function buildConstructorChartData(
	racesByYear: NonNullable<ConstructorStandingsSeasonData>['racesByYear']
): RaceStandingsWithEntities[] {
	return racesByYear.map(r => ({
		round: r.round,
		standings: r.raceTeamStandings
			.filter(s => s.team)
			.map(({ teamId, positionNumber, points, team }) => ({
				id: teamId,
				position: Number(positionNumber),
				points: Number(points),
				entity: {
					id: team!.id,
					name: team!.name ?? '',
					color: team!.colors?.primaryHex ?? FALLBACK_COLOR
				}
			}))
	}));
}

export default function ConstructorsStandings({
	season,
	data,
	constructorChampionData
}: ConstructorsStandingsProps) {
	const [open, setOpen] = useState(false);
	const chartData = buildConstructorChartData(data?.racesByYear ?? []);
	const height = Math.max(...chartData.map(s => s.standings.length), 10) * 24;
	const router = useRouter();
	const onLabelClick = (teamId: string) => router.push(`/constructors/${teamId}`);

	if (!data?.racesByYear?.length) {
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
				subheader={<ConstructorChampion season={season} data={constructorChampionData} />}
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
