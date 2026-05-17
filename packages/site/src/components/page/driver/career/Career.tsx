import {ConstructorByLine} from '@/components/app';
import useComponentDimensionsWithRef from '@/hooks/useComponentDimensionsWithRef';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Link, Skeleton} from '@/components/ui';

import {Grid} from '@mui/material';
import type {ColumnDef} from '@tanstack/react-table';
import {useState} from 'react';
import SeasonDialog from '../season/SeasonDialog';
import Stats from '../stats';
import CareerChart from './CareerChart';
import useCareerData from './useCareerData';

type CareerProps = { driverId: string }

export default function Career({driverId}: CareerProps) {
	const {data, loading}                          = useCareerData(driverId);
	const careerStandings                          = data?.driver.standings?.nodes;
	const racesByYear: { [key: number]: number }   = {};
	const {ref, node, dimensions: {width, height}} = useComponentDimensionsWithRef();
	const [active, setActive]                      = useState<number | undefined>();

	if (loading || !careerStandings) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!careerStandings.length) {
		return <Alert><AlertDescription>Career Data Not Available</AlertDescription></Alert>;
	}

	data?.driver.raceResults?.nodes?.forEach((r) => r.race?.year && (racesByYear[r.race?.year] = (racesByYear[r.race?.year] || 0) + 1));

	type Row = NonNullable<NonNullable<typeof careerStandings>[number]>;
	const numericHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;
	const numericCell = (value: unknown) => <div className="text-center">{value as any}</div>;

	const columns: ColumnDef<Row, any>[] = [
		{
			accessorKey: 'year',
			header:      numericHeader('Season'),
			size:        100,
			cell:        ({row}) => (
				<div className="text-center">
					<Link href="#" color="secondary" onClick={() => setActive(row.original.year ?? undefined)}>{row.original.year}</Link>
				</div>
			)
		},
		{
			accessorKey: 'races',
			header:      numericHeader('Races'),
			cell:        ({getValue}) => numericCell(getValue())
		},
		{
			accessorKey: 'positionNumber',
			header:      numericHeader('Position'),
			cell:        ({getValue}) => numericCell(getValue())
		},
		{
			accessorKey: 'points',
			header:      numericHeader('Points'),
			cell:        ({getValue}) => numericCell(getValue())
		},
		{
			id:            'team',
			header:        'Constructor',
			enableSorting: false,
			cell:          ({row}) => <ConstructorByLine id={row.original.team?.id} variant="link"/>
		}
	];

	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="space-around">
				<Stats driverId={driverId}/>
				<Grid item xs={12}/>
				<Grid item xs={12}>
					<CareerChart driverId={driverId} size={200}/>
				</Grid>
				<Grid item xs={12}>
					<SeasonDialog season={active} driverId={driverId} onClose={() => setActive(undefined)}/>
					<DataTable<Row>
						rows={careerStandings as Row[]}
						columns={columns}
						autoHeight
						density="compact"
						getRowId={(r) => r.year || ''}
						initialState={{
							sorting: {
								sortModel: [{field: 'year', sort: 'desc'}]
							}
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
}
