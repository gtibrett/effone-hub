import {gql, useQuery} from '@apollo/client';
import {Link, usePageTitle} from '@gtibrett/mui-additions';
import {Card, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ByLine from '../drivers/ByLine';
import {Season} from '@gtibrett/effone-hub-graph-api';
import {Page} from '../ui-components';

type SeasonsTableProps = {
	seasons: Season[];
}

const getWinner = (season: Season) => season.racesByYear?.[0]?.driverStandings?.[0] || undefined;

const SeasonsTable = ({seasons}: SeasonsTableProps) => (
	<DataGrid
		rows={seasons}
		autoHeight
		density="compact"
		getRowId={r => r.year}
		columns={
			[
				{
					field:      'year',
					headerName: 'Season',
					flex:       1,
					renderCell: ({row}) => <Link to={`/season/${row.year}`}>{row.year}</Link>
				},
				{
					field:      'winner',
					headerName: 'Winner',
					flex:       1,
					renderCell:renderPlace(1)
				},
				{
					field:       'points',
					headerName:  'Points',
					flex:        .25,
					type:        'number',
					headerAlign: 'right',
					align:       'right',
					renderCell:  ({row}) => getWinner(row)?.points || null
				},
				{
					field:       'wins',
					headerName:  'Wins',
					flex:        .25,
					type:        'number',
					headerAlign: 'right',
					align:       'right',
					renderCell:  ({row}) => getWinner(row)?.wins || null
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

const SeasonsQuery = gql`
	#graphql
	query seasonsQuery {
		seasons(orderBy: YEAR_DESC) {
			year
			racesByYear(orderBy: ROUND_DESC, first: 1) {
				round
				driverStandings(orderBy: POSITION_ASC, first: 1) {
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
	const {loading, data} = useQuery<{ seasons: Season[] }>(SeasonsQuery);
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