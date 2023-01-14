import {Box} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ByLine from '../../drivers/ByLine';
import {LapTimesProps} from './LapTimes';
import useLapTimeChartData, {LapChartSeries} from './useLapTimeChartData';

type LapTimesTableRow = {
	driverId: LapChartSeries['id'];
	laps: {
		[lap: string]: string | null
	};
}

export default function LapTimesTable({laps, results}: LapTimesProps) {
	const flatData: LapTimesTableRow[] = [];
	const data                         = useLapTimeChartData(laps, results);
	
	data.forEach((serie) => {
		flatData.push({
			driverId: serie.id,
			laps: Object.fromEntries(serie.data.map((d) => (
				[`lap_${d.x}`, d.timing.time]
			)))
		});
	});
	
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
	
	for (let i = 1; i <= laps.length; i++) {
		columns.push(
			{
				field: `lap_${i}`,
				headerName: String(i),
				type: 'dateTime',
				align: 'center',
				headerAlign: 'center',
				width: 100,
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