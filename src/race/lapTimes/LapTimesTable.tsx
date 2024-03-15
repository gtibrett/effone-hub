import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {LapTime} from '@gtibrett/effone-hub-graph-api';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useMemo} from 'react';
import {DriverByLine} from '../../driver';
import {getTimeStringFromDate} from '../../helpers';
import {LapByLapData, useLapByLapData} from '../lapByLap/useLapByLapChartData';
import {getColorWithAlt} from './helpers';
import {LapTimesProps} from './LapTimes';
import {LapChartSeries} from './useLapTimeChartData';

type LapData = {
	lap: number;
	timing: Partial<LapTime>;
	color: string;
	alt: string;
}

type LapTimesTableRow = {
	driverId: LapChartSeries['id'];
	laps: LapData[];
}

function useLapTimesData(lapByLapData: LapByLapData) {
	return useMemo(() => {
		const fastestLapTime           = Math.min(...(lapByLapData.data?.flatMap(d => d.laps).map(lt => lt.milliseconds || Infinity) || []));
		const data: LapTimesTableRow[] = [];
		
		if (lapByLapData.data?.length) {
			lapByLapData.data.forEach(d => {
				const lapsWithTimes                  = d.laps.filter(l => l.milliseconds).map(l => ({...l, milliseconds: Number(l.milliseconds)}));
				let personalBest: number | undefined = undefined;
				
				data.push({
					driverId: d.driverId,
					laps:     lapsWithTimes.map(lt => {
						personalBest = !personalBest ? lt.milliseconds : Math.min(lt.milliseconds, personalBest);
						
						return {
							lap:    lt.lap,
							personalBest,
							fastestLapTime,
							timing: lt,
							...getColorWithAlt(lt.milliseconds, personalBest, fastestLapTime)
						};
					})
				});
			});
		}
		
		return data;
	}, [lapByLapData]);
}

const useColumns = (laps: number) => {
	return useMemo(() => {
		const columns: GridColDef<LapTimesTableRow>[] = [
			{
				field:      'driverId',
				headerName: 'Driver',
				flex:       1,
				renderCell: ({value}) => (
					<DriverByLine id={value} variant="full"/>
				),
				minWidth:   240
			}
		];
		
		for (let i = 1; i <= laps; i++) {
			columns.push(
				{
					field:       String(i),
					headerName:  String(i),
					type:        'dateTime',
					align:       'center',
					headerAlign: 'center',
					width:       100,
					valueGetter: ({row, field}) => {
						return row.laps.find(l => l.lap === Number(field))?.timing?.milliseconds;
					},
					renderCell:  ({row, field}) => {
						const lap = row.laps.find(l => l.lap === Number(field));
						if (!lap) {
							return '';
						}
						const {color, alt, timing: {milliseconds}} = lap;
						
						if (!milliseconds) {
							return '--';
						}
						
						return <>
							<FontAwesomeIcon icon={faSquare} color={color} title={alt} style={{marginRight: 8}}/>
							{getTimeStringFromDate(new Date(milliseconds))}
						</>;
					}
				}
			);
		}
		
		return columns;
	}, [laps]);
};

export default function LapTimesTable({season, round}: LapTimesProps) {
	const lapByLapData    = useLapByLapData(season, round);
	const data            = useLapTimesData(lapByLapData);
	const {totalLaps = 0} = lapByLapData;
	const columns         = useColumns(totalLaps);
	
	return (
		<DataGrid columns={columns} rows={data} getRowId={r => r.driverId} autoHeight/>
	);
}