import {useNivoTheme} from '@/components/ui/nivo';
import {QueryResult} from '@apollo/client/react/types/types';
import {Alert, Box, Skeleton} from '@mui/material';
import {ResponsiveSwarmPlot} from '@nivo/swarmplot';
import {SwarmData, useMapLapTimeDataToSwarmChart} from './mapLapTimeDataToSwarmChart';
import {CircuitDialogData} from './types';

type LapTimesChartProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

export default function LapTimesByYearSwarm({data, loading}: LapTimesChartProps) {
	const nivoTheme                  = useNivoTheme();
	const mapLapTimeDataToSwarmChart = useMapLapTimeDataToSwarmChart();
	
	if (!data || loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	const chartData = mapLapTimeDataToSwarmChart(data).filter(d => d.deviations < 3);
	
	if (!chartData.length) {
		return <Alert variant="outlined" severity="info">Lap Time Data Not Available</Alert>;
	}
	
	function findUniqueYears(value: SwarmData, index: number, self: SwarmData[]) {
		return self.findIndex(v => v.group === value.group) === index;
	}
	
	const years = chartData.filter(findUniqueYears).map(y => String(y.group)).sort();
	const min   = Math.min(...chartData.map(d => d.milliseconds));
	const max   = Math.max(...chartData.map(d => d.milliseconds));
	
	return (
		<Box sx={{height: '60vh', width: '100%'}} aria-hidden>
			<ResponsiveSwarmPlot
				theme={nivoTheme}
				data={chartData}
				groups={years}
				colors={({data}) => data.color}
				gap={10}
				spacing={0}
				value="milliseconds"
				valueScale={{type: 'linear', min, max}}
				size={6}
				forceStrength={1}
				simulationIterations={50}
				isInteractive={false}
				borderColor={{
					from:      'color',
					modifiers: [
						[
							'darker',
							0.6
						],
						[
							'opacity',
							0.5
						]
					]
				}}
				margin={{top: 10, right: 10, bottom: 80, left: 10}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize:     10,
					tickPadding:  5,
					tickRotation: 0
				}}
				axisLeft={{
					tickSize:     0,
					tickPadding:  0,
					tickRotation: 0,
					tickValues:   0
				}}
			/>
		</Box>
	);
}