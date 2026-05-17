import {DriverByLine} from '@/components/app';
import {DataTable} from '@/components/ui';
import {Box} from '@mui/material';
import type {ColumnDef} from '@tanstack/react-table';
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

	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<LapByLapTableRow, any>[] = [
		{
			accessorKey: 'driverId',
			header:      'Driver',
			cell:        ({getValue}) => <DriverByLine id={getValue<string>()} variant="full"/>
		}
	];

	for (let i = 1; i <= (totalLaps || 0); i++) {
		const field = `lap_${i}`;
		columns.push({
			id:         field,
			header:     numHeader(String(i)),
			size:       32,
			accessorFn: (row) => row.laps[field],
			cell:       ({getValue}) => numCell(getValue() ?? '')
		});
	}

	return (
		<Box height={800}>
			<DataTable<LapByLapTableRow>
				rows={flatData}
				columns={columns}
				getRowId={(r: LapByLapTableRow) => r.driverId ?? ''}
			/>
		</Box>
	);
}
