import {gql, useQuery} from '@apollo/client';
import {Season} from '@gtibrett/effone-hub-graph-api';
import {Link, usePageTitle} from '@gtibrett/mui-additions';
import {Card, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Place from '../race/Place';
import {Page} from '../ui-components';

type SeasonsTableProps = {
	seasons: Season[];
}

const getDriverAtPlace = (season: Season, place: number) => season.racesByYear?.[0]?.driverStandings?.[place - 1] || undefined;

const renderPlace = (place: number): GridColDef<Season>['renderCell'] => (
	({row}) => {
		const champion = getDriverAtPlace(row, place);
		if (!champion) {
			return '--';
		}
		
		const {driverId, points, wins} = champion;
		return (
			<Place driverId={driverId} points={points} wins={wins} asterisk={row.year === 2021 && place === 1}/>
		);
	}
)

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
					headerName: 'Champion',
					flex:       1,
					renderCell:renderPlace(1)
				},
				{
					field:      'runnerup',
					headerName: 'Runner-Up',
					flex:       1,
					renderCell:renderPlace(2)
				},
				{
					field:      'third',
					headerName: 'Third Place',
					flex:       1,
					renderCell:renderPlace(3)
				}
			] as GridColDef<Season>[]
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
	const {loading, data} = useQuery<{ seasons: Season[] }>(query);
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