import {Box} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {DriverByLine} from '../../driver';
import {LapByLapProps, LapChartSeries} from './LapByLap';
import useLapByLapChartData, {useLapByLapData} from './useLapByLapChartData';

type LapByLapTableRow = {
	driverId: LapChartSeries['id'];
	laps: {
		[lap: string]: number | null
	};
}

export default function LapByLapTable({season, round}: LapByLapProps) {
	const flatData: LapByLapTableRow[] = [];
	const lapByLapData                 = useLapByLapData(season, round);
	const {totalLaps}                  = lapByLapData;
	const data                         = useLapByLapChartData(lapByLapData);
	
	data.forEach((serie) => {
		flatData.push({
			driverId: serie.id,
			laps:     Object.fromEntries(serie.data.map((d) => (
				[`lap_${d.x}`, d.y]
			)))
		});
	});
	
	const columns: GridColDef<LapByLapTableRow>[] = [
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
	
	for (let i = 1; i <= (totalLaps || 0); i++) {
		columns.push(
			{
				field:       `lap_${i}`,
				headerName:  String(i),
				type:        'number',
				align:       'center',
				headerAlign: 'center',
				width:       32,
				valueGetter: ({row, field}) => {
					return row.laps[field];
				}
			}
		);
	}
	
	return (
		<Box height={800}>
			<DataGrid columns={columns} rows={flatData} getRowId={r => r.driverId}/>
		</Box>
	);
}