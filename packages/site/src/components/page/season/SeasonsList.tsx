import {StatCard, StatCardStat} from '@/components/app';
import SeasonsQuery from '@/components/page/season/SeasonsQuery';
import {DataTable, Link, Skeleton} from '@/components/ui';
import {useSuspenseQuery} from '@apollo/client/react';

import type {ColumnDef} from '@tanstack/react-table';
import {memo, Suspense} from 'react';
import {ChampionData, DriverChampionData, isDriverChampion, SeasonData, TeamChampionData} from './types';

type PlaceVariant = 'driver' | 'team'

function getAtPlace(
	variant: PlaceVariant,
	season: SeasonData,
	place: number
): DriverChampionData | TeamChampionData | undefined {
	return variant === 'driver'
	       ? (season.racesByYear?.[0]?.driverStandings?.[place - 1] || undefined) as DriverChampionData | undefined
	       : (season.racesByYear?.[0]?.teamStandings?.[place - 1] || undefined) as TeamChampionData | undefined;
}

type PlaceColumnRendererProps = {
	data: DriverChampionData | TeamChampionData | undefined
}
const PlaceColumnRenderer = memo(function PlaceColumnRenderer({data}: PlaceColumnRendererProps) {
	if (!data || typeof data === 'undefined') {
		return '--';
	}

	const variant: PlaceVariant = isDriverChampion(data) ? 'driver' : 'team';
	const key                   = isDriverChampion(data) ? data.driverId : data.teamId;

	return (
		<div className="mt-3">
			<StatCard<ChampionData, ChampionData>
				variant={variant}
				noGrid
				size="small"
				label="Points"
				loading={false}
				data={new Map([[key as string, {...data, value: data.points}]])}
				extra={<StatCardStat<ChampionData> label="Wins" data={{...data, value: 1}} format={({wins}) => wins}/>}
			/>
		</div>
	);
});

const renderPlace = (row: SeasonData, place: number, variant: PlaceVariant = 'driver') => {
	const data = variant === 'driver' ? getAtPlace('driver', row, place) : getAtPlace('team', row, place);
	return <PlaceColumnRenderer data={data}/>;
};

export default function SeasonsList() {
	const {data: {seasons}} = useSuspenseQuery<{ seasons: { nodes: SeasonData[] } }>(SeasonsQuery);

	const columns: ColumnDef<SeasonData, any>[] = [
		{
			accessorKey: 'year',
			header:      'Season',
			size:        100,
			cell:        ({row}) => <Link href={`/${row.original.year}`}>{row.original.year}</Link>
		},
		{
			id:     'winner',
			header: 'Driver Champion',
			cell:   ({row}) => renderPlace(row.original, 1)
		},
		{
			id:     'runnerup',
			header: 'Runner-Up',
			cell:   ({row}) => renderPlace(row.original, 2)
		},
		{
			id:     'third',
			header: 'Third Place',
			cell:   ({row}) => renderPlace(row.original, 3)
		},
		{
			id:     'team',
			header: 'Constructor Champion',
			cell:   ({row}) => renderPlace(row.original, 1, 'team')
		}
	];

	return (
		<Suspense fallback={<Skeleton variant="rectangular" className="h-[60vh]"/>}>
			<DataTable<SeasonData>
				rows={seasons.nodes}
				columns={columns}
				autoHeight
				getRowId={(r: SeasonData) => r.year}
				rowHeight={90}
				initialState={{
					sorting: {
						sortModel: [{field: 'year', sort: 'desc'}]
					}
				}}
			/>
		</Suspense>
	);
}
