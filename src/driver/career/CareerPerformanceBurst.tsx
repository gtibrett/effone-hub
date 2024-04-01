import {NivoTooltipFactory, useNivoTheme} from '@effonehub/ui-components';
import {Box, Card, Skeleton, Typography, useTheme} from '@mui/material';
import {ComputedDatum, ResponsiveSunburst} from '@nivo/sunburst';
import {DriverId, DriverPageData} from '../types';
import useCareerData from './useCareerData';
import useStatColors from './useStatColors';

type Stats = {
	wins: number;
	podiums: number;
	inPoints: number;
	dnfs: number;
	appearances: number;
}

const usePerformanceData = (data?: DriverPageData): Stats | undefined => {
	const careerResults = data?.driver.results;
	
	if (!careerResults) {
		return undefined;
	}
	
	return {
		wins:        careerResults.filter(r => r.positionOrder === 1).length,
		podiums:     careerResults.filter(r => r.positionOrder <= 3).length,
		inPoints:    careerResults.filter(r => r.positionOrder <= 10).length,
		dnfs:        careerResults.filter(r => r.positionText !== String(r.positionOrder)).length,
		appearances: careerResults.length
	};
};

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
	const summaryData     = usePerformanceData(data);
	const colors          = useStatColors();
	
	if (loading) {
		return <Skeleton variant="rectangular" height={size} width="100%"/>;
	}
	
	if (!summaryData) {
		return null;
	}
	
	const {appearances, wins, podiums, inPoints, dnfs} = summaryData;
	
	const chartData = {
		id:       'data',
		children: [
			{
				id:       'starts',
				label:    `Starts: ${appearances}`,
				children: [
					{
						id:       'inPoints',
						label:    `In Points: ${inPoints}`,
						value:    inPoints - podiums - wins,
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
								id:    'bottom10',
								label: `Finished: ${appearances - inPoints - dnfs}`,
								value: appearances - inPoints - dnfs
							},
							{
								id:    'dnfs',
								label: `DNFs: ${dnfs}`,
								value: dnfs
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
				borderWidth={4}
				inheritColorFromParent={false}
				colors={(datum) => {
					// @ts-ignore
					return colors[datum.id] || theme.palette.primary.main;
				}}
				enableArcLabels={false}
				// @ts-ignore
				tooltip={NivoTooltipFactory(CareerPerformanceTooltip)}
			/>
		</Card>
	);
}