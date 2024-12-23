import {StatCard, StatCardStat} from '@/components/app';
import SeasonsQuery from '@/components/page/season/SeasonsQuery';
import {useSuspenseQuery} from '@apollo/client';
import {Link} from '@gtibrett/mui-additions';
import {Box, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {GridRenderCellParams} from '@mui/x-data-grid/models/params/gridCellParams';
import {memo, Suspense} from 'react';
import {ChampionData, DriverChampionData, isDriverChampion, SeasonData, TeamChampionData} from './types';

type PlaceVariant = 'driver' | 'team'

function getAtPlace(variant: PlaceVariant, season: SeasonData, place: number) {
	return variant === 'driver'
	       ? (season.racesByYear?.[0]?.driverStandings?.[place - 1] || undefined) as DriverChampionData
	       : (season.racesByYear?.[0]?.teamStandings?.[place - 1] || undefined) as TeamChampionData;
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
		<Box sx={{mt: 1.5}}>
			<StatCard<ChampionData, ChampionData>
				variant={variant}
				noGrid
				size="small"
				label="Points"
				loading={false}
				data={new Map([[key as number, {...data, value: data.points}]])}
				extra={<StatCardStat<ChampionData> label="Wins" data={{...data, value: 1}} format={({wins}) => wins}/>}
			/>
		</Box>
	);
});

const renderPlaceFactory = (place: number, variant: PlaceVariant = 'driver'): GridColDef<SeasonData>['renderCell'] => (
	function renderPlace({row}: GridRenderCellParams) {
		const data = variant === 'driver' ? getAtPlace('driver', row, place) : getAtPlace('team', row, place);
		return <PlaceColumnRenderer data={data}/>;
	}
);


export default function SeasonsList() {
	const {data: {seasons}} = useSuspenseQuery<{ seasons: SeasonData[] }>(SeasonsQuery);
	
	return (
		<Suspense fallback={<Skeleton variant="rectangular" height="60vh"/>}>
			<DataGrid
				rows={seasons}
				autoHeight
				getRowId={r => r.year}
				rowHeight={90}
				columns={
					[
						{
							field:      'year',
							headerName: 'Season',
							width:      100,
							flex:       1,
							renderCell: ({row}) => <Link href={`/${row.year}`}>{row.year}</Link>
						},
						{
							field:      'winner',
							headerName: 'Driver Champion',
							flex:       1,
							
							renderCell: renderPlaceFactory(1)
						},
						{
							field:      'runnerup',
							headerName: 'Runner-Up',
							flex:       1,
							renderCell: renderPlaceFactory(2)
						},
						{
							field:      'third',
							headerName: 'Third Place',
							flex:       1,
							renderCell: renderPlaceFactory(3)
						},
						{
							field:      'team',
							headerName: 'Constructor Champion',
							flex:       1,
							renderCell: renderPlaceFactory(1, 'team')
						}
					]
				}
				initialState={{
					sorting: {
						sortModel: [{field: 'year', sort: 'desc'}]
					}
				}}
			/>
		</Suspense>
	);
}