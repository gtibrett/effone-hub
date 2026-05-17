import {RaceMap, useMapCircuitsToMapPoints} from '@/components/app';
import {getTimeStringFromDate} from '@/helpers';
import {DriverId} from '@/types';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Card} from '@/components/ui';

import {Grid, Link} from '@mui/material';
import type {ColumnDef} from '@tanstack/react-table';
import {useState} from 'react';
import CircuitDialog from './dialog/CircuitDialog';
import useCircuitData, {CircuitWithResults} from './useCircuitData';

type CircuitsProps = { driverId: DriverId }

export default function Circuits({driverId}: CircuitsProps) {
	const {data, loading}        = useCircuitData(driverId);
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const [active, setActive]    = useState<CircuitWithResults['rowId'] | undefined>();

	if (!data?.length) {
		return <Alert><AlertDescription>Circuit Data Not Available</AlertDescription></Alert>;
	}

	const {points, onClick} = mapCircuitsToMapPoints(data || []);

	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<CircuitWithResults, any>[] = [
		{
			accessorKey: 'fullName',
			header:      'Circuit',
			cell:        ({row}) => <Link href="#" color="secondary" onClick={() => setActive(row.original.rowId)}>{row.original.fullName}</Link>
		},
		{
			id:         'races',
			header:     numHeader('Races'),
			accessorFn: (row) => row.results.length,
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			accessorKey: 'wins',
			header:      numHeader('Wins'),
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			accessorKey: 'averagePosition',
			header:      numHeader('Avg. Finish'),
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			accessorKey: 'averageTime',
			header:      numHeader('Avg. Time'),
			cell:        ({getValue}) => {
				const value = getValue<number | null | undefined>();
				if (!value) {
					return numCell('--');
				}
				return numCell(getTimeStringFromDate(new Date(value)));
			}
		}
	];

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Card>
					<RaceMap points={points} onClick={onClick} height={250}/>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<CircuitDialog driverId={driverId} circuitId={active} onClose={() => setActive(undefined)}/>
				<DataTable<CircuitWithResults>
					className="mt-2"
					rows={data}
					columns={columns}
					loading={loading}
					autoHeight
					density="compact"
					getRowId={(row) => row.rowId || ''}
					initialState={{
						sorting: {
							sortModel: [{field: 'fullName', sort: 'asc'}]
						}
					}}
				/>
			</Grid>
		</Grid>
	);
}
