import {useAppState} from '@/components/app';
import {PositionChange} from '@/components/page/race';
import {getPositionTextOutcome, getTimeStringFromDate} from '@/helpers';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Link} from '@/components/ui';
import {Grid, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import type {ColumnDef} from '@tanstack/react-table';
import SeasonChart from './SeasonChart';
import useSeasonData from './useSeasonData';

type SeasonProps = { season: number, driverId: string };

export default function Season({season, driverId}: SeasonProps) {
	const [{currentSeason}] = useAppState();
	const {data, loading}   = useSeasonData(driverId, season);

	if (loading || !data?.races) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!data.races.nodes.length) {
		return <Alert><AlertDescription>Season Data Not Available</AlertDescription></Alert>;
	}

	type RaceRow = (typeof data.races.nodes)[number];
	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<RaceRow, any>[] = [
		{
			id:          'date',
			header:      numHeader('Date'),
			accessorFn:  (row) => row.date ? new Date(row.date) : undefined,
			cell:        ({getValue}) => {
				const value = getValue<Date | undefined>();
				return numCell(value ? value.toLocaleDateString() : '');
			},
			sortingFn:   'datetime',
			size:        100
		},
		{
			accessorKey: 'officialName',
			header:      'Race',
			cell:        ({row}) => (
				<Link href={`/${currentSeason}/${row.original.round}#${row.original.officialName}`}>{row.original.officialName}</Link>
			)
		},
		{
			id:         'grid',
			header:     numHeader('Start'),
			accessorFn: (row) => row.raceResults?.nodes?.[0]?.gridPositionNumber || '--',
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:         'result',
			header:     numHeader('Finish'),
			accessorFn: (row) => row.raceResults?.nodes?.[0]?.positionDisplayOrder || '--',
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:         'change',
			header:     () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
			size:       60,
			accessorFn: (row) => {
				const result = row.raceResults?.nodes?.[0];
				if (result) {
					const {gridPositionNumber, positionDisplayOrder} = result;
					if (gridPositionNumber && positionDisplayOrder) {
						return gridPositionNumber - positionDisplayOrder;
					}
				}
				return 'unknown';
			},
			cell:       ({row}) => {
				const result = row.original.raceResults?.nodes?.[0];
				if (result) {
					const {gridPositionNumber, positionDisplayOrder} = result;
					return <div className="text-center"><PositionChange gridPositionNumber={gridPositionNumber} positionDisplayOrder={positionDisplayOrder}/></div>;
				}
				return numCell('--');
			}
		},
		{
			id:         'points',
			header:     numHeader('Points'),
			accessorFn: (row) => row.raceResults?.nodes?.[0]?.points || '--',
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:            'time',
			header:        'Time',
			enableSorting: false,
			accessorFn:    (row) => {
				const result = row.raceResults?.nodes?.[0];
				if (result) {
					const time = result.timeMillis;
					return time ? getTimeStringFromDate(new Date(time)) : getPositionTextOutcome(result.positionText, result.reasonRetired);
				}
				return '--';
			},
			cell:          ({getValue}) => <>{getValue() as any}</>
		}
	];

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<SeasonChart season={season} driverId={driverId} data={data} loading={loading}/>
			</Grid>

			<Grid item xs={12}>
				<DataTable<RaceRow>
					rows={data.races.nodes}
					columns={columns}
					autoHeight
					density="compact"
					getRowId={(row) => row.rowId || ''}
					initialState={{
						sorting: {
							sortModel: [{field: 'date', sort: 'asc'}]
						}
					}}
				/>
			</Grid>
		</Grid>
	);
}
