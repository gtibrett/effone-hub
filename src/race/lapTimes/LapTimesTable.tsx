import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useMemo} from 'react';
import ByLine from '../../drivers/ByLine';
import {Lap, Timing} from '../../types/ergast';
import {LapByLapProps} from '../lapByLap/LapByLap';
import {getColorWithAlt, getDateFromTimeString, getFastestLapTimeFromLaps} from './helpers';
import {LapTimesProps} from './LapTimes';
import {LapChartSeries} from './useLapTimeChartData';

type LapData = {
	lap: number;
	timing: Timing;
	color: string;
	alt: string;
}

type LapTimesTableRow = {
	driverId: LapChartSeries['id'];
	laps: LapData[];
}

function useLapTimesData(laps: Lap[], results: LapByLapProps['results']) {
	return useMemo(() => {
		const fastestLap               = results?.find(r => Number(r.FastestLap?.rank) === 1)?.FastestLap;
		const fastestLapTime           = fastestLap ? getDateFromTimeString(results?.find(r => Number(r.FastestLap?.rank) === 1)?.FastestLap?.Time?.time) : getFastestLapTimeFromLaps(laps);
		const data: LapTimesTableRow[] = [];
		
		if (laps.length) {
			laps.forEach(lap => {
				lap.Timings.forEach(timing => {
					if (!timing.time) {
						return;
					}
					let index = data.findIndex(driver => driver.driverId === timing.driverId);
					if (index === -1) {
						data.push({
							driverId: timing.driverId,
							laps: []
						});
						index = data.length - 1;
					}
					
					try {
						const lapTime      = getDateFromTimeString(timing.time);
						const personalBest = Math.min(...data[index].laps.map(l => getDateFromTimeString(l.timing.time)));
						
						data[index].laps.push({lap: Number(lap.number), timing: timing, ...getColorWithAlt(lapTime, personalBest, fastestLapTime)});
					}
					catch (e) {
						// time couldn't be calculated
					}
				});
			});
		}
		
		return data;
	}, [laps, results]);
}

const useColumns = (laps: number) => {
	
	return useMemo(() => {
		const columns: GridColDef<LapTimesTableRow>[] = [
			{
				field: 'driverId',
				headerName: 'Driver',
				flex: 1,
				renderCell: ({value}) => (
					<ByLine id={value} variant="full"/>
				),
				minWidth: 240
			}
		];
		
		for (let i = 1; i <= laps; i++) {
			columns.push(
				{
					field: String(i),
					headerName: String(i),
					type: 'dateTime',
					align: 'center',
					headerAlign: 'center',
					width: 100,
					valueGetter: ({row, field}) => {
						return row.laps.find(l => l.lap === Number(field))?.timing?.time;
					},
					renderCell: ({row, field}) => {
						const lap = row.laps.find(l => l.lap === Number(field));
						if (!lap) {
							return '';
						}
						const {color, alt, timing} = lap;
						return <>
							<FontAwesomeIcon icon={faSquare} color={color} title={alt} style={{marginRight: 8}}/>
							{timing.time}
						</>;
					}
				}
			);
		}
		
		return columns;
	}, [laps]);
};

export default function LapTimesTable({laps, results}: LapTimesProps) {
	const data    = useLapTimesData(laps, results);
	const columns = useColumns(laps.length);
	
	return (
		<DataGrid columns={columns} rows={data} getRowId={r => r.driverId} autoHeight/>
	);
}