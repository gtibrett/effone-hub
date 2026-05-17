import {DriverByLine} from '@/components/app';
import {getTimeStringFromDate} from '@/helpers';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AppLapTime} from '@/gql/graphql';
import {DataTable} from '@/components/ui';
import type {ColumnDef} from '@tanstack/react-table';
import {useMemo} from 'react';
import {LapByLapData, useLapByLapData} from '../lapByLap/useLapByLapChartData';
import {getColorWithAlt} from './helpers';
import {LapChartSeries} from './useLapTimeChartData';

type LapData = {
	lap: number;
	timing: Partial<AppLapTime>;
	color: string;
	alt: string;
}

type LapTimesTableRow = {
	driverId: LapChartSeries['id'];
	laps: LapData[];
}

function useLapTimesData(lapByLapData: LapByLapData) {
	return useMemo(() => {
		const fastestLapTime           = Math.min(...(lapByLapData.data?.flatMap((d) => d.laps).map((lt) => lt.milliseconds || Infinity) || []));
		const data: LapTimesTableRow[] = [];

		if (lapByLapData.data?.length) {
			lapByLapData.data.forEach((d) => {
				if (!d.driverId) {
					return;
				}

				const lapsWithTimes                  = d.laps.filter((l) => l.milliseconds).map((l) => ({...l, milliseconds: Number(l.milliseconds)}));
				let personalBest: number | undefined = undefined;

				data.push({
					driverId: d.driverId,
					laps:     lapsWithTimes.map((lt) => {
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
		const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

		const columns: ColumnDef<LapTimesTableRow, any>[] = [
			{
				accessorKey: 'driverId',
				header:      'Driver',
				cell:        ({getValue}) => <DriverByLine id={getValue<string>()} variant="full"/>
			}
		];

		for (let i = 1; i <= laps; i++) {
			const field = String(i);
			columns.push({
				id:         field,
				header:     numHeader(String(i)),
				size:       110,
				accessorFn: (row) => {
					const lap = row.laps.find((l) => l.lap === i);
					if (!lap) {
						return undefined;
					}
					const {timing: {milliseconds}} = lap;
					if (!milliseconds) {
						return undefined;
					}
					return new Date(milliseconds);
				},
				sortingFn:  'datetime',
				cell:       ({row, getValue}) => {
					const lap = row.original.laps.find((l) => l.lap === i);
					const value = getValue<Date | undefined>();
					if (!lap || !value) {
						return <div className="text-center">--</div>;
					}

					const {color, alt} = lap;

					return (
						<div className="text-center">
							<FontAwesomeIcon icon={faSquare} color={color} title={alt} style={{marginRight: 8}}/>
							{getTimeStringFromDate(value)}
						</div>
					);
				}
			});
		}

		return columns;
	}, [laps]);
};

export type LapTimesTableProps = {
	season: number;
	round: number;
}

export default function LapTimesTable({season, round}: LapTimesTableProps) {
	const lapByLapData    = useLapByLapData(season, round);
	const data            = useLapTimesData(lapByLapData);
	const {totalLaps = 0} = lapByLapData;
	const columns         = useColumns(totalLaps);

	return (
		<DataTable<LapTimesTableRow>
			rows={data}
			columns={columns}
			getRowId={(r: LapTimesTableRow) => r.driverId}
			autoHeight
		/>
	);
}
