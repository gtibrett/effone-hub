import {Box, Skeleton} from '@mui/material';
import {ResponsiveBump} from '@nivo/bump';
import {getColorByConstructorId} from '../constructors';
import ByLine from '../drivers/ByLine';
import {Lap, Race} from '../types/ergast';

type LapByLapProps = {
	laps: Lap[];
	results: Race['Results']
}

type LapChartSeries = {
	id: string;
	color?: string;
	data: { x: number, y: number | null }[]
}

const mapLapsToChartData = (laps: Lap[], results: LapByLapProps['results']): LapChartSeries[] => {
	const drivers: LapChartSeries[] = [];
	laps.forEach(lap => {
		lap.Timings.forEach(timing => {
			let index = drivers.findIndex(driver => driver.id === timing.driverId);
			if (index === -1) {
				const driverResult = results?.find(result => result?.Driver?.driverId === timing.driverId);
				drivers.push({
					id: timing.driverId,
					color: getColorByConstructorId(driverResult?.Constructor?.constructorId),
					data: []
				});
				index = drivers.length - 1;
			}
			
			drivers[index].data.push({x: Number(lap.number), y: Number(timing.position)});
		});
		
		drivers.forEach((driver, index) => {
			if (driver.data.length < Number(lap.number) - 1) {
				const driverResult = results?.find(result => result?.Driver?.driverId === driver.id);
				drivers[index].data.push({x: Number(lap.number), y: Number(driverResult?.position) || null});
			}
		});
	});
	
	return drivers;
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

export default function LapByLap({laps, results}: LapByLapProps) {
	let content = <Skeleton variant="rectangular" sx={{width: '100%'}} height="100%"/>;
	if (laps.length) {
		content = (
			<ResponsiveBump
				data={mapLapsToChartData(laps, results)}
				colors={({color}) => color || 'transparent'}
				lineWidth={3}
				activeLineWidth={6}
				inactiveLineWidth={3}
				inactiveOpacity={0.5}
				pointSize={2}
				activePointSize={8}
				inactivePointSize={0}
				pointBorderWidth={0}
				activePointBorderWidth={3}
				pointBorderColor={{from: 'serie.color'}}
				// @ts-ignore
				startLabel={({id}) => <ByLine variant="code" id={id}/>}
				endLabel={false}
				enableGridX={false}
				enableGridY={false}
				axisTop={null}
				axisLeft={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					tickValues: getTicks(Number(results?.[0].laps))
				}}
				axisRight={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legendPosition: 'middle',
					legendOffset: -40
				}}
				margin={{top: 0, right: 24, bottom: 24, left: 40}}
			/>
		);
	}
	
	return (
		<Box sx={{height: '60vh', width: '100%'}}>
			{content}
		</Box>
	);
}