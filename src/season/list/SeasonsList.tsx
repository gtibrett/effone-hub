import {DriverChampionData, SeasonData, TeamChampionData} from '@effonehub/season/list/types';
import {StatCard} from '@effonehub/ui-components';
import {StatCardStat} from '@effonehub/ui-components/stats';
import {Season} from '@gtibrett/effone-hub-graph-api';
import {Link} from '@gtibrett/mui-additions';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

function getAtPlace(variant: 'driver' | 'team', season: SeasonData, place: number) {
	return variant === 'driver'
	       ? (season.racesByYear?.[0]?.driverStandings?.[place - 1] || undefined) as DriverChampionData
	       : (season.racesByYear?.[0]?.teamStandings?.[place - 1] || undefined) as TeamChampionData;
}

const renderPlace = (place: number, variant: 'driver' | 'team' = 'driver'): GridColDef<Season>['renderCell'] => (
	({row}) => {
		const champion = variant === 'driver' ? getAtPlace('driver', row, place) : getAtPlace('team', row, place);
		type ChampionDataType = typeof champion;
		
		if (!champion) {
			return '--';
		}
		
		const key = variant === 'driver' ? (champion as DriverChampionData).driverId : (champion as TeamChampionData).teamId;
		
		return (
			<StatCard<ChampionDataType, ChampionDataType>
				variant={variant}
				size="small"
				label="Points"
				loading={false}
				data={new Map([[key, {...champion, value: champion.points}]])}
				extra={({wins}) => <StatCardStat<ChampionDataType> label="Wins" data={{...champion, value: 1}} format={({wins}) => wins}/>}
			/>
		);
	}
);


export type SeasonsListProps = {
	loading: boolean;
	seasons: SeasonData[];
}

export default function SeasonsList({loading,seasons}: SeasonsListProps) {
	return <DataGrid
		loading={loading}
		rows={seasons}
		autoHeight
		density="compact"
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
			] as GridColDef<SeasonData>[]
		}
		initialState={{
			sorting: {
				sortModel: [{field: 'year', sort: 'desc'}]
			}
		}}
	/>;
}