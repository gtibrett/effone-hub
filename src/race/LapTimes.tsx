import {Box, Skeleton, useTheme} from '@mui/material';
import {green, purple, yellow} from '@mui/material/colors';
import {ResponsiveHeatMap} from '@nivo/heatmap';
import {getColorByConstructorId} from '../constructors';
import ByLine from '../drivers/ByLine';
import {Lap, Race, Timing} from '../types/ergast';
import LapTooltip from './LapTooltip';

type LapByLapProps = {
	laps: Lap[];
	results: Race['Results']
}

export type LapChartDatum = {
	x: number,
	y: number,
	timing: Timing
	color: string;
};

type LapChartSeries = {
	id: string;
	color?: string;
	data: LapChartDatum[]
}

const getDateFromTimeString = (time: string) => {
	const [mins, secondsWithMilli] = time.split(':');
	const [seconds, milliseconds]  = secondsWithMilli.split('.');
	return Date.UTC(2022, 0, 1, 0, Number(mins), Number(seconds), Number(milliseconds));
};

const mapLapsToChartData = (laps: Lap[], results: LapByLapProps['results']) => {
	const fastestLapTime         = getDateFromTimeString(results?.find(r => Number(r.FastestLap?.rank) === 1)?.FastestLap?.Time?.time || '');
	const data: LapChartSeries[] = [];
	
	if (laps.length) {
		laps.forEach(lap => {
			lap.Timings.forEach(timing => {
				if (!timing.time) {
					return;
				}
				let index = data.findIndex(driver => driver.id === timing.driverId);
				if (index === -1) {
					const driverResult = results?.find(result => result?.Driver?.driverId === timing.driverId);
					data.push({
						id: timing.driverId,
						color: getColorByConstructorId(driverResult?.Constructor?.constructorId),
						data: []
					});
					index = data.length - 1;
				}
				
				const lapTime      = getDateFromTimeString(timing.time);
				const personalBest = Math.min(...data[index].data.map(l => l.y));
				
				data[index].data.push({x: Number(lap.number), y: lapTime, timing, color: getColor(lapTime, personalBest, fastestLapTime)});
			});
		});
	}
	
	return data;
};

const getTicks = (laps: number) => {
	const ticks = [1];
	for (let i = 1; i < laps; i++) {
		if (i % 10 === 0) {
			ticks.push(i);
		}
	}
	
	return [...ticks, laps];
};

const getColor = (lapTime: number, personalBest: number, fastestLapTime: number) => {
	if (lapTime === fastestLapTime) {
		return purple[800];
	}
	else if (lapTime < personalBest) {
		return green[400];
	}
	
	return yellow[500];
};

export default function LapTimes({laps, results}: LapByLapProps) {
	const theme          = useTheme();
	const lapCount       = Number(results?.[0].laps);
	const fastestLapTime = getDateFromTimeString(results?.find(r => Number(r.FastestLap?.rank) === 1)?.FastestLap?.Time?.time || '');
	const data           = mapLapsToChartData(laps, results);
	
	let content = <Skeleton variant="rectangular" sx={{width: '100%'}} height="100%"/>;
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