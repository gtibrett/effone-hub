'use client';

import { useMemo } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { useChartsTheme } from '@/components/ui/charts';
import { alpha } from '@/components/ui/colors';
import { useGetTeamColor } from '@/hooks';

import { ConstructorPageData } from '../types';

type SeasonChartProps = SimpleApolloResult<ConstructorPageData> & { season: number };

export default function SeasonChart({ data, loading }: SeasonChartProps) {
	const getTeamColor = useGetTeamColor();
	const { sx } = useChartsTheme();

	const built = useMemo(() => {
		if (!data) {
			return null;
		}
		const colorPalette = [
			getTeamColor(data.team.colors, 'primaryHex'),
			getTeamColor(data.team.colors, 'secondaryHex'),
			alpha(getTeamColor(data.team.colors, 'primaryHex'), 0.75),
			alpha(getTeamColor(data.team.colors, 'secondaryHex'), 0.75)
		];
		const raceResults = data.team.raceResults;
		const rounds = Math.max(...raceResults.map(rs => rs.race?.round || 0));
		const xData: number[] = Array.from({ length: rounds }, (_, i) => i + 1);

		const driverIds: string[] = raceResults
			.map(r => String(r.driver?.abbreviation))
			.removeDuplicates();

		const series: LineSeriesType[] = driverIds.map((id, idx) => {
			const values: Array<number | null> = xData.map(round => {
				const match = raceResults.find(
					rs => String(rs.driver?.abbreviation) === id && rs.race?.round === round
				);
				return match?.positionNumber ?? null;
			});
			return {
				type: 'line',
				id,
				label: id,
				data: values,
				color: colorPalette[idx % colorPalette.length],
				curve: 'linear',
				shape: 'circle' as const,
				showMark: true,
				connectNulls: false
			};
		});

		const maxPosition = Math.max(
			20,
			...series.flatMap(s => s.data?.map(v => (typeof v === 'number' ? v : 0)) || [])
		);
		return { series, xData, maxPosition };
	}, [data, getTeamColor]);

	if (loading || !data) {
		return <Skeleton variant="rectangular" height={132} />;
	}
	if (!built) {
		return null;
	}

	return (
		<Box className="h-33 w-full" aria-hidden>
			<LineChart
				series={built.series}
				xAxis={[
					{
						data: built.xData,
						scaleType: 'point',
						position: 'none'
					}
				]}
				yAxis={[
					{
						scaleType: 'linear',
						min: 1,
						max: built.maxPosition,
						reverse: true,
						position: 'right',
						tickInterval: [1, 20]
					}
				]}
				margin={{ top: 24, right: 36, bottom: 32, left: 16 }}
				grid={{ horizontal: true, vertical: false }}
				slotProps={{
					legend: {
						direction: 'horizontal',
						position: { vertical: 'bottom', horizontal: 'center' }
					}
				}}
				sx={sx}
				skipAnimation={false}
			/>
		</Box>
	);
}
