import {Box, Skeleton, useTheme} from '@mui/material';
import {ResponsiveHeatMap} from '@nivo/heatmap';
import {memo} from 'react';
import ByLine from '../../drivers/ByLine';
import {Lap, Race} from '../../types/ergast';
import {getTicks} from './helpers';
import LapTooltip from './LapTooltip';
import useLapTimeChartData from './useLapTimeChartData';

type LapByLapProps = {
	laps: Lap[];
	results: Race['Results']
}

function LapTimes({laps, results}: LapByLapProps) {
	const theme    = useTheme();
	const lapCount = Number(results?.[0].laps);
	const data     = useLapTimeChartData(laps, results);
	
	let content = <Skeleton variant="rectangular" width="100%" height="100%"/>;
	if (laps.length) {
		content = (
			<ResponsiveHeatMap
				animate={false}
				data={data}
				forceSquare={true}
				colors={({data: {color}}) => color}
				emptyColor={theme.palette.divider}
				valueFormat={() => ''}
				borderWidth={2}
				borderColor={theme.palette.background.paper}
				margin={{top: 0, right: 0, bottom: 60, left: 40}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Lap',
					legendPosition: 'middle',
					legendOffset: 46,
					tickValues: getTicks(lapCount)
				}}
				axisLeft={{
					tickSize: 0,
					tickPadding: 5,
					tickRotation: 0,
					format: (v => {
						return <ByLine variant="code" id={v}/>;
					})
				}}
				tooltip={LapTooltip}
			/>
		);
	}
	
	return (
		<Box sx={{height: '50vh', width: '100%'}}>
			{content}
		</Box>
	);
}

export default memo(LapTimes);