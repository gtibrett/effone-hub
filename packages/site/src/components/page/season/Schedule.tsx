import {DriverByLine, RaceMap, useMapSeasonRacesToMapPoints} from '@/components/app';
import {Circuit, Race, Season} from '@/gql/graphql';
import {DataTable, Link, Card, CardHeader, Skeleton} from '@/components/ui';

import type {ColumnDef} from '@tanstack/react-table';
import useScheduleData from './useScheduleData';

type RaceWithCircuit = Omit<Race, 'circuit'> & {
	circuit: Circuit
}

type ScheduleProps = {
	season: Season['year'];
};

export const ScheduleSkeleton = () => (
	<Card id="season" variant="outlined">
		<CardHeader title="Schedule"/>
		<div className="px-4"><Skeleton variant="rectangular" className="h-[300px]"/></div>
		<Skeleton variant="rectangular" className="h-[300px]"/>
	</Card>
);

export default function Schedule({season}: ScheduleProps) {
	const {data}                   = useScheduleData(season);
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();
	const races                    = data?.races;

	const {points, onClick} = mapSeasonRacesToFeatures(season, races.map(
		({name, round, circuit, results}) => ({officialName: name, round, latitude: circuit?.lat, longitude: circuit?.lng, hasResults: (results?.length ?? 0) > 0}))
	);

	type Row = (typeof races)[number];

	const columns: ColumnDef<Row, any>[] = [
		{
			id:            'date',
			header:        () => <div className="text-center w-full">Date</div>,
			accessorFn:    (row) => row.date ? new Date(row.date) : undefined,
			enableSorting: false,
			cell:          ({getValue}) => {
				const value = getValue<Date | undefined>();
				return <div className="text-center">{value ? value.toLocaleDateString() : ''}</div>;
			}
		},
		{
			accessorKey:   'name',
			header:        'Race',
			enableSorting: false,
			cell:          ({row}) => <Link href={`/${season}/${row.original.round}#${row.original.name}`}>{row.original.name}</Link>
		},
		{
			id:            'winner',
			header:        'Winner',
			enableSorting: false,
			cell:          ({row}) => {
				if (!row.original.results?.length) {
					return '--';
				}
				return <DriverByLine id={row.original.results?.[0]?.driverId}/>;
			}
		},
		{
			id:            'sprint-winner',
			header:        'Sprint Winner',
			enableSorting: false,
			cell:          ({row}) => {
				if (!row.original.sprintResults?.length) {
					return '--';
				}
				return <DriverByLine id={row.original.sprintResults?.[0]?.driverId}/>;
			}
		}
	];

	return (
		<Card id="season" variant="outlined">
			<CardHeader title="Schedule"/>
			<div className="px-4"><RaceMap points={points} onClick={onClick} highlightNext/></div>
			<DataTable<Row>
				className="mt-2"
				rows={races as Row[]}
				columns={columns}
				autoHeight
				density="compact"
				getRowId={(row: Row) => row.round || ''}
				initialState={{
					sorting: {
						sortModel: [{field: 'date', sort: 'asc'}]
					}
				}}
			/>
		</Card>
	);
}
