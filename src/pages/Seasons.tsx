import {gql, useQuery} from '@apollo/client';
import {DriverStanding, Season, Team, TeamStanding} from '@gtibrett/effone-hub-graph-api';
import {Link, usePageTitle} from '@gtibrett/mui-additions';
import {Card, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {DataWithValue, Page, StatCard} from '@ui-components';
import {DriverId} from '../driver';
import {StatCardStat} from '../ui-components/stats/StatCardContent';

type SeasonData = {
	year: number;
	racesByYear: {
		round: number;
		teamStandings: Pick<TeamStanding, 'teamId' | 'points' | 'wins'>[];
		driverStandings: Pick<DriverStanding, 'driverId' | 'points' | 'wins'>[];
	}[]
};

type Data = {
	seasons: SeasonData[]
}

type SeasonsTableProps = {
	seasons: SeasonData[];
}

type DriverChampionData = DataWithValue & {
	driverId: DriverId;
	points: number;
	wins: number;
}

type TeamChampionData = DataWithValue & {
	teamId: Team['teamId'];
	points: number;
	wins: number;
}

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

const SeasonsTable = ({seasons}: SeasonsTableProps) => (
	<DataGrid
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
					renderCell: ({row}) => <Link to={`/season/${row.year}`}>{row.year}</Link>
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
	/>
);

const query = gql`
	query SeasonsQuery {
		seasons(orderBy: YEAR_DESC) {
			year
			racesByYear(orderBy: ROUND_DESC, first: 1) {
				round
				teamStandings(orderBy: POSITION_ASC, first: 1) {
					teamId
					points
					wins
				}
				driverStandings(orderBy: POSITION_ASC, first: 3) {
					driverId
					points
					wins
				}
			}
		}
	}
`;

export default function Seasons() {
	usePageTitle('Past Seasons');
	const {loading, data} = useQuery<Data>(query);
	const seasons         = data?.seasons?.filter(s => s.racesByYear[0].driverStandings.length) || [];
	
	return (
		<Page title="Past Seasons">
			<Card>
				{
					!data || loading
					? <Skeleton variant="rectangular" height={400}/>
					: <SeasonsTable seasons={seasons}/>
				}
			</Card>
		</Page>
	);
}