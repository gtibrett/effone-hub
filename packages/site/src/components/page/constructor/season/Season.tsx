import {DriverByLine} from '@/components/app';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Link, Skeleton, Typography} from '@/components/ui';
 
import {Grid} from '@/components/ui';
import type {TypographyProps} from '@/components/ui';
import type {ColumnDef} from '@tanstack/react-table';
import {PropsWithChildren} from 'react';
import {ConstructorPageData} from '../types';
import SeasonChart from './SeasonChart';

const CellValueWrapper = ({align = 'center', children}: PropsWithChildren<Pick<TypographyProps, 'align'>>) => <Typography paragraph align={align} sx={{mb: 0, mt: .5}}>{children}</Typography>;

type SeasonProps = SimpleApolloResult<ConstructorPageData> & { season: number };

export default function Season({data, loading, season}: SeasonProps) {

	if (loading || !data) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	const races   = data.races.nodes;
	const results = data.team.raceResults.nodes;

	if (!races?.length) {
		return <Alert><AlertDescription>Season Data Not Available</AlertDescription></Alert>;
	}

	type Row = (typeof races)[number];
	const centerHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<Row, any>[] = [
		{
			id:         'date',
			header:     centerHeader('Date'),
			accessorFn: (row) => row.date ? new Date(row.date) : undefined,
			sortingFn:  'datetime',
			cell:       ({getValue}) => {
				const value = getValue<Date | undefined>();
				return <div className="text-center">{value ? value.toLocaleDateString() : ''}</div>;
			}
		},
		{
			accessorKey: 'officialName',
			header:      'Race',
			cell:        ({row}) => (
				<Link href={`/${season}/${row.original.round}#${row.original.officialName}`}>{row.original.officialName}</Link>
			)
		},
		{
			id:     'driver',
			header: 'Drivers',
			cell:   ({row}) => (
				<>
					{results.filter((r) => r.raceId === row.original.rowId).map((result) => (
						<CellValueWrapper key={result.driverId ?? undefined} align="left">
							<DriverByLine id={result.driverId ?? undefined} variant="link"/>
						</CellValueWrapper>
					))}
				</>
			)
		},
		{
			id:     'qualifying',
			header: centerHeader('Qualifying'),
			cell:   ({row}) => (
				<>
					{results.filter((r) => r.raceId === row.original.rowId).map((result) => (
						<CellValueWrapper key={result.driverId ?? ''}>{result.gridPositionNumber}</CellValueWrapper>
					))}
				</>
			)
		},
		{
			id:     'finish',
			header: centerHeader('Finish'),
			cell:   ({row}) => (
				<>
					{results.filter((r) => r.raceId === row.original.rowId).map((result) => (
						<CellValueWrapper key={result.driverId ?? ''}>{result.positionNumber}</CellValueWrapper>
					))}
				</>
			)
		},
		{
			id:     'points',
			header: centerHeader('Points'),
			cell:   ({row}) => (
				<Grid container spacing={0} justifyContent="center">
					{results.filter((r) => r.raceId === row.original.rowId).map((result) => (
						<Grid item xs={12} key={result.driverId ?? ''}><Typography align="center">{result.points}</Typography></Grid>
					))}
				</Grid>
			)
		}
	];

	return (
		<>
			<SeasonChart data={data} loading={loading} season={season}/>
			<DataTable<Row>
				rows={races}
				columns={columns}
				rowHeight={100}
				autoHeight
				density="compact"
				getRowId={(row: Row) => row.round || ''}
				initialState={{
					sorting: {
						sortModel: [{field: 'date', sort: 'asc'}]
					}
				}}
			/>
		</>
	);
}
