'use client';

import { Paper, useTheme } from '@mui/material';
import { RadarChart } from '@mui/x-charts/RadarChart';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { usePerformanceData } from '@/components/page/driver';
import { useChartsTheme } from '@/components/ui/charts';

import type { CircuitDialogData } from './types';

type CircuitPerformanceProps = SimpleApolloResult<CircuitDialogData>;

export default function CircuitPerformance({ data, loading }: CircuitPerformanceProps) {
	const theme = useTheme();
	const { sx } = useChartsTheme();
	const rawResults = data?.circuit.races?.flatMap(r => r.results);
	const circuitResults = rawResults?.filter(Boolean).map(r => ({
		positionDisplayOrder: r.positionDisplayOrder ?? undefined,
		positionText: r.positionText ?? undefined
	}));
	const performanceData = usePerformanceData(circuitResults);

	if (!performanceData || loading) {
		return null;
	}

	const values = [
		performanceData.wins,
		performanceData.podiums,
		performanceData.inPoints,
		performanceData.DNFs
	];

	return (
		<Paper variant="outlined" className="p-0" style={{ aspectRatio: 1 }}>
			<RadarChart
				className="h-full"
				series={[
					{
						label: 'Performance',
						data: values,
						fillArea: true,
						color: theme.palette.primary.main
					}
				]}
				radar={{
					metrics: ['Wins', 'Podiums', 'In Points', 'DNFs'],
					max: Math.max(performanceData.appearances, 1)
				}}
				divisions={3}
				shape="circular"
				margin={{ top: 10, right: 60, bottom: 10, left: 60 }}
				sx={sx}
				skipAnimation={false}
			/>
		</Paper>
	);
}
