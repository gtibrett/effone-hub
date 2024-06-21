import {NivoTooltipFactory, useNivoTheme} from '@/components/ui/nivo';
import {useResultsColors} from '@/hooks';
import {DriverId} from '@/types';
import {Box, Card, Skeleton, Typography, useTheme} from '@mui/material';
import {ComputedDatum, ResponsiveSunburst} from '@nivo/sunburst';
import usePerformanceData from '../usePerformanceData';
import useCareerData from './useCareerData';

const CareerPerformanceTooltip = (datum: ComputedDatum<BurstDatum>) => {
	const {label} = datum.data;
	
	return (
		<Box py={1} px={2}>
			<Typography>{label}</Typography>
		</Box>
	);
};

type BurstDatum = {
	id?: string;
	label?: string;
	value?: number;
	color?: string;
	children?: BurstDatum[];
}

export default function CareerPerformanceBurst({driverId, size}: {
	driverId: DriverId,
	size: number
}) {
	const nivoTheme       = useNivoTheme();
	const theme           = useTheme();
	const {data, loading} = useCareerData(driverId);
	const performanceData = usePerformanceData(data?.driver.results);
	const colors          = useResultsColors();
	
	if (loading) {
		return <Skeleton variant="rectangular" height={size} width="100%"/>;
	}
	
	if (!performanceData) {
		return null;
	}
	
	const {appearances, wins, podiums, inPoints, DNFs} = performanceData;
	
	const chartData = {
		id:       'data',
		children: [
			{
				id:       'appearances',
				label:    `Starts: ${appearances}`,
				children: [
					{
						id:       'inPoints',
						label:    `In Points: ${inPoints}`,
						value:    inPoints - podiums,
						children: [
							{
								id:       'podiums',
								label:    `Podiums: ${podiums}`,
								value:    podiums - wins,
								children: [
									{
										id:    'wins',
										label: `Wins ${wins}`,
										value: wins
									}
								]
							}
						]
					},
					{
						id:       'outPoints',
						label:    `Out of Points: ${appearances - inPoints}`,
						children: [
							{
								id:    'outOfPoints',
								label: `Finished: ${appearances - inPoints - DNFs}`,
								value: appearances - inPoints - DNFs
							},
							{
								id:    'DNFs',
								label: `DNFs: ${DNFs}`,
								value: DNFs
							}
						]
					}
				]
			}
		]
	};
	
	return (
		<Card variant="outlined" aria-hidden sx={{height: size, width: size}}>
			<ResponsiveSunburst<BurstDatum>
				theme={nivoTheme}
				data={chartData}
				margin={{top: 20, right: 0, bottom: 0, left: 0}}
				id="id"
				value="value"
				cornerRadius={10}
				borderColor={theme.palette.background.paper}
				borderWidth={2}
				inheritColorFromParent={false}
				colors={(datum) => {
					return colors[datum.id].background || theme.palette.primary.main;
				}}
				enableArcLabels={false}
				// @ts-ignore
				tooltip={NivoTooltipFactory(CareerPerformanceTooltip)}
			/>
		</Card>
	);
}