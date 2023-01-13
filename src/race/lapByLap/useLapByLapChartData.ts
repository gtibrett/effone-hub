import {useMemo} from 'react';
import {getColorByConstructorId} from '../../constructors';
import {Lap} from '../../types/ergast';
import {LapByLapProps, LapChartSeries} from './LapByLap';

const useLapByLapChartData = (laps: Lap[], results: LapByLapProps['results']) => useMemo<LapChartSeries[]>(() => {
	const drivers: LapChartSeries[] = [];
	
	if (results) {
		laps.forEach(lap => {
			lap.Timings.forEach(timing => {
				let index = drivers.findIndex(driver => driver.id === timing.driverId);
				if (index === -1) {
					const driverResult = results.find(result => result?.Driver?.driverId === timing.driverId);
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
				if (!lap.Timings.find(t => t.driverId === driver.id)) {
					const driverResult = results.find((result) => result?.Driver?.driverId === driver.id);
					drivers[index].data.push({x: Number(lap.number), y: Number(driverResult?.position) || null});
				}
				
				//drivers[index].data.sort(sortLaps)
			});
		});
	}
	
	return drivers;
}, [laps, results]);

export default useLapByLapChartData;