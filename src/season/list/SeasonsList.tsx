import {StatCard, StatCardStat} from '@effonehub/ui-components';
import {Link} from '@gtibrett/mui-additions';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {memo} from 'react';
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
const PlaceColumnRenderer = memo(({data}: PlaceColumnRendererProps) => {
	if (!data || typeof data === 'undefined') {
		return '--';
	}
	
	const variant: PlaceVariant = isDriverChampion(data) ? 'driver' : 'team';
	const key                   = isDriverChampion(data) ? data.driverId : data.teamId;
	
	return (
		<StatCard<ChampionData, ChampionData>
			variant={variant}
			size="small"
			label="Points"
			loading={false}
			data={new Map([[key as number, {...data, value: data.points}]])}
			extra={<StatCardStat<ChampionData> label="Wins" data={{...data, value: 1}} format={({wins}) => wins}/>}
		/>
	);
});

const renderPlace = (place: number, variant: PlaceVariant = 'driver'): GridColDef<SeasonData>['renderCell'] => (
	({row}) => {
		const data = variant === 'driver' ? getAtPlace('driver', row, place) : getAtPlace('team', row, place);
		return <PlaceColumnRenderer data={data}/>;
	}
);


export type SeasonsListProps = {
	loading: boolean;
	seasons: SeasonData[];
}

export default function SeasonsList({loading, seasons}: SeasonsListProps) {
	return <DataGrid
		loading={loading}
		rows={seasons}
		autoHeight
		getRowId={r => r.year}
		rowHeight={120}
		columns={
			[
				{
					field:      'year',
					headerName: 'Season',
					width:      100,
					flex:       1,
					renderCell: ({row}) => <Link href={`/season/${row.year}`}>{row.year}</Link>
				},
				{
					field:      'winner',
					headerName: 'Driver Champion',
					flex:       1,
					renderCell: renderPlace(1)
				},
				{
					field:      'runnerup',
					headerName: 'Runner-Up',
					flex:       1,
					renderCell: renderPlace(2)
				},
				{
					field:      'third',
					headerName: 'Third Place',
					flex:       1,
					renderCell: renderPlace(3)
				},
				{
					field:      'team',
					headerName: 'Constructor Champion',
					flex:       1,
					renderCell: renderPlace(1, 'team')
				}
			]
		}
		initialState={{
			sorting: {
				sortModel: [{field: 'year', sort: 'desc'}]
			}
		}}
	/>;
}